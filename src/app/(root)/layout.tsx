import Header from '@/components/shared/Header';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div>
        <Navbar />
        <Header />
        {children}
      </div>
    );
};

export default RootLayout;