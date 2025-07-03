import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Filter, Search, Edit, Trash2, CheckCircle, XCircle, AlertCircle, Sparkles, Target, BarChart3 } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Campaign } from '../../types';

const ManageCampaigns = () => {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call to fetch campaigns
    const fetchCampaigns = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demo purposes
        const mockCampaigns: Campaign[] = [
          {
            id: '1',
            title: 'Summer Collection Launch',
            description: 'Promote our new summer collection with creative posts',
            brand: { id: 1, name: 'Samsung Brand', email: 'brand@example.com', role: 'brand' },
            budget: { min: 500, max: 1500, currency: 'USD' },
            requirements: {
              niches: ['fashion', 'lifestyle'],
              minFollowers: 10000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-06-01',
              endDate: '2025-06-30',
            },
            status: 'open',
            createdAt: '2025-05-15T10:30:00Z',
            updatedAt: '2025-05-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Tech Product Review',
            description: 'Looking for tech influencers to review our new gadget',
            brand: { id: 1, name: 'SAmsung Brand', email: 'brand@example.com', role: 'brand' },
            budget: { min: 800, max: 2000, currency: 'USD' },
            requirements: {
              niches: ['tech', 'gadgets'],
              minFollowers: 20000,
              platforms: ['youtube']
            },
            timeline: {
              startDate: '2025-07-01',
              endDate: '2025-07-31',
            },
            status: 'in-progress',
            createdAt: '2025-05-10T15:20:00Z',
            updatedAt: '2025-05-10T15:20:00Z'
          },
          {
            id: '3',
            title: 'Fitness App Promotion',
            description: 'Showcase our fitness app features through workout videos',
            brand: { id: 1, name: 'Samsung Brand', email: 'brand@example.com', role: 'brand' },
            budget: { min: 300, max: 1000, currency: 'USD' },
            requirements: {
              niches: ['fitness', 'health'],
              minFollowers: 5000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-05-01',
              endDate: '2025-05-31',
            },
            status: 'completed',
            createdAt: '2025-04-15T09:45:00Z',
            updatedAt: '2025-05-31T16:00:00Z'
          }
        ];
        
        setCampaigns(mockCampaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'in-progress':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mr-6 float-animation">
              <Target className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Manage <span className="text-gradient">Campaigns</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Track and manage all your marketing campaigns</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => window.location.href = '/brand/create-campaign'}
          className="btn-gradient"
        >
          <Sparkles className="mr-3 h-6 w-6" />
          Create Campaign
        </button>
      </div>

      {/* Enhanced Filters */}
      <div className="card-modern p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="search-modern">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-4 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-transparent backdrop-blur-10px transition-all duration-300"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter className="h-6 w-6 text-gray-400" />
            </div>
            <select
              className="w-full pl-14 pr-4 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-transparent backdrop-blur-10px transition-all duration-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Campaigns List */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mr-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Your Campaigns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100/50">
          {filteredCampaigns.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-500 text-lg">
                No campaigns found matching your criteria.
              </p>
            </div>
          ) : (
            filteredCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-3">
                      <h3 className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">{campaign.title}</h3>
                      <div className="ml-4">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="ml-2">
                            {campaign.status === 'in-progress' ? '⚡ In Progress' : 
                             campaign.status === 'open' ? '🚀 Open' :
                             campaign.status === 'completed' ? '✅ Completed' : 
                             campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">{campaign.description}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center text-green-600">
                        <span className="font-bold text-lg">Budget: ${campaign.budget.min} - ${campaign.budget.max}</span>
                      </div>
                      <div className="flex items-center text-purple-600">
                        <span className="font-semibold">Platforms: {campaign.requirements.platforms.join(', ')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold">
                          Timeline: {new Date(campaign.timeline.startDate).toLocaleDateString()} - {new Date(campaign.timeline.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      {campaign.requirements.niches.map((niche) => (
                        <span
                          key={niche}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                        >
                          #{niche}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3 ml-8">
                    <button
                      className="p-3 rounded-2xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group-hover:scale-110"
                      onClick={() => {/* Handle edit */}}
                    >
                      <Edit className="h-6 w-6" />
                    </button>
                    <button
                      className="p-3 rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group-hover:scale-110"
                      onClick={() => {/* Handle delete */}}
                    >
                      <Trash2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCampaigns;