import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { CampaignApplication } from '../../types';

const CampaignRequests = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<CampaignApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call to fetch campaign requests
    const fetchRequests = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demo purposes
        const mockRequests: CampaignApplication[] = [
          {
            id: '1',
            campaign: {
              id: '101',
              title: 'Summer Fashion Collection'
            },
            influencer: {
              id: 2,
              name: 'Jane Influencer',
              email: 'influencer@example.com',
              role: 'influencer'
            },
            proposal: 'I would love to create a series of Instagram posts and stories showcasing your summer collection. My audience is particularly interested in sustainable fashion.',
            rate: 800,
            status: 'pending',
            submittedAt: '2025-05-15T10:30:00Z'
          },
          {
            id: '2',
            campaign: {
              id: '102',
              title: 'Fitness App Promotion'
            },
            influencer: {
              id: 2,
              name: 'Jane Influencer',
              email: 'influencer@example.com',
              role: 'influencer'
            },
            proposal: 'I can create a comprehensive review of your fitness app, including a workout demonstration video.',
            rate: 500,
            status: 'accepted',
            submittedAt: '2025-05-10T15:45:00Z'
          },
          {
            id: '3',
            campaign: {
              id: '103',
              title: 'Eco-Friendly Product Launch'
            },
            influencer: {
              id: 2,
              name: 'Jane Influencer',
              email: 'influencer@example.com',
              role: 'influencer'
            },
            proposal: 'I would like to create content highlighting the environmental benefits of your products.',
            rate: 600,
            status: 'rejected',
            submittedAt: '2025-05-05T09:20:00Z'
          }
        ];
        
        setRequests(mockRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.proposal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
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
        <h1 className="text-2xl font-bold text-gray-900">Campaign Requests</h1>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="sr-only">Search requests</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Search requests..."
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
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredRequests.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500">
              No requests found matching your criteria.
            </li>
          ) : (
            filteredRequests.map((request) => (
              <li key={request.id} className="px-4 py-6 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-purple-600">{request.campaign.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{request.proposal}</p>
                    <div className="mt-2 sm:flex sm:justify-start">
                      <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4">
                        <span className="text-sm text-gray-500">
                          Proposed Rate: ${request.rate}
                        </span>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4">
                        <span className="text-sm text-gray-500">
                          Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {request.status === 'pending' && (
                      <>
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </button>
                        <button
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </button>
                      </>
                    )}
                    <button
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
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

export default CampaignRequests;