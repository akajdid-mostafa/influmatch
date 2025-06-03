import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
import { PlusCircle, TrendingUp, Users, DollarSign, BarChart2 } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { BrandStats, Campaign, InfluencerProfile } from '../../types';

const BrandDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<BrandStats | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [recommendedInfluencers, setRecommendedInfluencers] = useState<InfluencerProfile[]>([]);

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Mock data for demo purposes
        const mockStats: BrandStats = {
          campaignsLaunched: 8,
          influencersCollaborated: 15,
          totalSpent: 12500,
          averageEngagement: 3.2,
          roi: 2.4,
          reach: 350000,
          conversionRate: 1.8
        };
        
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
            title: 'Product Review Campaign',
            description: 'Honest reviews of our new tech gadget',
            brand: { id: 1, name: 'Acme Brand', email: 'brand@example.com', role: 'brand' },
            budget: { min: 300, max: 800, currency: 'USD' },
            requirements: {
              niches: ['tech', 'gadgets'],
              minFollowers: 5000,
              platforms: ['youtube', 'instagram']
            },
            timeline: {
              startDate: '2025-05-20',
              endDate: '2025-06-15',
            },
            status: 'in-progress',
            createdAt: '2025-05-10T14:15:00Z',
            updatedAt: '2025-05-10T14:15:00Z'
          }
        ];
        
        const mockInfluencers: InfluencerProfile[] = [
          {
            id: 101,
            name: 'Sofia Rodriguez',
            email: 'sofia@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Fashion and lifestyle content creator',
            niche: ['fashion', 'lifestyle'],
            location: 'Miami, FL',
            followers: {
              instagram: 45000,
              tiktok: 60000
            },
            engagementRate: 3.8,
            averageRating: 4.7
          },
          {
            id: 102,
            name: 'Alex Chen',
            email: 'alex@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Tech reviewer and gadget enthusiast',
            niche: ['tech', 'gadgets'],
            location: 'San Francisco, CA',
            followers: {
              youtube: 120000,
              instagram: 35000
            },
            engagementRate: 4.2,
            averageRating: 4.8
          },
          {
            id: 103,
            name: 'Emma Johnson',
            email: 'emma@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Lifestyle and beauty content creator',
            niche: ['beauty', 'lifestyle'],
            location: 'New York, NY',
            followers: {
              instagram: 85000,
              tiktok: 110000
            },
            engagementRate: 3.5,
            averageRating: 4.6
          }
        ];
        
        setStats(mockStats);
        setActiveCampaigns(mockCampaigns);
        setRecommendedInfluencers(mockInfluencers);
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
        <h1 className="text-2xl font-bold text-gray-900">Brand Dashboard</h1>
        <Link
          to="/brand/create-campaign"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Link>
      </div>
      
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart2 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Campaigns Launched
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.campaignsLaunched}</div>
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
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Collaborations
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.influencersCollaborated}</div>
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
                      Total Spent
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">${stats.totalSpent.toLocaleString()}</div>
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
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      ROI Multiplier
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.roi}x</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Campaigns */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Active Campaigns
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your current running campaigns
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {activeCampaigns.length === 0 ? (
            <li className="px-4 py-6 sm:px-6">
              <p className="text-center text-gray-500">
                No active campaigns. <Link to="/brand/create-campaign" className="text-purple-600 hover:text-purple-800">Create one now</Link>
              </p>
            </li>
          ) : (
            activeCampaigns.map((campaign) => (
              <li key={campaign.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-purple-600">{campaign.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>
                    <div className="mt-2 sm:flex sm:justify-start">
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {campaign.status === 'open' ? 'Open' : 'In Progress'}
                        </span>
                        <span className="ml-2">
                          Budget: ${campaign.budget.min} - ${campaign.budget.max}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/brand/campaigns#${campaign.id}`}
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
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            to="/brand/campaigns"
            className="text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            View all campaigns
          </Link>
        </div>
      </div>
      
      {/* Recommended Influencers */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recommended Influencers
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Influencers that match your brand's niche and audience
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {recommendedInfluencers.map((influencer) => (
            <li key={influencer.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12">
                  {influencer.profileImage ? (
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={influencer.profileImage}
                      alt={influencer.name}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-purple-600">{influencer.name}</div>
                  <div className="text-sm text-gray-500">{influencer.bio}</div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span className="truncate">
                      {influencer.followers?.instagram && `${(influencer.followers.instagram / 1000).toFixed(1)}K followers`}
                    </span>
                    <span className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {influencer.engagementRate}% engagement
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 border border-purple-600 text-sm leading-4 font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            to="/brand/find-influencers"
            className="text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            Find more influencers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;