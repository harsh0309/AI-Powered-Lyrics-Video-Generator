import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LyricsUploader from './LyricsUploader.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <LyricsUploader />
  </StrictMode>,
)
