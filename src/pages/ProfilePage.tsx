
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStudentProfile } from "../data/mockData";
import { format } from "date-fns";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const studentProfile = user.role === "student" ? getStudentProfile(user.id) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" disabled>
                Change Avatar
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="font-medium">{format(new Date(), "MMMM d, yyyy")}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button disabled>Edit Profile</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {studentProfile && (
        <Card>
          <CardHeader>
            <CardTitle>SIWES Information</CardTitle>
            <CardDescription>Your industrial training details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matric Number</p>
                <p>{studentProfile.matricNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p>{studentProfile.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Level</p>
                <p>{studentProfile.level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Company</p>
                <p>{studentProfile.company}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                <p>{format(new Date(studentProfile.startDate), "MMMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">End Date</p>
                <p>{format(new Date(studentProfile.endDate), "MMMM d, yyyy")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Password</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Change your account password
            </p>
            <Button variant="outline" disabled>Change Password</Button>
          </div>

          <div>
            <h3 className="font-medium">Notifications</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Manage email notifications and alerts
            </p>
            <Button variant="outline" disabled>Notification Settings</Button>
          </div>

          <div>
            <h3 className="font-medium text-destructive">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Permanently delete your account and all data
            </p>
            <Button variant="destructive" disabled>Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
