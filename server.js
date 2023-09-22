const express = require("express");

const connectDB = require("./config/database");

const app = require("./config/express");

require("dotenv").config();

connectDB();

const studentRoutes = require("./api/student/routes/studentRoutes");
const sessionRoutes = require("./api/session/routes/sessionRoutes");
const deanRoutes = require("./api/dean/routes/deanRoutes");


app.use('/api/student', studentRoutes);
app.use('/api/dean', deanRoutes);
app.use('/api/session', sessionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
