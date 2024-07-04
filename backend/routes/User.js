const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "My-Authourization-Token-Secret";

router.post("/createUser", [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name', 'Incorrect Name').isLength({ min: 5 }),]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Authorization
        const salt = await bcrypt.genSalt(10);
        let secPsswd = await bcrypt.hash(req.body.password,salt);
        
        try {
            await User.create({
                name: req.body.name,
                password: secPsswd,
                location: req.body.location,
                email: req.body.email
            })
            res.json({ success: true })
        }
        catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    })

router.post('/loginUser', [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let userData = await User.findOne({ email: req.body.email })

            if (!userData) {
                return res.status(400).json({ errors: "Invalid Email" })
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect Password" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router; 