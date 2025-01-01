const Club = require("../Model/club");
const User=require("../Model/user")
const mongoose=require("mongoose")

exports.registerClub = async (req, res, next) => {
  try {
  
    const {clubName, description, managerEmail,category, clubemail, phone, location, website,events,packages} = req.body;
    if (!clubemail) {
      return res.status(400).json({ message: "Club email is required" });
    }
    const existingClub = await Club.findOne({ clubemail });
    if (existingClub) {
      return res.status(400).json({ message: "Club with this email already exists" });
    }
     console.log(req.filesUploaded)
    const images =req.filesUploaded;
    
    // Create and save the club with images
    const club = new Club({
      clubName,
      description,
      managerEmail,
      category,
      clubemail,
      phone,
      location,
      website,
      images, // ✅ Now properly assigned
      events,
      packages
    });

    await club.save();
    res.status(201).json({ message: "Club registered successfully", club });

  } catch (error) {
    console.error("Error registering club:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.checkUserRegistration = async (req, res) => {
  const { clubId, userId } = req.params; // Extract clubId and userId from URL params

  try {
    // Find the club by clubId
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if the userId is already in the members array
    const isRegistered = club.members.includes(userId);

    return res.json({ isRegistered }); // Return registration status
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.registerUserInClub = async (req, res) => {
  try {
 
    const { clubId } = req.params;
    const { userId } = req.body;
  
    if (!clubId || !userId) {
      return res.status(400).json({ message: "Club ID and User ID are required" });
    }
    const mongoose = require("mongoose");
if (!mongoose.Types.ObjectId.isValid(clubId)) {
    return res.status(400).json({ message: "Invalid Club ID" });
}

    const club = await Club.findById(clubId);
    
    if (!club) return res.status(404).json({ message: "Club not found" });
    if (!Array.isArray(club.members)) {
      club.members = [];
  }
  
    if (club.members.includes(userId)) {
      return res.status(400).json({ message: "User already registered" });
    }

    club.members.push(userId);
    await club.save();


    res.status(200).json({ message: "User registered successfully", club });
  } catch (error) {
    console.error("Error in registerUserInClub:", error);
    res.status(500).json({ message: "Server error", error: error.message });
 }
};



exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getUserClubs = async (req, res) => {
  try {
    const { userId } = req.params; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId); // onvert to ObjectId

    // Query using ObjectId
    const userClubs = await Club.find({ members: userObjectId });

    res.status(200).json({ success: true, clubs: userClubs });
  } catch (error) {
    console.error("Error fetching user clubs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getClubMembers = async (req, res) => {
  try {
    const { clubId } = req.params;

    if (!clubId) {
      return res.status(400).json({ success: false, message: "Club ID is required" });
    }

    const club = await Club.findById(clubId).populate("members", "name email role");

    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, members: club.members });
  } catch (error) {
    console.error("Error fetching club members:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


exports.removeClubMember = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { memberId } = req.body;

    // Validate Object IDs
    if (!mongoose.Types.ObjectId.isValid(clubId) || !mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ success: false, message: "Invalid club or member ID" });
    }

    //  Find the club
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ success: false, message: "Club not found" });
    }

    // Check if member exists in the club
    if (!club.members.includes(memberId)) {
      return res.status(400).json({ success: false, message: "Member not found in this club" });
    }

    // Remove member from the members array
    club.members = club.members.filter((id) => id.toString() !== memberId);
    await club.save();

    res.status(200).json({ success: true, message: "Member removed successfully" });
  } catch (error) {
    console.error("Error removing club member:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    await club.deleteOne();
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateClub = async (req, res) => {
  try {
      const clubId = req.params.id; 
      const updateData = req.body;
      
      const club = await Club.findByIdAndUpdate(
          clubId,
          updateData,
          { new: true, runValidators: true }
      );

      if (!club) {
          return res.status(404).json({
              success: false,
              message: "Club not found"
          });
      }

      res.status(200).json({
          success: true,
          message: "Club updated successfully",
          club
      });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

