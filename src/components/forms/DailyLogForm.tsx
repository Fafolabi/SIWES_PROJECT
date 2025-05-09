
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addLogEntry } from "../../data/mockData";
import { LogEntry } from "../../types";
import { toast } from "@/components/ui/use-toast";

interface DailyLogFormProps {
  studentId: string;
  onLogSubmitted: (log: LogEntry) => void;
  onCancel: () => void;
}

const DailyLogForm: React.FC<DailyLogFormProps> = ({ 
  studentId, 
  onLogSubmitted, 
  onCancel 
}) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter log content",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newLog = addLogEntry({
        studentId,
        date: new Date(date),
        content,
      });
      
      toast({
        title: "Success",
        description: "Daily log has been added",
      });
      
      onLogSubmitted(newLog);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add log",
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
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="content">What did you do today?</Label>
          <Textarea
            id="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe the tasks and activities you performed today..."
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="attachments">Attachments (Coming soon)</Label>
          <Input
            id="attachments"
            type="file"
            disabled
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This feature will be available in a future update
          </p>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save Log"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DailyLogForm;
