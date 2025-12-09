import { Injectable } from '@angular/core';
import { PomodoroSession, PomodoroConfig } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly SESSIONS_KEY = 'pomodoro_sessions';
  private readonly CONFIG_KEY = 'pomodoro_config';

  constructor() { }

  // Configuración
  saveConfig(config: PomodoroConfig): void {
    localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
  }

  getConfig(): PomodoroConfig {
    const config = localStorage.getItem(this.CONFIG_KEY);
    if (config) {
      return JSON.parse(config);
    }
    // Valores por defecto
    return {
      focusTime: 25,
      breakTime: 5
    };
  }

  // Sesiones
  saveSessions(sessions: PomodoroSession[]): void {
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
  }

  getSessions(): PomodoroSession[] {
    try {
      const sessions = localStorage.getItem(this.SESSIONS_KEY);
      if (!sessions) return [];

      const parsed = JSON.parse(sessions);
      if (!Array.isArray(parsed)) {
        console.error('Invalid sessions data: not an array');
        return [];
      }

      // Convertir strings de fecha a objetos Date y validar
      return parsed
        .map((s: any) => {
          try {
            if (!s || typeof s !== 'object') return null;

            const date = new Date(s.date);
            if (isNaN(date.getTime())) {
              console.warn('Invalid date in session:', s);
              return null;
            }

            return {
              id: s.id || '',
              date: date,
              startTime: s.startTime || '',
              duration: Number(s.duration) || 0,
              type: s.type === 'enfoque' || s.type === 'descanso' ? s.type : 'enfoque',
              completed: Boolean(s.completed)
            } as PomodoroSession;
          } catch (error) {
            console.error('Error parsing session:', error, s);
            return null;
          }
        })
        .filter((s): s is PomodoroSession => s !== null);
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
      return [];
    }
  }

  addSession(session: PomodoroSession): void {
    try {
      if (!session || !session.date) {
        console.error('Invalid session data:', session);
        return;
      }

      const sessions = this.getSessions();
      sessions.push(session);
      this.saveSessions(sessions);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  }

  clearAllData(): void {
    localStorage.removeItem(this.SESSIONS_KEY);
    localStorage.removeItem(this.CONFIG_KEY);
  }
}
