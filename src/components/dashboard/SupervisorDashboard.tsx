
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { users, studentProfiles, weeklyReports, updateWeeklyReport } from "../../data/mockData";
import { WeeklyReport } from "../../types";
import SupervisorFeedbackForm from "../forms/SupervisorFeedbackForm";

interface SupervisorDashboardProps {
  userId: string;
}

const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ userId }) => {
  const [supervisedStudents, setSupervisedStudents] = useState<any[]>([]);
  const [pendingReports, setPendingReports] = useState<WeeklyReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<WeeklyReport | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    // Get students supervised by this supervisor
    const students = studentProfiles
      .filter(profile => profile.supervisorId === userId)
      .map(profile => {
        const student = users.find(user => user.id === profile.userId);
        return {
          ...profile,
          studentName: student?.name || 'Unknown Student',
          studentEmail: student?.email || 'No email',
          studentImage: student?.profileImage || ''
        };
      });
    
    setSupervisedStudents(students);
    
    // Get pending reports from supervised students
    const pending = weeklyReports.filter(report => 
      students.some(student => student.userId === report.studentId) && 
      report.status === 'submitted'
    );
    
    setPendingReports(pending);
  }, [userId]);

  const handleReviewReport = (report: WeeklyReport) => {
    setSelectedReport(report);
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmitted = (reportId: string, feedback: string) => {
    const updatedReport = updateWeeklyReport(reportId, {
      supervisorFeedback: feedback,
      status: 'reviewed'
    });
    
    if (updatedReport) {
      // Update pending reports
      setPendingReports(pendingReports.filter(report => report.id !== reportId));
    }
    
    setShowFeedbackForm(false);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Supervised Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{supervisedStudents.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingReports.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Reports awaiting your feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {showFeedbackForm && selectedReport ? (
                <SupervisorFeedbackForm
                  report={selectedReport}
                  onFeedbackSubmitted={handleFeedbackSubmitted}
                  onCancel={() => {
                    setShowFeedbackForm(false);
                    setSelectedReport(null);
                  }}
                />
              ) : pendingReports.length > 0 ? (
                <div className="space-y-4">
                  {pendingReports.map((report) => {
                    const student = users.find(user => user.id === report.studentId);
                    return (
                      <div key={report.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {student?.name || 'Unknown Student'} - Week {report.weekNumber}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Submitted on {format(new Date(report.updatedAt), "MMM d, yyyy")}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => handleReviewReport(report)}>
                            Review
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No reports pending review.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold">Supervised Students</h2>
          
          {supervisedStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supervisedStudents.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={student.studentImage || "https://via.placeholder.com/50"}
                          alt={student.studentName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{student.studentName}</h3>
                        <p className="text-sm text-muted-foreground">{student.studentEmail}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p>{student.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Level</p>
                        <p>{student.level}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p>{student.company}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p>
                          {format(new Date(student.startDate), "MMM d")} - {format(new Date(student.endDate), "MMM d")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" disabled>
                        View Full Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No students assigned to you yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupervisorDashboard;
