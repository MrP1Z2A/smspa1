
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  School,
  ChevronRight
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudentHub from './components/StudentHub';
import InstitutionHub from './components/InstitutionHub';
import Communications from './components/Communications';
import Finance from './components/Finance';
import LoginPage from './components/LoginPage';

const Sidebar = ({ isOpen, onClose, onLogout }: { isOpen: boolean, onClose: () => void, onLogout: () => void }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Student Profile', path: '/student', icon: <UserCircle className="w-5 h-5" /> },
    { name: 'Institution', path: '/institution', icon: <School className="w-5 h-5" /> },
    { name: 'Events & News', path: '/news', icon: <Bell className="w-5 h-5" /> },
    { name: 'Payments', path: '/finance', icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 z-[100] w-72 bg-slate-900 text-white sidebar-transition
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:z-auto border-r border-slate-800`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="bg-brand p-2 rounded-xl text-white shadow-lg shadow-brand/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              EduParent
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 mt-6 space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 
                  ${isActive 
                    ? 'bg-brand text-white shadow-xl shadow-brand/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                onClick={() => { if (window.innerWidth < 768) onClose(); }}
              >
                <div className="flex items-center space-x-3">
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-bold text-sm tracking-wide">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800/50 bg-slate-900">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3.5 text-slate-500 hover:text-red-400 cursor-pointer transition-all duration-200 rounded-xl hover:bg-red-400/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm md:hidden animate-fadeIn" 
          onClick={onClose}
        />
      )}
    </>
  );
};

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="md:hidden p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 border border-slate-200 active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden sm:block">
          <h2 className="text-lg font-black text-slate-800">Academic Portal</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Parent Gateway</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="relative group cursor-pointer">
          <div className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors">
            <Bell className="w-6 h-6 text-slate-400" />
          </div>
          <span className="absolute top-2 right-2 bg-brand text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </div>
        
        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4 md:pl-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-slate-900">Sarah Johnson</p>
            <p className="text-[10px] font-bold text-brand uppercase tracking-tighter">Verified Parent</p>
          </div>
          <img 
            src="https://picsum.photos/seed/parent/100/100" 
            className="w-10 h-10 md:w-11 md:h-11 rounded-2xl border-2 border-white shadow-md" 
            alt="Parent Avatar" 
          />
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSidebarOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 md:p-8 flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full pb-10">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/student" element={<StudentHub />} />
                <Route path="/institution" element={<InstitutionHub />} />
                <Route path="/news" element={<Communications />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
