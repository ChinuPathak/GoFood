const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = "MyNameIsChinmayPathak"

router.post('/createuser',
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    , async (req, resp) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return resp.status(400).json({ error: error.array() })
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)
        // hash take 2 parameter first is the thing whome we want to secure like in our case password and the second parameter is salt to make the password more secure.Salt is like a extra bits to make a password more safe and hard to decode
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            resp.send({ success: true })
        } catch (error) {
            console.log('error>>>>', error)
            resp.send({ success: false })
        }
    })


router.post('/loginuser',
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    , async (req, resp) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return resp.status(400).json({ error: error.array() })
        }
        let email = req.body.email
        try {
            let userData = await User.findOne({ email })
            // This above line will give the complete document with a particular email 
            if (!userData) {
                return resp.send("Please enter a valid email id")
            }

            const pwtCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwtCompare) {
                return resp.send({ success: false, msg: "Please enter a valid password" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return resp.send({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error)
            resp.send({ success: false })
        }
    })

module.exports = router