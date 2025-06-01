import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, MessageSquare, User } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-4 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {sortedConversations.length === 0 ? (
            <div className="py-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-gray-500">
                {searchTerm
                  ? 'No conversations found matching your search.'
                  : 'No conversations yet.'}
              </p>
            </div>
          ) : (
            sortedConversations.map((conversation) => {
              // Find the other participant (not the current user)
              const otherParticipant = conversation.participants.find(
                (p) => p.id !== user?.id
              );

              return (
                <Link
                  key={conversation.id}
                  to={`/messages/${conversation.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6 flex items-center">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 px-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-purple-600 truncate">
                            {otherParticipant?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {conversation.lastMessage &&
                              formatTimestamp(
                                conversation.lastMessage.timestamp
                              )}
                          </p>
                        </div>
                        <div className="mt-1 flex justify-between">
                          <p
                            className={`text-sm ${
                              conversation.unreadCount > 0
                                ? 'font-semibold text-gray-900'
                                : 'text-gray-500'
                            } truncate`}
                          >
                            {conversation.lastMessage?.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {conversation.unreadCount}
                            </span>
                          )}
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
