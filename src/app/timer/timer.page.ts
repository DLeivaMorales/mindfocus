import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
         IonIcon, IonText, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pause, play, square, refresh, arrowBack } from 'ionicons/icons';
import { TimerService, TimerState } from '../services/timer.service';
import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
            IonButton, IonIcon, IonText, IonProgressBar]
})
export class TimerPage implements OnInit, OnDestroy {
  timerState: TimerState = {
    isRunning: false,
    isPaused: false,
    timeRemaining: 0,
    totalTime: 0,
    currentType: null,
    sessionNumber: 1,
    completedSessions: 0
  };

  displayTime = '00:00';
  progress = 0;
  private timerSubscription?: Subscription;

  constructor(
    private timerService: TimerService,
    private storage: StorageService,
    private router: Router
  ) {
    addIcons({ pause, play, square, refresh, arrowBack });
  }

  ngOnInit() {
    this.timerSubscription = this.timerService.timerState$.subscribe(state => {
      this.timerState = state;
      this.displayTime = this.formatTime(state.timeRemaining);
      this.progress = this.timerService.getProgress();

      // Si el temporizador se completa, navegar a la notificación
      if (state.timeRemaining === 0 && !state.isRunning && state.currentType) {
        this.router.navigate(['/notification']);
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  pauseTimer() {
    this.timerService.pauseTimer();
  }

  resumeTimer() {
    this.timerService.resumeTimer();
  }

  stopTimer() {
    this.timerService.stopTimer();
    this.router.navigate(['/tabs/tab1']);
  }

  restartTimer() {
    this.timerService.restartTimer();
  }

  goBack() {
    if (this.timerState.isRunning || this.timerState.isPaused) {
      // Si hay un temporizador activo, solo navegar pero mantener el timer corriendo
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  get sessionTypeText(): string {
    return this.timerState.currentType === 'enfoque' ? 'Sesión de Enfoque' : 'Sesión de Descanso';
  }

  get sessionTypeColor(): string {
    return this.timerState.currentType === 'enfoque' ? 'primary' : 'secondary';
  }

  get progressDegrees(): number {
    return (this.progress / 100) * 360;
  }
}
