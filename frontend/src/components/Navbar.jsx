import React from 'react';
import { Home, MessageSquare, Upload, FileText, Settings, User, Brain } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, userProfile }) => {
  const navItems = [
    { icon: Home, label: 'Home', page: 'home' },
    { icon: MessageSquare, label: 'Chat', page: 'chat' },
    { icon: Upload, label: 'Upload', page: 'upload' },
    { icon: FileText, label: 'Documents', page: 'documents' }
  ];

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <nav className="hidden md:block bg-gradient-to-r from-purple-900 via-pink-800 to-orange-700 p-4 md:p-6 rounded-none md:rounded-2xl mb-0 md:mb-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8 flex-wrap">
            <div 
              className="flex items-center space-x-2 md:space-x-4 cursor-pointer transform hover:scale-105 transition-all duration-300" 
              onClick={() => setCurrentPage('home')}
            >
              <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-black text-white">AI Doc Analyzer</h1>
                <p className="text-[10px] md:text-xs text-white/80 font-bold">Smart • Contextual</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl font-bold transition-all duration-300 transform hover:scale-105 md:hover:scale-110 text-sm md:text-base ${
                    currentPage === item.page 
                      ? 'bg-white text-purple-600 shadow-xl' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={() => setCurrentPage('settings')}
                className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => setCurrentPage('profile')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-xl flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
              >
                <span>{userProfile?.avatar || '👤'}</span>
                <span className="hidden md:inline">{userProfile?.name?.split(' ')[0] || 'User'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-pink-800 to-orange-700 border-t border-white/10 z-50 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[60px] touch-manipulation ${
                currentPage === item.page 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 active:bg-white/10'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${
                currentPage === item.page ? 'text-white' : 'text-white/70'
              }`} />
              <span className={`text-[10px] font-medium ${
                currentPage === item.page ? 'text-white' : 'text-white/70'
              }`}>{item.label}</span>
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('settings')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[60px] touch-manipulation ${
              currentPage === 'settings'
                ? 'bg-white/20 text-white' 
                : 'text-white/70 active:bg-white/10'
            }`}
          >
            <Settings className={`w-6 h-6 mb-1 ${
              currentPage === 'settings' ? 'text-white' : 'text-white/70'
            }`} />
            <span className={`text-[10px] font-medium ${
              currentPage === 'settings' ? 'text-white' : 'text-white/70'
            }`}>Settings</span>
          </button>
          <button 
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[60px] touch-manipulation ${
              currentPage === 'profile'
                ? 'bg-white/20 text-white' 
                : 'text-white/70 active:bg-white/10'
            }`}
          >
            <span className="text-2xl mb-1">{userProfile?.avatar || '👤'}</span>
            <span className={`text-[10px] font-medium ${
              currentPage === 'profile' ? 'text-white' : 'text-white/70'
            }`}>Profile</span>
          </button>
        </div>
      </nav>
    </>
  );

};

export default Navbar;