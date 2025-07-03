import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, CheckCircle, XCircle, MessageSquare, Target, Award } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { CampaignApplication } from '../../types';

const CampaignRequests = () => {
  useAuth();
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
              name: 'Ezzoubair Hilal',
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
              name: 'Ezzoubair Hilal',
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
              name: 'Ezzoubair Hilal',
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
        return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white';
      case 'accepted':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      case 'withdrawn':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
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
                Campaign <span className="text-gradient">Requests</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Review and respond to brand collaboration offers</p>
            </div>
          </div>
        </div>
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
              placeholder="Search requests..."
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
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Requests List */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mr-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Your Requests
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100/50">
          {filteredRequests.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-500 text-lg">
                No requests found matching your criteria.
              </p>
            </div>
          ) : (
            filteredRequests.map((request, index) => (
              <div key={request.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-3">
                      <h3 className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">{request.campaign.title}</h3>
                      <div className="ml-4">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${getStatusColor(request.status)}`}>
                          {request.status === 'pending' ? '⏳ Pending' :
                           request.status === 'accepted' ? '✅ Accepted' :
                           request.status === 'rejected' ? '❌ Rejected' :
                           request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg leading-relaxed">{request.proposal}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center text-green-600">
                        <span className="font-bold text-lg">Proposed Rate: ${request.rate}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold">
                          Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3 ml-8">
                    {request.status === 'pending' && (
                      <>
                        <button className="btn-primary group-hover:scale-105 transition-transform duration-300">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Accept
                        </button>
                        <button className="btn-secondary group-hover:scale-105 transition-transform duration-300">
                          <XCircle className="h-5 w-5 mr-2" />
                          Decline
                        </button>
                      </>
                    )}
                    <button className="p-3 rounded-2xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group-hover:scale-110">
                      <MessageSquare className="h-6 w-6" />
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

export default CampaignRequests;