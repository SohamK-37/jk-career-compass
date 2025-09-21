import { useState } from "react";
import { Homepage } from "./components/Homepage";
import { CompassTest } from "./components/CompassTest";
import { CareerResults } from "./components/CareerResults";
import { CareerExploration } from "./components/CareerExploration";
import { MyRoadmap } from "./components/MyRoadmap";
import { ChatInterface } from "./components/ChatInterface";
import { Button } from "./components/ui/button";
import { MessageCircle, X } from "lucide-react";

type Screen = 
  | "homepage" 
  | "test" 
  | "results" 
  | "exploration" 
  | "roadmap" 
  | "chat";

interface Career {
  id: string;
  title: string;
  icon: string;
  matchScore: number;
  description: string;
  avgSalary: string;
  videoThumbnail: string;
  videoTitle: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("homepage");
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showChatFAB, setShowChatFAB] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleStartJourney = () => {
    setCurrentScreen("test");
  };

  const handleTestComplete = (answers: Record<number, string>) => {
    setTestAnswers(answers);
    setCurrentScreen("results");
    setShowChatFAB(true); // Show chat after test completion
  };

  const handleViewCareer = (career: Career) => {
    setSelectedCareer(career);
    setCurrentScreen("exploration");
  };

  const handleViewRoadmap = () => {
    setCurrentScreen("roadmap");
  };

  const handleBackToHome = () => {
    setCurrentScreen("homepage");
    setShowChatFAB(false);
    setIsChatOpen(false);
  };

  const handleBackToResults = () => {
    setCurrentScreen("results");
  };

  const handleBackToExploration = () => {
    setCurrentScreen("exploration");
  };

  const handleOpenChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      // Return to previous screen logic could be added here
    } else {
      setIsChatOpen(true);
      setCurrentScreen("chat");
    }
  };

  const handleBackFromChat = () => {
    setIsChatOpen(false);
    setCurrentScreen("results"); // Default back to results
  };

  // Chat FAB (Floating Action Button)
  const ChatFAB = () => {
    if (!showChatFAB || currentScreen === "chat") return null;

    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleOpenChat}
          className="w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "homepage" && (
        <Homepage onStartJourney={handleStartJourney} />
      )}

      {currentScreen === "test" && (
        <CompassTest 
          onBack={handleBackToHome}
          onComplete={handleTestComplete}
        />
      )}

      {currentScreen === "results" && (
        <CareerResults 
          onBack={handleBackToHome}
          onViewCareer={handleViewCareer}
          answers={testAnswers}
        />
      )}

      {currentScreen === "exploration" && selectedCareer && (
        <CareerExploration 
          career={selectedCareer}
          onBack={handleBackToResults}
          onViewRoadmap={handleViewRoadmap}
        />
      )}

      {currentScreen === "roadmap" && selectedCareer && (
        <MyRoadmap 
          career={selectedCareer}
          onBack={handleBackToExploration}
        />
      )}

      {currentScreen === "chat" && (
        <ChatInterface onBack={handleBackFromChat} />
      )}

      <ChatFAB />
    </div>
  );
}