import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import { Check, Bell, Info, AlertCircle, CheckCircle } from 'lucide-react';

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
        return <Info size={16} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
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
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="py-2 px-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
        <button 
          onClick={markAllAsRead}
          className="text-xs text-purple-600 hover:text-purple-800 flex items-center"
        >
          <Check size={14} className="mr-1" />
          Mark all as read
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-8 px-4 text-center text-gray-500">
            <Bell size={24} className="mx-auto mb-2 text-gray-400" />
            <p>No notifications</p>
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-purple-50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTimestamp(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="py-2 px-4 bg-gray-50 border-t border-gray-200 text-center">
        <button 
          onClick={onClose}
          className="text-xs text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;