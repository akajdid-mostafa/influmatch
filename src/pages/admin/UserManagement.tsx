import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, User, ShoppingBag, Shield, MoreVertical } from 'lucide-react';
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
        
        // Mock data for demo purposes
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
        return <ShoppingBag className="h-5 w-5 text-purple-600" />;
      case 'influencer':
        return <User className="h-5 w-5 text-blue-600" />;
      case 'admin':
        return <Shield className="h-5 w-5 text-red-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'brand':
        return 'bg-purple-100 text-purple-800';
      case 'influencer':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
      </div>

      {/* Filters */}
      <div className="card-modern p-6">
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
                placeholder="Rechercher des utilisateurs..."
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
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-modern">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.profileImage ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.profileImage}
                            alt={user.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Actif
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;