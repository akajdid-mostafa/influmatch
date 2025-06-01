import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Bell, MessageSquare, User, Menu, X } from 'lucide-react';
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

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleMobileSidebar}
          className="mr-4 lg:hidden text-gray-500 hover:text-gray-700"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          {user.role === 'brand' ? 'Brand Dashboard' : 
           user.role === 'influencer' ? 'Influencer Dashboard' : 'Admin Dashboard'}
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {notificationsOpen && (
            <NotificationDropdown onClose={() => setNotificationsOpen(false)} />
          )}
        </div>
        
        <a href="/messages" className="p-2 rounded-full hover:bg-gray-100 text-gray-700">
          <MessageSquare size={20} />
        </a>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
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
          <span className="ml-2 font-medium hidden md:block">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;