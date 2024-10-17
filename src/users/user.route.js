import express from "express";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });
        if(!admin) return res.status(401).send("Invalid username or password");

        if(admin.password !== password) return res.status(401).send("Invalid username or password");

        const token = jwt.sign(
            { id: admin._id, role: admin.role, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Failed to login as admin", error)
       res.status(401).send({message: "Failed to login as admin"}) 
    }
})

export default router