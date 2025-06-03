import { useState, useEffect } from 'react';
import { 
  Users, Briefcase, MessageSquare, DollarSign, 
  TrendingUp, ArrowUp, User, ShoppingBag 
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      {/* Stats Overview */}
      {stats && (
        <>
          {/* First Row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.users.total}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Increased by</span>
                          {stats.users.growth}%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Brands: {stats.users.brands}</span>
                    <span>Influencers: {stats.users.influencers}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-teal-100 rounded-md p-3">
                    <Briefcase className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Campaigns
                      </dt>
                      <dd>
                        <div className="text-2xl font-semibold text-gray-900">{stats.campaigns.total}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Active: {stats.campaigns.active}</span>
                    <span>Completed: {stats.campaigns.completed}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-100 rounded-md p-3">
                    <MessageSquare className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Messages
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.messages.total}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span className="sr-only">New today</span>
                          +{stats.messages.today}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="text-gray-500">
                    <span>{stats.messages.today} new messages today</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Platform Earnings
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">${stats.earnings.total.toLocaleString()}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Increased by</span>
                          {stats.earnings.growth}%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="text-gray-500">
                    <span>This month: ${stats.earnings.thisMonth.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Users
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              New users that have joined the platform
            </p>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {user.role === 'brand' ? (
                            <ShoppingBag className="h-5 w-5 text-gray-500" />
                          ) : (
                            <User className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'brand' 
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'influencer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Campaigns Needing Approval */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Campaigns
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Campaigns that need review or were recently created
            </p>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                          <div className="text-sm text-gray-500">by {campaign.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'pending-approval' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : campaign.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status === 'pending-approval' ? 'Needs Approval' : 'Open'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(campaign.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900">
                        {campaign.status === 'pending-approval' ? 'Review' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;