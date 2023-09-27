const StudentModel = require('../model/StudentModel');

module.exports = {
  authenticate: async (university_id, password) => {
    try {
      const student = await StudentModel.findOne({ university_id });
      

      if (!student) {
        return null; // Student not found
      }

      // Implement password comparison logic here (e.g., bcrypt)
      const isMatch = password === student.password;

      if (!isMatch) {
        return null; // Password doesn't match
      }

      return student;
    } catch (error) {
      throw error;
    }
  },
};
