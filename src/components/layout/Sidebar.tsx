import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, Users, 
  Search, PlusCircle, FileText,
  LogOut, ChevronLeft, ChevronRight,
  UserCircle, Briefcase, Sparkles, MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const brandLinks = [
    { to: '/brand/dashboard', icon: <Home size={20} />, label: 'Dashboard', gradient: 'from-blue-500 to-purple-600' },
    { to: '/brand/create-campaign', icon: <PlusCircle size={20} />, label: 'Create Campaign', gradient: 'from-green-500 to-teal-600' },
    { to: '/brand/campaigns', icon: <Briefcase size={20} />, label: 'My Campaigns', gradient: 'from-purple-500 to-pink-600' },
    { to: '/brand/find-influencers', icon: <Search size={20} />, label: 'Find Influencers', gradient: 'from-orange-500 to-red-600' },
  ];

  const influencerLinks = [
    { to: '/influencer/dashboard', icon: <Home size={20} />, label: 'Dashboard', gradient: 'from-blue-500 to-purple-600' },
    { to: '/influencer/requests', icon: <FileText size={20} />, label: 'Campaign Requests', gradient: 'from-yellow-500 to-orange-600' },
    { to: '/influencer/profile', icon: <UserCircle size={20} />, label: 'My Profile', gradient: 'from-pink-500 to-rose-600' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: <Home size={20} />, label: 'Dashboard', gradient: 'from-blue-500 to-purple-600' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'User Management', gradient: 'from-green-500 to-emerald-600' },
    { to: '/admin/campaigns', icon: <Briefcase size={20} />, label: 'Campaign Moderation', gradient: 'from-red-500 to-pink-600' },
  ];

  // Determine which links to show based on user role
  let navLinks: { to: string; icon: JSX.Element; label: string; gradient: string }[];
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
    { to: '/messages', icon: <MessageSquare size={20} />, label: 'Messages', gradient: 'from-indigo-500 to-blue-600' },
  ];

  return (
    <aside 
      className={`sidebar-modern h-screen flex flex-col transition-all duration-500 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Enhanced Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100/50">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <div className="ml-4">
              <span className="font-bold text-2xl">
                Influ<span className="text-gradient">Match</span>
              </span>
              <p className="text-xs text-gray-500 font-medium">Connect & Create</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="text-white" size={24} />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 rounded-2xl hover:bg-gray-100/80 text-gray-500 transition-all duration-300 hover:scale-105"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Enhanced Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-4">
        <nav className="space-y-3">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-item group ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-4' : ''}`
              }
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-2 rounded-xl bg-gradient-to-r ${link.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>
              {!collapsed && (
                <span className="ml-4 font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {link.label}
                </span>
              )}
            </NavLink>
          ))}
          
          {commonLinks.length > 0 && (
            <>
              <div className={`my-8 border-t border-gray-200/50 ${collapsed ? 'mx-2' : ''}`}></div>
              {commonLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-item group ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-4' : ''}`
                  }
                  style={{ animationDelay: `${(navLinks.length + index) * 0.1}s` }}
                >
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${link.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  {!collapsed && (
                    <span className="ml-4 font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      {link.label}
                    </span>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
      
      {/* Enhanced User Profile & Logout */}
      <div className={`p-6 border-t border-gray-100/50 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/50">
            <div className="avatar-story">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UserCircle size={28} className="text-gray-600" />
                )}
              </div>
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize font-medium">{user.role}</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={logout}
          className={`flex items-center text-gray-700 hover:text-red-600 transition-all duration-300 p-3 rounded-2xl hover:bg-red-50 group ${
            collapsed ? 'justify-center w-full' : 'w-full'
          }`}
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            <LogOut size={18} />
          </div>
          {!collapsed && <span className="ml-4 font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;