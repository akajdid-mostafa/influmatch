import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Send, Image, Paperclip, User } from 'lucide-react';
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
        
        // Mock conversation data
        const mockConversation: ConversationType = {
          id: conversationId || '1',
          participants: [
            { id: 1, name: 'Acme Brand', email: 'brand@example.com', role: 'brand' },
            { id: 2, name: 'Jane Influencer', email: 'influencer@example.com', role: 'influencer' }
          ],
          unreadCount: 0,
          updatedAt: new Date().toISOString()
        };
        
        // Mock messages data
        const mockMessages: Message[] = [
          {
            id: '1',
            conversationId: conversationId || '1',
            senderId: 1,
            content: 'Hi Jane, we would love to work with you on our summer campaign!',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
            read: true
          },
          {
            id: '2',
            conversationId: conversationId || '1',
            senderId: 2,
            content: "Hi there! I'm interested to hear more about your campaign. What kind of content are you looking for? " ,
            timestamp: new Date(Date.now() - 3600000 * 23).toISOString(), // 23 hours ago
            read: true
          },
          {
            id: '3',
            conversationId: conversationId || '1',
            senderId: 1,
            content: "We're looking for lifestyle content featuring our new summer collection. We'd need 3 Instagram posts and 2 stories over the course of the next month.",
            timestamp: new Date(Date.now() - 3600000 * 22).toISOString(), // 22 hours ago
            read: true
          },
          {
            id: '4',
            conversationId: conversationId || '1',
            senderId: 2,
            content: "That sounds perfect for my content style. What's your budget range for this campaign?",
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
            read: true
          },
          {
            id: '5',
            conversationId: conversationId || '1',
            senderId: 1,
            content: 'Our budget is $1,500-2,000 for all deliverables. Does that work for you?',
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
            read: true
          },
          {
            id: '6',
            conversationId: conversationId || '1',
            senderId: 2,
            content: "Yes, that budget works for me! I'd be happy to discuss the specific details and timeline further.",
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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    <div className="max-w-5xl mx-auto h-full flex flex-col bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-4 py-3 sm:px-6 border-b border-gray-200 flex items-center">
        <a 
          href="/messages" 
          className="mr-3 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {otherParticipant?.name}
            </p>
            <p className="text-xs text-gray-500">
              {otherParticipant?.role ? otherParticipant.role.charAt(0).toUpperCase() + otherParticipant.role.slice(1) : ''}
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwnMessage = message.senderId === user?.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`inline-block px-4 py-2 rounded-lg max-w-lg text-sm ${
                    isOwnMessage 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 text-right ${isOwnMessage ? 'text-purple-200' : 'text-gray-500'}`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
        <form onSubmit={handleSendMessage} className="flex">
          <div className="flex space-x-2 mr-2">
            <button
              type="button"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Image className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed"
          >
            {sending ? <LoadingSpinner size="sm" color="white" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;