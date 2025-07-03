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

        // Mock data for demo purposes - Updated for Moroccan market
        const mockConversations: Conversation[] = [
          {
            id: '1',
            participants: [
              {
                id: 1,
                name: 'Marjane Market',
                email: 'marque@example.com',
                role: 'brand',
              },
              {
                id: 2,
                name: 'Saad Lamjarred',
                email: 'influenceur@example.com',
                role: 'influencer',
              },
            ],
            lastMessage: {
              id: '101',
              conversationId: '1',
              senderId: 1,
              content:
                'Bonjour Saad, nous aimerions collaborer avec vous pour notre campagne Ramadan !',
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
                name: 'Argan d\'Or',
                email: 'contact@argandor.ma',
                role: 'brand',
              },
              {
                id: 3,
                name: 'Dounia Batma',
                email: 'dounia@example.com',
                role: 'influencer',
              },
            ],
            lastMessage: {
              id: '201',
              conversationId: '2',
              senderId: 3,
              content:
                'Merci pour votre offre, j\'ai examiné les détails de la campagne et je suis intéressée.',
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
                name: 'Atlas Telecom',
                email: 'marketing@atlastelecom.ma',
                role: 'brand',
              },
              {
                id: 2,
                name: 'Saad Lamjarred',
                email: 'influenceur@example.com',
                role: 'influencer',
              },
            ],
            lastMessage: {
              id: '301',
              conversationId: '3',
              senderId: 2,
              content:
                "Je viens de publier la review de votre nouveau service, voici le lien pour le consulter.",
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

    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays}j`;

    return date.toLocaleDateString('fr-FR');
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
              <p className="text-gray-600 mt-2 text-lg">Connectez-vous et collaborez avec vos partenaires</p>
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
              placeholder="Rechercher des conversations..."
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
                  ? 'Aucune conversation trouvée correspondant à votre recherche.'
                  : 'Aucune conversation pour le moment.'}
              </p>
              <p className="text-gray-400 mt-2">
                Commencez à vous connecter avec des marques et des influenceurs pour commencer à collaborer !
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
                            {otherParticipant?.role === 'brand' ? '🏢 Marque' : '⭐ Créateur'}
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