import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, User, Target, FileCheck, Loader, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { sendMessage, saveChatSession, incrementStat, logActivity } from '../utils/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatPage = ({ sessionId, uploadedDocs, userId, setStats, settings }) => {
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: 'Hello! 👋 I\'m your AI Document Analyzer. Upload your documents and ask me anything! I remember context and can help with exam prep too!', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatContext, setChatContext] = useState({
    topic: null,
    intent: null
  });
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const chatEndRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Text-to-Speech functions
  const getIndianFemaleVoice = (language) => {
    const voices = window.speechSynthesis.getVoices();
    
    // Language code mapping for speech synthesis
    const langCodeMap = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'ml': 'ml-IN',
      'bn': 'bn-IN',
      'ne': 'ne-NP',
      'mai': 'hi-IN' // Fallback to Hindi for Maithili
    };
    
    const langCode = langCodeMap[language] || 'en-IN';
    
    // Try to find Indian female voice for the language
    let voice = voices.find(v => 
      v.lang.startsWith(langCode.split('-')[0]) && 
      v.name.toLowerCase().includes('female')
    );
    
    // Fallback to any Indian voice
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
    }
    
    // Fallback to Indian English female voice
    if (!voice) {
      voice = voices.find(v => 
        v.lang.includes('IN') && 
        v.name.toLowerCase().includes('female')
      );
    }
    
    // Final fallback to any Indian voice
    if (!voice) {
      voice = voices.find(v => v.lang.includes('IN'));
    }
    
    // Last resort: any female voice
    if (!voice) {
      voice = voices.find(v => v.name.toLowerCase().includes('female'));
    }
    
    return voice || voices[0];
  };

  const stripMarkdown = (text) => {
    // Remove markdown formatting for clean speech
    return text
      .replace(/#{1,6}\s/g, '') // Remove headings
      .replace(/\*\*\*(.*?)\*\*\*/g, '$1') // Bold+Italic
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/`{3}[\s\S]*?`{3}/g, '') // Code blocks
      .replace(/`(.*?)`/g, '$1') // Inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
      .replace(/^>\s/gm, '') // Blockquotes
      .replace(/^[-*+]\s/gm, '') // List bullets
      .replace(/^\d+\.\s/gm, '') // Numbered lists
      .replace(/\n{2,}/g, '. ') // Multiple line breaks
      .replace(/\|/g, ' ') // Table separators
      .trim();
  };

  const speakMessage = (messageId, text) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    if (speakingMessageId === messageId && !isPaused) {
      // Stop if already speaking this message
      setSpeakingMessageId(null);
      setIsPaused(false);
      return;
    }
    
    // Clean text from markdown
    const cleanText = stripMarkdown(text);
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const language = settings?.language || 'en';
    const voice = getIndianFemaleVoice(language);
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    
    // Speech parameters for natural Indian accent
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher for female voice
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      setSpeakingMessageId(messageId);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setSpeakingMessageId(null);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setSpeakingMessageId(null);
      setIsPaused(false);
    };
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
    setIsPaused(false);
  };

  // Load voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const processedDocs = uploadedDocs
        .filter(doc => doc.status === 'processed')
        .map(doc => ({ id: doc.id, name: doc.name, pages: doc.pages }));

      const language = settings?.language || 'en';
      
      const response = await sendMessage(
        inputMessage,
        sessionId,
        processedDocs,
        chatContext,
        language
      );

      const botMessage = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: response.response,
        rawText: response.rawResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources || []
      };

      setChatMessages(prev => [...prev, botMessage]);
      setChatContext(response.context);

      // Increment questions answered stat
      try {
        const updatedStats = await incrementStat(userId, 'questionsAnswered', 1);
        setStats(updatedStats);

        // Log activity for today
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        await logActivity(userId, today, 1);

        // Save chat session
        const chatTitle = extractChatTitle([...chatMessages, userMessage, botMessage]);
        await saveChatSession(userId, sessionId, chatTitle, [...chatMessages, userMessage, botMessage]);
      } catch (statError) {
        console.error('Failed to update stats:', statError);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: []
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const extractChatTitle = (messages) => {
    // Extract title from first user message
    const firstUserMsg = messages.find(m => m.type === 'user');
    if (firstUserMsg) {
      const title = firstUserMsg.text.substring(0, 50);
      return title.length < firstUserMsg.text.length ? title + '...' : title;
    }
    return 'Untitled Chat';
  };

  const renderMessage = (text) => {
    return (
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Headings with proper styling
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 mt-6 text-purple-300 border-b border-purple-500/30 pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3 mt-5 text-purple-300" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mb-2 mt-4 text-purple-400" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-lg font-bold mb-2 mt-3 text-purple-400" {...props} />,
            h5: ({node, ...props}) => <h5 className="text-base font-bold mb-2 mt-3 text-purple-500" {...props} />,
            h6: ({node, ...props}) => <h6 className="text-sm font-bold mb-2 mt-2 text-purple-500" {...props} />,
            
            // Paragraphs with spacing
            p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-200" {...props} />,
            
            // Bold text
            strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
            
            // Italic text
            em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
            
            // Unordered lists
            ul: ({node, ...props}) => <ul className="list-none space-y-2 mb-4 ml-2" {...props} />,
            
            // Ordered lists
            ol: ({node, ...props}) => <ol className="list-none space-y-2 mb-4 ml-2" {...props} />,
            
            // List items with custom bullets
            li: ({node, ordered, ...props}) => (
              <li className="flex items-start gap-2" {...props}>
                <span className="text-purple-400 font-bold mt-0.5">{ordered ? '•' : '•'}</span>
                <span className="flex-1">{props.children}</span>
              </li>
            ),
            
            // Code blocks
            code: ({node, inline, ...props}) => 
              inline ? (
                <code className="bg-gray-700/50 text-purple-300 px-2 py-0.5 rounded text-sm font-mono" {...props} />
              ) : (
                <code className="block bg-gray-900/50 text-purple-200 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm border border-purple-500/20" {...props} />
              ),
            
            // Blockquotes
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 italic text-gray-300 bg-purple-500/5" {...props} />
            ),
            
            // Horizontal rules
            hr: ({node, ...props}) => <hr className="border-purple-500/30 my-6" {...props} />,
            
            // Links
            a: ({node, ...props}) => <a className="text-purple-400 hover:text-purple-300 underline" {...props} />,
            
            // Tables
            table: ({node, ...props}) => <table className="w-full border-collapse my-4" {...props} />,
            th: ({node, ...props}) => <th className="border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-left font-bold" {...props} />,
            td: ({node, ...props}) => <td className="border border-purple-500/30 px-4 py-2" {...props} />,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] bg-gradient-to-br from-gray-900 to-black rounded-none md:rounded-2xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 bg-white/5 border-b border-white/10">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl md:rounded-2xl shadow-lg">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg md:text-2xl font-bold text-white">AI Chat</h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 hidden sm:block">Context-aware • Document-backed</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-bold text-xs sm:text-sm">Active</span>
        </div>
      </div>

      {/* Context Info */}
      {chatContext.topic && (
        <div className="p-2 sm:p-3 bg-white/5 text-center text-xs sm:text-sm text-gray-300">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 flex-wrap">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              <span className="font-bold">Context: </span>
              <span className="text-purple-300">{chatContext.topic}</span>
              {chatContext.intent && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-bold">Intent: </span>
                  <span className="text-pink-300">{chatContext.intent}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto space-y-3 sm:space-y-4 md:space-y-6">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 sm:gap-3 md:gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg ${msg.type === 'user' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-500 to-cyan-400'}`}>
              {msg.type === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" /> : <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />}
            </div>
            <div className={`p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl shadow-xl max-w-[85%] sm:max-w-[80%] md:max-w-2xl ${msg.type === 'user' ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
              <div className="prose prose-invert max-w-none">
                {msg.type === 'user' ? msg.text : renderMessage(msg.text)}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-2">
                  <span>{msg.time}</span>
                  {msg.type === 'bot' && (
                    <div className="flex items-center gap-1">
                      {speakingMessageId === msg.id && !isPaused ? (
                        <>
                          <button
                            onClick={() => pauseSpeech()}
                            className="p-1 hover:bg-white/10 rounded transition-colors touch-manipulation"
                            title="Pause"
                          >
                            <Pause className="w-4 h-4 text-purple-400" />
                          </button>
                          <button
                            onClick={() => stopSpeech()}
                            className="p-1 hover:bg-white/10 rounded transition-colors touch-manipulation"
                            title="Stop"
                          >
                            <VolumeX className="w-4 h-4 text-red-400" />
                          </button>
                        </>
                      ) : speakingMessageId === msg.id && isPaused ? (
                        <>
                          <button
                            onClick={() => resumeSpeech()}
                            className="p-1 hover:bg-white/10 rounded transition-colors touch-manipulation"
                            title="Resume"
                          >
                            <Play className="w-4 h-4 text-green-400 animate-pulse" />
                          </button>
                          <button
                            onClick={() => stopSpeech()}
                            className="p-1 hover:bg-white/10 rounded transition-colors touch-manipulation"
                            title="Stop"
                          >
                            <VolumeX className="w-4 h-4 text-red-400" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => speakMessage(msg.id, msg.text)}
                          className="p-1 hover:bg-white/10 rounded transition-colors touch-manipulation"
                          title="Read aloud (Indian female voice)"
                        >
                          <Volume2 className="w-4 h-4 text-blue-400 hover:text-blue-300" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <FileCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-bold text-[10px] sm:text-xs">Sources:</span>
                    {msg.sources.map((source, idx) => (
                      <span key={idx} className="bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs">{source}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl shadow-xl bg-gray-800 text-gray-200 rounded-bl-none">
              <div className="flex items-center gap-2">
                <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area - Mobile Optimized */}
      <div className="p-2 sm:p-3 md:p-5 bg-white/5 border-t border-white/10">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
            disabled={isTyping}
            placeholder="Ask anything... 🚀"
            className="flex-1 bg-gray-800 border-2 border-gray-700 rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium text-white focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 disabled:opacity-50 touch-manipulation"
          />
          <button
            onClick={handleSendMessage}
            disabled={isTyping}
            className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg active:scale-95 sm:hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:saturate-50 touch-manipulation"
          >
            {isTyping ? <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 sm:mt-3 px-1 sm:px-2">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            <button className="text-[10px] sm:text-xs bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-lg hover:bg-purple-500/40 active:bg-purple-500/40 transition-all whitespace-nowrap touch-manipulation">
              📚 Exam
            </button>
            <button className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-300 px-2 sm:px-3 py-1 rounded-lg hover:bg-blue-500/40 active:bg-blue-500/40 transition-all whitespace-nowrap touch-manipulation">
              ✨ Summary
            </button>
            <button className="text-[10px] sm:text-xs bg-green-500/20 text-green-300 px-2 sm:px-3 py-1 rounded-lg hover:bg-green-500/40 active:bg-green-500/40 transition-all whitespace-nowrap touch-manipulation">
              💡 Examples
            </button>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap ml-2">
            {uploadedDocs.filter(d => d.status === 'processed').length} docs
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;