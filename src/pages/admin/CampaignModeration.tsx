import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare } from 'lucide-react';
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
        
        // Mock data for demo purposes
        const mockCampaigns: Campaign[] = [
          {
            id: '1',
            title: 'Collection Ramadan 2025',
            description: 'Recherche d\'influenceurs mode pour promouvoir notre nouvelle collection Ramadan durable',
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
              niches: ['mode', 'durabilité'],
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
            description: 'Recherche de reviewers tech pour notre nouveau dispositif maison intelligente',
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
              niches: ['tech', 'gadgets'],
              minFollowers: 100000,
              platforms: ['youtube']
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
            description: 'Recherche d\'influenceurs fitness pour présenter notre app de suivi d\'entraînement',
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
              niches: ['fitness', 'santé'],
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
        <h1 className="text-2xl font-bold text-gray-900">Modération des Campagnes</h1>
      </div>

      {/* Filters */}
      <div className="card-modern p-6">
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
                placeholder="Rechercher des campagnes..."
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
                <option value="open">Approuvé</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="card-modern overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredCampaigns.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500">
              Aucune campagne trouvée correspondant à vos critères.
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
                              ? 'En Attente d\'Approbation'
                              : campaign.status === 'open'
                              ? 'Approuvé'
                              : campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Marque: {campaign.brand.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          Budget: {campaign.budget.min} - {campaign.budget.max} {campaign.budget.currency}
                        </span>
                        <span className="text-sm text-gray-500">
                          Plateformes: {campaign.requirements.platforms.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-purple-600"
                      title="Voir Détails"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-purple-600"
                      title="Message Marque"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    {campaign.status === 'pending-approval' && (
                      <>
                        <button
                          onClick={() => handleApprove(campaign.id)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approuver
                        </button>
                        <button
                          onClick={() => handleReject(campaign.id)}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
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