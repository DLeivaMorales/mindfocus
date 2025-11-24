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
    const sessions = localStorage.getItem(this.SESSIONS_KEY);
    if (sessions) {
      const parsed = JSON.parse(sessions);
      // Convertir strings de fecha a objetos Date
      return parsed.map((s: any) => ({
        ...s,
        date: new Date(s.date)
      }));
    }
    return [];
  }

  addSession(session: PomodoroSession): void {
    const sessions = this.getSessions();
    sessions.push(session);
    this.saveSessions(sessions);
  }

  clearAllData(): void {
    localStorage.removeItem(this.SESSIONS_KEY);
    localStorage.removeItem(this.CONFIG_KEY);
  }
}
