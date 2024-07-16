const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcryptjs')

//SIGN UP

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const hashPassword = bcrypt.hashSync(password);

        const user = new User({ email, username, password: hashPassword });

        await user.save()
            .then(() => res.status(200).json({ message: "Sign Up Successful" }))
    } catch (error) {
        res.status(200).json({ message: 'User Already Exists' });
    }
})

//LOG IN

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: 'User not found' })
        }
        const correctPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!correctPassword) {
            return res.status(200).json({ message: 'Invalid Password' });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ others });

    } catch (error) {
        res.status(500).json({ message: 'User Exists' });
    }
})

module.exports = router;