const Event = require("../Model/event");
const catchAsyncError = require("../Middleware/catchAsyncErrors");
const mongoose=require("mongoose");
const Club = require("../Model/club");


exports.createEvent = catchAsyncError(async (req, res, next) => {
    try {
        const { clubId } = req.params;
        const eventData = req.body;
        
        // 1. Verify the club exists
        const club = await Club.findById(clubId);
        if (!club) {
            return next(new ErrorHandler("Club not found", 404));
        }


        // 3. Create the event with club association
        const event = new Event({
            ...eventData,
           clubId: new mongoose.Types.ObjectId(clubId)
        });

        await event.save();

        // 4. Add event to club's events array (optional)
        club.events.push(event._id);
        await club.save();

        res.status(201).json({
            success: true,
            message: "Event Created Successfully",
            event
        });

    } catch (error) {
        console.error("Error creating event:", error);
    }
});

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
    }

    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    //  Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Check if user is already registered
    if (event.attendees.some((attendee) => attendee.equals(userObjectId))) {
      return res.status(400).json({ success: false, message: "You are already registered for this event" });
    }

    // Register user
    event.attendees.push(userObjectId);
    await event.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered for the event",
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.updateEvent = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Event updated successfully",
        updatedEvent
    });
});

exports.deleteEvent = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Event deleted successfully"
    });
});

exports.getEvent = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        });
    }

    res.status(200).json({
        success: true,
        event
    });
});

exports.getAllEvents = catchAsyncError(async (req, res, next) => {
    const { clubId } = req.params;

    // Validate clubId format
    if (!mongoose.Types.ObjectId.isValid(clubId)) {
        return next(new ErrorHandler("Invalid club ID format", 400));
    }

    // Find all events for the specified club
    const events = await Event.find({ clubId })
        .populate('attendees', 'name email') // Optional: populate attendees
        .sort({ date: 1 }); // Sort by date ascending

    res.status(200).json({
        success: true,
        count: events.length,
        events
    });
});
