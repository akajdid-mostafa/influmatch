import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Campaign } from '../../types';

const CampaignModeration = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending-approval');

  useEffect(() => {
    // Simulate API call to fetch campaigns
    const fetchCampaigns = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demo purposes
        const mockCampaigns: Campaign[] = [
          {
            id: '1',
            title: 'Summer Fashion Collection Launch',
            description: 'Looking for fashion influencers to promote our new sustainable summer collection',
            brand: {
              id: 1,
              name: 'Eco Fashion Co',
              email: 'brand@example.com',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 500,
              max: 1500,
              currency: 'USD'
            },
            requirements: {
              niches: ['fashion', 'sustainability'],
              minFollowers: 10000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-06-01',
              endDate: '2025-06-30'
            },
            status: 'pending-approval',
            createdAt: '2025-05-15T10:30:00Z',
            updatedAt: '2025-05-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Tech Product Review Campaign',
            description: 'Seeking tech reviewers for our new smart home device',
            brand: {
              id: 2,
              name: 'TechCo',
              email: 'tech@example.com',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 1000,
              max: 3000,
              currency: 'USD'
            },
            requirements: {
              niches: ['tech', 'gadgets'],
              minFollowers: 50000,
              platforms: ['youtube']
            },
            timeline: {
              startDate: '2025-07-01',
              endDate: '2025-07-31'
            },
            status: 'pending-approval',
            createdAt: '2025-05-14T15:45:00Z',
            updatedAt: '2025-05-14T15:45:00Z'
          },
          {
            id: '3',
            title: 'Fitness App Promotion',
            description: 'Looking for fitness influencers to showcase our workout tracking app',
            brand: {
              id: 3,
              name: 'FitTech',
              email: 'fit@example.com',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 300,
              max: 1000,
              currency: 'USD'
            },
            requirements: {
              niches: ['fitness', 'health'],
              minFollowers: 5000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-06-15',
              endDate: '2025-07-15'
            },
            status: 'open',
            createdAt: '2025-05-13T09:20:00Z',
            updatedAt: '2025-05-13T09:20:00Z'
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
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending-approval':
        return <AlertCircle className="h-4 w-4" />;
      case 'open':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleApprove = async (campaignId: string) => {
    try {
      // Simulate API call to approve campaign
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === campaignId
            ? { ...campaign, status: 'open' }
            : campaign
        )
      );
    } catch (error) {
      console.error('Error approving campaign:', error);
    }
  };

  const handleReject = async (campaignId: string) => {
    try {
      // Simulate API call to reject campaign
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === campaignId
            ? { ...campaign, status: 'rejected' }
            : campaign
        )
      );
    } catch (error) {
      console.error('Error rejecting campaign:', error);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.name.toLowerCase().includes(searchTerm.toLowerCase());
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
        <h1 className="text-2xl font-bold text-gray-900">Campaign Moderation</h1>
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
                <option value="pending-approval">Pending Approval</option>
                <option value="open">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredCampaigns.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500">
              No campaigns found matching your criteria.
            </li>
          ) : (
            filteredCampaigns.map((campaign) => (
              <li key={campaign.id} className="px-4 py-6 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    {campaign.brand.logo && (
                      <div className="flex-shrink-0">
                        <img
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-purple-600">{campaign.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{campaign.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-4">
                        <div className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">
                            {campaign.status === 'pending-approval'
                              ? 'Pending Approval'
                              : campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Brand: {campaign.brand.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          Budget: ${campaign.budget.min} - ${campaign.budget.max}
                        </span>
                        <span className="text-sm text-gray-500">
                          Platforms: {campaign.requirements.platforms.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-purple-600"
                      title="View Details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-purple-600"
                      title="Message Brand"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    {campaign.status === 'pending-approval' && (
                      <>
                        <button
                          onClick={() => handleApprove(campaign.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(campaign.id)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </>
                    )}
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

export default CampaignModeration;