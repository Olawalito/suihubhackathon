import Header from '../components/header'
import Hero from '../components/hero'
import Reason from '../components/reason'
import Explanation from '../components/explanation'
import bgGradient from '../assets/bg-gradient.png'
import Footer from '../components/footer'

function Home() {
  return (
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
  );
}

export default Home;
