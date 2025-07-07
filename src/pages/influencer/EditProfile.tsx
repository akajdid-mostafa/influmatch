import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Instagram, Youtube, GitBranch as BrandTiktok, Globe, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { InfluencerProfile } from '../../types';

const EditProfile = () => {
  const navigate = useNavigate();
  useAuth();
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
    'Mode', 'Beauté', 'Lifestyle', 'Tech', 'Gaming',
    'Cuisine Marocaine', 'Voyage', 'Fitness', 'Business', 'Art et Artisanat',
    'Éducation', 'Divertissement', 'Santé', 'Parentalité', 'Culture Marocaine'
  ];

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfile = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock profile data
        const mockProfile: InfluencerProfile = {
          id: 2,
          name: 'Saad Lamjarred',
          email: 'influenceur@example.com',
          role: 'influencer',
          profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          bio: 'Artiste marocain international | Chanteur et compositeur passionné par la musique et la culture marocaine.',
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
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setSaving(true);
    
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profil mis à jour avec succès');
      navigate('/influencer/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Échec de la mise à jour du profil');
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
        <h1 className="text-2xl font-bold text-gray-900">Modifier le Profil</h1>
        <p className="mt-2 text-sm text-gray-600">
          Mettez à jour vos informations de profil et liens de réseaux sociaux
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="card-modern p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Photo de Profil</h2>
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
                Recommandé: Image carrée, au moins 400x400 pixels
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer la photo
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="card-modern p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Informations de Base</h2>
          <div className="space-y-6">
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Nom <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-modern"
                placeholder="Votre nom complet"
              />
            </div>

            <div className="input-group">
              <label htmlFor="bio" className="input-label">
                Bio <span className="required">*</span>
              </label>
              <textarea
                id="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="textarea-modern"
                placeholder="Parlez aux marques de vous et de votre contenu..."
              />
            </div>

            <div className="input-group">
              <label htmlFor="location" className="input-label">
                Localisation
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-modern"
                placeholder="Ville, Pays"
              />
            </div>
          </div>
        </div>

        {/* Content Niches */}
        <div className="card-modern p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Niches de Contenu</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Sélectionnez les catégories qui décrivent le mieux votre contenu <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {availableNiches.map((niche) => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => handleNicheToggle(niche)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
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
        <div className="card-modern p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Réseaux Sociaux</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center">
                  <Instagram className="h-5 w-5 text-pink-600 mr-2" />
                  Instagram
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label htmlFor="instagramHandle" className="input-label">
                    Nom d'utilisateur
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">@</span>
                    </div>
                    <input
                      type="text"
                      id="instagramHandle"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      className="input-modern pl-8"
                      placeholder="nom_utilisateur"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="instagramFollowers" className="input-label">
                    Nombre d'abonnés
                  </label>
                  <input
                    type="number"
                    id="instagramFollowers"
                    value={instagramFollowers}
                    onChange={(e) => setInstagramFollowers(e.target.value)}
                    className="input-modern"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center">
                  <BrandTiktok className="h-5 w-5 text-gray-900 mr-2" />
                  TikTok
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label htmlFor="tiktokHandle" className="input-label">
                    Nom d'utilisateur
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">@</span>
                    </div>
                    <input
                      type="text"
                      id="tiktokHandle"
                      value={tiktokHandle}
                      onChange={(e) => setTiktokHandle(e.target.value)}
                      className="input-modern pl-8"
                      placeholder="nom_utilisateur"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="tiktokFollowers" className="input-label">
                    Nombre d'abonnés
                  </label>
                  <input
                    type="number"
                    id="tiktokFollowers"
                    value={tiktokFollowers}
                    onChange={(e) => setTiktokFollowers(e.target.value)}
                    className="input-modern"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center">
                  <Youtube className="h-5 w-5 text-red-600 mr-2" />
                  YouTube
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label htmlFor="youtubeHandle" className="input-label">
                    Nom de la chaîne
                  </label>
                  <input
                    type="text"
                    id="youtubeHandle"
                    value={youtubeHandle}
                    onChange={(e) => setYoutubeHandle(e.target.value)}
                    className="input-modern"
                    placeholder="Nom de la chaîne"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="youtubeFollowers" className="input-label">
                    Nombre d'abonnés
                  </label>
                  <input
                    type="number"
                    id="youtubeFollowers"
                    value={youtubeFollowers}
                    onChange={(e) => setYoutubeFollowers(e.target.value)}
                    className="input-modern"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="website" className="input-label">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Site Web
                </div>
              </label>
              <input
                type="url"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="input-modern"
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
            className="btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? <LoadingSpinner size="sm" color="white" /> : 'Sauvegarder les Modifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;