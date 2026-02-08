import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import User from './pages/User'
import Products from './pages/products'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
