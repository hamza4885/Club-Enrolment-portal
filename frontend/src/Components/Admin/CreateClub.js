import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const ClubRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clubName: "",
    description: "",
    category: "",
    clubemail: "",
    managerEmail: "",
    phone: "",
    location: "",
    website: "",
    members: "",
  });

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      // Make the POST request
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/registerClub", // <-- Update to your actual backend route if needed
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // if you need to send cookies
        }
      );

      navigate(`/clubAccount/${data.club._id}`);
      message.success("Club registered successfully!");
    } catch (err) {
      console.error("Registration error:", err);
      message.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Club Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Club Name */}
          <div>
            <label className="block text-gray-700 font-medium">Club Name</label>
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter club name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Briefly describe your club"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Manager Email */}
          <div>
            <label className="block text-gray-700 font-medium">Manager Email</label>
            <input
              type="email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter manager email"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select a category</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Community Service">Community Service</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="clubemail"
              value={formData.clubemail}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter contact email"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter club location"
              required
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-gray-700 font-medium">Website (Optional)</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter website URL"
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Club Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register Club"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistrationForm;