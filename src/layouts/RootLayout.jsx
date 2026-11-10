import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import NotificationBanner from '../components/common/NotificationBanner';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-stone-800">
      <NotificationBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

