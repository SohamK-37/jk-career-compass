import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  UserCheck, 
  MapPin, 
  Route,
  ArrowRight 
} from "lucide-react";

interface HomepageProps {
  onStartJourney: () => void;
}

export function Homepage({ onStartJourney }: HomepageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[60vh] overflow-hidden rounded-b-3xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1659080914827-85ce7868939f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGdyYWR1YXRpb24lMjBmdXR1cmUlMjBlZHVjYXRpb258ZW58MXx8fHwxNzU4MDEwNTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students looking towards bright future"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="mb-4 leading-tight">
            Confused about your future? 
            <br />
            Let's find your path.
          </h1>
          <p className="mb-6 text-white/90 leading-relaxed">
            A free AI guide for 10th & 12th-grade students in J&K to discover the perfect career.
          </p>
          <Button 
            onClick={onStartJourney}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-14"
          >
            Start Your Journey Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="p-6 mt-8">
        <h2 className="text-center mb-8 text-foreground">How It Works</h2>
        
        <div className="space-y-6">
          <Card className="p-6 rounded-2xl border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-card-foreground mb-2">Take the Test</h3>
                <p className="text-muted-foreground">Answer simple questions about your interests and strengths</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-card-foreground mb-2">Explore Careers</h3>
                <p className="text-muted-foreground">Discover careers that match your unique personality</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Route className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-card-foreground mb-2">Get Your Roadmap</h3>
                <p className="text-muted-foreground">Receive a step-by-step plan to achieve your goals</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Kashmir Landscape Section */}
      <div className="mt-12 mx-6 rounded-3xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1640554406685-1215df64c3bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXNobWlyJTIwdmFsbGV5JTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1ODAxMDUxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful Kashmir valley"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-6 text-center mt-8 mb-8">
        <p className="text-muted-foreground">
          Designed with ❤️ for the bright students of Jammu & Kashmir
        </p>
      </div>
    </div>
  );
}