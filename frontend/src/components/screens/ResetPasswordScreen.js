import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import axios from 'axios'
import FormContainer from '../FormContainer'
import ErrorMessage from '../ErrorMessage'

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        if (email === '' || password === '' || confirmPassword === '') {
            setError(true)
            setMessage('All fields are required')
        }
        else if (password !== confirmPassword) {
            setError(true)
            setMessage('Passwords do not match')
        }

        else {
            try {
                const response = await axios.put('/api/users/resetpassword', { email: email, password: password })
                const msg = response.data.msg

                if (msg === 'Invalid email!') {
                    setError(true)
                }
                else {
                    setError(false)
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                }

                setMessage(msg)
            } catch (err) {
                setError(true)
                setMessage('Password reset failed')
                console.log('error is ' + err)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Reset Password</h1>
            {error && <ErrorMessage variant='danger'>{message}</ErrorMessage>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirm password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Re-enter password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Confirm Password Reset
                </Button>
            </Form>

            {message === 'Password reset successfully!' && (
                <div style={{ marginTop: '15px' }}>
                    <h5> {message} </h5>
                </div>
            )}

        </FormContainer>
    )
}

export default ResetPasswordScreen