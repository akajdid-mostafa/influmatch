import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, Users, MessageSquare, 
  Search, PlusCircle, FileText,
  LogOut, ChevronLeft, ChevronRight,
  UserCircle, ShoppingBag, Briefcase
} from 'lucide-react';

type NavLinkItem = {
  to: string;
  icon: JSX.Element;
  label: string;
};

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
  let navLinks: NavLinkItem[];
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
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center">
            <ShoppingBag className="text-purple-600" size={24} />
            <span className="ml-2 font-bold text-xl">Influ<span className="text-purple-600">Match</span></span>
          </div>
        )}
        {collapsed && <ShoppingBag className="text-purple-600 mx-auto" size={24} />}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <span className="flex items-center justify-center">{link.icon}</span>
              {!collapsed && <span className="ml-3">{link.label}</span>}
            </NavLink>
          ))}
          
          {commonLinks.length > 0 && (
            <>
              <div className={`my-4 border-t border-gray-200 ${collapsed ? 'mx-2' : ''}`}></div>
              {commonLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <span className="flex items-center justify-center">{link.icon}</span>
                  {!collapsed && <span className="ml-3">{link.label}</span>}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
      
      <div className={`p-4 border-t border-gray-200 ${collapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={logout}
          className={`flex items-center text-gray-700 hover:text-purple-600 transition-colors ${
            collapsed ? 'justify-center w-full' : ''
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;