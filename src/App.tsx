import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { SkillAnalyzer } from './components/SkillAnalyzer';
import { RoadmapView } from './components/RoadmapView';
import { ApplicationTracker } from './components/ApplicationTracker';
import { AiAssistant } from './components/AiAssistant';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { MockInterviewCenter } from './components/MockInterviewCenter';
import { CompanyPrepHub } from './components/CompanyPrepHub';
import { GamificationView } from './components/GamificationView';
import { ProfileModal } from './components/ProfileModal';
import { ToastContainer } from './components/ToastContainer';

const MainAppLayout: React.FC = () => {
  const { activeTab, setActiveTab, isLoggedIn, setIsLoggedIn } = useApp();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = activeTab === 'landing';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onOpenProfile={() => setProfileModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main View Area */}
      {isLanding ? (
        <main className="flex-1">
          <LandingPage
            onStartJourney={() => {
              setIsLoggedIn(true);
              setActiveTab('skill-analyzer');
            }}
            onOpenProfile={() => setProfileModalOpen(true)}
          />
        </main>
      ) : (
        <div className="flex-1 flex">
          {/* Sidebar */}
          <Sidebar
            onOpenProfile={() => setProfileModalOpen(true)}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          {/* Core Content Area */}
          <div className="flex-1 md:pl-72 transition-all">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {activeTab === 'dashboard' && (
                <Dashboard onOpenProfile={() => setProfileModalOpen(true)} />
              )}
              {activeTab === 'skill-analyzer' && <SkillAnalyzer />}
              {activeTab === 'roadmap' && <RoadmapView />}
              {activeTab === 'applications' && <ApplicationTracker />}
              {activeTab === 'ai-assistant' && <AiAssistant />}
              {activeTab === 'resume-analyzer' && <ResumeAnalyzer />}
              {activeTab === 'mock-interview' && <MockInterviewCenter />}
              {activeTab === 'company-hub' && <CompanyPrepHub />}
              {activeTab === 'gamification' && <GamificationView />}
            </main>
          </div>
        </div>
      )}

      {/* Global Profile Editor Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Floating Accomplishment Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
