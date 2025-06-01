import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, Star, Users, MessageSquare, Instagram, Youtube, GitBranch as BrandTiktok } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { InfluencerProfile } from '../../types';

const FindInfluencers = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [influencers, setInfluencers] = useState<InfluencerProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [minFollowers, setMinFollowers] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const niches = [
    'Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Gaming',
    'Food', 'Travel', 'Fitness', 'Business', 'Art'
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'tiktok', name: 'TikTok', icon: BrandTiktok }
  ];

  useEffect(() => {
    // Simulate API call to fetch influencers
    const fetchInfluencers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demo purposes
        const mockInfluencers: InfluencerProfile[] = [
          {
            id: 1,
            name: 'Sofia Rodriguez',
            email: 'sofia@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Fashion and lifestyle content creator based in Miami',
            niche: ['fashion', 'lifestyle'],
            location: 'Miami, FL',
            followers: {
              instagram: 85000,
              tiktok: 120000
            },
            engagementRate: 3.8,
            averageRating: 4.7
          },
          {
            id: 2,
            name: 'Alex Chen',
            email: 'alex@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Tech reviewer and gadget enthusiast',
            niche: ['tech', 'gaming'],
            location: 'San Francisco, CA',
            followers: {
              youtube: 250000,
              instagram: 45000
            },
            engagementRate: 4.2,
            averageRating: 4.8
          },
          {
            id: 3,
            name: 'Emma Thompson',
            email: 'emma@example.com',
            role: 'influencer',
            profileImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            bio: 'Fitness trainer and wellness advocate',
            niche: ['fitness', 'health'],
            location: 'London, UK',
            followers: {
              instagram: 150000,
              youtube: 75000
            },
            engagementRate: 3.5,
            averageRating: 4.6
          }
        ];
        
        setInfluencers(mockInfluencers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching influencers:', error);
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const handleNicheToggle = (niche: string) => {
    setSelectedNiches(prev =>
      prev.includes(niche)
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiches = selectedNiches.length === 0 ||
                         selectedNiches.some(niche => 
                           influencer.niche?.map(n => n.toLowerCase()).includes(niche.toLowerCase())
                         );
    
    const matchesPlatforms = selectedPlatforms.length === 0 ||
                            selectedPlatforms.some(platform =>
                              influencer.followers?.[platform as keyof typeof influencer.followers]
                            );
    
    const matchesFollowers = !minFollowers ||
                            Object.values(influencer.followers || {}).some(count => count >= parseInt(minFollowers));
    
    return matchesSearch && matchesNiches && matchesPlatforms && matchesFollowers;
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
        <h1 className="text-2xl font-bold text-gray-900">Find Influencers</h1>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {/* Search */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Search influencers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Niches */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Content Niches</h3>
            <div className="flex flex-wrap gap-2">
              {niches.map((niche) => (
                <button
                  key={niche}
                  onClick={() => handleNicheToggle(niche)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedNiches.includes(niche)
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <platform.icon className="h-4 w-4 mr-1" />
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Followers */}
          <div>
            <label htmlFor="minFollowers" className="block text-sm font-medium text-gray-700">
              Minimum Followers
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="minFollowers"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="e.g., 10000"
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Influencers Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInfluencers.map((influencer) => (
          <div
            key={influencer.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              {influencer.profileImage ? (
                <img
                  src={influencer.profileImage}
                  alt={influencer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{influencer.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{influencer.bio}</p>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <span>
                  {Object.entries(influencer.followers || {}).map(([platform, count]) => (
                    <span key={platform} className="mr-2">
                      {platform}: {(count / 1000).toFixed(1)}K
                    </span>
                  ))}
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Star className="flex-shrink-0 mr-1.5 h-4 w-4 text-yellow-400" />
                <span>{influencer.averageRating} rating</span>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  {influencer.niche?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindInfluencers;