import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetuserClubsQuery } from "../../Redux/services/api/clubapi";
import MenuIcon from "./MenuIcon";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedSession = sessionStorage.getItem("userId");

      if (storedUser && storedSession) {
        const userData = JSON.parse(storedUser);
        const sessionData = JSON.parse(storedSession);

        if (sessionData.expirationTime < Date.now()) {
          console.log("Session expired. Clearing data...");

          localStorage.removeItem("user");
          localStorage.removeItem("token");
          sessionStorage.removeItem("userId");

          setError(true);
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setUser(userData);
        }
      } else {
        setError(true);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Fetch clubs only when `user` is available
  const { data: clubData, isLoading: clubLoading, isError: clubError } =
    useGetuserClubsQuery(user?._id, {
      skip: !user?._id, 
    });

  //  Loading state
  if (loading || clubLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );

  if (error || clubError)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500">Failed to load data. Please try again.</p>
      </div>
    );

  const clubs = clubData?.clubs || [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <MenuIcon/>
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <img
          src={user?.avatar?.url || "/default-avatar.png"}
          alt="User Avatar"
          className="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400"
        />
        <h1 className="text-3xl font-bold mt-4">{user?.name}</h1>
        <p className="text-gray-400">{user?.email}</p>
        <span className="px-4 py-2 mt-2 inline-block bg-yellow-400 text-gray-900 font-semibold rounded-full">
          {user?.role}
        </span>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Connected Clubs
        </h2>

        {clubs.length === 0 ? (
         <div className="text-center">
         <p className="text-gray-400 mb-4">You are not connected to any clubs yet.</p>
         <button 
           onClick={() => navigate("/")} 
           className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
         >
           Explore Clubs
         </button>
       </div>
       
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/clubs/${club._id}`)}
              >
                <img
                  src={club.images?.[0]?.url || "/club-placeholder.jpg"}
                  alt={club.clubName}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold mt-4">{club.clubName}</h3>
                <p className="text-gray-400">{club.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
