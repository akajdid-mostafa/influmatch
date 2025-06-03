import { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
import { Filter, Search, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Campaign } from '../../types';

const ManageCampaigns = () => {
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
            brand: { id: 1, name: 'Acme Brand', email: 'brand@example.com', role: 'brand' },
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
            brand: { id: 1, name: 'Acme Brand', email: 'brand@example.com', role: 'brand' },
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
            brand: { id: 1, name: 'Acme Brand', email: 'brand@example.com', role: 'brand' },
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
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Campaigns</h1>
        <button
          onClick={() => window.location.href = '/brand/create-campaign'}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Create Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="sr-only">Search campaigns</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="sr-only">Filter by status</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="status"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
      </div>

      {/* Campaigns List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredCampaigns.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500">
              No campaigns found matching your criteria.
            </li>
          ) : (
            filteredCampaigns.map((campaign) => (
              <li key={campaign.id} className="px-4 py-6 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-purple-600 truncate">{campaign.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{campaign.description}</p>
                    <div className="mt-2 sm:flex sm:justify-start">
                      <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        <span className="flex items-center">
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</span>
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4">
                        <span className="text-sm text-gray-500">
                          Budget: ${campaign.budget.min} - ${campaign.budget.max}
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4">
                        <span className="text-sm text-gray-500">
                          Timeline: {new Date(campaign.timeline.startDate).toLocaleDateString()} - {new Date(campaign.timeline.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-purple-600"
                      onClick={() => {/* Handle edit */}}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600"
                      onClick={() => {/* Handle delete */}}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageCampaigns;