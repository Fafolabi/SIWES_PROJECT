
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6">SIWES Electronic Workbook</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A comprehensive platform for documenting and tracking your industrial training experience.
          Manage daily logs, submit weekly reports, and get feedback from supervisors.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" disabled>
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Daily Logs</h3>
              <p className="text-center text-muted-foreground">
                Keep track of your daily activities and tasks with easy-to-use log entries and attachments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Weekly Reports</h3>
              <p className="text-center text-muted-foreground">
                Submit comprehensive weekly reports to document your progress and learning experiences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Supervisor Feedback</h3>
              <p className="text-center text-muted-foreground">
                Receive timely feedback and guidance from your supervisors to enhance your learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
