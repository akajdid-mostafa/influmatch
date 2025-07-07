import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, BarChart3, Award, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Campaign } from '../../types';

const CampaignModeration = () => {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending-approval');

  useEffect(() => {
    // Simulate API call to fetch campaigns
    const fetchCampaigns = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demo purposes - Updated for Moroccan market
        const mockCampaigns: Campaign[] = [
          {
            id: '1',
            title: 'Collection Ramadan 2025',
            description: 'Recherche d\'influenceurs mode pour promouvoir notre nouvelle collection Ramadan durable avec des posts créatifs et authentiques',
            brand: {
              id: 1,
              name: 'Marjane Market',
              email: 'marque@example.com',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 8000,
              max: 15000,
              currency: 'MAD'
            },
            requirements: {
              niches: ['mode', 'durabilité', 'lifestyle'],
              minFollowers: 50000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-02-01',
              endDate: '2025-03-01'
            },
            status: 'pending-approval',
            createdAt: '2025-01-15T10:30:00Z',
            updatedAt: '2025-01-15T10:30:00Z'
          },
          {
            id: '2',
            title: 'Review Produits Tech Maroc',
            description: 'Recherche de reviewers tech pour notre nouveau dispositif maison intelligente avec démonstrations détaillées',
            brand: {
              id: 2,
              name: 'Atlas Telecom',
              email: 'tech@atlastelecom.ma',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 12000,
              max: 25000,
              currency: 'MAD'
            },
            requirements: {
              niches: ['tech', 'gadgets', 'innovation'],
              minFollowers: 100000,
              platforms: ['youtube', 'instagram']
            },
            timeline: {
              startDate: '2025-02-15',
              endDate: '2025-03-15'
            },
            status: 'pending-approval',
            createdAt: '2025-01-14T15:45:00Z',
            updatedAt: '2025-01-14T15:45:00Z'
          },
          {
            id: '3',
            title: 'Promotion App Fitness Maroc',
            description: 'Recherche d\'influenceurs fitness pour présenter notre app de suivi d\'entraînement avec workouts en direct',
            brand: {
              id: 3,
              name: 'FitMaroc',
              email: 'contact@fitmaroc.ma',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 5000,
              max: 12000,
              currency: 'MAD'
            },
            requirements: {
              niches: ['fitness', 'santé', 'lifestyle'],
              minFollowers: 25000,
              platforms: ['instagram', 'tiktok']
            },
            timeline: {
              startDate: '2025-02-01',
              endDate: '2025-03-01'
            },
            status: 'open',
            createdAt: '2025-01-13T09:20:00Z',
            updatedAt: '2025-01-13T09:20:00Z'
          },
          {
            id: '4',
            title: 'Lancement Produits Argan Bio',
            description: 'Campagne pour promouvoir notre nouvelle gamme de produits cosmétiques à base d\'argan bio marocain',
            brand: {
              id: 4,
              name: 'Argan d\'Or',
              email: 'contact@argandor.ma',
              role: 'brand',
              logo: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            budget: {
              min: 10000,
              max: 20000,
              currency: 'MAD'
            },
            requirements: {
              niches: ['beauté', 'produits naturels', 'lifestyle'],
              minFollowers: 75000,
              platforms: ['instagram', 'youtube']
            },
            timeline: {
              startDate: '2025-02-10',
              endDate: '2025-03-10'
            },
            status: 'pending-approval',
            createdAt: '2025-01-12T14:20:00Z',
            updatedAt: '2025-01-12T14:20:00Z'
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
        return 'bg-amber-100 text-amber-800';
      case 'open':
        return 'bg-emerald-100 text-emerald-800';
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

  // Calculate stats
  const totalCampaigns = campaigns.length;
  const pendingCount = campaigns.filter(c => c.status === 'pending-approval').length;
  const approvedCount = campaigns.filter(c => c.status === 'open').length;
  const rejectedCount = campaigns.filter(c => c.status === 'rejected').length;

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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl mr-6 float-animation">
              <BarChart3 className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Modération des <span className="text-gradient">Campagnes</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Examinez et approuvez les campagnes soumises par les marques</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalCampaigns}</div>
          <div className="text-sm text-gray-500 font-medium">Total Campagnes</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{pendingCount}</div>
          <div className="text-sm text-gray-500 font-medium">En Attente</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{approvedCount}</div>
          <div className="text-sm text-gray-500 font-medium">Approuvées</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{rejectedCount}</div>
          <div className="text-sm text-gray-500 font-medium">Rejetées</div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="card-modern p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <label htmlFor="search" className="input-label">Rechercher des campagnes</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="input-modern pl-10"
                placeholder="Rechercher par titre, description ou marque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="status" className="input-label">Filtrer par statut</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="status"
                className="select-modern pl-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les Statuts</option>
                <option value="pending-approval">En Attente d'Approbation</option>
                <option value="open">Approuvées</option>
                <option value="rejected">Rejetées</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Campaigns Grid */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mr-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Campagnes à Modérer
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredCampaigns.length} campagne{filteredCampaigns.length !== 1 ? 's' : ''} trouvée{filteredCampaigns.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 gap-6">
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-500 text-lg">
                  Aucune campagne trouvée correspondant à vos critères.
                </p>
              </div>
            ) : (
              filteredCampaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="card-modern p-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      {campaign.brand.logo && (
                        <div className="flex-shrink-0">
                          <img
                            src={campaign.brand.logo}
                            alt={campaign.brand.name}
                            className="h-16 w-16 rounded-2xl object-cover shadow-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {campaign.title}
                          </h3>
                          <div className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                            {getStatusIcon(campaign.status)}
                            <span className="ml-1">
                              {campaign.status === 'pending-approval'
                                ? 'En Attente d\'Approbation'
                                : campaign.status === 'open'
                                ? 'Approuvée'
                                : campaign.status === 'rejected'
                                ? 'Rejetée'
                                : campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">{campaign.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <span className="font-semibold text-indigo-600 mr-2">Marque:</span>
                            {campaign.brand.name}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="font-semibold text-emerald-600 mr-2">Budget:</span>
                            {campaign.budget.min} - {campaign.budget.max} {campaign.budget.currency}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="font-semibold text-amber-600 mr-2">Plateformes:</span>
                            {campaign.requirements.platforms.join(', ')}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {campaign.requirements.niches.map((niche) => (
                            <span
                              key={niche}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800"
                            >
                              #{niche}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                        title="Voir Détails"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                        title="Message Marque"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                      {campaign.status === 'pending-approval' && (
                        <>
                          <button
                            onClick={() => handleApprove(campaign.id)}
                            className="btn-success text-sm px-4 py-2"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleReject(campaign.id)}
                            className="btn-secondary text-sm px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeter
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignModeration;