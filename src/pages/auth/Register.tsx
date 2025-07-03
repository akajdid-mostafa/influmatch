import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, Eye, EyeOff, Zap, Star, ShoppingBag, User, Mail, Lock, Building, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type UserRole = 'brand' | 'influencer';

const Register = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('influencer');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Brand specific fields
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  
  // Influencer specific fields
  const [niche, setNiche] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [followersCount, setFollowersCount] = useState('');
  
  const { user, register } = useAuth();

  // If already logged in, redirect to appropriate dashboard
  if (user) {
    if (user.role === 'brand') return <Navigate to="/brand/dashboard" />;
    if (user.role === 'influencer') return <Navigate to="/influencer/dashboard" />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
  }

  const validateStep1 = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return false;
    }
    
    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }
    
    // Validate step 2 fields based on role
    if (activeRole === 'brand' && !industry) {
      toast.error('Veuillez sélectionner votre secteur d\'activité');
      return;
    }
    
    if (activeRole === 'influencer' && (!niche || !instagramHandle)) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const userData = {
        name,
        email,
        password,
        role: activeRole,
        ...(activeRole === 'brand' 
          ? { companyWebsite, industry } 
          : { niche, instagramHandle, followersCount: parseInt(followersCount) || 0 }),
      };
      
      const result = await register(userData);
      
      if (!result.success) {
        toast.error(result.error || 'Échec de l\'inscription');
      } else {
        toast.success('Inscription réussie !');
      }
    } catch (error) {
      toast.error('Une erreur inattendue s\'est produite');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const moroccanIndustries = [
    'Mode et Textile',
    'Beauté et Cosmétiques',
    'Fitness et Santé',
    'Alimentation et Boissons',
    'Technologie',
    'Voyage et Tourisme',
    'Jeux et Divertissement',
    'Artisanat Marocain',
    'Immobilier',
    'Automobile',
    'Autre'
  ];

  const moroccanNiches = [
    'Mode',
    'Beauté',
    'Lifestyle',
    'Tech',
    'Gaming',
    'Cuisine Marocaine',
    'Voyage',
    'Fitness',
    'Business',
    'Art et Artisanat',
    'Éducation',
    'Divertissement',
    'Santé',
    'Parentalité',
    'Culture Marocaine',
    'Autre'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl float-animation">
            <Sparkles className="text-white" size={40} />
          </div>
        </div>
        <h2 className="text-center text-4xl font-extrabold text-gray-900 text-shadow">
          Rejoignez <span className="text-gradient">InfluMaroc</span>
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Créez votre compte et commencez à collaborer
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="form-modern">
          {/* Enhanced Role Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Choisissez votre rôle</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setActiveRole('influencer')}
                className={`group relative flex flex-col items-center p-6 border-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  activeRole === 'influencer'
                    ? 'border-transparent bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  activeRole === 'influencer'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <Star className={`h-6 w-6 ${activeRole === 'influencer' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <span className={`font-semibold transition-colors ${
                  activeRole === 'influencer' ? 'text-gradient' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  Je suis Créateur
                </span>
                <span className="text-xs text-gray-500 mt-1 text-center">Partager du contenu & gagner de l'argent</span>
                {activeRole === 'influencer' && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Zap size={14} className="text-white" />
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setActiveRole('brand')}
                className={`group relative flex flex-col items-center p-6 border-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  activeRole === 'brand'
                    ? 'border-transparent bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  activeRole === 'brand'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <ShoppingBag className={`h-6 w-6 ${activeRole === 'brand' ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <span className={`font-semibold transition-colors ${
                  activeRole === 'brand' ? 'text-gradient' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  Je suis une Marque
                </span>
                <span className="text-xs text-gray-500 mt-1 text-center">Trouver des créateurs & lancer des campagnes</span>
                {activeRole === 'brand' && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Zap size={14} className="text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {step === 1 ? (
              <>
                {/* Name Input */}
                <div className="input-group">
                  <label htmlFor="name" className="input-label">
                    {activeRole === 'brand' ? 'Nom de l\'entreprise' : 'Nom complet'} <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-modern"
                      placeholder={activeRole === 'brand' ? 'Nom de votre entreprise' : 'Votre nom complet'}
                    />
                    {activeRole === 'brand' ? (
                      <Building className="input-icon h-5 w-5" />
                    ) : (
                      <User className="input-icon h-5 w-5" />
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    Adresse email <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-modern"
                      placeholder="votre@email.com"
                    />
                    <Mail className="input-icon h-5 w-5" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="input-group">
                  <label htmlFor="password" className="input-label">
                    Mot de passe <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-modern pr-12"
                      placeholder="Minimum 6 caractères"
                    />
                    <Lock className="input-icon h-5 w-5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="input-group">
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirmer le mot de passe <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-modern pr-12"
                      placeholder="Répétez votre mot de passe"
                    />
                    <Lock className="input-icon h-5 w-5" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-gradient w-full text-lg font-bold"
                  >
                    Continuer →
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Brand-specific fields */}
                {activeRole === 'brand' && (
                  <>
                    <div className="input-group">
                      <label htmlFor="companyWebsite" className="input-label">
                        Site web de l'entreprise
                      </label>
                      <div className="input-with-icon">
                        <input
                          id="companyWebsite"
                          name="companyWebsite"
                          type="url"
                          value={companyWebsite}
                          onChange={(e) => setCompanyWebsite(e.target.value)}
                          className="input-modern"
                          placeholder="https://votre-site.com"
                        />
                        <Globe className="input-icon h-5 w-5" />
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="industry" className="input-label">
                        Secteur d'activité <span className="required">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        required
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="select-modern"
                      >
                        <option value="">Sélectionner un secteur</option>
                        {moroccanIndustries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Influencer-specific fields */}
                {activeRole === 'influencer' && (
                  <>
                    <div className="input-group">
                      <label htmlFor="niche" className="input-label">
                        Niche principale <span className="required">*</span>
                      </label>
                      <select
                        id="niche"
                        name="niche"
                        required
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="select-modern"
                      >
                        <option value="">Sélectionner votre niche</option>
                        {moroccanNiches.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group">
                      <label htmlFor="instagramHandle" className="input-label">
                        Nom d'utilisateur Instagram <span className="required">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-semibold">@</span>
                        </div>
                        <input
                          type="text"
                          name="instagramHandle"
                          id="instagramHandle"
                          required
                          value={instagramHandle}
                          onChange={(e) => setInstagramHandle(e.target.value)}
                          className="input-modern pl-12"
                          placeholder="votre_nom_utilisateur"
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label htmlFor="followersCount" className="input-label">
                        Nombre d'abonnés
                      </label>
                      <input
                        id="followersCount"
                        name="followersCount"
                        type="number"
                        min="0"
                        value={followersCount}
                        onChange={(e) => setFollowersCount(e.target.value)}
                        className="input-modern"
                        placeholder="ex: 10000"
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="btn-secondary flex-1"
                  >
                    ← Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gradient flex-1 text-lg font-bold"
                  >
                    {isSubmitting ? <LoadingSpinner size="sm" color="white" /> : '🚀 Créer le compte'}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-semibold text-gradient hover:opacity-80 transition-opacity">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;