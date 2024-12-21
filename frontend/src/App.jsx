import React from 'react'
import {Route, Routes} from 'react-router-dom'

import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Dashboard} from './pages/Dashboard'
import {SendMoney} from './pages/SendMoney'
import ProtectedRoute from './utils/ProtectedRoute'


function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        <Route path='/send' element={<ProtectedRoute> <SendMoney /> </ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
