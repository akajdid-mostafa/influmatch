import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type UserRole = 'brand' | 'influencer';

const Register = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('influencer');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      toast.error('Please fill in all required fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
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
      toast.error('Please select your industry');
      return;
    }
    
    if (activeRole === 'influencer' && (!niche || !instagramHandle)) {
      toast.error('Please fill in all required fields');
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
        toast.error(result.error || 'Registration failed');
      } else {
        toast.success('Registration successful!');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShoppingBag className="text-purple-600" size={40} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join InfluMatch to connect and collaborate
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Selection */}
          <div className="flex rounded-md shadow-sm mb-6">
            <button
              type="button"
              onClick={() => setActiveRole('influencer')}
              className={`relative w-1/2 py-2 px-4 text-sm font-medium rounded-l-md focus:z-10 ${
                activeRole === 'influencer'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              I'm an Influencer
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('brand')}
              className={`relative w-1/2 py-2 px-4 text-sm font-medium rounded-r-md focus:z-10 ${
                activeRole === 'brand'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              I'm a Brand
            </button>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {activeRole === 'brand' ? 'Company Name' : 'Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Brand-specific fields */}
                {activeRole === 'brand' && (
                  <>
                    <div>
                      <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
                        Company Website
                      </label>
                      <div className="mt-1">
                        <input
                          id="companyWebsite"
                          name="companyWebsite"
                          type="url"
                          value={companyWebsite}
                          onChange={(e) => setCompanyWebsite(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <select
                          id="industry"
                          name="industry"
                          required
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                          <option value="">Select an industry</option>
                          <option value="fashion">Fashion & Apparel</option>
                          <option value="beauty">Beauty & Cosmetics</option>
                          <option value="fitness">Fitness & Health</option>
                          <option value="food">Food & Beverage</option>
                          <option value="technology">Technology</option>
                          <option value="travel">Travel & Lifestyle</option>
                          <option value="gaming">Gaming & Entertainment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Influencer-specific fields */}
                {activeRole === 'influencer' && (
                  <>
                    <div>
                      <label htmlFor="niche" className="block text-sm font-medium text-gray-700">
                        Primary Niche <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <select
                          id="niche"
                          name="niche"
                          required
                          value={niche}
                          onChange={(e) => setNiche(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                          <option value="">Select your niche</option>
                          <option value="fashion">Fashion</option>
                          <option value="beauty">Beauty</option>
                          <option value="fitness">Fitness</option>
                          <option value="food">Food</option>
                          <option value="tech">Technology</option>
                          <option value="travel">Travel</option>
                          <option value="gaming">Gaming</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="parenting">Parenting</option>
                          <option value="business">Business</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700">
                        Instagram Handle <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">@</span>
                        </div>
                        <input
                          type="text"
                          name="instagramHandle"
                          id="instagramHandle"
                          required
                          value={instagramHandle}
                          onChange={(e) => setInstagramHandle(e.target.value)}
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-8 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="followersCount" className="block text-sm font-medium text-gray-700">
                        Followers Count
                      </label>
                      <div className="mt-1">
                        <input
                          id="followersCount"
                          name="followersCount"
                          type="number"
                          min="0"
                          value={followersCount}
                          onChange={(e) => setFollowersCount(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          placeholder="e.g., 10000"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <LoadingSpinner size="sm" color="white" /> : 'Register'}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;