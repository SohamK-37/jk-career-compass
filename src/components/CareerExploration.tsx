import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";
import { ArrowLeft, Bookmark, Play, MapPin, BookOpen, GraduationCap, FileText } from "lucide-react";

interface Career {
  id: string;
  title: string;
  icon: string;
  matchScore: number;
  description: string;
  avgSalary: string;
}

interface CareerExplorationProps {
  career: Career;
  onBack: () => void;
  onViewRoadmap: () => void;
}

export function CareerExploration({ career, onBack, onViewRoadmap }: CareerExplorationProps) {
  const [savedToMyPlan, setSavedToMyPlan] = useState(false);

  const handleSaveToMyPlan = () => {
    setSavedToMyPlan(!savedToMyPlan);
  };

  // Career-specific video mapping with relevant career exploration videos
  const careerVideos: Record<string, string> = {
    "graphic-designer": "https://www.youtube.com/embed/WKgNAOUM4ns", // Day in the life of a graphic designer
    "software-engineer": "https://www.youtube.com/embed/g8a0_FvVIDs", // Software engineer day in life
    "ux-designer": "https://www.youtube.com/embed/wmmH0cJ8J4Q", // UX Designer career overview
    "data-scientist": "https://www.youtube.com/embed/xC-c7E5PK0Y", // Data scientist career guide
    "digital-marketer": "https://www.youtube.com/embed/46C35-vOgtc" // Digital marketing career
  };

  const getVideoUrl = (careerId: string): string => {
    return careerVideos[careerId] || "https://www.youtube.com/embed/g8a0_FvVIDs"; // Default to software engineer video
  };

  // Career-specific information
  const getCareerInfo = (careerId: string) => {
    const careerInfoMap = {
      "graphic-designer": {
        startingSalary: "₹3-8 LPA",
        seniorSalary: "₹15-25 LPA",
        description: "Create visual concepts using computer software or by hand to communicate ideas that inspire, inform, and captivate consumers. You'll work on layouts, logos, branding, and marketing materials.",
        skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Creativity", "Communication"],
        workEnvironment: [
          "Design studios, advertising agencies, or freelance",
          "Mix of creative and client collaboration work", 
          "Opportunities for remote work and flexible hours"
        ]
      },
      "software-engineer": {
        startingSalary: "₹5-15 LPA",
        seniorSalary: "₹20-50 LPA",
        description: "Design, develop, and maintain software applications and systems. You'll work with programming languages, databases, and modern development frameworks to build solutions that solve real-world problems.",
        skills: ["Programming Languages", "Problem Solving", "System Design", "Database Management", "Teamwork"],
        workEnvironment: [
          "Tech companies, startups, or large corporations",
          "Collaborative development with cross-functional teams",
          "High flexibility for remote work and modern tools"
        ]
      },
      "ux-designer": {
        startingSalary: "₹4-12 LPA", 
        seniorSalary: "₹18-35 LPA",
        description: "Research user needs and design intuitive, user-friendly digital experiences. You'll create wireframes, prototypes, and conduct user testing to ensure products are both functional and delightful to use.",
        skills: ["User Research", "Prototyping", "Design Thinking", "Usability Testing", "Collaboration"],
        workEnvironment: [
          "Tech companies, design agencies, or product teams",
          "Close collaboration with developers and product managers",
          "Focus on user empathy and iterative design processes"
        ]
      },
      "data-scientist": {
        startingSalary: "₹6-20 LPA",
        seniorSalary: "₹25-60 LPA", 
        description: "Analyze large datasets to extract meaningful insights and patterns that drive business decisions. You'll use statistical methods, machine learning, and data visualization to solve complex problems.",
        skills: ["Python/R Programming", "Statistics", "Machine Learning", "Data Visualization", "Business Acumen"],
        workEnvironment: [
          "Tech companies, consulting firms, or research institutions",
          "Mix of independent analysis and cross-team collaboration",
          "Growing demand across all industries"
        ]
      },
      "digital-marketer": {
        startingSalary: "₹3-10 LPA",
        seniorSalary: "₹12-30 LPA",
        description: "Promote brands and products through digital channels including social media, search engines, email, and content marketing. You'll analyze campaign performance and optimize strategies for maximum impact.",
        skills: ["Content Creation", "Analytics", "SEO/SEM", "Social Media", "Creative Strategy"],
        workEnvironment: [
          "Marketing agencies, e-commerce companies, or in-house teams",
          "Fast-paced environment with campaign deadlines",
          "Opportunities for freelancing and agency work"
        ]
      }
    };

    return careerInfoMap[careerId as keyof typeof careerInfoMap] || careerInfoMap["graphic-designer"];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-card-foreground">{career.title}</h1>
              <p className="text-sm text-muted-foreground">{career.matchScore}% Match</p>
            </div>
          </div>
          <Button
            variant={savedToMyPlan ? "default" : "outline"}
            size="sm"
            onClick={handleSaveToMyPlan}
            className="rounded-full"
          >
            <Bookmark className={`h-4 w-4 mr-2 ${savedToMyPlan ? 'fill-current' : ''}`} />
            {savedToMyPlan ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Video Section */}
        <Card className="mb-6 rounded-2xl overflow-hidden border-border">
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={getVideoUrl(career.id)}
              title={`A Day in the Life of a ${career.title}`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </AspectRatio>
          <div className="p-4 bg-card">
            <h3 className="text-card-foreground mb-1">A Day in the Life</h3>
            <p className="text-sm text-muted-foreground">
              See what a {career.title} actually does in their daily work
            </p>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted rounded-2xl p-1">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="roadmap" className="rounded-xl">Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Salary & Growth */}
            <Card className="p-6 rounded-2xl border-border bg-card">
              <h3 className="text-card-foreground mb-4">Career Overview</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/10 rounded-2xl">
                  <div className="text-xl mb-1">{getCareerInfo(career.id).startingSalary}</div>
                  <div className="text-sm text-muted-foreground">Starting Salary</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-2xl">
                  <div className="text-xl mb-1">{getCareerInfo(career.id).seniorSalary}</div>
                  <div className="text-sm text-muted-foreground">Senior Level</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-card-foreground mb-2">What You'll Do</h4>
                  <p className="text-muted-foreground text-sm">
                    {getCareerInfo(career.id).description}
                  </p>
                </div>

                <div>
                  <h4 className="text-card-foreground mb-2">Skills Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {getCareerInfo(career.id).skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="rounded-full">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-card-foreground mb-2">Future Growth</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>High demand (20% growth expected)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Work Environment */}
            <Card className="p-6 rounded-2xl border-border bg-card">
              <h3 className="text-card-foreground mb-4">Work Environment</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                {getCareerInfo(career.id).workEnvironment.map((env, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {index === 0 && <MapPin className="h-4 w-4 text-primary" />}
                    {index === 1 && <BookOpen className="h-4 w-4 text-primary" />}
                    {index === 2 && <GraduationCap className="h-4 w-4 text-primary" />}
                    <span>{env}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <Card className="p-6 rounded-2xl border-border bg-card">
              <h3 className="text-card-foreground mb-6">Your Path to Becoming a {career.title}</h3>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-card-foreground mb-2">Choose Your Stream (10th Grade)</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Any stream works, but Arts with Computer Science is ideal
                    </p>
                    <Badge variant="outline" className="rounded-full mr-2">Arts</Badge>
                    <Badge variant="outline" className="rounded-full">Commerce</Badge>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-card-foreground mb-2">Focus on Key Subjects</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-primary/10 text-primary rounded-full">English</Badge>
                      <Badge className="bg-primary/10 text-primary rounded-full">Computer Science</Badge>
                      <Badge className="bg-primary/10 text-primary rounded-full">Fine Arts</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strong communication and technical skills are essential
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-card-foreground mb-2">Higher Education Options</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-muted rounded-xl">
                        <div className="text-card-foreground">Bachelor of Fine Arts (BFA)</div>
                        <div className="text-muted-foreground text-xs">3-4 years • Portfolio required</div>
                      </div>
                      <div className="p-3 bg-muted rounded-xl">
                        <div className="text-card-foreground">Bachelor of Design (B.Des)</div>
                        <div className="text-muted-foreground text-xs">4 years • UCEED, CEED entrance</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-card-foreground mb-2">Top Colleges in J&K & Nearby</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <span className="text-card-foreground">University of Kashmir</span>
                        <Badge variant="outline" className="rounded-full text-xs">Srinagar</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <span className="text-card-foreground">Jammu University</span>
                        <Badge variant="outline" className="rounded-full text-xs">Jammu</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={onViewRoadmap}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12"
              >
                <FileText className="mr-2 h-4 w-4" />
                Get My Complete Roadmap
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}