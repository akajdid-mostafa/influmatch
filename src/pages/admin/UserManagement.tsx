import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, User, ShoppingBag, Shield, MoreVertical, Users, Award, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { User as UserType } from '../../types';

const UserManagement = () => {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demo purposes - Updated for Moroccan market
        const mockUsers: UserType[] = [
          {
            id: 1,
            name: 'Marjane Market',
            email: 'marque@example.com',
            role: 'brand',
            profileImage: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 2,
            name: 'Saad Lamjarred',
            email: 'influenceur@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 3,
            name: 'Admin Maroc',
            email: 'admin@example.com',
            role: 'admin',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 4,
            name: 'Argan d\'Or',
            email: 'contact@argandor.ma',
            role: 'brand',
            profileImage: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 5,
            name: 'Dounia Batma',
            email: 'dounia@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 6,
            name: 'Atlas Telecom',
            email: 'contact@atlastelecom.ma',
            role: 'brand',
            profileImage: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 7,
            name: 'Mehdi K-Libre',
            email: 'mehdi@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'brand':
        return <ShoppingBag className="h-5 w-5 text-indigo-600" />;
      case 'influencer':
        return <User className="h-5 w-5 text-emerald-600" />;
      case 'admin':
        return <Shield className="h-5 w-5 text-amber-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'brand':
        return 'bg-indigo-100 text-indigo-800';
      case 'influencer':
        return 'bg-emerald-100 text-emerald-800';
      case 'admin':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Calculate stats
  const totalUsers = users.length;
  const brandCount = users.filter(u => u.role === 'brand').length;
  const influencerCount = users.filter(u => u.role === 'influencer').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

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
              <Users className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Gestion des <span className="text-gradient">Utilisateurs</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Gérez et supervisez tous les utilisateurs de la plateforme</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalUsers}</div>
          <div className="text-sm text-gray-500 font-medium">Total Utilisateurs</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{influencerCount}</div>
          <div className="text-sm text-gray-500 font-medium">Influenceurs</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{brandCount}</div>
          <div className="text-sm text-gray-500 font-medium">Marques</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{adminCount}</div>
          <div className="text-sm text-gray-500 font-medium">Administrateurs</div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="card-modern p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="input-group">
            <label htmlFor="search" className="input-label">Rechercher des utilisateurs</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="input-modern pl-10"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="role" className="input-label">Filtrer par rôle</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="role"
                className="select-modern pl-10"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Tous les Rôles</option>
                <option value="brand">Marques</option>
                <option value="influencer">Influenceurs</option>
                <option value="admin">Administrateurs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Users Grid */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Utilisateurs de la Plateforme
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} trouvé{filteredUsers.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className="card-modern p-6 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative">
                    {user.profileImage ? (
                      <img
                        className="h-16 w-16 rounded-2xl object-cover shadow-lg"
                        src={user.profileImage}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-2xl bg-gray-200 flex items-center justify-center shadow-lg">
                        <User className="h-8 w-8 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
                        user.role === 'brand' ? 'bg-indigo-500' :
                        user.role === 'influencer' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}>
                        {getRoleIcon(user.role)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-500">ID: {user.id}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role === 'brand' ? 'Marque' :
                       user.role === 'influencer' ? 'Influenceur' : 'Administrateur'}
                    </span>
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      Actif
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {user.email}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-gray-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Dernière activité: Aujourd'hui</span>
                    </div>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-gray-500 text-lg">
                Aucun utilisateur trouvé correspondant à vos critères.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;