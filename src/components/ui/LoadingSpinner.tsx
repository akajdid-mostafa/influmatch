interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner = ({ size = 'md', color = 'primary' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };


  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className={`absolute inset-0 rounded-full border-3 border-transparent ${
          color === 'primary' ? 'border-t-purple-600 border-r-pink-600' :
          color === 'secondary' ? 'border-t-teal-500 border-r-blue-500' :
          'border-t-white border-r-gray-300'
        } animate-spin`}></div>
        
        {/* Inner ring */}
        <div className={`absolute inset-1 rounded-full border-2 border-transparent ${
          color === 'primary' ? 'border-t-purple-400 border-l-pink-400' :
          color === 'secondary' ? 'border-t-teal-300 border-l-blue-300' :
          'border-t-gray-200 border-l-gray-100'
        } animate-spin opacity-60`} style={{ 
          animationDirection: 'reverse', 
          animationDuration: '1.2s' 
        }}></div>
        
        {/* Center dot */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div className={`w-1 h-1 rounded-full ${
            color === 'primary' ? 'bg-purple-600' :
            color === 'secondary' ? 'bg-teal-500' :
            'bg-white'
          } animate-pulse`}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;