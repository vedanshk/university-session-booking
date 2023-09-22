const StudentService = require('../services/StudentService');
const Response = require('../../../util/response');
const jwt = require('jsonwebtoken');

// Secret key for JWT token generation
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

module.exports = {
    login: async (req, res) => {
        try {
            const { university_id, password } = req.body;

            const student = await StudentService.authenticate(university_id, password)

            if (!student) {
                return Response.error(res, 'Invalid credentials', 401);
            }

            // Create a JWT token
            const payload = { user: { id :  student._id , university_id: student.university_id} };

            const token = jwt.sign(payload, SECRET_KEY);

            Response.success(res, { token });
        } catch (error) {
            console.error(error);
            Response.error(res, 'Login failed', 500);
        }
    },
};
