import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Bell, MessageSquare, User, Menu, X, Search, Sparkles } from 'lucide-react';
import NotificationDropdown from '../notifications/NotificationDropdown';

interface HeaderProps {
  toggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

const Header = ({ toggleMobileSidebar, isMobileSidebarOpen }: HeaderProps) => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  if (!user) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleTitle = () => {
    switch (user.role) {
      case 'brand':
        return 'Brand Dashboard';
      case 'influencer':
        return 'Creator Studio';
      case 'admin':
        return 'Admin Panel';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="header-modern py-6 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center">
        <button 
          onClick={toggleMobileSidebar}
          className="mr-6 lg:hidden p-3 rounded-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 hover:scale-105"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-4 shadow-lg">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 text-shadow">
              {getRoleTitle()}
            </h1>
            <p className="text-sm text-gray-600 hidden sm:block">
              {getGreeting()}, <span className="text-gradient font-semibold">{user.name}</span>!
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Search Bar */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8">
        <div className="search-modern w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns, influencers, messages..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Enhanced Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-4 rounded-2xl hover:bg-gray-100/80 text-gray-700 transition-all duration-300 group hover:scale-105"
          >
            <Bell size={22} className="group-hover:animate-pulse" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs text-white font-bold shadow-lg animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {notificationsOpen && (
            <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
        
        {/* Enhanced Messages */}
        <a 
          href="/messages" 
          className="p-4 rounded-2xl hover:bg-gray-100/80 text-gray-700 transition-all duration-300 group hover:scale-105"
        >
          <MessageSquare size={22} className="group-hover:animate-pulse" />
        </a>
        
        {/* Enhanced Profile */}
        <div className="flex items-center ml-6 p-2 rounded-2xl hover:bg-gray-100/80 transition-all duration-300 cursor-pointer group">
          <div className="avatar-story">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={24} className="text-gray-600" />
              )}
            </div>
          </div>
          <div className="ml-4 hidden md:block">
            <p className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 capitalize font-medium">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;