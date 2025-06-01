import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Star, TrendingUp, DollarSign, Activity, Users, CheckCircle, XCircle } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { InfluencerStats, Campaign, CampaignApplication } from '../../types';

const InfluencerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<InfluencerStats | null>(null);
  const [pendingRequests, setPendingRequests] = useState<CampaignApplication[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Mock data for demo purposes
        const mockStats: InfluencerStats = {
          profileViews: 342,
          campaignsCompleted: 12,
          averageRating: 4.8,
          totalEarnings: 8500,
          engagementRate: 3.7,
          growth: {
            followers: 12.5,
            engagement: 0.8,
            earnings: 15.3
          },
          conversionRate: 2.4
        };
        
        const mockPendingRequests: CampaignApplication[] = [
          {
            id: '101',
            campaign: {
              id: '1',
              title: 'Summer Collection Launch'
            },
            influencer: {
              id: 2,
              name: 'Jane Influencer',
              email: 'influencer@example.com',
              role: 'influencer'
            },
            proposal: 'I would love to promote your summer collection with a series of 3 posts showcasing different outfits.',
            rate: 500,
            status: 'pending',
            submittedAt: '2025-05-14T09:30:00Z'
          },
          {
            id: '102',
            campaign: {
              id: '2',
              title: 'Fitness App Promotion'
            },
            influencer: {
              id: 2,
              name: 'Jane Influencer',
              email: 'influencer@example.com',
              role: 'influencer'
            },
            proposal: 'I can create a video showing my workout routine using your app and highlighting its key features.',
            rate: 350,
            status: 'pending',
            submittedAt: '2025-05-13T14:45:00Z'
          }
        ];
        
        const mockActiveCampaigns: Campaign[] = [
          {
            id: '3',
            title: 'Organic Skincare Review',
            description: 'Create authentic content showcasing our natural skincare line',
            brand: { 
              id: 3, 
              name: 'Pure Organics', 
              email: 'contact@pureorganics.example',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: { min: 400, max: 800, currency: 'USD' },
            requirements: {
              niches: ['beauty', 'skincare'],
              minFollowers: 8000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-05-10',
              endDate: '2025-05-30',
              submissionDeadline: '2025-05-25'
            },
            status: 'in-progress',
            createdAt: '2025-05-05T10:00:00Z',
            updatedAt: '2025-05-05T10:00:00Z'
          }
        ];
        
        setStats(mockStats);
        setPendingRequests(mockPendingRequests);
        setActiveCampaigns(mockActiveCampaigns);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Influencer Dashboard</h1>
        <Link
          to="/influencer/profile"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          View Public Profile
        </Link>
      </div>
      
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Profile Views
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.profileViews}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Rating
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.averageRating} / 5</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Earnings
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">${stats.totalEarnings.toLocaleString()}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Engagement Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.engagementRate}%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Growth Metrics */}
      {stats && stats.growth && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Growth Metrics
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your performance compared to last month
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Followers Growth
                  </dt>
                  <dd className="ml-auto flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.growth.followers}%
                  </dd>
                </div>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${Math.min(stats.growth.followers * 5, 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Engagement Growth
                  </dt>
                  <dd className="ml-auto flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.growth.engagement}%
                  </dd>
                </div>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${Math.min(stats.growth.engagement * 10, 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Earnings Growth
                  </dt>
                  <dd className="ml-auto flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.growth.earnings}%
                  </dd>
                </div>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${Math.min(stats.growth.earnings * 4, 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Campaign Requests */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Pending Campaign Requests
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Review and respond to brand collaborations
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {pendingRequests.length === 0 ? (
            <li className="px-4 py-6 sm:px-6">
              <p className="text-center text-gray-500">
                No pending requests at the moment.
              </p>
            </li>
          ) : (
            pendingRequests.map((request) => (
              <li key={request.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-purple-600">{request.campaign.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 truncate max-w-md">{request.proposal}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Proposed Rate: <span className="font-medium">${request.rate}</span>
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Accept
                    </button>
                    <button 
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Decline
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            to="/influencer/requests"
            className="text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            View all requests
          </Link>
        </div>
      </div>
      
      {/* Active Campaigns */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Active Campaigns
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your current ongoing collaborations
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {activeCampaigns.length === 0 ? (
            <li className="px-4 py-6 sm:px-6">
              <p className="text-center text-gray-500">
                No active campaigns at the moment.
              </p>
            </li>
          ) : (
            activeCampaigns.map((campaign) => (
              <li key={campaign.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    {campaign.brand.logo && (
                      <div className="flex-shrink-0 h-10 w-10 mr-4">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-md font-medium text-purple-600">{campaign.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                      <div className="mt-2 sm:flex sm:justify-start">
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Deadline: {new Date(campaign.timeline.submissionDeadline || '').toLocaleDateString()}
                          </span>
                          <span className="ml-2">
                            Brand: {campaign.brand.name}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/influencer/requests#${campaign.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      View Details
                    </Link>
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

export default InfluencerDashboard;