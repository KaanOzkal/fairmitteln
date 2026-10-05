import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IndustrySection from '../components/IndustrySection';
import ProcessSection from '../components/ProcessSection';
import BenefitsSection from '../components/BenefitsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import StatsSection from '../components/StatsSection';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <IndustrySection />
        <ProcessSection />
        <BenefitsSection />
        <CTASection />
        <StatsSection/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;