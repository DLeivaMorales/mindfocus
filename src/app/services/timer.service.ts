import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { StorageService } from './storage.service';
import { PomodoroSession } from '../models/session.model';

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number; // en segundos
  totalTime: number; // en segundos
  currentType: 'enfoque' | 'descanso' | null;
  sessionNumber: number;
  completedSessions: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubscription?: Subscription;
  private currentSessionId?: string;
  private sessionStartTime?: Date;

  private timerState = new BehaviorSubject<TimerState>({
    isRunning: false,
    isPaused: false,
    timeRemaining: 0,
    totalTime: 0,
    currentType: null,
    sessionNumber: 1,
    completedSessions: 0
  });

  public timerState$: Observable<TimerState> = this.timerState.asObservable();

  constructor(private storage: StorageService) { }

  startTimer(type: 'enfoque' | 'descanso', duration: number): void {
    this.stopTimer();

    const totalSeconds = duration * 60;
    this.currentSessionId = this.generateId();
    this.sessionStartTime = new Date();

    this.timerState.next({
      ...this.timerState.value,
      isRunning: true,
      isPaused: false,
      timeRemaining: totalSeconds,
      totalTime: totalSeconds,
      currentType: type
    });

    this.timerSubscription = interval(1000).subscribe(() => {
      const current = this.timerState.value;
      const newTimeRemaining = current.timeRemaining - 1;

      if (newTimeRemaining <= 0) {
        this.completeSession();
      } else {
        this.timerState.next({
          ...current,
          timeRemaining: newTimeRemaining
        });
      }
    });
  }

  pauseTimer(): void {
    if (this.timerSubscription && !this.timerState.value.isPaused) {
      this.timerSubscription.unsubscribe();
      this.timerState.next({
        ...this.timerState.value,
        isPaused: true,
        isRunning: false
      });
    }
  }

  resumeTimer(): void {
    if (this.timerState.value.isPaused) {
      this.timerState.next({
        ...this.timerState.value,
        isPaused: false,
        isRunning: true
      });

      this.timerSubscription = interval(1000).subscribe(() => {
        const current = this.timerState.value;
        const newTimeRemaining = current.timeRemaining - 1;

        if (newTimeRemaining <= 0) {
          this.completeSession();
        } else {
          this.timerState.next({
            ...current,
            timeRemaining: newTimeRemaining
          });
        }
      });
    }
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerState.next({
      isRunning: false,
      isPaused: false,
      timeRemaining: 0,
      totalTime: 0,
      currentType: null,
      sessionNumber: this.timerState.value.sessionNumber,
      completedSessions: this.timerState.value.completedSessions
    });

    this.currentSessionId = undefined;
    this.sessionStartTime = undefined;
  }

  restartTimer(): void {
    const current = this.timerState.value;
    if (current.currentType) {
      const duration = Math.floor(current.totalTime / 60);
      this.startTimer(current.currentType, duration);
    }
  }

  private completeSession(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    const current = this.timerState.value;

    // Guardar sesión
    if (this.currentSessionId && this.sessionStartTime && current.currentType) {
      const session: PomodoroSession = {
        id: this.currentSessionId,
        date: this.sessionStartTime,
        startTime: this.formatTime(this.sessionStartTime),
        duration: Math.floor(current.totalTime / 60),
        type: current.currentType,
        completed: true
      };

      this.storage.addSession(session);
    }

    const newCompletedSessions = current.completedSessions + 1;

    this.timerState.next({
      isRunning: false,
      isPaused: false,
      timeRemaining: 0,
      totalTime: 0,
      currentType: null,
      sessionNumber: current.sessionNumber,
      completedSessions: newCompletedSessions
    });

    this.currentSessionId = undefined;
    this.sessionStartTime = undefined;
  }

  resetSessionCount(): void {
    this.timerState.next({
      ...this.timerState.value,
      sessionNumber: 1,
      completedSessions: 0
    });
  }

  getProgress(): number {
    const current = this.timerState.value;
    if (current.totalTime === 0) return 0;
    return ((current.totalTime - current.timeRemaining) / current.totalTime) * 100;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
