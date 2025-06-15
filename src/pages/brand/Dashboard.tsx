import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PlusCircle, TrendingUp, Users, DollarSign, BarChart2, Star, ArrowUp } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { BrandStats, Campaign, InfluencerProfile } from '../../types';

const BrandDashboard = () => {
  const { user } = useAuth();
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
    <div className="space-y-8 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Manage your campaigns and discover new influencers</p>
        </div>
        <Link
          to="/brand/create-campaign"
          className="btn-gradient inline-flex items-center"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          New Campaign
        </Link>
      </div>
      
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Campaigns Launched
                  </dt>
                  <dd className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.campaignsLaunched}</div>
                    <div className="ml-2 flex items-center text-sm text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span>12%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Collaborations
                  </dt>
                  <dd className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.influencersCollaborated}</div>
                    <div className="ml-2 flex items-center text-sm text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span>8%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Spent
                  </dt>
                  <dd className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</div>
                    <div className="ml-2 flex items-center text-sm text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span>15%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    ROI Multiplier
                  </dt>
                  <dd className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.roi}x</div>
                    <div className="ml-2 flex items-center text-sm text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span>5%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Campaigns */}
      <div className="card-modern">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Active Campaigns
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your current running campaigns
              </p>
            </div>
            <Link
              to="/brand/campaigns"
              className="text-sm font-medium text-gradient hover:opacity-80"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {activeCampaigns.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">
                No active campaigns. <Link to="/brand/create-campaign" className="text-gradient hover:opacity-80">Create one now</Link>
              </p>
            </div>
          ) : (
            activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gradient">{campaign.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        campaign.status === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {campaign.status === 'open' ? 'Open for Applications' : 'In Progress'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Budget: ${campaign.budget.min} - ${campaign.budget.max}
                      </span>
                      <span className="text-sm text-gray-500">
                        {campaign.requirements.platforms.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/brand/campaigns#${campaign.id}`}
                      className="btn-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Recommended Influencers */}
      <div className="card-modern">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recommended Influencers
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Influencers that match your brand's niche and audience
              </p>
            </div>
            <Link
              to="/brand/find-influencers"
              className="text-sm font-medium text-gradient hover:opacity-80"
            >
              Discover more
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedInfluencers.map((influencer) => (
              <div key={influencer.id} className="card-modern p-6">
                <div className="flex items-center">
                  <div className="avatar-story">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      {influencer.profileImage ? (
                        <img
                          className="w-full h-full object-cover"
                          src={influencer.profileImage}
                          alt={influencer.name}
                        />
                      ) : (
                        <Users className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{influencer.name}</h4>
                    <p className="text-sm text-gray-600">{influencer.bio}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {Object.values(influencer.followers || {}).reduce((a, b) => a + b, 0).toLocaleString()} followers
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{influencer.averageRating}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {influencer.niche?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="btn-primary text-sm px-4 py-2">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;