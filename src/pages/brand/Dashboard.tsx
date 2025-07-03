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
        
        // Mock data for demo purposes - Updated for Moroccan market
        const mockStats: BrandStats = {
          campaignsLaunched: 12,
          influencersCollaborated: 28,
          totalSpent: 85000,
          averageEngagement: 4.2,
          roi: 3.1,
          reach: 850000,
          conversionRate: 2.8
        };
        
        const mockCampaigns: Campaign[] = [
          {
            id: '1',
            title: 'Collection Ramadan 2025',
            description: 'Promouvoir notre nouvelle collection Ramadan avec des posts créatifs',
            brand: { id: 1, name: 'Marjane Market', email: 'marque@example.com', role: 'brand' },
            budget: { min: 8000, max: 15000, currency: 'MAD' },
            requirements: {
              niches: ['mode', 'lifestyle', 'culture marocaine'],
              minFollowers: 50000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-02-15',
              endDate: '2025-03-15',
            },
            status: 'open',
            createdAt: '2025-01-15T10:30:00Z',
            updatedAt: '2025-01-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Test Produits Argan Bio',
            description: 'Reviews authentiques de notre nouvelle gamme d\'huile d\'argan',
            brand: { id: 1, name: 'Marjane Market', email: 'marque@example.com', role: 'brand' },
            budget: { min: 5000, max: 12000, currency: 'MAD' },
            requirements: {
              niches: ['beauté', 'produits naturels', 'lifestyle'],
              minFollowers: 25000,
              platforms: ['youtube', 'instagram']
            },
            timeline: {
              startDate: '2025-01-20',
              endDate: '2025-02-20',
            },
            status: 'in-progress',
            createdAt: '2025-01-10T14:15:00Z',
            updatedAt: '2025-01-10T14:15:00Z'
          }
        ];
        
        const mockInfluencers: InfluencerProfile[] = [
          {
            id: 101,
            name: 'Saad Lamjarred',
            email: 'contact.saadlamjarred@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Artiste marocain international | Chanteur et compositeur 🎵',
            niche: ['musique', 'divertissement', 'culture marocaine'],
            location: 'Rabat, Maroc',
            followers: {
              instagram: 8500000,
              youtube: 12000000,
            },
            engagementRate: 6.8,
            averageRating: 4.9
          },
          {
            id: 102,
            name: 'Dounia Batma',
            email: 'contact.douniabatma@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Chanteuse marocaine | Actrice | Ambassadrice de la mode 👗',
            niche: ['mode', 'beauté', 'musique', 'lifestyle'],
            location: 'Casablanca, Maroc',
            followers: {
              instagram: 3200000,
              youtube: 1800000,
            },
            engagementRate: 5.4,
            averageRating: 4.8
          },
          {
            id: 103,
            name: 'Amine Aouni',
            email: 'contact.amineaouni@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Acteur et créateur de contenu marocain | Comédie et divertissement 😄',
            niche: ['comédie', 'divertissement', 'acting'],
            location: 'Casablanca, Maroc',
            followers: {
              instagram: 870000,
              tiktok: 1200000,
            },
            engagementRate: 7.2,
            averageRating: 4.7
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

  // Chart data - Updated for Moroccan market
  const campaignPerformanceData = [
    { label: 'Jan', value: 2.8 },
    { label: 'Fév', value: 3.1 },
    { label: 'Mar', value: 2.9 },
    { label: 'Avr', value: 3.4 },
    { label: 'Mai', value: 3.1 },
  ];

  const spendingData = [
    { label: 'Jan', value: 65000 },
    { label: 'Fév', value: 72000 },
    { label: 'Mar', value: 78000 },
    { label: 'Avr', value: 82000 },
    { label: 'Mai', value: 85000 },
  ];

  const campaignsByNicheData = [
    { label: 'Mode', value: 4, color: 'bg-gradient-to-r from-pink-500 to-rose-600' },
    { label: 'Beauté', value: 3, color: 'bg-gradient-to-r from-purple-500 to-violet-600' },
    { label: 'Lifestyle', value: 3, color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
    { label: 'Culture Marocaine', value: 2, color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
  ];

  const platformDistributionData = [
    { label: 'Instagram', value: 50 },
    { label: 'TikTok', value: 30 },
    { label: 'YouTube', value: 20 },
  ];

  return (
    <div className="space-y-10 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 text-shadow">
            Tableau de bord <span className="text-gradient">Marque</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Gérez vos campagnes et découvrez de nouveaux influenceurs</p>
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Tous les systèmes opérationnels</span>
            </div>
            <div className="text-gray-400">•</div>
            <span className="text-sm text-gray-500">Dernière mise à jour: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <Link
          to="/brand/create-campaign"
          className="btn-gradient inline-flex items-center shadow-lg hover:shadow-xl"
        >
          <PlusCircle className="mr-3 h-6 w-6" />
          Nouvelle Campagne
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
                    Campagnes Lancées
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.campaignsLaunched}</div>
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Dépensé
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.totalSpent.toLocaleString()} MAD</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">18%</span>
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
                    ROI Multiplicateur
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="text-3xl font-bold text-gray-900">{stats.roi}x</div>
                    <div className="ml-3 flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">8%</span>
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
          title="Performance ROI des Campagnes"
          subtitle="Retour sur investissement dans le temps"
          showTrend={true}
          trendValue={8.2}
        />
        
        <LineChart
          data={spendingData}
          title="Dépenses Mensuelles"
          subtitle="Allocation du budget des campagnes (MAD)"
          showTrend={true}
          trendValue={18.3}
        />
        
        <BarChart
          data={campaignsByNicheData}
          title="Campagnes par Niche"
          subtitle="Distribution par catégories de contenu"
        />
        
        <DonutChart
          data={platformDistributionData}
          title="Distribution par Plateforme"
          subtitle="Portée des campagnes par plateforme"
          centerValue="100%"
          centerLabel="Couverture"
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
                  Campagnes Actives
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vos campagnes en cours d'exécution
                </p>
              </div>
            </div>
            <Link
              to="/brand/campaigns"
              className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50"
            >
              Voir tout →
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
                Aucune campagne active. <Link to="/brand/create-campaign" className="text-gradient hover:opacity-80 font-semibold">Créez-en une maintenant</Link>
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
                          {campaign.status === 'open' ? '🚀 Ouvert aux candidatures' : '⚡ En cours'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">{campaign.description}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center text-gray-500">
                        <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                        <span className="font-semibold">{campaign.budget.min} - {campaign.budget.max} {campaign.budget.currency}</span>
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
                      Voir Détails
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
                  Influenceurs Recommandés
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Influenceurs qui correspondent à votre niche et audience
                </p>
              </div>
            </div>
            <Link
              to="/brand/find-influencers"
              className="text-sm font-semibold text-gradient hover:opacity-80 transition-opacity px-4 py-2 rounded-xl hover:bg-purple-50"
            >
              Découvrir plus →
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
                        {Object.values(influencer.followers || {}).reduce((a, b) => a + b, 0).toLocaleString()} abonnés
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
                    Contacter
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