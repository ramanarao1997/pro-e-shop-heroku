import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'
import User from '../models/user.js'

import nodemailer from 'nodemailer'


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()
        console.log(createdOrder)

        // sending a new email with order confirmation
        const user = await User.findById(req.user._id)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.MAIL_ADDR}`,
                pass: `${process.env.MAIL_PWD}`
            }
        })

        const orderId = createdOrder._id

        const mailOptions = {
            from: `${process.env.MAIL_ADDR}`,
            to: user.email,
            subject: '[Pro-e-Shop] Order Confirmation',
            text: 'This email confirms your order from Pro-eShop.' + '\n' +
                `Your order ID is ${orderId}` + '\n\n'
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
                    msg: 'Order confirmation sent to email!'
                })
            }
        })

        res.status(201).json(createdOrder)
    }
})

export {
    addOrderItems
}