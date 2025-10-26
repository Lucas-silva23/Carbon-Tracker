import React from 'react';
import Navbar from '../components/Navbar';
import DemoDashboard from '../components/DemoDashboard';
import '../styles/HomePage.css'; // Novo CSS
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar /> {/* A Navbar aparece aqui */}
      
      {/* Seção 1: Hero (Texto Explicativo) */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Monitore seu impacto positivo no planeta.
          </h1>
          <p className="hero-subtitle">
            O <strong>Carbon Tracker</strong> ajuda você a visualizar o quanto de CO2
            você está deixando de emitir através de hábitos diários, 
            transformando pequenas ações em grandes resultados.
          </p>
          <Link to="/auth" className="hero-cta-button">
            Comece a monitorar agora
          </Link>
        </div>
      </header>

      {/* Seção 2: Demonstração */}
      <section className="demo-section">
        <h2 className="section-title">Veja como funciona</h2>
        <DemoDashboard />
      </section>
    </div>
  );
};

export default HomePage;