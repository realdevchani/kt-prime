import React from 'react';
import ManagementPrinciplesSection from 'components/ManagementPrinciplesSection';
import CompanyHistorySection from 'components/CompanyHistorySection';
import CoreValueSection from 'components/CoreValueSection';
import ContactSection from 'components/ContactSection';

const Home = () => {
  return (
    <>
      <ManagementPrinciplesSection />
      <CompanyHistorySection />
      <CoreValueSection />
      <ContactSection />
    </>
  );  
};

export default Home;