import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Brand Pages
import BrandDashboard from './pages/brand/Dashboard';
import CreateCampaign from './pages/brand/CreateCampaign';
import ManageCampaigns from './pages/brand/ManageCampaigns';
import FindInfluencers from './pages/brand/FindInfluencers';

// Influencer Pages
import InfluencerDashboard from './pages/influencer/Dashboard';
import CampaignRequests from './pages/influencer/CampaignRequests';
import InfluencerProfile from './pages/influencer/Profile';
import EditProfile from './pages/influencer/EditProfile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import CampaignModeration from './pages/admin/CampaignModeration';

// Shared Pages
import Messages from './pages/shared/Messages';
import Conversation from './pages/shared/Conversation';
import NotFound from './pages/shared/NotFound';

// Layout Components
import ProtectedRoute from './components/layout/ProtectedRoute';
import BrandLayout from './components/layout/BrandLayout';
import InfluencerLayout from './components/layout/InfluencerLayout';
import AdminLayout from './components/layout/AdminLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Brand Routes */}
            <Route element={<ProtectedRoute allowedRoles={['brand']} />}>
              <Route element={<BrandLayout />}>
                <Route path="/brand/dashboard" element={<BrandDashboard />} />
                <Route path="/brand/create-campaign" element={<CreateCampaign />} />
                <Route path="/brand/campaigns" element={<ManageCampaigns />} />
                <Route path="/brand/find-influencers" element={<FindInfluencers />} />
              </Route>
            </Route>
            
            {/* Influencer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['influencer']} />}>
              <Route element={<InfluencerLayout />}>
                <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
                <Route path="/influencer/requests" element={<CampaignRequests />} />
                <Route path="/influencer/profile" element={<InfluencerProfile />} />
                <Route path="/influencer/edit-profile" element={<EditProfile />} />
              </Route>
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/campaigns" element={<CampaignModeration />} />
              </Route>
            </Route>
            
            {/* Shared Routes (Protected but accessible by multiple roles) */}
            <Route element={<ProtectedRoute allowedRoles={['brand', 'influencer', 'admin']} />}>
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:conversationId" element={<Conversation />} />
            </Route>
            
            {/* Redirect root to login */}
            <Route path="/" element={<Login />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;