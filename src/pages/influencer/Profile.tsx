import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Edit, Star, Users, Instagram, Youtube, GitBranch as BrandTiktok, Globe, MapPin, Mail, Award, TrendingUp, Eye, Heart } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { InfluencerProfile, CampaignReference } from '../../types';

const Profile = () => {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);
  const [previousWork, setPreviousWork] = useState<CampaignReference[]>([]);

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfileData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock profile data - Updated for Moroccan market
        const mockProfile: InfluencerProfile = {
          id: 2,
          name: 'Saad Lamjarred',
          email: 'influenceur@example.com',
          role: 'influencer',
          profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          bio: 'Artiste marocain international | Chanteur et compositeur passionné par la musique et la culture marocaine. Je crée du contenu authentique qui résonne avec ma communauté engagée.',
          niche: ['Musique', 'Divertissement', 'Culture Marocaine'],
          location: 'Rabat, Maroc',
          followers: {
            instagram: 8500000,
            tiktok: 1200000,
            youtube: 12000000
          },
          socialLinks: {
            instagram: 'https://instagram.com/saadlamjarred',
            tiktok: 'https://tiktok.com/@saadlamjarred',
            youtube: 'https://youtube.com/c/saadlamjarred',
            website: 'https://saadlamjarred.com'
          },
          engagementRate: 6.8,
          averageRating: 4.9
        };
        
        // Mock previous work data - Updated for Moroccan market
        const mockPreviousWork: CampaignReference[] = [
          {
            id: '1',
            title: 'Campagne Ramadan Marjane',
            imageUrl: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            brand: {
              id: 1,
              name: 'Marjane Market',
              logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            date: '2024-04-15',
            performance: {
              views: 2500000,
              engagement: 7.2,
              clicks: 45000
            }
          },
          {
            id: '2',
            title: 'Lancement Produits Argan d\'Or',
            imageUrl: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            brand: {
              id: 2,
              name: 'Argan d\'Or',
              logo: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            date: '2024-03-20',
            performance: {
              views: 1800000,
              engagement: 6.5,
              clicks: 32000
            }
          },
          {
            id: '3',
            title: 'Promotion Atlas Telecom',
            imageUrl: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            brand: {
              id: 3,
              name: 'Atlas Telecom',
              logo: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            date: '2024-02-10',
            performance: {
              views: 1200000,
              engagement: 8.1,
              clicks: 28000
            }
          }
        ];
        
        setProfile(mockProfile);
        setPreviousWork(mockPreviousWork);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading || !profile) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const totalFollowers = Object.values(profile.followers || {}).reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 page-transition">
      {/* Enhanced Profile Header */}
      <div className="card-modern overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end justify-between">
              <div className="flex items-end space-x-6">
                <div className="relative">
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="h-32 w-32 rounded-2xl border-4 border-white object-cover shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="pb-4">
                  <h1 className="text-3xl font-bold text-white text-shadow">{profile.name}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}
                    </div>
                    <div className="flex items-center text-white/90">
                      <Star className="h-4 w-4 mr-1" />
                      {profile.averageRating} étoiles
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/influencer/edit-profile"
                className="btn-primary bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier le Profil
              </Link>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{profile.bio}</p>
          
          {/* Niches */}
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.niche?.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Contact Info */}
          <div className="flex items-center text-gray-500">
            <Mail className="h-4 w-4 mr-2" />
            {profile.email}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(totalFollowers / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-500 font-medium">Total Abonnés</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {profile.engagementRate}%
          </div>
          <div className="text-sm text-gray-500 font-medium">Taux d'Engagement</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {previousWork.length}
          </div>
          <div className="text-sm text-gray-500 font-medium">Campagnes Réalisées</div>
        </div>
        
        <div className="stats-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {profile.averageRating}
          </div>
          <div className="text-sm text-gray-500 font-medium">Note Moyenne</div>
        </div>
      </div>

      {/* Social Media & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Social Links */}
        <div className="card-modern p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            Réseaux Sociaux
          </h2>
          <div className="space-y-4">
            {profile.followers?.instagram && (
              <a
                href={profile.socialLinks?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:from-pink-100 hover:to-purple-100 transition-all duration-300 group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-4">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Instagram</div>
                    <div className="text-sm text-gray-500">@{profile.socialLinks?.instagram?.split('com/')[1]}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{(profile.followers.instagram / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">abonnés</div>
                </div>
              </a>
            )}
            
            {profile.followers?.youtube && (
              <a
                href={profile.socialLinks?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all duration-300 group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-4">
                    <Youtube className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">YouTube</div>
                    <div className="text-sm text-gray-500">{profile.socialLinks?.youtube?.split('c/')[1]}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{(profile.followers.youtube / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">abonnés</div>
                </div>
              </a>
            )}
            
            {profile.followers?.tiktok && (
              <a
                href={profile.socialLinks?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl hover:from-gray-100 hover:to-slate-100 transition-all duration-300 group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-800 to-black flex items-center justify-center mr-4">
                    <BrandTiktok className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">TikTok</div>
                    <div className="text-sm text-gray-500">@{profile.socialLinks?.tiktok?.split('@')[1]}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{(profile.followers.tiktok / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-500">abonnés</div>
                </div>
              </a>
            )}
            
            {profile.socialLinks?.website && (
              <a
                href={profile.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Site Web</div>
                    <div className="text-sm text-gray-500">Portfolio personnel</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-600">Visiter →</div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="card-modern p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center mr-3">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Performances
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Taux d'Engagement</div>
                  <div className="text-sm text-gray-500">Moyenne sur toutes les plateformes</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-emerald-600">{profile.engagementRate}%</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Vues Moyennes</div>
                  <div className="text-sm text-gray-500">Par publication</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-600">1.8M</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Note Satisfaction</div>
                  <div className="text-sm text-gray-500">Évaluation des marques</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-indigo-600">{profile.averageRating}/5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Work Portfolio */}
      <div className="card-modern p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center mr-3">
            <Award className="h-5 w-5 text-white" />
          </div>
          Portfolio - Travaux Précédents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousWork.map((work, index) => (
            <div
              key={work.id}
              className="card-modern overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-semibold">{work.brand?.name}</div>
                  <div className="text-sm">{new Date(work.date).toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{work.title}</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-indigo-50 p-3 rounded-xl">
                    <div className="font-bold text-indigo-600">{(work.performance?.views || 0 / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-gray-500">Vues</div>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <div className="font-bold text-emerald-600">{work.performance?.engagement}%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl">
                    <div className="font-bold text-amber-600">{(work.performance?.clicks || 0 / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-500">Clics</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;