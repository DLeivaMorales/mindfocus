export interface PomodoroSession {
  id: string;
  date: Date;
  startTime: string;
  duration: number; // en minutos
  type: 'enfoque' | 'descanso';
  completed: boolean;
}

export interface DailyStats {
  date: string;
  totalMinutes: number;
  sessions: number;
  focusSessions: number;
  breakSessions: number;
}

export interface WeeklyStats {
  days: { [key: string]: number }; // 'L', 'M', 'X', 'J', 'V', 'S', 'D'
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
}

export interface PomodoroConfig {
  focusTime: number; // en minutos
  breakTime: number; // en minutos
}
