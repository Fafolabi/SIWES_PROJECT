
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { getLogEntries, getWeeklyReports, getNotifications, getStudentProfile } from "../data/mockData";
import { LogEntry, WeeklyReport, Notification } from "../types";
import { Button } from "@/components/ui/button";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import SupervisorDashboard from "../components/dashboard/SupervisorDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const DashboardPage = () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Manage your SIWES documentation here.
        </p>
      </div>

      {user.role === "student" && <StudentDashboard userId={user.id} />}
      {user.role === "supervisor" && <SupervisorDashboard userId={user.id} />}
      {user.role === "admin" && <AdminDashboard userId={user.id} />}
    </div>
  );
};

export default DashboardPage;
