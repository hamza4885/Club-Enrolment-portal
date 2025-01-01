const mongoose = require("mongoose");
const Package = require("../Model/packages");
const Club = require("../Model/club"); // ✅ Import Club model

// Create a new package
const createPackage = async (req, res) => {
    try {
        const { clubId } = req.params;
        const { name, amount } = req.body;

        if (!name || !amount || !clubId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate clubId
        if (!mongoose.Types.ObjectId.isValid(clubId)) {
            return res.status(400).json({ message: "Invalid clubId format" });
        }

        // Check if club exists
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }

        // Create and save new package
        const newPackage = new Package({
            name,
            amount,
            clubId
        });
        await newPackage.save();

        // Optionally push to club's packages array
        club.packages.push(newPackage._id); // Assuming club has a packages array of ObjectIds
        await club.save();

        res.status(201).json(newPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Get all packages
const getPackages = async (req, res) => {
    try {
        const { clubId } = req.params;

        const packages = await Package.find({ clubId })
            .populate("clubId", "name"); // Only populate the club's name

        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Get a package by ID
const getPackageById = async (req, res) => {
    try {
        const packageData = await Package.findById(req.params.id);

        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.status(200).json(packageData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update a package (Only the amount)
const updatePackage = async (req, res) => {
    try {
        const { amount } = req.body;

        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            { amount },
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.status(200).json(updatedPackage);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    try {
        const packageToDelete = await Package.findById(req.params.id);

        if (!packageToDelete) {
            return res.status(404).json({ message: "Package not found" });
        }

        await packageToDelete.deleteOne();
        res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage,
};
