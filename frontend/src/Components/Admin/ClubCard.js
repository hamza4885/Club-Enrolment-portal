import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useDeleteClubMutation, useUpdateClubMutation } from "../../Redux/services/api/clubapi";

const ClubCard = ({ club }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedClub, setUpdatedClub] = useState({ ...club });
  const [updateClub] = useUpdateClubMutation();
  const [deleteClub]=useDeleteClubMutation();

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleChange = (e) => {
    setUpdatedClub({ ...updatedClub, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateClub(updatedClub);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating club:", error);
    }
  };

  const handleDeleteClick = async (clubId) => {
    try {
      await deleteClub(clubId);
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };
  return (
    <div className="max-w-xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4 m-4">
      {/* Club Image */}
      <img
        src={club.images[0]?.url || "https://via.placeholder.com/300"}
        alt={club.clubName}
        className="w-full h-48 object-cover"
      />

      {/* Club Details */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{club.clubName}</h2>
        <p className="text-gray-600">{club.description}</p>

        <div className="mt-3 space-y-1">
          <p className="text-gray-700"><strong>Category:</strong> {club.category}</p>
          <p className="text-gray-700"><strong>Manager Email:</strong> {club.managerEmail}</p>
          <p className="text-gray-700"><strong>Club Email:</strong> {club.clubemail}</p>
          <p className="text-gray-700"><strong>Phone:</strong> {club.phone}</p>
          <p className="text-gray-700"><strong>Location:</strong> {club.location}</p>
          <p className="text-gray-700"><strong>Website:</strong> <a href={club.website} className="text-blue-600 underline">{club.website}</a></p>
        </div>

        <div className="mt-4 flex justify-end gap-x-4">
  <Button variant="contained" color="primary" onClick={handleEditClick}>
    Edit
  </Button>
  <Button variant="contained" color="error" onClick={() => handleDeleteClick(club._id)}>
  Delete
</Button>
</div>
      </div>

      {/* Edit Club Modal */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Club</DialogTitle>
        <DialogContent>
          <div className="p-4 space-y-3">
            <TextField label="Club Name" name="clubName" fullWidth value={updatedClub.clubName} onChange={handleChange} />
            <TextField label="Description" name="description" fullWidth multiline rows={3} value={updatedClub.description} onChange={handleChange} />
            <TextField label="Category" name="category" fullWidth value={updatedClub.category} onChange={handleChange} />
            <TextField label="Manager Email" name="managerEmail" fullWidth value={updatedClub.managerEmail} onChange={handleChange} />
            <TextField label="Club Email" name="clubemail" fullWidth value={updatedClub.clubemail} onChange={handleChange} />
            <TextField label="Phone" name="phone" fullWidth value={updatedClub.phone} onChange={handleChange} />
            <TextField label="Location" name="location" fullWidth value={updatedClub.location} onChange={handleChange} />
            <TextField label="Website" name="website" fullWidth value={updatedClub.website} onChange={handleChange} />

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outlined" color="secondary" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClubCard;
