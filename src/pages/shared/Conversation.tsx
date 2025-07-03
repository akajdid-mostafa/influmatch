import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Send, Image, Paperclip, User, Sparkles } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Conversation as ConversationType, Message } from '../../types';

const Conversation = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [conversation, setConversation] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate API call to fetch conversation details and messages
    const fetchConversationData = async () => {
      try {
        // In a real app, these would be actual API calls
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        // Mock conversation data - Updated for Moroccan market
        const mockConversation: ConversationType = {
          id: conversationId || '1',
          participants: [
            { id: 1, name: 'Marjane Market', email: 'marque@example.com', role: 'brand' },
            { id: 2, name: 'Saad Lamjarred', email: 'influenceur@example.com', role: 'influencer' }
          ],
          unreadCount: 0,
          updatedAt: new Date().toISOString()
        };
        
        // Mock messages data - Updated for Moroccan market
        const mockMessages: Message[] = [
          {
            id: '1',
            conversationId: conversationId || '1',
            senderId: 1,
            content: 'Bonjour Saad, nous aimerions collaborer avec vous pour notre campagne Ramadan !',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
            read: true
          },
          {
            id: '2',
            conversationId: conversationId || '1',
            senderId: 2,
            content: "Bonjour ! Je suis intéressé d'en savoir plus sur votre campagne. Quel type de contenu recherchez-vous ?",
            timestamp: new Date(Date.now() - 3600000 * 23).toISOString(), // 23 hours ago
            read: true
          },
          {
            id: '3',
            conversationId: conversationId || '1',
            senderId: 1,
            content: "Nous recherchons du contenu lifestyle mettant en valeur notre nouvelle collection Ramadan. Nous aurions besoin de 3 posts Instagram et 2 stories sur le mois prochain.",
            timestamp: new Date(Date.now() - 3600000 * 22).toISOString(), // 22 hours ago
            read: true
          },
          {
            id: '4',
            conversationId: conversationId || '1',
            senderId: 2,
            content: "Cela correspond parfaitement à mon style de contenu. Quelle est votre fourchette budgétaire pour cette campagne ?",
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
            read: true
          },
          {
            id: '5',
            conversationId: conversationId || '1',
            senderId: 1,
            content: 'Notre budget est de 15 000-25 000 MAD pour tous les livrables. Est-ce que cela vous convient ?',
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
            read: true
          },
          {
            id: '6',
            conversationId: conversationId || '1',
            senderId: 2,
            content: "Oui, ce budget me convient ! Je serais ravi de discuter des détails spécifiques et du calendrier plus en détail.",
            timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
            read: true
          }
        ];
        
        setConversation(mockConversation);
        setMessages(mockMessages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversation data:', error);
        setLoading(false);
      }
    };

    if (conversationId) {
      fetchConversationData();
    }
  }, [conversationId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    
    setSending(true);
    
    try {
      // In a real app, this would be an API call to send the message
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Create a new message object
      const newMessageObj: Message = {
        id: Date.now().toString(),
        conversationId: conversationId || '1',
        senderId: user.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      // Add the new message to the messages array
      setMessages(prevMessages => [...prevMessages, newMessageObj]);
      
      // Clear the input field
      setNewMessage('');
      
      setSending(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setSending(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Get the other participant (not the current user)
  const otherParticipant = conversation?.participants.find(p => p.id !== user?.id);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col card-modern overflow-hidden page-transition">
      {/* Enhanced Header */}
      <div className="px-8 py-6 border-b border-gray-100/50 flex items-center bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <a 
          href="/messages" 
          className="mr-6 flex-shrink-0 p-3 rounded-2xl text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-all duration-300"
        >
          <ArrowLeft className="h-6 w-6" />
        </a>
        <div className="flex items-center">
          <div className="avatar-story">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-gray-500" />
            </div>
          </div>
          <div className="ml-6">
            <p className="text-xl font-bold text-gray-900">
              {otherParticipant?.name}
            </p>
            <div className="flex items-center mt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                otherParticipant?.role === 'brand'
                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800'
                  : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
              }`}>
                {otherParticipant?.role === 'brand' ? '🏢 Marque' : '⭐ Créateur'}
              </span>
              <div className="ml-3 flex items-center text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span className="text-xs font-medium">En ligne</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Messages */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-gray-50/50 to-purple-50/30">
        <div className="space-y-6">
          {messages.map((message, index) => {
            const isOwnMessage = message.senderId === user?.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className={`message-bubble ${isOwnMessage ? 'sent' : 'received'}`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 text-right ${isOwnMessage ? 'text-purple-200' : 'text-gray-500'}`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Enhanced Message Input */}
      <div className="border-t border-gray-100/50 px-8 py-6 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <div className="flex space-x-3">
            <button
              type="button"
              className="p-3 rounded-2xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              <Image className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="p-3 rounded-2xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              <Paperclip className="h-6 w-6" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Tapez un message..."
            className="flex-1 input-modern"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="btn-primary"
          >
            {sending ? <LoadingSpinner size="sm" color="white" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;