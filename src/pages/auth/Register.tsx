import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Building, Globe, Tag, Plus, X } from 'lucide-react';
import { TagInput } from '../../components/ui/TagInput';
import { SocialMediaInput } from '../../components/ui/SocialMediaInput';

interface SocialPlatform {
  id: string;
  platform: string;
  followers: number;
  profileUrl: string;
}

export default function Register() {
  const [userType, setUserType] = useState<'influencer' | 'brand'>('influencer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    website: '',
  });
  const [niches, setNiches] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nichesSuggestions = [
    'Mode', 'Beauté', 'Tech', 'Voyage', 'Cuisine', 'Sport', 'Lifestyle',
    'Gaming', 'Musique', 'Art', 'Photographie', 'Fitness', 'Santé'
  ];

  const sectorsSuggestions = [
    'Technologie', 'Mode', 'Beauté', 'Alimentation', 'Automobile',
    'Immobilier', 'Finance', 'Santé', 'Éducation', 'Divertissement'
  ];

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (userType === 'brand') {
      if (!formData.company.trim()) {
        newErrors.company = 'Le nom de l\'entreprise est requis';
      }
      
      if (formData.website && !validateUrl(formData.website)) {
        newErrors.website = 'URL du site web invalide';
      }
      
      if (sectors.length === 0) {
        newErrors.sectors = 'Au moins un secteur d\'activité est requis';
      }
    }

    if (userType === 'influencer') {
      if (niches.length === 0) {
        newErrors.niches = 'Au moins une niche est requise';
      }
      
      if (socialPlatforms.length === 0) {
        newErrors.socialPlatforms = 'Au moins une plateforme sociale est requise';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', {
        ...formData,
        userType,
        niches: userType === 'influencer' ? niches : undefined,
        sectors: userType === 'brand' ? sectors : undefined,
        socialPlatforms: userType === 'influencer' ? socialPlatforms : undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez notre plateforme d'influence marketing
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType('influencer')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                userType === 'influencer'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Influenceur
            </button>
            <button
              type="button"
              onClick={() => setUserType('brand')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                userType === 'brand'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Marque
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="input-group">
              <label className="input-label">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-modern pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Votre nom complet"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="input-group">
              <label className="input-label">
                Adresse email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-modern pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label className="input-label">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-modern pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Votre mot de passe"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="input-group">
              <label className="input-label">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`input-modern pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirmer votre mot de passe"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Brand-specific fields */}
            {userType === 'brand' && (
              <>
                {/* Company Name */}
                <div className="input-group">
                  <label className="input-label">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`input-modern pl-10 ${errors.company ? 'border-red-500' : ''}`}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                {/* Website URL */}
                <div className="input-group">
                  <label className="input-label">
                    Site web de l'entreprise
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={`input-modern pl-10 ${errors.website ? 'border-red-500' : ''}`}
                      placeholder="https://votre-site.com"
                    />
                  </div>
                  {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                </div>

                {/* Sectors of Activity */}
                <div className="input-group">
                  <label className="input-label">
                    Secteurs d'activité <span className="text-red-500">*</span>
                  </label>
                  <TagInput
                    tags={sectors}
                    onTagsChange={setSectors}
                    suggestions={sectorsSuggestions}
                    placeholder="Ajouter un secteur d'activité"
                    maxTags={5}
                  />
                  {errors.sectors && <p className="text-red-500 text-sm mt-1">{errors.sectors}</p>}
                </div>
              </>
            )}

            {/* Influencer-specific fields */}
            {userType === 'influencer' && (
              <>
                {/* Niches */}
                <div className="input-group">
                  <label className="input-label">
                    Niches <span className="text-red-500">*</span>
                  </label>
                  <TagInput
                    tags={niches}
                    onTagsChange={setNiches}
                    suggestions={nichesSuggestions}
                    placeholder="Ajouter une niche"
                    maxTags={5}
                  />
                  {errors.niches && <p className="text-red-500 text-sm mt-1">{errors.niches}</p>}
                </div>

                {/* Social Media Platforms */}
                <div className="input-group">
                  <label className="input-label">
                    Plateformes de réseaux sociaux <span className="text-red-500">*</span>
                  </label>
                  <SocialMediaInput
                    platforms={socialPlatforms}
                    onPlatformsChange={setSocialPlatforms}
                  />
                  {errors.socialPlatforms && <p className="text-red-500 text-sm mt-1">{errors.socialPlatforms}</p>}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Créer mon compte
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}