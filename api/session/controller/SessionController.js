const moment = require("moment-timezone");
const DeanModel = require("../../dean/model/DeanModel");
const Response = require("../../../util/response");

module.exports = {
  listFreeDeanSessions: async (req, res) => {
    try {
      const now = new Date();
      const nextThursday = new Date(now);
      nextThursday.setUTCHours(10, 0, 0, 0);
      nextThursday.setDate(now.getUTCDate() + ((4 + 7 - now.getUTCDay()) % 7));

      const nextFriday = new Date(now);
      nextFriday.setUTCHours(10, 0, 0, 0);
      nextFriday.setDate(now.getUTCDate() + ((5 + 7 - now.getUTCDay()) % 7));

      const freeSessions = await DeanModel.find(
        {
          "available_sessions.is_booked": false,
        },
      
        {
          _id: 1, // Select dean's _id (or university_id)
          available_sessions: 1, // Select available_sessions
        }
      );
      
      // Filter the free sessions by date
      const filteredFreeSessions = freeSessions.reduce((filtered, dean) => {
        const availableSessions = dean.available_sessions.filter(
          (session) =>
            session.date_time >= nextThursday &&
            session.date_time <= nextFriday
        );
      
        if (availableSessions.length > 0) {
          filtered.push({
            dean_id: dean._id, 
            available_sessions: availableSessions,
          });
        }
      
        return filtered;
      }, []);

      Response.success(res, freeSessions);
    } catch (error) {
      console.error(error);
      Response.error(res, "Failed to retrieve free dean sessions", 500);
    }
  },

  listPendingDeanSessions: async (req, res) => {
    try {
      const deanId = req.user.id;

      const currentDateInUTC = new Date();
      currentDateInUTC.setUTCHours(0, 0, 0, 0);

      const dean = await DeanModel.findById(deanId);

      if (!dean) {
        return Response.error(res, "Dean not found", 404);
      }

      console.log(currentDateInUTC);

      const pendingSessions = dean.booked_sessions.filter((session) => {
        const sessionDate = new Date(session.date_time);

        // Compare sessionDate to currentDateInUTC
        return sessionDate >= currentDateInUTC;
      });

      Response.success(res, pendingSessions);
    } catch (error) {
      console.error(error);
      Response.error(res, "Failed to retrieve pending dean sessions", 500);
    }
  },

  bookDeanSession: async (req, res) => {
    try {
      const { session_id, dean_id } = req.body;
      const deanId = dean_id;

      console.log(req.user)

      const dean = await DeanModel.findById(deanId);

      if (!dean) {
        return Response.error(res, "Dean not found", 404);
      }

      const sessionToBook = dean.available_sessions.find(
        (session) => session.session_id === session_id
      );

      if (!sessionToBook || sessionToBook.is_booked) {
        return Response.error(res, "Session not available for booking", 400);
      }

      sessionToBook.is_booked = true;

      dean.booked_sessions.push({
        date_time: sessionToBook.date_time,
        student: req.user.id,
      });

      await dean.save();

      Response.success(res, "Session booked successfully");
    } catch (error) {
      console.error(error);
      Response.error(res, "Failed to book session", 500);
    }
  },
};
