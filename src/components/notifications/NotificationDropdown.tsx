import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import { Check, Bell, Info, AlertCircle, CheckCircle, X, Sparkles } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
    onClose();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info size={18} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'warning':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="absolute right-0 mt-4 w-96 dropdown-modern overflow-hidden z-50 shadow-2xl">
      {/* Enhanced Header */}
      <div className="py-4 px-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100/50 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-3">
            <Sparkles className="text-white" size={16} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={markAllAsRead}
            className="text-xs text-gradient hover:opacity-80 flex items-center font-semibold px-3 py-1 rounded-xl hover:bg-white/50 transition-all duration-300"
          >
            <Check size={14} className="mr-1" />
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 transition-all duration-300"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Enhanced Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-white" />
            </div>
            <p className="text-gray-500 font-medium">No notifications</p>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div>
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`px-6 py-4 border-b border-gray-50/50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 cursor-pointer transition-all duration-300 group ${
                  !notification.read ? 'bg-purple-50/30' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">{notification.title}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      {formatTimestamp(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 mt-2">
                      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Enhanced Footer */}
      {notifications.length > 0 && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100/50">
          <button className="w-full text-sm font-semibold text-gradient hover:opacity-80 transition-opacity py-2 rounded-xl hover:bg-white/50">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;