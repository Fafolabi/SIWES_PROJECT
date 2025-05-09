
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginAs, setLoginAs] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    const success = login("demo@example.com", role);
    if (success) {
      toast({
        title: "Login Successful",
        description: `Logged in as ${role}`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Unable to log in with selected role",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">SIWES Electronic Workbook</CardTitle>
          <CardDescription>
            Login to access your SIWES documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-4">
              For demo purposes, select a role to login:
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleRoleSelect("student")}
              >
                Login as Student
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleRoleSelect("supervisor")}
              >
                Login as Supervisor
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleRoleSelect("admin")}
              >
                Login as Admin
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                In Production
              </span>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button variant="secondary" className="w-full" disabled>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018 1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062-2.31 0-4.187 1.956-4.187 4.273 0 2.315 1.877 4.277 4.187 4.277 2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474 0 4.01-2.677 6.86-6.72 6.86z"
                  fill="currentColor"
                />
              </svg>
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>This is a demo application for the SIWES Electronic Workbook</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
