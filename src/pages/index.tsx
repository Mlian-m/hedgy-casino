// src/pages/index.tsx
import Dashboard from '@/components/sections/Dashboard/Dashboard';
import Header from '@/components/sections/Header';
import React from 'react';
import RecentPlays from '@/components/sections/RecentPlays/RecentPlays';
import { StyledSection } from '../components/Slider';
import Toasts from '@/components/sections/Toasts';

export default function HomePage() {
  return (
    <>
      <Header />
      <Toasts />
      <StyledSection>
        <Dashboard />
        <h2 style={{ textAlign: 'center' }}>Recent Plays</h2>
        <RecentPlays />
      </StyledSection>
    </>
  );
}