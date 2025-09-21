import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Download, CheckCircle, Calendar, MapPin } from "lucide-react";

interface MyRoadmapProps {
  career: { title: string; icon: string };
  onBack: () => void;
}

export function MyRoadmap({ career, onBack }: MyRoadmapProps) {
  const checkedItems = new Set([1, 2]); // Some items are pre-checked

  const roadmapSteps = [
    {
      id: 1,
      title: "Complete 10th Grade Successfully",
      description: "Focus on getting good grades across all subjects",
      timeframe: "Current Year",
      status: "completed"
    },
    {
      id: 2,
      title: "Choose the Right Stream",
      description: "Select Arts or Commerce with Computer Science",
      timeframe: "After 10th Results",
      status: "completed"
    },
    {
      id: 3,
      title: "Excel in Key Subjects",
      description: "Focus on English, Computer Science, and Fine Arts",
      timeframe: "11th & 12th Grade",
      status: "current"
    },
    {
      id: 4,
      title: "Build Your Portfolio",
      description: "Start creating design projects and build a strong portfolio",
      timeframe: "11th & 12th Grade",
      status: "pending"
    },
    {
      id: 5,
      title: "Research Design Colleges",
      description: "Explore BFA and B.Des programs in and around J&K",
      timeframe: "12th Grade",
      status: "pending"
    },
    {
      id: 6,
      title: "Prepare for Entrance Exams",
      description: "UCEED, CEED, and college-specific design entrance tests",
      timeframe: "12th Grade",
      status: "pending"
    },
    {
      id: 7,
      title: "Apply to Colleges",
      description: "Submit applications with your portfolio",
      timeframe: "After 12th",
      status: "pending"
    },
    {
      id: 8,
      title: "Complete Design Degree",
      description: "Excel in your chosen design program",
      timeframe: "3-4 Years",
      status: "future"
    }
  ];

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download feature would be implemented here");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "current":
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "future":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "current":
        return <div className="h-4 w-4 bg-primary rounded-full animate-pulse" />;
      default:
        return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

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
          <div>
            <h1 className="text-card-foreground">My Roadmap</h1>
            <p className="text-sm text-muted-foreground">Your path to becoming a {career.title}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Hero Section */}
        <Card className="p-6 rounded-3xl border-border bg-gradient-to-r from-primary/10 to-secondary/10 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-4">{career.icon}</div>
            <h2 className="text-card-foreground mb-2">
              Your Personalized Roadmap to Becoming a {career.title}
            </h2>
            <p className="text-muted-foreground mb-4">
              Follow these steps to achieve your career goals
            </p>
            <Button 
              onClick={handleDownloadPDF}
              variant="outline"
              className="rounded-2xl"
            >
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card className="p-6 rounded-2xl border-border bg-card mb-6">
          <h3 className="text-card-foreground mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
              <div className="text-2xl text-green-600 mb-1">2</div>
              <div className="text-sm text-green-700">Steps Completed</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <div className="text-2xl text-primary mb-1">1</div>
              <div className="text-sm text-primary">Current Step</div>
            </div>
          </div>
        </Card>

        {/* Roadmap Steps */}
        <div className="space-y-4">
          <h3 className="text-card-foreground">Step-by-Step Plan</h3>
          
          {roadmapSteps.map((step, index) => (
            <Card key={step.id} className="p-6 rounded-2xl border-border bg-card">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-border bg-background flex items-center justify-center mb-2">
                    {getStatusIcon(step.status)}
                  </div>
                  {index < roadmapSteps.length - 1 && (
                    <div className="w-0.5 h-12 bg-border"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-card-foreground">{step.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs rounded-full ${getStatusColor(step.status)}`}
                    >
                      {step.status === "completed" ? "Done" : 
                       step.status === "current" ? "In Progress" :
                       step.status === "pending" ? "Next" : "Future"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{step.timeframe}</span>
                  </div>
                  
                  {step.status === "current" && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <p className="text-sm text-primary mb-2">
                        <strong>Focus Now:</strong>
                      </p>
                      <ul className="text-sm text-primary/80 space-y-1">
                        <li>• Maintain good grades in all subjects</li>
                        <li>• Pay special attention to English and Computer Science</li>
                        <li>• Start exploring design fundamentals online</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="mt-8 p-6 rounded-2xl border-border bg-secondary/5">
          <h3 className="text-card-foreground mb-4">Recommended Next Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox id="action1" />
              <label htmlFor="action1" className="text-sm">
                Start building a digital portfolio of your creative work
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="action2" />
              <label htmlFor="action2" className="text-sm">
                Research design programs at University of Kashmir
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="action3" />
              <label htmlFor="action3" className="text-sm">
                Follow design blogs and YouTube channels for inspiration
              </label>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="mt-6 p-6 rounded-2xl border-border bg-card text-center">
          <h3 className="text-card-foreground mb-2">Need More Guidance?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Chat with Dost for personalized advice on any step
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
          >
            Ask Dost a Question
          </Button>
        </Card>
      </div>
    </div>
  );
}