import asyncHandler from 'express-async-handler'

import User from '../models/user.js'
import generateToken from '../utils/generateToken.js'

import crypto from 'crypto'
import nodemailer from 'nodemailer'

// @desc: Register a new user
// @route: Post /api/users/
// @access: public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        res.status(400)
        throw new Error("A user with this email already exists!")
    }

    // goes through pre-save in User model to hash the password
    const newUser = await User.create({
        name,
        email,
        password
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data!")
    }
})

// @desc: Authenticate user & get token
// @route: Post /api/users/login
// @access: public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid email or password!')
    }
})

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("No such user found!")
    }
})

// @desc: reset email
// @route: POST /api/users/sendresetlink
// @access: public
const sendResetEmail = asyncHandler(async (req, res) => {
    const email = req.body.email

    if (email === '') {
        res.status(200).json({
            msg: 'email required'
        })
    }

    const user = await User.findOne({ email: email })

    if (user == null) {
        //403
        res.status(200).json({
            msg: 'No such user found!'
        })
    } else {
        const token = crypto.randomBytes(20).toString('hex')

        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 360000
        user.save()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.MAIL_ADDR}`,
                pass: `${process.env.MAIL_PWD}`
            }
        })

        const mailOptions = {
            from: `${process.env.MAIL_ADDR}`,
            to: email,
            subject: '[Pro-e-Shop] Link to reset your password',
            text: 'This email was sent because you requested to reset your password for your Pro-e-Shop Account.' + '\n' +
                'Please use the following link to reset your password' + '\n\n' +
                `${process.env.URI}/resetpassword/${token}` + '\n\n' +
                'If you did not request this, please ignore this email.'
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error sending email using nodemailer!', err)
                // 500
                res.status(200).json({
                    msg: 'Error sending email using nodemailer!'
                })
            }
            else {
                console.log('Email sent!', data)
                res.status(200).json({
                    msg: 'Password reset link sent to email!'
                })
            }
        })
    }
})

// @desc: Reset user password
// @route: PUT /api/users/resetpassword
// @access: public
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const token = req.params.token

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    })

    if (user) {
        user.password = password
        const updatedUser = await user.save()

        if (updatedUser) {
            res.status(200).json({
                msg: 'Password reset successfully!'
            })
        }
    } else {
        res.status(200).json({
            msg: 'Invalid token!'
        })
    }
})

export { registerUser, authUser, getUserProfile, sendResetEmail, resetPassword }