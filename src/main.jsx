import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header'
import Hero from './components/hero'
import Reason from './components/reason'
import Explanation from './components/explanation'
import bgGradient from '../src/assets/bg-gradient.png'
import net from '../src/assets/net.png'
import Footer from './components/footer'


createRoot(document.getElementById('root')).render(
  <>
  <div style={{ backgroundImage: `url(${bgGradient})` }} className="hero-bg">
  <Header/>
  <Hero/>
  </div>
  <div>
  <Reason/>
  </div>
  <div>
  <Explanation/>
  </div>
   <Footer/>
  </>
)
