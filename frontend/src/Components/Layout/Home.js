

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaChartLine, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaIdBadge, 
  FaStar, 
  FaCrown 
} from "react-icons/fa";
import { 
  useDeleteClubMutation, 
  useGetsingleClubQuery, 
  useUpdateClubMutation 
} from "../../Redux/services/api/clubapi";
import { 
  useCreateEventMutation, 
  useDeleteEventMutation, 
  useGetAllEventsQuery, 
  useUpdateEventMutation
} from "../../Redux/services/api/eventapi";
import MembershipPlans from "../Packages/MembershipPlan";
import UserOptions from "./speedDial";

const ClubPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [modalType, setModalType] = useState(null); // 'create' or 'edit'

  const [eventId, setEventId] = useState(null);

  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Fetch club details
  const {data :clubData, isLoading: clubLoading, isError: clubError } = useGetsingleClubQuery(id);
  
  // Fetch events for the club
  const { data: eventsData, isLoading: eventsLoading, isError: eventsError } = useGetAllEventsQuery(id);
  
  // Mutations for CRUD operations
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const events = eventsData?.events || [];
  const club = clubData || []

 // Function to handle event creation
 const handleCreateEvent = async () => {
  if (!eventTitle || !eventDate) return alert("Title and Date are required!");

  await createEvent({
    clubId: id,
    eventData: {
      eventTitle,
      eventDescription,
      date: eventDate,
    },
  });
  

  setShowModal(false); // Close the modal after event creation
};

const handleEditClick = (event) => {
  setModalType("edit");
  setEventTitle(event.eventTitle);
  setEventDescription(event.eventDescription);
  setEventDate(event.date.split("T")[0]); // Format date correctly
  setEventId(event._id); // Set the event ID
  setShowModal(true);
};


const handleUpdateEvent = async() => {
  const updatedEvent = {
    _id: eventId,
    eventTitle,
    eventDescription,
    date: eventDate,
  };

  await updateEvent(updatedEvent); // Dispatch Redux action
  setShowModal(false);
};

  // Handle event deletion
  const handleDelete = async(eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
        await deleteEvent(eventId);
    }
};

  const handleGetStarted = () => {
    navigate("/signup");
  };

  if (clubLoading) return <div className="text-center py-8">Loading club details...</div>;
  if (clubError) return <div className="text-center py-8 text-red-500">Error loading club data</div>;

  return (
    <div className="bg-gray-900 text-gray-200">
      <UserOptions clubId={clubData?._id}/>
      {/* Navbar */}
      <header className="bg-gray-800 shadow-md sticky top-0 z-10">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-3xl font-extrabold text-yellow-400 animate-pulse">{club?.clubName}</h1>
          <ul className="hidden md:flex gap-6 items-center mr-20">
            <li><a href="#features" className="hover:text-yellow-400 transition">Features</a></li>
            <li><a href="#events" className="hover:text-yellow-400 transition">Events</a></li>
            <li><a href="#membership" className="hover:text-yellow-400 transition">Membership</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Welcome to <span className="text-yellow-400">{club?.clubName}</span>
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Manage your town's finest club with ease. Organize events, manage memberships, and connect with your community.
            </p>
            <button className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition"
              onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <img src={club?.images?.[0]?.url || ""} alt="Club" 
            className="w-60 md:w-80 lg:w-[500px] max-h-[400px] mt-8 md:mt-0 rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-12 text-yellow-400">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 shadow-md rounded-md text-center">
              <FaCalendarAlt className="text-yellow-300 w-12 h-12 mx-auto" />
              <h4 className="text-xl font-semibold text-yellow-300">Event Management</h4>
              <p className="text-gray-400">Plan and manage events seamlessly.</p>
            </div>
            <div className="bg-gray-800 p-6 shadow-md rounded-md text-center">
              <FaUsers className="text-yellow-300 w-12 h-12 mx-auto" />
              <h4 className="text-xl font-semibold text-yellow-300">Membership Plans</h4>
              <p className="text-gray-400">Offer flexible membership options.</p>
            </div>
            <div className="bg-gray-800 p-6 shadow-md rounded-md text-center">
              <FaChartLine className="text-yellow-300 w-12 h-12 mx-auto" />
              <h4 className="text-xl font-semibold text-yellow-300">Analytics</h4>
              <p className="text-gray-400">Track growth and engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <h3 className="text-4xl font-bold text-yellow-400 text-center mb-3">Upcoming Events</h3>
            <button onClick={() => setShowModal(true)}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition flex items-center gap-2">
              <FaPlus /> Add Event
            </button>
          </div>

          {eventsLoading && <div className="text-center py-4">Loading events...</div>}
          {eventsError && <div className="text-center py-4 text-red-500">Error loading events</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-700 p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-yellow-300">{event.eventTitle}</h4>
                  <p className="text-gray-400">Date: {event.date}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEditClick(event)} className="text-blue-400 hover:text-blue-300">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(event?._id)} className="text-red-400 hover:text-red-300">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       {/* Modal */}
       {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        {modalType === "edit" ? "Edit Event" : "Create Event"}
      </h2>
      <input
        type="text"
        placeholder="Event Title"
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
      <textarea
        placeholder="Event Description"
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <div className="flex justify-between">
        <button onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={modalType === "edit" ? handleUpdateEvent : handleCreateEvent}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          {modalType === "edit" ? "Update Event" : "Create Event"}
        </button>
      </div>
    </div>
  </div>
)}


       {/* Membership Section */}
   <section id="membership" className="py-16 bg-gray-800 text-white">
     <div className="container mx-auto px-6">
      <MembershipPlans clubId={club._id}/>
     </div>
   </section>

         {/* Footer */}
         <footer id="contact" className="py-8 bg-gray-900 text-center">
           <p className="text-gray-500">
             © 2025 <span className="text-yellow-400">ClubManager</span>. All Rights Reserved.
           </p>
         </footer>
    </div>
  );
};

export default ClubPage;



