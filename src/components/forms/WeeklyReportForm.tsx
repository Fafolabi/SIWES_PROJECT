
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addWeeklyReport } from "../../data/mockData";
import { WeeklyReport } from "../../types";
import { toast } from "@/components/ui/use-toast";
import { addDays, format } from "date-fns";

interface WeeklyReportFormProps {
  studentId: string;
  onReportSubmitted: (report: WeeklyReport) => void;
  onCancel: () => void;
}

const WeeklyReportForm: React.FC<WeeklyReportFormProps> = ({
  studentId,
  onReportSubmitted,
  onCancel,
}) => {
  const today = new Date();
  const oneWeekAgo = addDays(today, -7);
  
  const [content, setContent] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [startDate, setStartDate] = useState(format(oneWeekAgo, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter report content",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newReport = addWeeklyReport({
        studentId,
        weekNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        content,
        status: "submitted",
      });

      toast({
        title: "Success",
        description: "Weekly report has been submitted",
      });

      onReportSubmitted(newReport);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="weekNumber">Week Number</Label>
          <Input
            id="weekNumber"
            type="number"
            min="1"
            value={weekNumber}
            onChange={(e) => setWeekNumber(parseInt(e.target.value))}
            required
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="content">Weekly Report</Label>
          <Textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Summarize your activities for the week, including:
- Tasks completed
- Skills acquired
- Challenges faced
- Goals for next week"
            required
            className="mt-1 font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1">
            You can use Markdown formatting for headings, lists, and text styling
          </p>
        </div>

        <div>
          <Label htmlFor="attachments">Attachments (Coming soon)</Label>
          <Input id="attachments" type="file" disabled className="mt-1" />
          <p className="text-xs text-muted-foreground mt-1">
            This feature will be available in a future update
          </p>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WeeklyReportForm;
