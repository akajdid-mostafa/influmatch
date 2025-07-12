import React from 'react';
import { Plus, Trash2, Instagram, Youtube, GitBranch as TikTok, Globe } from 'lucide-react';

interface SocialMediaPlatform {
  id: string;
  platform: string;
  followers: number;
  profileLink: string;
}

interface SocialMediaInputProps {
  platforms: SocialMediaPlatform[];
  onPlatformsChange: (platforms: SocialMediaPlatform[]) => void;
  className?: string;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({
  platforms,
  onPlatformsChange,
  className = ""
}) => {
  const platformOptions = [
    { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { value: 'tiktok', label: 'TikTok', icon: TikTok, color: 'text-gray-900' },
    { value: 'facebook', label: 'Facebook', icon: Globe, color: 'text-blue-600' },
    { value: 'twitter', label: 'Twitter', icon: Globe, color: 'text-blue-400' },
    { value: 'linkedin', label: 'LinkedIn', icon: Globe, color: 'text-blue-700' },
    { value: 'autre', label: 'Autre', icon: Globe, color: 'text-gray-600' }
  ];

  const addPlatform = () => {
    const newPlatform: SocialMediaPlatform = {
      id: Date.now().toString(),
      platform: '',
      followers: 0,
      profileLink: ''
    };
    onPlatformsChange([...platforms, newPlatform]);
  };

  const removePlatform = (id: string) => {
    onPlatformsChange(platforms.filter(p => p.id !== id));
  };

  const updatePlatform = (id: string, field: keyof SocialMediaPlatform, value: string | number) => {
    onPlatformsChange(
      platforms.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getPlatformIcon = (platformValue: string) => {
    const platform = platformOptions.find(p => p.value === platformValue);
    if (!platform) return Globe;
    return platform.icon;
  };

  const getPlatformColor = (platformValue: string) => {
    const platform = platformOptions.find(p => p.value === platformValue);
    return platform?.color || 'text-gray-600';
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {platforms.map((platform, index) => {
          const IconComponent = getPlatformIcon(platform.platform);
          const iconColor = getPlatformColor(platform.platform);
          const isValidUrl = !platform.profileLink || validateUrl(platform.profileLink);

          return (
            <div key={platform.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`h-5 w-5 ${iconColor}`} />
                  <span className="font-medium text-gray-900">Plateforme {index + 1}</span>
                </div>
                {platforms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlatform(platform.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Platform Selection */}
                <div className="input-group">
                  <label className="input-label">
                    Nom de la plateforme <span className="required">*</span>
                  </label>
                  <select
                    value={platform.platform}
                    onChange={(e) => updatePlatform(platform.id, 'platform', e.target.value)}
                    className="input-modern"
                    required
                  >
                    <option value="">Sélectionner une plateforme</option>
                    {platformOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Followers Count */}
                <div className="input-group">
                  <label className="input-label">
                    Nombre d'abonnés <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={platform.followers || ''}
                    onChange={(e) => updatePlatform(platform.id, 'followers', parseInt(e.target.value) || 0)}
                    className="input-modern"
                    placeholder="ex: 10000"
                    required
                  />
                </div>

                {/* Profile Link */}
                <div className="input-group">
                  <label className="input-label">
                    Lien du profil <span className="required">*</span>
                  </label>
                  <input
                    type="url"
                    value={platform.profileLink}
                    onChange={(e) => updatePlatform(platform.id, 'profileLink', e.target.value)}
                    className={`input-modern ${!isValidUrl ? 'border-red-300 bg-red-50' : ''}`}
                    placeholder="https://..."
                    required
                  />
                  {!isValidUrl && platform.profileLink && (
                    <p className="mt-1 text-sm text-red-600">
                      Veuillez entrer une URL valide
                    </p>
                  )}
                </div>
              </div>

              {/* Platform Preview */}
              {platform.platform && platform.profileLink && isValidUrl && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-6 w-6 ${iconColor}`} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {platformOptions.find(p => p.value === platform.platform)?.label}
                      </p>
                      <p className="text-sm text-gray-600">
                        {platform.followers.toLocaleString()} abonnés
                      </p>
                    </div>
                    <a
                      href={platform.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      Voir le profil →
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Platform Button */}
      <button
        type="button"
        onClick={addPlatform}
        className="mt-4 w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Ajouter une plateforme
      </button>

      {platforms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Globe className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>Aucune plateforme ajoutée</p>
          <p className="text-sm">Cliquez sur "Ajouter une plateforme" pour commencer</p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaInput;