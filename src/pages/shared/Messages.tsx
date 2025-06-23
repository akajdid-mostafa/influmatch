import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, MessageSquare, User, Sparkles } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Conversation } from '../../types';

const Messages = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call to fetch conversations
    const fetchConversations = async () => {
      try {
        // In a real app, this would be an actual API call
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay

        // Mock data for demo purposes
        const mockConversations: Conversation[] = [
          {
            id: '1',
            participants: [
              {
                id: 1,
                name: 'Acme Brand',
                email: 'brand@example.com',
                role: 'brand',
              },
              {
                id: 2,
                name: 'Jane Influencer',
                email: 'influencer@example.com',
                role: 'influencer',
              },
            ],
            lastMessage: {
              id: '101',
              conversationId: '1',
              senderId: 1,
              content:
                'Hi Jane, we would love to work with you on our summer campaign!',
              timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
              read: false,
            },
            unreadCount: 1,
            updatedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          },
          {
            id: '2',
            participants: [
              {
                id: 1,
                name: 'Acme Brand',
                email: 'brand@example.com',
                role: 'brand',
              },
              {
                id: 3,
                name: 'John Creator',
                email: 'john@example.com',
                role: 'influencer',
              },
            ],
            lastMessage: {
              id: '201',
              conversationId: '2',
              senderId: 3,
              content:
                'Thanks for your offer, Ive reviewed the campaign details and Im interested.',
              timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              read: true,
            },
            unreadCount: 0,
            updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          },
          {
            id: '3',
            participants: [
              {
                id: 4,
                name: 'Tech Brand',
                email: 'tech@example.com',
                role: 'brand',
              },
              {
                id: 2,
                name: 'Jane Influencer',
                email: 'influencer@example.com',
                role: 'influencer',
              },
            ],
            lastMessage: {
              id: '301',
              conversationId: '3',
              senderId: 2,
              content:
                "I've just posted the review of your product, here's the link to check it out.",
              timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              read: true,
            },
            unreadCount: 0,
            updatedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          },
        ];

        setConversations(mockConversations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((convo) => {
    if (!searchTerm) return true;

    // Get the other participant (not the current user)
    const otherParticipant = convo.participants.find((p) => p.id !== user?.id);

    return (
      otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convo.lastMessage?.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // Sort conversations by updatedAt date, most recent first
  const sortedConversations = [...filteredConversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mr-6 float-animation">
              <MessageSquare className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                <span className="text-gradient">Messages</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Connect and collaborate with your partners</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="search-modern">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-4 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-transparent backdrop-blur-10px transition-all duration-300"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100/50">
          {sortedConversations.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <p className="text-gray-500 text-xl font-semibold">
                {searchTerm
                  ? 'No conversations found matching your search.'
                  : 'No conversations yet.'}
              </p>
              <p className="text-gray-400 mt-2">
                Start connecting with brands and influencers to begin collaborating!
              </p>
            </div>
          ) : (
            sortedConversations.map((conversation, index) => {
              // Find the other participant (not the current user)
              const otherParticipant = conversation.participants.find(
                (p) => p.id !== user?.id
              );

              return (
                <Link
                  key={conversation.id}
                  to={`/messages/${conversation.id}`}
                  className="block hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="px-8 py-6 flex items-center">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="avatar-story">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
                            <User className="h-8 w-8 text-gray-500" />
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 px-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-lg font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                            {otherParticipant?.name}
                          </p>
                          <p className="text-sm text-gray-500 font-medium">
                            {conversation.lastMessage &&
                              formatTimestamp(
                                conversation.lastMessage.timestamp
                              )}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p
                            className={`text-lg leading-relaxed ${
                              conversation.unreadCount > 0
                                ? 'font-semibold text-gray-900'
                                : 'text-gray-600'
                            } truncate`}
                          >
                            {conversation.lastMessage?.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg animate-pulse">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            otherParticipant?.role === 'brand'
                              ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800'
                              : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                          }`}>
                            {otherParticipant?.role === 'brand' ? '🏢 Brand' : '⭐ Creator'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;