import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Star, TrendingUp, DollarSign, Activity, Users, CheckCircle, XCircle, Sparkles, Zap, Award, Target, BarChart3 } from 'lucide-react';
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
              name: 'Ezzoubair Hilal',
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
              name: 'Ezzoubair Hilal',
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
    <div className="space-y-10 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mr-6 float-animation">
              <Star className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Creator <span className="text-gradient">Studio</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Track your performance and manage collaborations</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Profile active</span>
            </div>
            <div className="text-gray-400">•</div>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
        <Link
          to="/influencer/profile"
          className="btn-secondary"
        >
          👁️ View Public Profile
        </Link>
      </div>
      
      {/* Enhanced Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Profile Views
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.profileViews}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">+8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="stats-card group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.averageRating}</div>
                    <div className="ml-3 flex items-center text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4" />
                      <span className="font-semibold">/ 5</span>
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
                    Total Earnings
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">+{stats.growth.earnings}%</span>
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
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Engagement Rate
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.engagementRate}%</div>
                    <div className="ml-3 flex items-center text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      <Zap className="h-4 w-4" />
                      <span className="font-semibold">+{stats.growth.engagement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Growth Metrics */}
      {stats && stats.growth && (
        <div className="card-modern">
          <div className="px-8 py-6 border-b border-gray-100/50">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mr-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Growth Metrics
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your performance compared to last month
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">Followers Growth</span>
                  <div className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.growth.followers}%
                  </div>
                </div>
                <div className="relative pt-2">
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                    <div 
                      style={{ width: `${Math.min(stats.growth.followers * 5, 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-1000"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">Engagement Growth</span>
                  <div className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.growth.engagement}%
                  </div>
                </div>
                <div className="relative pt-2">
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                    <div 
                      style={{ width: `${Math.min(stats.growth.engagement * 10, 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">Earnings Growth</span>
                  <div className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{stats.growth.earnings}%
                  </div>
                </div>
                <div className="relative pt-2">
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                    <div 
                      style={{ width: `${Math.min(stats.growth.earnings * 4, 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Campaign Requests */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg mr-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Pending Campaign Requests
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Review and respond to brand collaborations
                </p>
              </div>
            </div>
            <Link
              to="/influencer/requests"
              className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50"
            >
              View all →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-100/50">
          {pendingRequests.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-500 text-lg">
                No pending requests at the moment.
              </p>
            </div>
          ) : (
            pendingRequests.map((request, index) => (
              <div key={request.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">{request.campaign.title}</h4>
                    <p className="text-gray-600 mt-2 text-lg leading-relaxed">{request.proposal}</p>
                    <div className="flex items-center mt-4 space-x-6">
                      <div className="flex items-center text-green-600">
                        <DollarSign className="h-5 w-5 mr-2" />
                        <span className="font-bold text-lg">${request.rate}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="text-sm font-medium">Proposed Rate</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 ml-8">
                    <button className="btn-primary group-hover:scale-105 transition-transform duration-300">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Accept
                    </button>
                    <button className="btn-secondary group-hover:scale-105 transition-transform duration-300">
                      <XCircle className="mr-2 h-5 w-5" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Enhanced Active Campaigns */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center shadow-lg mr-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Active Campaigns
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your current ongoing collaborations
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100/50">
          {activeCampaigns.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-500 text-lg">
                No active campaigns at the moment.
              </p>
            </div>
          ) : (
            activeCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    {campaign.brand.logo && (
                      <div className="avatar-story mr-6">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                          <img
                            className="w-full h-full object-cover"
                            src={campaign.brand.logo}
                            alt={campaign.brand.name}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">{campaign.title}</h4>
                      <p className="text-gray-600 mt-2 text-lg">{campaign.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center">
                          <span className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg">
                            ⏰ Deadline: {new Date(campaign.timeline.submissionDeadline || '').toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-semibold">Brand: </span>
                          <span className="ml-1 text-gradient font-bold">{campaign.brand.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/influencer/requests#${campaign.id}`}
                      className="btn-primary group-hover:scale-105 transition-transform duration-300"
                    >
                      📋 View Details
                    </Link>
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

export default InfluencerDashboard;