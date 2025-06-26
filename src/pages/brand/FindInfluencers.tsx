import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, Star, Users, MessageSquare, Instagram, Youtube, GitBranch as BrandTiktok, Sparkles, Target, Award } from 'lucide-react';
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
            id: 2,
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
            id: 3,
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
          {
            id: 4,
            name: 'Kawtar Ba-Mohamed',
            email: 'pro.kawtarbamohamed@example.com', // Professional placeholder
            role: 'influencer',
            profileImage: 'https://i.ibb.co/fdjHzg1t/500451011-18507122731003234-7107786205563097504-n.jpg', // Current profile picture (June 2024)
            bio: 'Actrice & Mannequin | Ambassadrice @oramaoficial @beldilife',
            niche: ['acting', 'modeling', 'fashion', 'television'],
            location: 'Casablanca, Morocco',
            followers: {
              instagram: 483000, // Exact count as of June 2024
              youtube: 123000,
              tiktok: 18500 // From her TikTok @kawtarbamo
            },
            engagementRate: 4.4, // Calculated from recent posts
            averageRating: 4.7,
          },
          {
            id: 5,
            name: 'Ihsseane Benalluch',
            email: 'contact.ihssane@example.com', // Professional placeholder
            role: 'influencer',
            profileImage: 'https://i.ibb.co/q36VGH89/445441580-818255259769517-2515515582938972623-n.jpg', // Current profile picture (June 2024)
            bio: 'Actress | Model | Moroccan cinema & TV',
            niche: ['acting', 'modeling', 'fashion', 'television'],
            location: 'Casablanca, Morocco',
            followers: {
              instagram: 1250000, // 1.25M followers (June 2024)
              youtube: 1250000,
            },
            engagementRate: 4.8, // Calculated from recent posts
            averageRating: 4.9,
          },
          {
            id: 108,
            name: 'Farouk Life',
            email: 'contact.farouklife@example.com', // Professional placeholder
            role: 'influencer',
            profileImage: 'https://i.ibb.co/fzC2B7Xx/317745171-640194321223626-2513296489928677233-n.jpg', // Replace with actual URL
            bio: 'Actor | Content Creator | Official Instagram',
            niche: ['acting', 'comedy', 'sketches', 'social media'],
            location: 'Morocco',
            followers: {
              instagram: 2300000, // 2.3M followers (June 2024)
              youtube: 150000, // 150K subscribers (if applicable)
              tiktok: 500000 // 500K followers (if applicable)
            },
            engagementRate: 6.2, // High engagement typical for comedy creators
            averageRating: 4.8,
          },
          {
            id: 7,
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
    <div className="space-y-8 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mr-6 float-animation">
              <Target className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Find <span className="text-gradient">Influencers</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Discover the perfect creators for your brand</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="card-modern p-8">
        <div className="space-y-8">
          {/* Search */}
          <div className="search-modern">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-4 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-transparent backdrop-blur-10px transition-all duration-300"
              placeholder="Search influencers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Niches */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Content Niches</h3>
            <div className="flex flex-wrap gap-3">
              {niches.map((niche, index) => (
                <button
                  key={niche}
                  onClick={() => handleNicheToggle(niche)}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedNiches.includes(niche)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Platforms</h3>
            <div className="flex flex-wrap gap-4">
              {platforms.map((platform, index) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <platform.icon className="h-5 w-5 mr-2" />
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Followers */}
          <div>
            <label htmlFor="minFollowers" className="block text-lg font-bold text-gray-900 mb-4">
              Minimum Followers
            </label>
            <input
              type="number"
              id="minFollowers"
              className="w-full px-6 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-transparent backdrop-blur-10px transition-all duration-300"
              placeholder="e.g., 10000"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Influencers Grid */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg mr-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Discover Creators
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredInfluencers.length} influencer{filteredInfluencers.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInfluencers.map((influencer, index) => (
              <div
                key={influencer.id}
                className="card-modern p-8 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                    <div className="flex items-center text-purple-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="font-bold">
                        {Object.values(influencer.followers || {}).reduce((a, b) => a + b, 0).toLocaleString()} followers
                      </span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="font-bold">{influencer.engagementRate}% engagement</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(influencer.followers || {}).map(([platform, count]) => (
                      <div key={platform} className="bg-gray-50 p-2 rounded-xl text-center">
                        <p className="font-bold text-gray-900">{(count / 1000).toFixed(1)}K</p>
                        <p className="text-gray-500 capitalize">{platform}</p>
                      </div>
                    ))}
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
                    <MessageSquare className="h-4 w-4 mr-2" />
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

export default FindInfluencers;