import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Bell, MessageSquare, User, Menu, X, Search } from 'lucide-react';
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
    <header className="bg-white/95 backdrop-blur-lg border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 z-10 shadow-instagram">
      <div className="flex items-center">
        <button 
          onClick={toggleMobileSidebar}
          className="mr-4 lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {getRoleTitle()}
          </h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            {getGreeting()}, {user.name}!
          </p>
        </div>
      </div>
      
      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-modern pl-10"
            placeholder="Search campaigns, influencers..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors group"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs text-white font-semibold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {notificationsOpen && (
            <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
        
        {/* Messages */}
        <a 
          href="/messages" 
          className="p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors group"
        >
          <MessageSquare size={20} />
        </a>
        
        {/* Profile */}
        <div className="flex items-center ml-4">
          <div className="avatar-story">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </div>
          </div>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;