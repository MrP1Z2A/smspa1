
import { ANNOUNCEMENTS, UPCOMING_EXAMS, MOCK_ASSIGNMENTS } from '../constants';
import { ReportCard, Event, Assignment } from '../types';

export interface SyncedSmsData {
  announcements: string[];
  exams: Event[];
  assignments: Assignment[];
  reportCard: ReportCard;
  lastSync: string;
}

/**
 * Service to bridge data between the Student Portal (SMS) 
 * and this Parent Portal (LMS).
 */
export const syncSmsData = async (studentId: string = 'STD-2024-089'): Promise<SyncedSmsData> => {
  try {
    // In a real scenario, this would be a fetch call to your student portal API
    const response = await fetch(`https://your-student-api.com/v1/sync?sid=${studentId}`);
    const data = await response.json();
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Simulated Data from SMS
    const reportCard: ReportCard = {
      term: "Spring 2025",
      gpa: "3.85",
      rank: "5th / 120",
      attendance: "96%",
      subjects: [
        { name: "Modern Physics", grade: "A", score: 92, comment: "Exceptional analytical skills." },
        { name: "Data Structures", grade: "B+", score: 88, comment: "Strong logic, needs more practice in recursion." },
        { name: "Discrete Math", grade: "A-", score: 90, comment: "Active participation in seminars." },
        { name: "Advanced English", grade: "A", score: 95, comment: "Creative writing is top-tier." }
      ]
    };

    return {
      announcements: [...ANNOUNCEMENTS],
      exams: [...UPCOMING_EXAMS],
      assignments: [...MOCK_ASSIGNMENTS],
      reportCard,
      lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (error) {
    console.error("SMS Sync Failed:", error);
    throw error;
  }
};
