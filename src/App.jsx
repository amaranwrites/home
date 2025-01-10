import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "./context/QuoteContext"; 
import Header from "./components/Header";
import SEO from "./components/SEO";
import PoemList from "./components/PoemList";
import PoemDetail from "./components/PoemDetail";
import Footer from "./components/Footer";
// import Categories from "./components/Categories";
import Home from "./components/Home";
import Welcome from "./components/Welcome";

const categoriesData = []; // Static categories data

const App = () => {
  return (
    <QuoteProvider>
      <Router>
        <div className="App">
          <SEO 
            title="Poem Blog" 
            description="Explore a collection of beautiful poems and quotes." 
            keywords="poems, quotes, poetry, literature" 
            author="Your Name" 
          />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poems" element={<PoemList />} />
            <Route path="/poems/:id" element={<PoemDetail />} />
            <Route path="/welcome" element={<Welcome />} />
            {/* <Route path="/categories" element={<Categories categories={categoriesData} />} /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </QuoteProvider>
  );
};

export default App; // Ensure this line exists
