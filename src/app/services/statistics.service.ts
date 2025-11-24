import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DailyStats, WeeklyStats, PomodoroSession } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private storage: StorageService) { }

  getTodayStats(): DailyStats {
    const sessions = this.storage.getSessions();
    const today = new Date().toDateString();

    const todaySessions = sessions.filter(s =>
      new Date(s.date).toDateString() === today && s.completed
    );

    const focusSessions = todaySessions.filter(s => s.type === 'enfoque');
    const breakSessions = todaySessions.filter(s => s.type === 'descanso');

    const totalMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

    return {
      date: today,
      totalMinutes,
      sessions: todaySessions.length,
      focusSessions: focusSessions.length,
      breakSessions: breakSessions.length
    };
  }

  getWeeklyStats(): WeeklyStats {
    const sessions = this.storage.getSessions();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const weekSessions = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= weekAgo && sessionDate <= now && s.completed;
    });

    // Calcular minutos por día de la semana
    const days: { [key: string]: number } = {
      'L': 0, 'M': 0, 'X': 0, 'J': 0, 'V': 0, 'S': 0, 'D': 0
    };

    const dayMap = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

    weekSessions.forEach(session => {
      const dayOfWeek = new Date(session.date).getDay();
      const dayKey = dayMap[dayOfWeek];
      days[dayKey] += session.duration;
    });

    // Convertir minutos a horas para el gráfico
    Object.keys(days).forEach(key => {
      days[key] = Math.round((days[key] / 60) * 100) / 100;
    });

    const totalMinutes = weekSessions.reduce((sum, s) => sum + s.duration, 0);
    const currentStreak = this.calculateStreak(sessions);

    return {
      days,
      totalMinutes,
      totalSessions: weekSessions.length,
      currentStreak
    };
  }

  private calculateStreak(sessions: PomodoroSession[]): number {
    if (sessions.length === 0) return 0;

    // Ordenar sesiones por fecha (más reciente primero)
    const sortedSessions = [...sessions]
      .filter(s => s.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedSessions.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Verificar si hay sesiones hoy
    const today = currentDate.toDateString();
    const hasSessionToday = sortedSessions.some(s =>
      new Date(s.date).toDateString() === today
    );

    if (!hasSessionToday) {
      // Si no hay sesiones hoy, verificar si hay sesiones ayer
      currentDate.setDate(currentDate.getDate() - 1);
      const yesterday = currentDate.toDateString();
      const hasSessionYesterday = sortedSessions.some(s =>
        new Date(s.date).toDateString() === yesterday
      );

      if (!hasSessionYesterday) return 0;
    }

    // Contar días consecutivos con al menos una sesión
    while (true) {
      const dateStr = currentDate.toDateString();
      const hasSession = sortedSessions.some(s =>
        new Date(s.date).toDateString() === dateStr
      );

      if (hasSession) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  getHistorySessions(limit: number = 10): PomodoroSession[] {
    const sessions = this.storage.getSessions();
    return sessions
      .filter(s => s.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  getAllSessions(): PomodoroSession[] {
    return this.storage.getSessions()
      .filter(s => s.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
