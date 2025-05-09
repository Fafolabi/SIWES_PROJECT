
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { WeeklyReport } from "../../types";
import { format } from "date-fns";
import { users } from "../../data/mockData";

interface SupervisorFeedbackFormProps {
  report: WeeklyReport;
  onFeedbackSubmitted: (reportId: string, feedback: string) => void;
  onCancel: () => void;
}

const SupervisorFeedbackForm: React.FC<SupervisorFeedbackFormProps> = ({
  report,
  onFeedbackSubmitted,
  onCancel,
}) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const student = users.find(user => user.id === report.studentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      onFeedbackSubmitted(report.id, feedback);
      
      toast({
        title: "Success",
        description: "Feedback has been submitted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium">Report Details</h3>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>
              <span className="text-muted-foreground">Student:</span>{" "}
              <span>{student?.name || "Unknown Student"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Week:</span>{" "}
              <span>{report.weekNumber}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Period:</span>{" "}
              <span>
                {format(new Date(report.startDate), "MMM d")} - {format(new Date(report.endDate), "MMM d, yyyy")}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Submitted:</span>{" "}
              <span>{format(new Date(report.updatedAt), "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Report Content</h3>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{report.content}</pre>
          </div>
        </div>

        <div>
          <Label htmlFor="feedback">Your Feedback</Label>
          <Textarea
            id="feedback"
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide feedback, suggestions, or comments on the student's weekly report..."
            required
            className="mt-1"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SupervisorFeedbackForm;
