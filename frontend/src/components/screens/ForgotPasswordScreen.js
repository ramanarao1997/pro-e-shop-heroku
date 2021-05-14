import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

import axios from 'axios'
import FormContainer from '../FormContainer'
import ErrorMessage from '../ErrorMessage'

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        if (email === '') {
            setError(true)
            setMessage('Please enter an email')
        }
        else {
            try {
                const response = await axios.post('/api/users/sendresetlink', { email: email })
                const msg = response.data.msg
                console.log(msg)

                if (msg === 'No such user found!')
                    setError(true)
                else
                    setError(false)

                setMessage(msg)
            } catch (err) {
                setError(true)
                setMessage('Unable to email reset link')
                console.log('error is ' + err)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Forgot Password</h1>
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

                <Button type='submit' variant='primary'>
                    Email Reset Link
                </Button>
            </Form>

            {message === 'Password reset link sent to email!' && (
                <div style={{ marginTop: '15px' }}>
                    <h5> {message} </h5>
                </div>
            )}
        </FormContainer>
    )
}

export default ForgotPasswordScreen