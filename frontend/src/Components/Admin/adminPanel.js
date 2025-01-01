import { Button, Typography,Box} from "@mui/material";
import { useGetAllClubsQuery } from "../../Redux/services/api/clubapi";
import ClubCard from "./ClubCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate=useNavigate()
  const { data: clubs, isLoading, isError } = useGetAllClubsQuery();

  if (isLoading) return <p className="text-center text-gray-500">Loading clubs...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load clubs</p>;

  const handleCreate = () => {
    
    navigate("/createClub")
  };
  const handleviewbutton=()=>{
    navigate("/AllUsers")
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
         <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <Typography variant="subtitle1" color="textSecondary">
          Manage clubs efficiently
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2,mr:4}} onClick={handleCreate}>
          + Create Club
        </Button>
        <Button variant="contained" color="primary" sx={{ mt: 2}} onClick={handleviewbutton}>
          View Users
        </Button>
        </Box>
      <div className="flex flex-wrap justify-center">
        {clubs?.map((club) => (
          <ClubCard key={club._id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
