import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const prefersDark = localStorage.getItem('darkMode') === 'true'
document.body.style.backgroundColor = prefersDark ? '#111827' : '#f3f4f6'
document.body.style.color = prefersDark ? '#ffffff' : '#000000'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
