
const SessionModel = require("../model/SessionModel");
const Response = require("../../../util/response");

// List Free Dean Sessions Controller
module.exports = {
  listFreeDeanSessions: async (req, res) => {
    try {
      // Get the current date and time
      const now = new Date();

      const nextThursday = new Date(now);
      nextThursday.setUTCHours(10, 0, 0, 0); // Set the time to 10:00 AM UTC
      nextThursday.setDate(now.getUTCDate() + ((4 + 7 - now.getUTCDay()) % 7));

      // Calculate the start date for next Friday in UTC
      const nextFriday = new Date(now);
      nextFriday.setUTCHours(10, 0, 0, 0); // Set the time to 10:00 AM UTC
      nextFriday.setDate(now.getUTCDate() + ((5 + 7 - now.getUTCDay()) % 7));

      console.log(nextFriday, nextThursday);

      // Find free sessions on next Thursday and Friday using a range query
      const freeSessions = await SessionModel.find({
        isBooked: false,
        dateTime:{
          $gte : nextThursday ,
          $lte: nextFriday
        }
      });

      console.log(freeSessions);

      // Return the list of free dean sessions in the API response
      Response.success(res, freeSessions);
    } catch (error) {
      console.error(error);
      Response.error(res, "Failed to retrieve free dean sessions", 500);
    }
  },
  // List Pending Dean Sessions Controller
  listPendingDeanSessions: async (req, res) => {
    try {
      // Get the dean's ID from the authenticated dean's JWT token
      const deanId = req.user.id;
  
      // Find all pending sessions for the dean
      const pendingSessions = await SessionModel.find({
        dean:deanId,
        isBooked: true,
        dateTime: {
          $gte: new Date.now()
        }
       // Only future sessions are considered pending
      })

      // Return the list of pending dean sessions in the API response
      Response.success(res, pendingSessions);
    } catch (error) {
      console.error(error);
      Response.error(res, "Failed to retrieve pending dean sessions", 500);
    }
  },


  bookDeanSession: async (req, res) => {
    try {
      // Get the session_id to book from the request body
      const { session_id } = req.body;

      // Find the session in the database
      const session = await SessionModel.findById(session_id);

      if (!session) {
        return Response.error(res, "Session not found", 404);
      }
      console.log(req.user)
      // Check if the session is already booked
      if (session.isBooked) {
        return Response.error(res, "Session is already booked", 400);
      }

    
      const studentId = req.user.id;
      // Associate the session with the student who booked it
      session.student = studentId;

      // Update the session to mark it as booked
      session.isBooked = true;

      await session.save();

      // Return a success response
      Response.success(res, "Session booked successfully");
    } catch (error) {
      console.error(error);
      Response.error(res, "Failed to book session", 500);
    }
  },
};
