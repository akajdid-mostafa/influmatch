import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, Users, BarChart3, MessageSquare, 
  Settings, Search, PlusCircle, FileText,
  Bell, LogOut, ChevronLeft, ChevronRight,
  UserCircle, ShoppingBag, Briefcase, Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const brandLinks = [
    { to: '/brand/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/brand/create-campaign', icon: <PlusCircle size={20} />, label: 'Create Campaign' },
    { to: '/brand/campaigns', icon: <Briefcase size={20} />, label: 'My Campaigns' },
    { to: '/brand/find-influencers', icon: <Search size={20} />, label: 'Find Influencers' },
  ];

  const influencerLinks = [
    { to: '/influencer/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/influencer/requests', icon: <FileText size={20} />, label: 'Campaign Requests' },
    { to: '/influencer/profile', icon: <UserCircle size={20} />, label: 'My Profile' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'User Management' },
    { to: '/admin/campaigns', icon: <Briefcase size={20} />, label: 'Campaign Moderation' },
  ];

  // Determine which links to show based on user role
  let navLinks;
  if (user.role === 'brand') {
    navLinks = brandLinks;
  } else if (user.role === 'influencer') {
    navLinks = influencerLinks;
  } else if (user.role === 'admin') {
    navLinks = adminLinks;
  } else {
    navLinks = [];
  }

  // Common links for all users
  const commonLinks = [
    { to: '/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
  ];

  return (
    <aside 
      className={`sidebar-modern h-screen flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="ml-3 font-bold text-xl">
              Influ<span className="text-gradient">Match</span>
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto">
            <Sparkles className="text-white" size={20} />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
              }
            >
              <span className="flex items-center justify-center">{link.icon}</span>
              {!collapsed && <span className="ml-3 font-medium">{link.label}</span>}
            </NavLink>
          ))}
          
          {commonLinks.length > 0 && (
            <>
              <div className={`my-6 border-t border-gray-200 ${collapsed ? 'mx-2' : ''}`}></div>
              {commonLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <span className="flex items-center justify-center">{link.icon}</span>
                  {!collapsed && <span className="ml-3 font-medium">{link.label}</span>}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
      
      {/* User Profile & Logout */}
      <div className={`p-4 border-t border-gray-100 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="avatar-story">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UserCircle size={24} className="text-gray-600" />
                )}
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={logout}
          className={`flex items-center text-gray-700 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50 ${
            collapsed ? 'justify-center w-full' : 'w-full'
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;