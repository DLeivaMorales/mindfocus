import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
         IonCardTitle, IonCardContent, IonButton, IonIcon, IonRange,
         IonLabel, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settings, playCircle } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';
import { TimerService } from '../services/timer.service';
import { PomodoroConfig } from '../models/session.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
            IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
            IonRange, IonLabel, IonText],
})
export class Tab1Page implements OnInit, OnDestroy {
  config: PomodoroConfig = { focusTime: 25, breakTime: 5 };
  isTimerRunning = false;
  private timerSubscription?: Subscription;

  constructor(
    private storage: StorageService,
    private timerService: TimerService,
    private router: Router
  ) {
    addIcons({ settings, playCircle });
  }

  ngOnInit() {
    this.config = this.storage.getConfig();
    this.timerSubscription = this.timerService.timerState$.subscribe(state => {
      this.isTimerRunning = state.isRunning || state.isPaused;
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  onFocusTimeChange(event: any) {
    this.config.focusTime = event.detail.value;
    this.storage.saveConfig(this.config);
  }

  onBreakTimeChange(event: any) {
    this.config.breakTime = event.detail.value;
    this.storage.saveConfig(this.config);
  }

  setPreset(focusTime: number, breakTime: number) {
    this.config = { focusTime, breakTime };
    this.storage.saveConfig(this.config);
  }

  startSession() {
    this.timerService.startTimer('enfoque', this.config.focusTime);
    this.router.navigate(['/timer']);
  }
}
