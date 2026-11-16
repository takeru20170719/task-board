import React from 'react'
import { createRoot } from 'react-dom/client'
import RealEstateApp from './RealEstateApp.jsx'
import './RealEstateApp.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RealEstateApp />
  </React.StrictMode>
)
