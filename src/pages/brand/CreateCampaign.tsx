import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, DollarSign, Users, Target, FileText, Globe, Instagram, Youtube, GitBranch as TikTok, Sparkles, Zap, Star, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  // Campaign Details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState<string[]>([]);
  
  // Budget and Timeline
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');
  
  // Requirements
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [minFollowers, setMinFollowers] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  
  // Content Guidelines
  const [contentGuidelines, setContentGuidelines] = useState('');
  const [dosList, setDosList] = useState<string[]>(['']);
  const [dontsList, setDontsList] = useState<string[]>(['']);
  const [references, setReferences] = useState<string[]>(['']);

  const niches = [
    'Fashion', 'Beauty', 'Lifestyle', 'Tech', 'Gaming', 'Food',
    'Travel', 'Fitness', 'Business', 'Education', 'Entertainment', 'Art'
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'tiktok', name: 'TikTok', icon: TikTok }
  ];

  const handleObjectiveToggle = (objective: string) => {
    setObjectives(prev => 
      prev.includes(objective)
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    );
  };

  const handleNicheToggle = (niche: string) => {
    setSelectedNiches(prev => 
      prev.includes(niche)
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleDoListChange = (index: number, value: string) => {
    const newList = [...dosList];
    newList[index] = value;
    setDosList(newList);
  };

  const handleDontListChange = (index: number, value: string) => {
    const newList = [...dontsList];
    newList[index] = value;
    setDontsList(newList);
  };

  const addDoItem = () => {
    setDosList([...dosList, '']);
  };

  const addDontItem = () => {
    setDontsList([...dontsList, '']);
  };

  const removeDoItem = (index: number) => {
    const newList = dosList.filter((_, i) => i !== index);
    setDosList(newList);
  };

  const removeDontItem = (index: number) => {
    const newList = dontsList.filter((_, i) => i !== index);
    setDontsList(newList);
  };

  const validateStep1 = () => {
    if (!title || !description || objectives.length === 0) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!budgetMin || !budgetMax || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    if (parseFloat(budgetMin) > parseFloat(budgetMax)) {
      toast.error('Minimum budget cannot be greater than maximum budget');
      return false;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const deadline = submissionDeadline ? new Date(submissionDeadline) : null;
    
    if (end <= start) {
      toast.error('End date must be after start date');
      return false;
    }
    
    if (deadline && (deadline <= start || deadline >= end)) {
      toast.error('Submission deadline must be between start and end dates');
      return false;
    }
    
    return true;
  };

  const validateStep3 = () => {
    if (selectedNiches.length === 0 || !minFollowers || selectedPlatforms.length === 0) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentGuidelines || dosList.some(item => !item) || dontsList.some(item => !item)) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the campaign
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Campaign created successfully!');
      navigate('/brand/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepIcons = [
    { icon: Sparkles, gradient: 'from-blue-500 to-purple-600' },
    { icon: DollarSign, gradient: 'from-green-500 to-teal-600' },
    { icon: Target, gradient: 'from-orange-500 to-red-600' },
    { icon: Award, gradient: 'from-pink-500 to-rose-600' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl float-animation">
            <Zap className="text-white" size={40} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 text-shadow">
          Create Your <span className="text-gradient">Campaign</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Set up your influencer marketing campaign in a few simple steps
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {/* Enhanced Progress Steps */}
      <div className="card-modern p-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -z-10 rounded-full"></div>
          {[1, 2, 3, 4].map((number, index) => {
            const StepIcon = stepIcons[index].icon;
            return (
              <div
                key={number}
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  step >= number ? 'scale-110' : 'scale-100'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500 ${
                    step >= number
                      ? `bg-gradient-to-r ${stepIcons[index].gradient} shadow-xl`
                      : 'bg-gray-300'
                  }`}
                >
                  <StepIcon size={24} />
                </div>
                <span className={`mt-3 text-sm font-semibold transition-colors duration-300 ${
                  step >= number ? 'text-gradient' : 'text-gray-500'
                }`}>
                  Step {number}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <span className={`font-medium transition-colors ${step >= 1 ? 'text-gradient' : 'text-gray-500'}`}>Campaign Details</span>
          <span className={`font-medium transition-colors ${step >= 2 ? 'text-gradient' : 'text-gray-500'}`}>Budget & Timeline</span>
          <span className={`font-medium transition-colors ${step >= 3 ? 'text-gradient' : 'text-gray-500'}`}>Requirements</span>
          <span className={`font-medium transition-colors ${step >= 4 ? 'text-gradient' : 'text-gray-500'}`}>Guidelines</span>
        </div>
      </div>
      
      <div className="card-modern">
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {/* Step 1: Campaign Details */}
          {step === 1 && (
            <div className="space-y-8 page-transition">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Details</h2>
                <p className="text-gray-600">Tell us about your campaign vision and goals</p>
              </div>

              <div className="floating-label">
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-modern"
                  placeholder=" "
                />
                <label htmlFor="title">Campaign Title <span className="text-red-500">*</span></label>
              </div>
              
              <div className="floating-label">
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-modern resize-none"
                  placeholder=" "
                />
                <label htmlFor="description">Campaign Description <span className="text-red-500">*</span></label>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                  Campaign Objectives <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Brand Awareness', icon: '🎯', gradient: 'from-blue-500 to-purple-600' },
                    { name: 'Product Launch', icon: '🚀', gradient: 'from-green-500 to-teal-600' },
                    { name: 'Sales Generation', icon: '💰', gradient: 'from-yellow-500 to-orange-600' },
                    { name: 'Community Engagement', icon: '❤️', gradient: 'from-pink-500 to-red-600' },
                    { name: 'Content Creation', icon: '📸', gradient: 'from-purple-500 to-indigo-600' },
                    { name: 'Lead Generation', icon: '📈', gradient: 'from-teal-500 to-cyan-600' }
                  ].map((objective) => (
                    <label
                      key={objective.name}
                      className={`group relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        objectives.includes(objective.name)
                          ? 'border-transparent bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={objectives.includes(objective.name)}
                        onChange={() => handleObjectiveToggle(objective.name)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 transition-all duration-300 ${
                        objectives.includes(objective.name)
                          ? `bg-gradient-to-r ${objective.gradient} shadow-lg`
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        {objective.icon}
                      </div>
                      <span className={`font-semibold transition-colors ${
                        objectives.includes(objective.name) ? 'text-gradient' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {objective.name}
                      </span>
                      {objectives.includes(objective.name) && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                          <Star size={14} className="text-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Budget and Timeline */}
          {step === 2 && (
            <div className="space-y-8 page-transition">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget & Timeline</h2>
                <p className="text-gray-600">Set your investment and campaign duration</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="floating-label">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <input
                      type="number"
                      id="budgetMin"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      className="input-modern pl-14"
                      placeholder=" "
                      min="0"
                    />
                  </div>
                  <label htmlFor="budgetMin">Minimum Budget <span className="text-red-500">*</span></label>
                </div>
                
                <div className="floating-label">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <input
                      type="number"
                      id="budgetMax"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className="input-modern pl-14"
                      placeholder=" "
                      min="0"
                    />
                  </div>
                  <label htmlFor="budgetMax">Maximum Budget <span className="text-red-500">*</span></label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="floating-label">
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-modern"
                    placeholder=" "
                  />
                  <label htmlFor="startDate">Start Date <span className="text-red-500">*</span></label>
                </div>
                
                <div className="floating-label">
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-modern"
                    placeholder=" "
                  />
                  <label htmlFor="endDate">End Date <span className="text-red-500">*</span></label>
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="date"
                  id="submissionDeadline"
                  value={submissionDeadline}
                  onChange={(e) => setSubmissionDeadline(e.target.value)}
                  className="input-modern"
                  placeholder=" "
                />
                <label htmlFor="submissionDeadline">Content Submission Deadline</label>
                <p className="mt-2 text-sm text-gray-500">
                  Optional. If not specified, content will be due by the end date.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 3: Requirements */}
          {step === 3 && (
            <div className="space-y-8 page-transition">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirements</h2>
                <p className="text-gray-600">Define your ideal influencer criteria</p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                  Content Niches <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {niches.map((niche, index) => (
                    <label
                      key={niche}
                      className={`group flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedNiches.includes(niche)
                          ? 'border-transparent bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedNiches.includes(niche)}
                        onChange={() => handleNicheToggle(niche)}
                        className="sr-only"
                      />
                      <span className={`font-semibold text-center w-full transition-colors ${
                        selectedNiches.includes(niche) ? 'text-gradient' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {niche}
                      </span>
                      {selectedNiches.includes(niche) && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                          <Star size={12} className="text-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="floating-label">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <input
                    type="number"
                    id="minFollowers"
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(e.target.value)}
                    className="input-modern pl-14"
                    placeholder=" "
                    min="0"
                  />
                </div>
                <label htmlFor="minFollowers">Minimum Followers <span className="text-red-500">*</span></label>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                  Platforms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {platforms.map((platform, index) => (
                    <label
                      key={platform.id}
                      className={`group flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-transparent bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={() => handlePlatformToggle(platform.id)}
                        className="sr-only"
                      />
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                        selectedPlatforms.includes(platform.id)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <platform.icon className={`h-6 w-6 ${
                          selectedPlatforms.includes(platform.id) ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-semibold transition-colors ${
                        selectedPlatforms.includes(platform.id) ? 'text-gradient' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {platform.name}
                      </span>
                      {selectedPlatforms.includes(platform.id) && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                          <Star size={14} className="text-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="text"
                  id="locations"
                  value={locations.join(', ')}
                  onChange={(e) => setLocations(e.target.value.split(',').map(l => l.trim()))}
                  className="input-modern"
                  placeholder=" "
                />
                <label htmlFor="locations">Target Locations</label>
                <p className="mt-2 text-sm text-gray-500">
                  Optional. Leave empty to target influencers worldwide.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 4: Content Guidelines */}
          {step === 4 && (
            <div className="space-y-8 page-transition">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Guidelines</h2>
                <p className="text-gray-600">Define your content expectations and brand guidelines</p>
              </div>

              <div className="floating-label">
                <textarea
                  id="contentGuidelines"
                  rows={4}
                  value={contentGuidelines}
                  onChange={(e) => setContentGuidelines(e.target.value)}
                  className="input-modern resize-none"
                  placeholder=" "
                />
                <label htmlFor="contentGuidelines">Content Guidelines <span className="text-red-500">*</span></label>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                  Do's <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  {dosList.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleDoListChange(index, e.target.value)}
                        className="flex-1 input-modern"
                        placeholder={`Do #${index + 1}`}
                      />
                      {dosList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDoItem(index)}
                          className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDoItem}
                    className="btn-secondary"
                  >
                    + Add another do
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                  Don'ts <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  {dontsList.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleDontListChange(index, e.target.value)}
                        className="flex-1 input-modern"
                        placeholder={`Don't #${index + 1}`}
                      />
                      {dontsList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDontItem(index)}
                          className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDontItem}
                    className="btn-secondary"
                  >
                    + Add another don't
                  </button>
                </div>
              </div>
              
              <div className="floating-label">
                <input
                  type="text"
                  value={references.join(', ')}
                  onChange={(e) => setReferences(e.target.value.split(',').map(r => r.trim()))}
                  className="input-modern"
                  placeholder=" "
                />
                <label htmlFor="references">Reference Content</label>
                <p className="mt-2 text-sm text-gray-500">
                  Optional. Add links to content that can serve as inspiration.
                </p>
              </div>
            </div>
          )}
          
          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-100">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary"
              >
                ← Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary ml-auto"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary ml-auto"
              >
                {isSubmitting ? <LoadingSpinner size="sm" color="white" /> : '🚀 Create Campaign'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;