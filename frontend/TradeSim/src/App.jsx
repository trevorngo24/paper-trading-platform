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
