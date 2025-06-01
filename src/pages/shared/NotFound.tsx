import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Home, ShoppingBag } from 'lucide-react';

const NotFound = () => {
  const { user } = useAuth();

  // Determine where to redirect the user based on their role
  const getHomeLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'brand':
        return '/brand/dashboard';
      case 'influencer':
        return '/influencer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-purple-600" />
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">404</h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">Page not found</h2>
        <p className="mt-4 text-base text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex justify-center space-x-3">
          <Link
            to={getHomeLink()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;