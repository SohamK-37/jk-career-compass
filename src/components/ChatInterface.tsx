import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ArrowLeft, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const suggestedQuestions = [
  "What colleges are near me?",
  "How much does a design course cost?",
  "Can I change my career path later?"
];

const botResponses = {
  "What colleges are near me?": "Here are some great colleges in J&K for design:\n\n• University of Kashmir (Srinagar) - Offers BFA program\n• Jammu University (Jammu) - Design and fine arts courses\n• SKUAST Kashmir - Has some creative programs\n\nFor more options, you might also consider colleges in Delhi or Chandigarh, which are well-connected to J&K.",
  
  "How much does a design course cost?": "Design course fees vary widely:\n\n• Government colleges: ₹10,000-50,000 per year\n• Private colleges: ₹1-5 lakhs per year\n• Premium design institutes: ₹3-8 lakhs per year\n\nDon't forget about scholarships! Many colleges offer merit-based and need-based scholarships for students from J&K.",
  
  "Can I change my career path later?": "Absolutely! Career paths are rarely linear. Here's the good news:\n\n• Skills from design transfer to many fields (UI/UX, marketing, product management)\n• You can always learn new skills through online courses\n• Many successful professionals have changed careers multiple times\n\nThe key is to keep learning and stay adaptable!"
};

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Dost, your friendly career guide! 👋\n\nI'm here to help answer any questions about your career journey. What would you like to know?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = botResponses[text as keyof typeof botResponses] || 
        "That's a great question! While I don't have a specific answer for that right now, I'd recommend speaking with a career counselor or checking out career guidance resources online. Is there anything else I can help you with regarding the career paths we've discussed?";
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-card-foreground">Chat with Dost</h1>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              
              <Card className={`p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border'
              } ${message.sender === 'user' ? 'rounded-tr-lg' : 'rounded-tl-lg'}`}>
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {message.text}
                </p>
                <p className={`text-xs mt-2 opacity-70 ${
                  message.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-4 rounded-2xl rounded-tl-lg bg-card border-border">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Suggested Questions (show only if no user messages yet) */}
        {messages.length === 1 && (
          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Try asking one of these questions:
            </p>
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full justify-start text-left h-auto p-4 rounded-2xl border-border"
              >
                {question}
              </Button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 rounded-2xl border-border bg-background"
            disabled={isTyping}
          />
          <Button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}