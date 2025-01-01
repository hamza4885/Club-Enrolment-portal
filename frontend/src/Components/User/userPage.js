import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetsingleClubQuery, useRegisteruserinClubMutation } from "../../Redux/services/api/clubapi";
import { useGetAllEventsQuery, useRegisterEventMutation } from "../../Redux/services/api/eventapi";
import { useGetAllPackagesQuery } from "../../Redux/services/api/packagesapi";
import { FaCalendarAlt, FaUsers, FaChartLine, FaIdBadge, FaStar, FaCrown } from "react-icons/fa";
import UserOptions from "../Layout/speedDial";
import MenuIcon from "./MenuIcon";

const UserLandingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch club details
  const { data: clubData, isLoading: clubLoading, isError: clubError } = useGetsingleClubQuery(id);
  const { data: packagesData, isLoading: packagesLoading, isError: packagesError } = useGetAllPackagesQuery();
  const packages = Array.isArray(packagesData) ? packagesData : [];

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const [registeruser] = useRegisteruserinClubMutation();

 // Fetch events
 const { data: eventsData, isLoading: eventsLoading, isError: eventsError } = useGetAllEventsQuery(id);
 const events = eventsData?.events || [];
 const club = clubData || {}; // ✅ Ensuring it's an object
const [registerEvent]=useRegisterEventMutation();

  const handleGetStarted = async () => {
    if (!userId) {
      alert("You need to log in to register for this club.");
      navigate("/login");
      return;
    }

    const confirmRegistration = window.confirm("Are you sure you want to register in this club?");
    if (!confirmRegistration) return;

    try {
      await registeruser({ id, userId }).unwrap();
      alert("Successfully registered in the club!");
    } catch (error) {
      alert(`Error: ${error?.data?.message || "Registration failed"}`);
    }
  };

  const handleJoinNow = (pkg) => {
    if (!userId) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }
   navigate("subscription", { state: { selectedPackage: pkg } });
  };

   // Open Modal and Set Event
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Register User for Event
  const handleRegister = async () => {
    if (!userId) {
      alert("Please log in to register for this event.");
      navigate("/login");
      return;
    }

    try {
      await registerEvent({ eventId: selectedEvent._id, userId }).unwrap();
      alert("Successfully registered for the event!");
      closeModal(); // Close modal on success
    } catch (error) {
      alert(`Error: ${error?.data?.message || "Registration failed"}`);
    }
  };

  const getPackageIcon = (name) => {
    switch (name) {
      case "Basic":
        return <FaIdBadge className="w-12 h-12 mx-auto mb-4" />;
      case "Premium":
        return <FaStar className="w-12 h-12 mx-auto mb-4" />;
      case "Elite":
        return <FaCrown className="w-12 h-12 mx-auto mb-4" />;
      default:
        return <FaIdBadge className="w-12 h-12 mx-auto mb-4" />;
    }
  };

  if (clubLoading) return <div className="text-center py-8">Loading club details...</div>;
  if (clubError) return <div className="text-center py-8 text-red-500">Error loading club data</div>;

  return (
    <div className="bg-gray-900 text-gray-200">
      <MenuIcon/>
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
              Enjoy premium club experiences with top-notch events and memberships.
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
          </div>

          {eventsLoading && <div className="text-center py-4">Loading events...</div>}
          {eventsError && <div className="text-center py-4 text-red-500">Error loading events</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {events.map((event) => (
              <div key={event._id} className="bg-gray-700 p-6 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-yellow-300">{event.eventTitle}</h4>
                  <p className="text-gray-400">Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => openModal(event)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md transition duration-300"
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Membership Section */}
      <section id="membership" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-yellow-300 text-center">Membership Plans</h3>
          {packagesLoading && <p>Loading...</p>}
          {packagesError && <p className="text-red-500">Error fetching packages.</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-gray-700 text-yellow-300 p-6 rounded-md shadow-md text-center">
                {getPackageIcon(pkg.name)}
                <h4 className="font-semibold text-xl">{pkg.name}</h4>
                <p>${pkg.amount}/month</p>
                <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
                  onClick={() => handleJoinNow(pkg)}>
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-8 bg-gray-900 text-center">
        <p className="text-gray-500">© 2025 <span className="text-yellow-400">ClubManager</span></p>
      </footer>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Register for {selectedEvent.eventTitle}</h3>
            <p className="text-gray-300">Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p className="text-gray-400 mt-2">Are you sure you want to register for this event?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition">
                Cancel
              </button>
              <button onClick={handleRegister} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLandingPage;
