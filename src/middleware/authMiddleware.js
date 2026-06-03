const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = protect;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTFlYTFiNmZkNmMxOWMxMDg1MjU3NjIiLCJpYXQiOjE3ODA0MzA5MDZ9.6kClZ4fvmruEUVTZwrzk4qKW4UAcv-virljVpHIGft0
