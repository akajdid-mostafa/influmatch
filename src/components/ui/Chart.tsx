import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  height?: number;
  showTrend?: boolean;
  trendValue?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  subtitle, 
  height = 200, 
  showTrend = false, 
  trendValue = 0 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const getY = (value: number) => {
    if (range === 0) return height / 2;
    return height - ((value - minValue) / range) * (height - 40) - 20;
  };

  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = getY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {showTrend && (
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            trendValue >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {trendValue >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {Math.abs(trendValue)}%
          </div>
        )}
      </div>
      
      <div className="relative">
        <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
            </linearGradient>
          </defs>
          
          {/* Area under curve */}
          <path
            d={`${pathData} L 100 ${height} L 0 ${height} Z`}
            fill="url(#chartGradient)"
            className="opacity-50"
          />
          
          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Gradient definition for line */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 100}
              cy={getY(point.value)}
              r="4"
              fill="white"
              stroke="#8B5CF6"
              strokeWidth="3"
              className="drop-shadow-sm hover:r-6 transition-all duration-300 cursor-pointer"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          {data.map((point, index) => (
            <span key={index} className="font-medium">{point.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

interface BarChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title, subtitle }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="card-modern p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-20 text-sm font-medium text-gray-700 truncate">
              {item.label}
            </div>
            <div className="flex-1 relative">
              <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    item.color || 'bg-gradient-to-r from-purple-500 to-pink-600'
                  }`}
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              </div>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
                {item.value.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DonutChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  centerValue?: string;
  centerLabel?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  title, 
  subtitle, 
  centerValue, 
  centerLabel 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const colors = [
    '#8B5CF6',
    '#EC4899',
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
  ];

  return (
    <div className="card-modern p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center space-x-8">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 42 42" className="transform -rotate-90">
            <circle
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke="#f3f4f6"
              strokeWidth="3"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke={colors[index % colors.length]}
                  strokeWidth="3"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              );
            })}
          </svg>
          
          {centerValue && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{centerValue}</span>
              {centerLabel && <span className="text-xs text-gray-500">{centerLabel}</span>}
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm font-medium text-gray-700 flex-1">{item.label}</span>
              <span className="text-sm font-bold text-gray-900">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};