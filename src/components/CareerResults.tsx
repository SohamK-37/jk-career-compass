import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { ArrowLeft, Eye, Bookmark, Sparkles, Play } from "lucide-react";

interface Career {
  id: string;
  title: string;
  icon: string;
  matchScore: number;
  description: string;
  avgSalary: string;
}

interface CareerResultsProps {
  onBack: () => void;
  onViewCareer: (career: Career) => void;
  answers: Record<number, string>;
}

const mockCareers: Career[] = [
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    icon: "🎨",
    matchScore: 92,
    description: "Create visual concepts to communicate ideas",
    avgSalary: "₹3-8 LPA"
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    icon: "💻",
    matchScore: 88,
    description: "Design and develop software applications",
    avgSalary: "₹5-15 LPA"
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    icon: "📱",
    matchScore: 85,
    description: "Design user-friendly digital experiences",
    avgSalary: "₹4-12 LPA"
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "📊",
    matchScore: 82,
    description: "Analyze data to solve business problems",
    avgSalary: "₹6-20 LPA"
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    icon: "📈",
    matchScore: 79,
    description: "Promote brands through digital channels",
    avgSalary: "₹3-10 LPA"
  }
];

export function CareerResults({ onBack, onViewCareer, answers }: CareerResultsProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-card-foreground">Your Results</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Success Message */}
        <Card className="p-6 rounded-3xl border-border bg-gradient-to-r from-primary/10 to-secondary/10 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="mb-2 text-card-foreground">Great job!</h2>
            <p className="text-muted-foreground">
              Based on your unique talents, here are your <strong>Top 5 Career Matches!</strong>
            </p>
          </div>
        </Card>

        {/* Career Cards */}
        <div className="space-y-4">
          {mockCareers.map((career, index) => (
            <Card key={career.id} className="p-6 rounded-2xl border-border bg-card">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{career.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-card-foreground">{career.title}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {career.description}
                  </p>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Match Score</span>
                      <span className="text-sm text-primary">{career.matchScore}%</span>
                    </div>
                    <Progress value={career.matchScore} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{career.avgSalary}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Play className="h-3 w-3" />
                        <span>Video available</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full p-2 h-8 w-8"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => onViewCareer(career)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 h-8"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 rounded-2xl border-border bg-secondary/5">
          <div className="text-center">
            <h3 className="text-card-foreground mb-2">Want to explore more?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Chat with Dost, our AI guide, for personalized advice
            </p>
            <Button 
              variant="outline"
              className="rounded-2xl"
            >
              Start Chat with Dost
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}