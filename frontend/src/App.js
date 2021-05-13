import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Footer from './components/Footer'
import Header from './components/Header'

import HomeScreen from './components/screens/HomeScreen'
import ProductScreen from './components/screens/ProductScreen'
import CartScreen from './components/screens/CartScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ShippingScreen from './components/screens/ShippingScreen'
import PlaceOrderScreen from './components/screens/PlaceOrderScreen'
import OrderSuccessScreen from './components/screens/OrderSuccessScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/signin' component={LoginScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/ordersuccess' component={OrderSuccessScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
