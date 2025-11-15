import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User as UserIcon, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const AIChat = () => {
  const { user } = useAuthStore();
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSessions = async () => {
    try {
      const response = await api.get('/ai-chat/sessions');
      setSessions(response.data.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const startNewSession = async (sessionType = 'INITIAL_ASSESSMENT') => {
    setLoading(true);
    try {
      const response = await api.post('/ai-chat/start', {
        sessionType,
        consentGiven: true
      });
      
      const { session, initialMessage } = response.data.data;
      setCurrentSession(session);
      setMessages([
        {
          id: Date.now(),
          role: 'assistant',
          content: initialMessage,
          createdAt: new Date().toISOString()
        }
      ]);
      
      fetchSessions();
      toast.success('Chat session started!');
    } catch (error) {
      toast.error('Failed to start chat session');
    } finally {
      setLoading(false);
    }
  };

  const loadSession = async (sessionId) => {
    setLoading(true);
    try {
      const response = await api.get(`/ai-chat/session/${sessionId}`);
      const session = response.data.data;
      setCurrentSession(session);
      setMessages(session.messages || []);
    } catch (error) {
      toast.error('Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentSession) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const response = await api.post('/ai-chat/message', {
        sessionId: currentSession.id,
        message: input
      });

      const aiMessage = response.data.data.message;
      setMessages(prev => [...prev, aiMessage]);

      // Update session analysis if available
      if (response.data.data.analysis) {
        setCurrentSession(prev => ({
          ...prev,
          ...response.data.data.analysis
        }));
      }
    } catch (error) {
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setSending(false);
    }
  };

  const getMoodColor = (mood) => {
    const colors = {
      stable: 'success',
      anxious: 'warning',
      depressed: 'danger',
      elevated: 'info',
      mixed: 'warning'
    };
    return colors[mood] || 'primary';
  };

  const getUrgencyColor = (level) => {
    const colors = {
      NORMAL: 'success',
      MODERATE: 'warning',
      HIGH: 'warning',
      CRITICAL: 'danger'
    };
    return colors[level] || 'info';
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Sessions Sidebar */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1 p-4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              AI Chat Sessions
            </h2>
            <Button
              onClick={() => startNewSession()}
              className="w-full"
              disabled={loading}
            >
              Start New Session
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => loadSession(session.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  currentSession?.id === session.id
                    ? 'bg-primary-100 dark:bg-primary-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {session.sessionType.replace('_', ' ')}
                  </span>
                  <Badge variant={session.status === 'ACTIVE' ? 'success' : 'info'} className="text-xs">
                    {session.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(session.startedAt).toLocaleDateString()}
                </div>
                {session.mood && (
                  <Badge variant={getMoodColor(session.mood)} className="mt-2 text-xs">
                    {session.mood}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {!currentSession ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <Bot className="w-20 h-20 mx-auto mb-6 text-primary-500" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  AI Mental Health Assistant
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start a conversation with our AI assistant for mental health support, assessment, and guidance.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => startNewSession('INITIAL_ASSESSMENT')}
                    disabled={loading}
                    className="w-full"
                  >
                    Initial Assessment
                  </Button>
                  <Button
                    onClick={() => startNewSession('ONGOING_MONITORING')}
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                  >
                    Check-in Chat
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Session Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {currentSession.sessionType.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Session started {new Date(currentSession.startedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {currentSession.mood && (
                      <Badge variant={getMoodColor(currentSession.mood)}>
                        Mood: {currentSession.mood}
                      </Badge>
                    )}
                    {currentSession.urgencyLevel && (
                      <Badge variant={getUrgencyColor(currentSession.urgencyLevel)}>
                        {currentSession.urgencyLevel}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-primary-600'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}>
                          {message.role === 'user' ? (
                            <UserIcon className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className={`rounded-2xl p-4 ${
                            message.role === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {sending && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {currentSession.urgencyLevel === 'CRITICAL' && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800 dark:text-red-200">
                      <p className="font-semibold mb-1">Urgent Support Needed</p>
                      <p>Based on our conversation, we recommend immediate professional support. Please contact our emergency line or visit the nearest emergency center.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={sendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={sending || currentSession.status !== 'ACTIVE'}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || sending || currentSession.status !== 'ACTIVE'}
                    className="px-6"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AIChat;