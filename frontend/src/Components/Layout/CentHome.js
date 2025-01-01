import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllClubsQuery, useRegisteruserinClubMutation } from '../../Redux/services/api/clubapi';
import ClubPic from "../Assets/Images/club.jpg";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const { data: clubs, isLoading, isError } = useGetAllClubsQuery();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      setFormStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    } catch (error) {
      setFormStatus('error');
      console.error('Error submitting contact form:', error);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">
      Failed to load clubs
    </div>
  );

  const handleclubClick = (clubId) => {
    if (clubId) {
      navigate(`/clubs/${clubId}`);
    }
  };

  const handleRegisterClick = async (clubId) => {
    const user = JSON.parse(sessionStorage.getItem('userId'));
    const userId = user ? user.userId : null;
    
    console.log("The user id is", userId);
  
    if (!userId) {
      alert('Please login to register for a club');
      navigate('/login');
      return;
    }
  
    try {
      const registrationCheckResponse = await axios.get(`http://localhost:4000/api/admin/checkUserRegistration/${clubId}/${userId}`);
  
      if (registrationCheckResponse.data.isRegistered) {
        alert('You are already registered for this club');
        return;
      }
  
      const registerResponse = await axios.post(`http://localhost:4000/api/admin/RegisterinClub/${clubId}`, {
        userId: userId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log("Registration response:", registerResponse.data);
      alert('Successfully registered for the club!');
      navigate(`/clubs/${clubId}`);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900 text-gray-100 py-4 px-6 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          ClubFinder
        </Link>
        <div className="space-x-6">
          <a
            href="#clubs-section"
            onClick={(e) => handleScroll(e, 'clubs-section')}
            className="hover:text-yellow-400 transition"
          >
            Clubs
          </a>
          <a
            href="#feature-section"
            onClick={(e) => handleScroll(e, 'feature-section')}
            className="hover:text-yellow-400 transition"
          >
            About
          </a>
          <a
            href="#contact-section"
            onClick={(e) => handleScroll(e, 'contact-section')}
            className="hover:text-yellow-400 transition"
          >
            Contact
          </a>
          <Link
            to="/login"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0 animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Clubs<br/>
              <span className="text-yellow-400">In Your Community</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Join, explore, and manage your favorite clubs with ease. Find your perfect community match today!
            </p>
            <button 
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('clubs-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Clubs
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 bg-yellow-400 rounded-2xl transform rotate-6"></div>
              <img 
                src={ClubPic}
                alt="Club Community" 
                className="relative z-10 rounded-2xl shadow-2xl transform hover:scale-95 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section id="clubs-section" className="py-16 px-4 md:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-yellow-400">
            Featured Clubs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs?.map(club => (
              <div 
                key={club._id}
                className="bg-gray-700 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col"
              >
                <div 
                  className="relative h-48 rounded-lg overflow-hidden mb-4 cursor-pointer"
                  onClick={() => handleclubClick(club._id)}
                >
                  <img 
                    src={club.images?.[0]?.url || '/club-placeholder.jpg'} 
                    alt={club.clubName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-4">
                    <h3 className="text-xl font-bold text-white">{club.clubName}</h3>
                    <p className="text-yellow-400 text-sm">{club.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                  {club.description}
                </p>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="bg-gray-600 px-3 py-1 rounded-full text-yellow-400">
                    {club.members?.length || 0} Members
                  </span>
                  <span className="text-gray-400">
                    {club.location}
                  </span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegisterClick(club._id);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-auto"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="feature-section" className="py-16 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-yellow-400">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Easy Management', 
                desc: 'Intuitive tools for club administration and member management',
                icon: '⚙️'
              },
              {
                title: 'Event Planning',
                desc: 'Create and promote events with seamless integration',
                icon: '📅'
              },
              {
                title: 'Community Focus',
                desc: 'Connect with like-minded individuals in your area',
                icon: '👥'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-800 p-8 rounded-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-section" className="py-16 px-4 md:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-yellow-400">
            Contact Us
          </h2>
          <div className="bg-gray-700 rounded-xl p-8 shadow-lg">
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-600 text-white rounded-lg">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
                There was an error submitting your message. Please try again.
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows="5"
                  className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      

<footer className="bg-gray-900 text-gray-400 text-center py-6">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <p className="flex items-center justify-center gap-2">
      &copy; {new Date().getFullYear()} ClubFinder. 
      Email us For club Creation. 
      <MdEmail className="text-yellow-400" /> 
      ClubFinder@gmail.com
    </p>
    <div className="mt-4 flex justify-center space-x-6">
      <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
      <a href="#" className="hover:text-yellow-400 transition">Terms of Service</a>
      <Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;