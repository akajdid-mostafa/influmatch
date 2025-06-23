import { useState, useEffect } from 'react';
import { 
  Users, Briefcase, MessageSquare, DollarSign, 
  TrendingUp, ArrowUp, ArrowDown, User, ShoppingBag,
  Sparkles, Zap, Star, Award, Activity, BarChart3
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { SystemStats } from '../../types';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Mock data for demo purposes
        const mockStats: SystemStats = {
          users: {
            total: 843,
            brands: 256,
            influencers: 582,
            admins: 5,
            newToday: 12,
            growth: 5.4
          },
          campaigns: {
            total: 189,
            active: 73,
            completed: 116,
            totalValue: 540000
          },
          messages: {
            total: 7642,
            today: 368
          },
          earnings: {
            total: 48500,
            thisMonth: 8200,
            growth: 12.3
          }
        };
        
        const mockRecentUsers = [
          { id: 1, name: 'Emma Thompson', email: 'emma@example.com', role: 'influencer', date: '2025-05-15T10:30:00Z' },
          { id: 2, name: 'TechGadgets Inc.', email: 'contact@techgadgets.example', role: 'brand', date: '2025-05-15T09:15:00Z' },
          { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'influencer', date: '2025-05-14T16:45:00Z' },
          { id: 4, name: 'Eco Friendly Co.', email: 'info@ecofriendly.example', role: 'brand', date: '2025-05-14T14:20:00Z' },
        ];
        
        const mockRecentCampaigns = [
          { id: 1, title: 'Summer Fashion Collection', brand: 'StyleHub', date: '2025-05-15T08:30:00Z', status: 'pending-approval' },
          { id: 2, title: 'Eco-Friendly Product Launch', brand: 'Green Earth', date: '2025-05-14T16:00:00Z', status: 'open' },
          { id: 3, title: 'New Smartphone Review', brand: 'TechWorld', date: '2025-05-14T11:30:00Z', status: 'pending-approval' },
          { id: 4, title: 'Fitness App Promotion', brand: 'FitLife', date: '2025-05-13T15:45:00Z', status: 'open' },
        ];
        
        setStats(mockStats);
        setRecentUsers(mockRecentUsers);
        setRecentCampaigns(mockRecentCampaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-10 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mr-6 float-animation">
              <Sparkles className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Admin <span className="text-gradient">Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Monitor platform performance and manage users</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">All systems operational</span>
            </div>
            <div className="text-gray-400">•</div>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Users
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.users.total}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">{stats.users.growth}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100/50">
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-purple-600">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  <span className="font-semibold">Brands: {stats.users.brands}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <Star className="h-4 w-4 mr-1" />
                  <span className="font-semibold">Influencers: {stats.users.influencers}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Campaigns
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.campaigns.total}</div>
                    <div className="ml-3 flex items-center text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      <Activity className="h-4 w-4" />
                      <span className="font-semibold">{stats.campaigns.active} active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100/50">
              <div className="flex justify-between text-sm">
                <div className="flex items-center text-green-600">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="font-semibold">Completed: {stats.campaigns.completed}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-semibold">${(stats.campaigns.totalValue / 1000).toFixed(0)}K value</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Messages
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.messages.total.toLocaleString()}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <Zap className="h-4 w-4" />
                      <span className="font-semibold">+{stats.messages.today}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100/50">
              <div className="text-sm text-gray-600 text-center">
                <span className="font-semibold">{stats.messages.today} new messages today</span>
              </div>
            </div>
          </div>
          
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Platform Earnings
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">${stats.earnings.total.toLocaleString()}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">{stats.earnings.growth}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100/50">
              <div className="text-sm text-gray-600 text-center">
                <span className="font-semibold">This month: ${stats.earnings.thisMonth.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Enhanced Recent Users */}
        <div className="card-modern">
          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Users
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    New users that have joined the platform
                  </p>
                </div>
              </div>
              <button className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50">
                View all →
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100/50">
            {recentUsers.map((user, index) => (
              <div key={user.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center">
                  <div className="avatar-story">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                      {user.role === 'brand' ? (
                        <ShoppingBag className="h-8 w-8 text-purple-600" />
                      ) : (
                        <User className="h-8 w-8 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{user.name}</h4>
                      <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                        user.role === 'brand' 
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                          : user.role === 'influencer'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{user.email}</p>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      Joined {formatDate(user.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Campaigns Needing Approval */}
        <div className="card-modern">
          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg mr-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Recent Campaigns
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Campaigns that need review or were recently created
                  </p>
                </div>
              </div>
              <button className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50">
                View all →
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100/50">
            {recentCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold text-gradient group-hover:scale-105 transition-transform duration-300">{campaign.title}</h4>
                      <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                        campaign.status === 'pending-approval' 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white animate-pulse'
                          : campaign.status === 'open'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                      }`}>
                        {campaign.status === 'pending-approval' ? '⏳ Needs Review' : '✅ Approved'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">by <span className="font-semibold text-gradient">{campaign.brand}</span></p>
                    <p className="text-sm text-gray-500 font-medium">
                      Created {formatDate(campaign.date)}
                    </p>
                  </div>
                  <div className="ml-6">
                    <button className="btn-primary text-sm px-6 py-3 group-hover:scale-105 transition-transform duration-300">
                      {campaign.status === 'pending-approval' ? '🔍 Review' : '👁️ View'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;