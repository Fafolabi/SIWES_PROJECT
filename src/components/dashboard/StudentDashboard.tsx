
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  getLogEntries,
  getWeeklyReports,
  getNotifications,
  getStudentProfile
} from "../../data/mockData";
import { LogEntry, WeeklyReport, Notification } from "../../types";
import DailyLogForm from "../forms/DailyLogForm";
import WeeklyReportForm from "../forms/WeeklyReportForm";

interface StudentDashboardProps {
  userId: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userId }) => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [weeklyReports, setWeeklyReports] = useState<WeeklyReport[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    // Fetch data
    setLogEntries(getLogEntries(userId));
    setWeeklyReports(getWeeklyReports(userId));
    setNotifications(getNotifications(userId));
  }, [userId]);

  const studentProfile = getStudentProfile(userId);

  const handleLogSubmitted = (newLog: LogEntry) => {
    setLogEntries([newLog, ...logEntries]);
    setShowLogForm(false);
  };

  const handleReportSubmitted = (newReport: WeeklyReport) => {
    setWeeklyReports([newReport, ...weeklyReports]);
    setShowReportForm(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily-logs">Daily Logs</TabsTrigger>
          <TabsTrigger value="weekly-reports">Weekly Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Daily Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{logEntries.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{logEntries.filter(log => {
                    const logDate = new Date(log.date);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return logDate >= weekAgo;
                  }).length} this week
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="#" onClick={() => setSelectedTab("daily-logs")}>View all logs</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Weekly Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyReports.length}</div>
                <p className="text-xs text-muted-foreground">
                  {weeklyReports.filter(report => report.status === 'submitted').length} submitted,{" "}
                  {weeklyReports.filter(report => report.status === 'reviewed').length} reviewed
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="#" onClick={() => setSelectedTab("weekly-reports")}>View all reports</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{notifications.length}</div>
                <p className="text-xs text-muted-foreground">
                  {notifications.filter(notif => !notif.isRead).length} unread
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" disabled>View all notifications</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle>Placement Information</CardTitle>
              <CardDescription>Details about your SIWES placement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {studentProfile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p>
                      {format(new Date(studentProfile.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(studentProfile.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No placement information available</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Logs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Daily Logs</CardTitle>
                <CardDescription>Your most recent daily activities</CardDescription>
              </div>
              <Button size="sm" onClick={() => setShowLogForm(true)}>Add Log</Button>
            </CardHeader>
            <CardContent>
              {logEntries.length > 0 ? (
                <div className="space-y-4">
                  {logEntries.slice(0, 3).map((log) => (
                    <div key={log.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">
                          {format(new Date(log.date), "EEEE, MMMM d, yyyy")}
                        </h4>
                        <Badge variant="outline">
                          {format(new Date(log.createdAt), "h:mm a")}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{log.content}</p>
                      {log.attachments && log.attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Attachments:</p>
                          <div className="flex gap-2 mt-1">
                            {log.attachments.map((att, index) => (
                              <Badge key={index} variant="secondary">{att}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No log entries yet. Add your first daily log.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily-logs" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Daily Logs</h2>
            <Button onClick={() => setShowLogForm(true)}>Add New Log</Button>
          </div>

          {showLogForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add Daily Log</CardTitle>
                <CardDescription>Record your activities for today</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyLogForm 
                  studentId={userId} 
                  onLogSubmitted={handleLogSubmitted} 
                  onCancel={() => setShowLogForm(false)} 
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              {logEntries.length > 0 ? (
                <div className="space-y-6">
                  {logEntries.map((log) => (
                    <div key={log.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-lg">
                          {format(new Date(log.date), "EEEE, MMMM d, yyyy")}
                        </h4>
                        <Badge variant="outline">
                          {format(new Date(log.createdAt), "h:mm a")}
                        </Badge>
                      </div>
                      <p className="mt-2">{log.content}</p>
                      {log.attachments && log.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-muted-foreground">Attachments:</p>
                          <div className="flex gap-2 mt-1">
                            {log.attachments.map((att, index) => (
                              <Badge key={index} variant="secondary">{att}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No log entries yet. Add your first daily log.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly-reports" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Weekly Reports</h2>
            <Button onClick={() => setShowReportForm(true)}>Add New Report</Button>
          </div>

          {showReportForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create Weekly Report</CardTitle>
                <CardDescription>Summarize your activities for the week</CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyReportForm 
                  studentId={userId} 
                  onReportSubmitted={handleReportSubmitted} 
                  onCancel={() => setShowReportForm(false)} 
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              {weeklyReports.length > 0 ? (
                <div className="space-y-6">
                  {weeklyReports.map((report) => (
                    <div key={report.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-lg">Week {report.weekNumber}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(report.startDate), "MMM d")} - {format(new Date(report.endDate), "MMM d, yyyy")}
                          </p>
                        </div>
                        <Badge variant={
                          report.status === 'draft' 
                          ? 'outline' 
                          : report.status === 'submitted' 
                          ? 'secondary' 
                          : 'default'
                        }>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-3 prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans">{report.content}</pre>
                      </div>
                      {report.supervisorFeedback && (
                        <div className="mt-4 bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium">Supervisor Feedback:</p>
                          <p className="text-sm mt-1">{report.supervisorFeedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No weekly reports yet. Create your first report.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
