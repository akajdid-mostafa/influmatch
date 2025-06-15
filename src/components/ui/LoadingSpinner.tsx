interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner = ({ size = 'md', color = 'primary' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-purple-600',
    secondary: 'text-teal-500',
    white: 'text-white',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} relative`}>
        <div className={`absolute inset-0 rounded-full border-2 border-transparent ${
          color === 'primary' ? 'border-t-purple-600 border-r-pink-600' :
          color === 'secondary' ? 'border-t-teal-500 border-r-blue-500' :
          'border-t-white border-r-gray-300'
        } animate-spin`}></div>
        <div className={`absolute inset-1 rounded-full border border-transparent ${
          color === 'primary' ? 'border-t-purple-400' :
          color === 'secondary' ? 'border-t-teal-300' :
          'border-t-gray-200'
        } animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;