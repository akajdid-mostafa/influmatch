import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PlusCircle, TrendingUp, Users, DollarSign, BarChart2, Star, ArrowUp, Zap, Target, Award } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { LineChart, BarChart, DonutChart } from '../../components/ui/Chart';
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
            brand: { id: 1, name: 'Samsung', email: 'brand@example.com', role: 'brand' },
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
            brand: { id: 1, name: 'Samsung Brand', email: 'brand@example.com', role: 'brand' },
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
            id: 101, // Unique ID (adjust as needed)
            name: 'Ezzoubair Hilal',
            email: 'contact.ezzoubairhilal@example.com', // Placeholder (no public email)
            role: 'influencer',
            profileImage: 'https://i.ibb.co/ds9tQGj8/34982531-1765409630209343-1025505230982217728-n.jpg', // Direct IG image URL
            bio: 'Moroccan actor and digital content creator. Officiel account 🎬',
            niche: ['acting', 'comedy', 'drama'],
            location: 'Morocco',
            followers: {
              instagram: 1100000, // 1.1M followers (numeric format)
              youtube: 213,    // Add if applicable
            
            },
            engagementRate: 5.2,
            averageRating: 4.9
          },
          {
            id: 102,
            name: 'Saber Chawni',
            email: 'contact.saberchawni@example.com', // Placeholder (no public email found)
            role: 'influencer',
            profileImage: 'https://i.ibb.co/Q7bJFGR2/470901101-1784413859038738-4680390675010867916-n.jpg', // Replace with actual IG profile pic URL
            bio: 'Moroccan actor | Official Instagram account',
            niche: ['acting', 'comedy', 'drama'],
            location: 'Morocco',
            followers: {
              instagram: 850000, // 850K followers (as of June 2024)
              youtube: 100000,
            },
            engagementRate: 4.5, // Estimated (adjust based on likes/comments)
            averageRating: 4.7
          },
          {
            id: 103,
            name: 'Adil Taouil',
            email: 'contact.adiltaouil@example.com', // Placeholder (no public email found)
            role: 'influencer',
            profileImage: 'https://i.ibb.co/tkXTxQL/338189820-1175613219783370-3522481196877458708-n.jpg', // Replace with actual IG profile pic URL
            bio: 'Actor | Moroccan cinema and TV', // Taken from his Instagram bio
            niche: ['acting', 'film', 'television'],
            location: 'Morocco',
            followers: {
              instagram: 620000, // 620K followers (as of June 2024)
              youtube: 800000,
            },
            engagementRate: 4.3, // Estimated based on typical engagement
            averageRating: 4.6
          },
          
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

  // Chart data
  const campaignPerformanceData = [
    { label: 'Jan', value: 2.1 },
    { label: 'Feb', value: 2.3 },
    { label: 'Mar', value: 2.0 },
    { label: 'Apr', value: 2.6 },
    { label: 'May', value: 2.4 },
  ];

  const spendingData = [
    { label: 'Jan', value: 8500 },
    { label: 'Feb', value: 9200 },
    { label: 'Mar', value: 10800 },
    { label: 'Apr', value: 11200 },
    { label: 'May', value: 12500 },
  ];

  const campaignsByNicheData = [
    { label: 'Fashion', value: 3, color: 'bg-gradient-to-r from-pink-500 to-rose-600' },
    { label: 'Tech', value: 2, color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
    { label: 'Lifestyle', value: 2, color: 'bg-gradient-to-r from-purple-500 to-violet-600' },
    { label: 'Beauty', value: 1, color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
  ];

  const platformDistributionData = [
    { label: 'Instagram', value: 45 },
    { label: 'TikTok', value: 30 },
    { label: 'YouTube', value: 25 },
  ];

  return (
    <div className="space-y-10 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 text-shadow">
            Dashboard <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage your campaigns and discover new influencers</p>
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">All systems operational</span>
            </div>
            <div className="text-gray-400">•</div>
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <Link
          to="/brand/create-campaign"
          className="btn-gradient inline-flex items-center shadow-lg hover:shadow-xl"
        >
          <PlusCircle className="mr-3 h-6 w-6" />
          New Campaign
        </Link>
      </div>
      
      {/* Enhanced Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart2 className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Campaigns Launched
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.campaignsLaunched}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Collaborations
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.influencersCollaborated}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">8%</span>
                    </div>
                  </div>
                </div>
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
                    Total Spent
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    ROI Multiplier
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.roi}x</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LineChart
          data={campaignPerformanceData}
          title="Campaign ROI Performance"
          subtitle="Return on investment over time"
          showTrend={true}
          trendValue={5.2}
        />
        
        <LineChart
          data={spendingData}
          title="Monthly Spending"
          subtitle="Campaign budget allocation"
          showTrend={true}
          trendValue={15.3}
        />
        
        <BarChart
          data={campaignsByNicheData}
          title="Campaigns by Niche"
          subtitle="Distribution across content categories"
        />
        
        <DonutChart
          data={platformDistributionData}
          title="Platform Distribution"
          subtitle="Campaign reach by platform"
          centerValue="100%"
          centerLabel="Coverage"
        />
      </div>
      
      {/* Enhanced Active Campaigns */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Active Campaigns
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your current running campaigns
                </p>
              </div>
            </div>
            <Link
              to="/brand/campaigns"
              className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50"
            >
              View all →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-100/50">
          {activeCampaigns.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-500 text-lg">
                No active campaigns. <Link to="/brand/create-campaign" className="text-gradient hover:opacity-80 font-semibold">Create one now</Link>
              </p>
            </div>
          ) : (
            activeCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h4 className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">{campaign.title}</h4>
                      <div className="ml-4">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                          campaign.status === 'open' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        }`}>
                          {campaign.status === 'open' ? '🚀 Open for Applications' : '⚡ In Progress'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">{campaign.description}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                        <span className="font-semibold">${campaign.budget.min} - ${campaign.budget.max}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-5 w-5 mr-2 text-purple-500" />
                        <span className="font-semibold">{campaign.requirements.platforms.join(', ')}</span>
                      </div>
                      <div className="flex space-x-2">
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
                  </div>
                  <div>
                    <Link
                      to={`/brand/campaigns#${campaign.id}`}
                      className="btn-secondary group-hover:scale-105 transition-transform duration-300"
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
      
      {/* Enhanced Recommended Influencers */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg mr-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Recommended Influencers
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Influencers that match your brand's niche and audience
                </p>
              </div>
            </div>
            <Link
              to="/brand/find-influencers"
              className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50"
            >
              Discover more →
            </Link>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedInfluencers.map((influencer, index) => (
              <div key={influencer.id} className="card-modern p-8 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center mb-6">
                  <div className="avatar-story">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                      {influencer.profileImage ? (
                        <img
                          className="w-full h-full object-cover"
                          src={influencer.profileImage}
                          alt={influencer.name}
                        />
                      ) : (
                        <Users className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{influencer.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{influencer.bio}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-700">{influencer.averageRating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="font-semibold">
                        {Object.values(influencer.followers || {}).reduce((a, b) => a + b, 0).toLocaleString()} followers
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-semibold">{influencer.engagementRate}% engagement</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {influencer.niche?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="btn-primary text-sm px-6 py-3 group-hover:scale-105 transition-transform duration-300">
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