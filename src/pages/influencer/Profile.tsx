import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Edit, Star, Users, Instagram, Youtube, GitBranch as BrandTiktok, Globe, MapPin, Mail } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { InfluencerProfile, CampaignReference } from '../../types';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);
  const [previousWork, setPreviousWork] = useState<CampaignReference[]>([]);

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfileData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock profile data
        const mockProfile: InfluencerProfile = {
          id: 2,
          name: 'Ezzoubair Hilal',
          email: 'influencer@example.com',
          role: 'influencer',
          profileImage: 'https://i.ibb.co/ds9tQGj8/34982531-1765409630209343-1025505230982217728-n.jpg',
          bio: 'Lifestyle and fashion content creator passionate about sustainable fashion and mindful living. I love creating authentic content that resonates with my engaged community.',
          niche: ['fashion', 'lifestyle', 'sustainability'],
          location: 'Los Angeles, CA',
          followers: {
            instagram: 85000,
            tiktok: 120000,
            youtube: 45000
          },
          socialLinks: {
            instagram: 'https://instagram.com/janeinfluencer',
            tiktok: 'https://tiktok.com/@janeinfluencer',
            youtube: 'https://youtube.com/c/janeinfluencer',
            website: 'https://janeinfluencer.com'
          },
          engagementRate: 3.8,
          averageRating: 4.7
        };
        
        // Mock previous work data
        const mockPreviousWork: CampaignReference[] = [
          {
            id: '1',
            title: 'Summer Collection Campaign',
            imageUrl: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            brand: {
              id: 1,
              name: 'Fashion Brand Co.',
              logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            date: '2025-04-15',
            performance: {
              views: 150000,
              engagement: 4.5,
              clicks: 2800
            }
          },
          {
            id: '2',
            title: 'Eco-Friendly Product Launch',
            imageUrl: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            brand: {
              id: 2,
              name: 'Green Earth',
              logo: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            date: '2025-03-20',
            performance: {
              views: 98000,
              engagement: 3.8,
              clicks: 1500
            }
          },
          {
            id: '3',
            title: 'Wellness App Promotion',
            imageUrl: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            brand: {
              id: 3,
              name: 'Wellness Co.',
              logo: 'https://images.pexels.com/photos/5709659/pexels-photo-5709659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            },
            date: '2025-02-10',
            performance: {
              views: 75000,
              engagement: 4.2,
              clicks: 2100
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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div className="relative px-6 pb-6">
          <div className="flex items-center">
            <div className="relative -mt-16">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <Link
                  to="/influencer/edit-profile"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
              <p className="mt-1 text-gray-500">{profile.bio}</p>
              <div className="mt-4 flex items-center space-x-4">
                {profile.location && (
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  {profile.email}
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 mr-1" />
                  {profile.averageRating} rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="ml-2 text-sm font-medium text-gray-500">Total Followers</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {Object.values(profile.followers || {}).reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm font-medium text-gray-500">Engagement Rate</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {profile.engagementRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media</h2>
          <div className="space-y-4">
            {profile.followers?.instagram && (
              <a
                href={profile.socialLinks?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <div className="flex items-center">
                  <Instagram className="h-5 w-5 text-pink-600" />
                  <span className="ml-2 font-medium text-gray-900">Instagram</span>
                </div>
                <span className="text-gray-600">{(profile.followers.instagram / 1000).toFixed(1)}K followers</span>
              </a>
            )}
            {profile.followers?.tiktok && (
              <a
                href={profile.socialLinks?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <BrandTiktok className="h-5 w-5 text-gray-900" />
                  <span className="ml-2 font-medium text-gray-900">TikTok</span>
                </div>
                <span className="text-gray-600">{(profile.followers.tiktok / 1000).toFixed(1)}K followers</span>
              </a>
            )}
            {profile.followers?.youtube && (
              <a
                href={profile.socialLinks?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center">
                  <Youtube className="h-5 w-5 text-red-600" />
                  <span className="ml-2 font-medium text-gray-900">YouTube</span>
                </div>
                <span className="text-gray-600">{(profile.followers.youtube / 1000).toFixed(1)}K subscribers</span>
              </a>
            )}
            {profile.socialLinks?.website && (
              <a
                href={profile.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 font-medium text-gray-900">Website</span>
                </div>
                <span className="text-gray-600">Visit Site</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Previous Work */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Previous Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousWork.map((work) => (
            <div key={work.id} className="bg-white border rounded-lg overflow-hidden">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{work.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {work.brand?.name} • {new Date(work.date).toLocaleDateString()}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-medium text-gray-900">{(work.performance?.views || 0).toLocaleString()}</p>
                    <p className="text-gray-500">Views</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-medium text-gray-900">{work.performance?.engagement}%</p>
                    <p className="text-gray-500">Engagement</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-medium text-gray-900">{(work.performance?.clicks || 0).toLocaleString()}</p>
                    <p className="text-gray-500">Clicks</p>
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