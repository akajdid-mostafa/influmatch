import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Auth Pages
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));

// Brand Pages
const BrandDashboard = React.lazy(() => import('./pages/brand/Dashboard'));
const CreateCampaign = React.lazy(() => import('./pages/brand/CreateCampaign'));
const ManageCampaigns = React.lazy(() => import('./pages/brand/ManageCampaigns'));
const FindInfluencers = React.lazy(() => import('./pages/brand/FindInfluencers'));

// Influencer Pages
const InfluencerDashboard = React.lazy(() => import('./pages/influencer/Dashboard'));
const CampaignRequests = React.lazy(() => import('./pages/influencer/CampaignRequests'));
const InfluencerProfile = React.lazy(() => import('./pages/influencer/Profile'));
const EditProfile = React.lazy(() => import('./pages/influencer/EditProfile'));

// Admin Pages
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const CampaignModeration = React.lazy(() => import('./pages/admin/CampaignModeration'));

// Shared Pages
const Messages = React.lazy(() => import('./pages/shared/Messages'));
const Conversation = React.lazy(() => import('./pages/shared/Conversation'));
const NotFound = React.lazy(() => import('./pages/shared/NotFound'));

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
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;