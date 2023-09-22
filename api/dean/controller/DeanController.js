const DeanService = require('../services/DeanService');
const Response = require('../../../util/response');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

module.exports = {
    login: async (req, res) => {
        try {
            const { university_id, password } = req.body;

            const dean = await DeanService.authenticate(university_id, password)

            if (!dean) {
                return Response.error(res, 'Invalid credentials', 401);
            }

            // Create a JWT token
            const payload = { user: { id :  dean._id , university_id: dean.university_id} };

            const token = jwt.sign(payload, SECRET_KEY);

            Response.success(res, { token });
        } catch (error) {
            console.error(error);
            Response.error(res, 'Login failed', 500);
        }
    },
};
