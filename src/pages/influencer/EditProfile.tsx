import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Instagram, Youtube, GitBranch as BrandTiktok, Globe, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { InfluencerProfile } from '../../types';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [niches, setNiches] = useState<string[]>([]);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [instagramFollowers, setInstagramFollowers] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [tiktokFollowers, setTiktokFollowers] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');
  const [youtubeFollowers, setYoutubeFollowers] = useState('');
  const [website, setWebsite] = useState('');

  const availableNiches = [
    'Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Gaming',
    'Food', 'Travel', 'Fitness', 'Business', 'Art',
    'Education', 'Entertainment', 'Health', 'Parenting', 'Pets'
  ];

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfile = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock profile data
        const mockProfile: InfluencerProfile = {
          id: 2,
          name: 'Jane Influencer',
          email: 'influencer@example.com',
          role: 'influencer',
          profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          bio: 'Lifestyle and fashion content creator passionate about sustainable fashion and mindful living.',
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
        
        setProfile(mockProfile);
        
        // Populate form fields
        setName(mockProfile.name);
        setBio(mockProfile.bio || '');
        setLocation(mockProfile.location || '');
        setNiches(mockProfile.niche || []);
        setInstagramHandle(mockProfile.socialLinks?.instagram?.split('com/')[1] || '');
        setInstagramFollowers(mockProfile.followers?.instagram?.toString() || '');
        setTiktokHandle(mockProfile.socialLinks?.tiktok?.split('@')[1] || '');
        setTiktokFollowers(mockProfile.followers?.tiktok?.toString() || '');
        setYoutubeHandle(mockProfile.socialLinks?.youtube?.split('c/')[1] || '');
        setYoutubeFollowers(mockProfile.followers?.youtube?.toString() || '');
        setWebsite(mockProfile.socialLinks?.website || '');
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleNicheToggle = (niche: string) => {
    setNiches(prev =>
      prev.includes(niche)
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload
      // In a real app, you would upload this to your storage service
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => prev ? { ...prev, profileImage: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !bio || niches.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSaving(true);
    
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully');
      navigate('/influencer/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your profile information and social media links
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Image</h2>
          <div className="flex items-center">
            <div className="relative">
              <img
                src={profile?.profileImage}
                alt={profile?.name}
                className="h-32 w-32 rounded-full object-cover"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition-colors"
              >
                <Upload className="h-4 w-4 text-white" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className="ml-6">
              <p className="text-sm text-gray-500">
                Recommended: Square image, at least 400x400 pixels
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove photo
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Tell brands about yourself and your content..."
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Content Niches */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Content Niches</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Select the categories that best describe your content <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {availableNiches.map((niche) => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => handleNicheToggle(niche)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    niches.includes(niche)
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Instagram className="h-5 w-5 text-pink-600 mr-2" />
                  Instagram
                </div>
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">@</span>
                  </div>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    className="block w-full pl-8 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="username"
                  />
                </div>
                <input
                  type="number"
                  value={instagramFollowers}
                  onChange={(e) => setInstagramFollowers(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Followers count"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <BrandTiktok className="h-5 w-5 text-gray-900 mr-2" />
                  TikTok
                </div>
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">@</span>
                  </div>
                  <input
                    type="text"
                    value={tiktokHandle}
                    onChange={(e) => setTiktokHandle(e.target.value)}
                    className="block w-full pl-8 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="username"
                  />
                </div>
                <input
                  type="number"
                  value={tiktokFollowers}
                  onChange={(e) => setTiktokFollowers(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Followers count"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Youtube className="h-5 w-5 text-red-600 mr-2" />
                  YouTube
                </div>
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={youtubeHandle}
                  onChange={(e) => setYoutubeHandle(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Channel name"
                />
                <input
                  type="number"
                  value={youtubeFollowers}
                  onChange={(e) => setYoutubeFollowers(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Subscribers count"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Website
                </div>
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/influencer/profile')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            {saving ? <LoadingSpinner size="sm" color="white" /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;