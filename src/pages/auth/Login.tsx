import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, Eye, EyeOff, Zap, Star, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { user, login } = useAuth();

  // If already logged in, redirect to appropriate dashboard
  if (user) {
    if (user.role === 'brand') return <Navigate to="/brand/dashboard" />;
    if (user.role === 'influencer') return <Navigate to="/influencer/dashboard" />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        toast.error(result.error || 'Échec de la connexion');
      }
    } catch (error) {
      toast.error('Une erreur inattendue s\'est produite');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoAccounts = [
    { 
      email: 'marque@example.com', 
      role: 'Marque', 
      gradient: 'from-purple-600 to-blue-600',
      icon: <Zap size={20} />,
      description: 'Créer des campagnes & trouver des influenceurs'
    },
    { 
      email: 'influenceur@example.com', 
      role: 'Influenceur', 
      gradient: 'from-pink-600 to-red-600',
      icon: <Star size={20} />,
      description: 'Présenter du contenu & gagner de l\'argent'
    },
    { 
      email: 'admin@example.com', 
      role: 'Admin', 
      gradient: 'from-indigo-600 to-purple-600',
      icon: <Heart size={20} />,
      description: 'Gérer la plateforme & les utilisateurs'
    }
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
          Bienvenue sur <span className="text-gradient">InfluMaroc</span>
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Connectez-vous avec les meilleures marques et influenceurs du Maroc
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="form-modern">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="input-modern peer"
                placeholder=" "
              />
              <label 
                htmlFor="email"
                className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                  emailFocused || email 
                    ? 'top-2 text-xs text-purple-600 transform scale-90' 
                    : 'top-4 text-gray-500'
                }`}
              >
                Adresse email
              </label>
            </div>

            <div className="relative">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="input-modern pr-14 peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="password"
                  className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                    passwordFocused || password 
                      ? 'top-2 text-xs text-purple-600 transform scale-90' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-lg"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-900 font-medium">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-gradient hover:opacity-80 transition-opacity">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient w-full text-lg font-bold"
              >
                {isSubmitting ? <LoadingSpinner size="sm" color="white" /> : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Essayer les comptes de démonstration</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {demoAccounts.map((account, index) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('password');
                  }}
                  className={`w-full flex items-center justify-between p-6 border border-transparent rounded-2xl shadow-lg bg-gradient-to-r ${account.gradient} text-white font-semibold hover:scale-105 transition-all duration-300 group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-xl bg-white/20 mr-4 group-hover:scale-110 transition-transform duration-300">
                      {account.icon}
                    </div>
                    <div className="text-left">
                      <span className="block text-lg font-bold">Se connecter en tant que {account.role}</span>
                      <span className="block text-sm opacity-90">{account.description}</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-white transition-colors"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className="font-semibold text-gradient hover:opacity-80 transition-opacity">
                S'inscrire maintenant
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;