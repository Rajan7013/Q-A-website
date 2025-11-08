import React, { useState, useEffect } from 'react';
import { Upload, MessageSquare, FileText, Clock, GraduationCap, Brain, Sparkles, Zap, Target, Shield, ChevronRight } from 'lucide-react';
import { getRecentChats } from '../utils/api';

const HomePage = ({ setCurrentPage, uploadedDocs, userId, stats }) => {
  const [recentChats, setRecentChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const chats = await getRecentChats(userId, 4);
        setRecentChats(chats);
      } catch (error) {
        console.error('Failed to fetch recent chats:', error);
        setRecentChats([]);
      } finally {
        setLoadingChats(false);
      }
    };

    fetchRecentChats();
  }, [userId]);

  const features = [
    { icon: Brain, title: 'Smart Context', desc: 'Remembers your conversation flow', color: 'from-purple-400 to-pink-500' },
    { icon: Sparkles, title: 'Multi-Doc Analysis', desc: 'Analyze multiple documents', color: 'from-blue-400 to-cyan-500' },
    { icon: GraduationCap, title: 'Exam Preparation', desc: 'Tailored study assistance', color: 'from-green-400 to-teal-500' },
    { icon: Zap, title: 'Instant Answers', desc: 'Lightning-fast responses', color: 'from-yellow-400 to-orange-500' },
    { icon: Target, title: 'Intent Detection', desc: 'Understands what you need', color: 'from-red-400 to-pink-500' },
    { icon: Shield, title: 'Knowledge Fusion', desc: 'Docs + AI knowledge', color: 'from-indigo-400 to-purple-500' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 rounded-3xl p-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-bold text-sm">
            ✨ Powered by Gemini 2.0 Flash
          </div>
          
          <h1 className="text-6xl font-black text-white leading-tight">
            Analyze Documents with
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Upload, Ask, Learn! Context-aware AI that remembers your intent and helps with exam preparation
          </p>
          
          <div className="flex gap-6 justify-center pt-4">
            <button 
              onClick={() => setCurrentPage('upload')}
              className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50 flex items-center space-x-3"
            >
              <Upload />
              <span>Upload Documents</span>
            </button>
            <button 
              onClick={() => setCurrentPage('chat')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-3"
            >
              <MessageSquare />
              <span>Start Chatting</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Documents Analyzed', value: (stats?.documentsAnalyzed || 0).toLocaleString(), icon: FileText, color: 'from-blue-400 to-cyan-500' },
            { label: 'Questions Answered', value: (stats?.questionsAnswered || 0).toLocaleString(), icon: MessageSquare, color: 'from-green-400 to-emerald-500' },
            { label: 'Study Hours Saved', value: (stats?.studyHours || 0).toLocaleString(), icon: Clock, color: 'from-orange-400 to-red-500' },
            { label: 'Conversations', value: (stats?.conversations || 0).toLocaleString(), icon: GraduationCap, color: 'from-purple-400 to-pink-500' }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300`}>
              <stat.icon className="w-10 h-10 mb-3" />
              <div className="text-4xl font-black">{stat.value}</div>
              <div className="text-sm font-bold opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-2">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">Everything you need for smart document analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-black text-white">
            Recent Conversations
          </h2>
          <button 
            onClick={() => setCurrentPage('chat')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View All
          </button>
        </div>

        {loadingChats ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading recent chats...</p>
          </div>
        ) : recentChats.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-3xl border-2 border-dashed border-white/20">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-bold text-gray-300">No conversations yet</p>
            <p className="text-gray-400 mt-2">Start chatting to see your history here!</p>
            <button 
              onClick={() => setCurrentPage('chat')}
              className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your First Chat
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentChats.map((chat) => (
            <div key={chat.id} className={`bg-gradient-to-br ${chat.color} p-6 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`} onClick={() => setCurrentPage('chat')}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/80 text-sm font-bold">{chat.time}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{chat.title}</h3>
              <div className="flex items-center justify-between text-white/80 text-sm">
                <span>{chat.messages} messages</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;