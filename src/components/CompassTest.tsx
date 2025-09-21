import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

interface CompassTestProps {
  onBack: () => void;
  onComplete: (answers: Record<number, string>) => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of activities do you enjoy the most?",
    options: [
      { text: "Working with computers and technology", value: "tech" },
      { text: "Helping and caring for people", value: "people" },
      { text: "Creating art, music, or writing", value: "creative" },
      { text: "Solving math and science problems", value: "analytical" }
    ]
  },
  {
    id: 2,
    question: "In a group project, you usually:",
    options: [
      { text: "Take charge and lead the team", value: "leader" },
      { text: "Research and analyze information", value: "researcher" },
      { text: "Come up with creative ideas", value: "creative" },
      { text: "Make sure everyone gets along", value: "collaborative" }
    ]
  },
  {
    id: 3,
    question: "Your ideal work environment would be:",
    options: [
      { text: "A quiet office with computers", value: "tech" },
      { text: "Outdoors or in nature", value: "outdoor" },
      { text: "A busy hospital or clinic", value: "healthcare" },
      { text: "A creative studio or lab", value: "creative" }
    ]
  },
  {
    id: 4,
    question: "What motivates you the most?",
    options: [
      { text: "Making a positive impact on society", value: "impact" },
      { text: "Earning good money and financial security", value: "financial" },
      { text: "Learning new things constantly", value: "learning" },
      { text: "Being recognized for my achievements", value: "recognition" }
    ]
  },
  {
    id: 5,
    question: "Which subject do you find most interesting?",
    options: [
      { text: "Mathematics and Physics", value: "stem" },
      { text: "Biology and Chemistry", value: "science" },
      { text: "History and Social Studies", value: "humanities" },
      { text: "Art and Literature", value: "arts" }
    ]
  }
];

export function CompassTest({ onBack, onComplete }: CompassTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedOption(value);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(answers[questions[currentQuestion + 1]?.id] || "");
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <Card className="p-8 rounded-3xl border-border bg-card">
          <h2 className="mb-8 text-center text-card-foreground leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === option.value ? "default" : "outline"}
                className={`w-full p-6 h-auto text-left justify-start rounded-2xl transition-all ${
                  selectedOption === option.value 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card hover:bg-accent border-border"
                }`}
                onClick={() => handleAnswerSelect(option.value)}
              >
                <span className="leading-relaxed">{option.text}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Navigation Footer */}
      <div className="p-6 bg-card border-t border-border">
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 h-12 rounded-2xl"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`h-12 rounded-2xl ${currentQuestion === 0 ? 'flex-1' : 'flex-1'} bg-primary hover:bg-primary/90 text-primary-foreground`}
          >
            {isLastQuestion ? "Complete Test" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}