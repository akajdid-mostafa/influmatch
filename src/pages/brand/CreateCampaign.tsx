import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, DollarSign, Users, Target, FileText, Globe, Instagram, Youtube, GitBranch as TikTok } from 'lucide-react';
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Campaign</h1>
        <p className="mt-2 text-sm text-gray-600">
          Set up your influencer marketing campaign in a few simple steps
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          {[1, 2, 3, 4].map((number) => (
            <div
              key={number}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step >= number
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-500'
              }`}
            >
              {number}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? 'text-purple-600' : 'text-gray-500'}>Campaign Details</span>
          <span className={step >= 2 ? 'text-purple-600' : 'text-gray-500'}>Budget & Timeline</span>
          <span className={step >= 3 ? 'text-purple-600' : 'text-gray-500'}>Requirements</span>
          <span className={step >= 4 ? 'text-purple-600' : 'text-gray-500'}>Guidelines</span>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Campaign Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Campaign Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="e.g., Summer Collection Launch"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Campaign Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Describe your campaign goals and expectations..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Objectives <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Brand Awareness',
                    'Product Launch',
                    'Sales Generation',
                    'Community Engagement',
                    'Content Creation',
                    'Lead Generation'
                  ].map((objective) => (
                    <label
                      key={objective}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        objectives.includes(objective)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={objectives.includes(objective)}
                        onChange={() => handleObjectiveToggle(objective)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm">{objective}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Budget and Timeline */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700">
                    Minimum Budget <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="budgetMin"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(e.target.value)}
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="0"
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700">
                    Maximum Budget <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="budgetMax"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="0"
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="submissionDeadline" className="block text-sm font-medium text-gray-700">
                  Content Submission Deadline
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="submissionDeadline"
                    value={submissionDeadline}
                    onChange={(e) => setSubmissionDeadline(e.target.value)}
                    className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Optional. If not specified, content will be due by the end date.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 3: Requirements */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Niches <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {niches.map((niche) => (
                    <label
                      key={niche}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedNiches.includes(niche)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedNiches.includes(niche)}
                        onChange={() => handleNicheToggle(niche)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm">{niche}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="minFollowers" className="block text-sm font-medium text-gray-700">
                  Minimum Followers <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="minFollowers"
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., 10000"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platforms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <label
                      key={platform.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(platform.id)}
                        onChange={() => handlePlatformToggle(platform.id)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 flex items-center">
                        <platform.icon className="h-5 w-5 mr-2" />
                        {platform.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="locations" className="block text-sm font-medium text-gray-700">
                  Target Locations
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="locations"
                    value={locations.join(', ')}
                    onChange={(e) => setLocations(e.target.value.split(',').map(l => l.trim()))}
                    className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., United States, Canada, United Kingdom"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Optional. Leave empty to target influencers worldwide.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 4: Content Guidelines */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="contentGuidelines" className="block text-sm font-medium text-gray-700">
                  Content Guidelines <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contentGuidelines"
                  rows={4}
                  value={contentGuidelines}
                  onChange={(e) => setContentGuidelines(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Describe what type of content you're looking for..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do's <span className="text-red-500">*</span>
                </label>
                {dosList.map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleDoListChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      placeholder={`Do #${index + 1}`}
                    />
                    {dosList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDoItem(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDoItem}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  + Add another do
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Don'ts <span className="text-red-500">*</span>
                </label>
                {dontsList.map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleDontListChange(index, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      placeholder={`Don't #${index + 1}`}
                    />
                    {dontsList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDontItem(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDontItem}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                >
                  + Add another don't
                </button>
              </div>
              
              <div>
                <label htmlFor="references" className="block text-sm font-medium text-gray-700">
                  Reference Content
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={references.join(', ')}
                    onChange={(e) => setReferences(e.target.value.split(',').map(r => r.trim()))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Add links to example content you like..."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Optional. Add links to content that can serve as inspiration.
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <LoadingSpinner size="sm" color="white" /> : 'Create Campaign'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;