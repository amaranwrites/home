import React from 'react';
import Navbar from './components/Navbar';
// import Hero from './components/Hero';
import PoemList from './components/PoemList';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            {/* <Hero /> */}
            <section className="poem-list">
                <h2>Featured Poems</h2>
                <div className="poem-cards-container">
                    <PoemList />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default App;