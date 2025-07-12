import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import AuthImageSlider from '../../components/auth/AuthImageSlider'; // Import the new component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      toast.error("Une erreur inattendue s'est produite");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image Slider */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 relative">
        <AuthImageSlider />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="max-w-md w-full">
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

          <div className="mt-12 form-modern">
            <form className="space-y-8" onSubmit={handleSubmit}>
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-modern pr-12"
                    placeholder="Votre mot de passe"
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

            {/* Removed demo accounts for cleaner login form as per image description */}
            {/* <div className="mt-8">
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
            </div> */}

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
    </div>
  );
};

export default Login;
