import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header'
import Hero from './hero'


createRoot(document.getElementById('root')).render(
  <>
  <Header/>
  <Hero/>
  </>
  
)
