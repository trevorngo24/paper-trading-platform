
import Navbar from './components/Navbar';'
import Hero from './components/Hero';'
import Learn from './components/Learn';'
import Practice from './components/Practice';'
import Quiz from './components/Quiz';'
import Pricing from './components/Pricing';'
import Footer from './components/Footer';'



function App() {
  return (
    <div className="min-h-screen text-white overflow-hidden"
    style={{ backgroundImage: `url('public/skybg.jpg')`, backgroundSize: 'cover'}}
    >
      <Navbar />
      <Hero />
      <Learn />
      <Practice />
      <Quiz />
      <Pricing />
      <Footer />
   </div>
   );
} 

export default App;
