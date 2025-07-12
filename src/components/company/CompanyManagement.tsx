import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  totalCampaigns: number;
  totalSpent: number;
  joinDate: Date;
  lastActivity: Date;
  description: string;
}

interface CompanyManagementProps {
  onEdit?: (company: Company) => void;
  onDelete?: (companyId: string) => void;
  onView?: (company: Company) => void;
}

const CompanyManagement: React.FC<CompanyManagementProps> = ({
  onEdit,
  onDelete,
  onView
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  // Mock data
  useEffect(() => {
    const mockCompanies: Company[] = [
      {
        id: '1',
        name: 'Marjane Market',
        logo: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        industry: 'Commerce de détail',
        location: 'Casablanca, Maroc',
        website: 'https://marjane.ma',
        email: 'contact@marjane.ma',
        phone: '+212 522 123 456',
        status: 'active',
        rating: 4.8,
        totalCampaigns: 24,
        totalSpent: 450000,
        joinDate: new Date('2023-01-15'),
        lastActivity: new Date('2024-01-10'),
        description: 'Leader de la grande distribution au Maroc'
      },
      {
        id: '2',
        name: 'Argan d\'Or',
        logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        industry: 'Cosmétiques',
        location: 'Agadir, Maroc',
        website: 'https://argandor.ma',
        email: 'info@argandor.ma',
        phone: '+212 528 987 654',
        status: 'active',
        rating: 4.6,
        totalCampaigns: 18,
        totalSpent: 320000,
        joinDate: new Date('2023-03-20'),
        lastActivity: new Date('2024-01-08'),
        description: 'Produits cosmétiques à base d\'argan bio'
      },
      {
        id: '3',
        name: 'Atlas Telecom',
        logo: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        industry: 'Télécommunications',
        location: 'Rabat, Maroc',
        website: 'https://atlastelecom.ma',
        email: 'contact@atlastelecom.ma',
        phone: '+212 537 456 789',
        status: 'pending',
        rating: 4.2,
        totalCampaigns: 12,
        totalSpent: 180000,
        joinDate: new Date('2023-06-10'),
        lastActivity: new Date('2024-01-05'),
        description: 'Solutions télécoms innovantes'
      }
    ];

    setTimeout(() => {
      setCompanies(mockCompanies);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '✅';
      case 'inactive':
        return '⏸️';
      case 'pending':
        return '⏳';
      default:
        return '❓';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const filteredCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           company.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'campaigns':
          return b.totalCampaigns - a.totalCampaigns;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        default:
          return 0;
      }
    });

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCompanies(
      selectedCompanies.length === filteredCompanies.length 
        ? [] 
        : filteredCompanies.map(c => c.id)
    );
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Entreprises</h1>
            <p className="text-gray-600 mt-2">Gérez et supervisez toutes les entreprises partenaires</p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold">
            Ajouter une Entreprise
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des entreprises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="pending">En attente</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="name">Trier par nom</option>
              <option value="rating">Trier par note</option>
              <option value="campaigns">Trier par campagnes</option>
              <option value="spent">Trier par dépenses</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="selectAll" className="text-sm text-gray-700">
                Tout sélectionner ({selectedCompanies.length})
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entreprises</p>
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Entreprises Actives</p>
              <p className="text-2xl font-bold text-gray-900">
                {companies.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Campagnes</p>
              <p className="text-2xl font-bold text-gray-900">
                {companies.reduce((sum, c) => sum + c.totalCampaigns, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenus Totaux</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(companies.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company, index) => (
          <div
            key={company.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Company Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => handleSelectCompany(company.id)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-xl object-cover shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                </div>
              </div>
              
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Status and Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(company.status)}`}>
                {getStatusIcon(company.status)} {company.status === 'active' ? 'Actif' : company.status === 'pending' ? 'En attente' : 'Inactif'}
              </span>
              
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-gray-700">{company.rating}</span>
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {company.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-2" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
                  {company.website.replace('https://', '')}
                </a>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {company.email}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{company.totalCampaigns}</p>
                <p className="text-xs text-gray-600">Campagnes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{formatCurrency(company.totalSpent)}</p>
                <p className="text-xs text-gray-600">Dépensé</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{company.description}</p>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onView?.(company)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Voir
              </button>
              
              <button
                onClick={() => onEdit?.(company)}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold flex items-center justify-center"
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </button>
              
              <button
                onClick={() => onDelete?.(company.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Last Activity */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Dernière activité: {formatDate(company.lastActivity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune entreprise trouvée
          </h3>
          <p className="text-gray-600">
            Aucune entreprise ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;