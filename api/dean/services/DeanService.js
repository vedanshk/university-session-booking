const DeanModel = require('../model/DeanModel');

module.exports = {
  authenticate: async (university_id, password) => {
    try {
      const dean = await DeanModel.findOne({ university_id });
      
      console.log(dean);
      if (!dean) {
        return null; //
      }

      // Implement password comparison logic here (e.g., bcrypt)
      const isMatch = password === dean.password;

      if (!isMatch) {
        return null; // Password doesn't match
      }

      return dean;
    } catch (error) {
      throw error;
    }
  },
};
