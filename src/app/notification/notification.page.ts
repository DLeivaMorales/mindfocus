import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, home } from 'ionicons/icons';
import { TimerService } from '../services/timer.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonText]
})
export class NotificationPage implements OnInit {
  sessionType: 'enfoque' | 'descanso' | null = null;

  constructor(
    private timerService: TimerService,
    private storage: StorageService,
    private router: Router
  ) {
    addIcons({ checkmarkCircle, home });
  }

  ngOnInit() {
    // Obtener el tipo de sesión completada
    this.timerService.timerState$.subscribe(state => {
      // La sesión que acaba de completarse
      if (state.completedSessions > 0) {
        // Determinar qué mostrar: si fue enfoque, ofrecer descanso
        this.sessionType = 'enfoque'; // Por defecto asumimos que completó enfoque
      }
    });

    // Reproducir sonido de notificación (opcional)
    this.playNotificationSound();
  }

  startBreak() {
    const config = this.storage.getConfig();
    this.timerService.startTimer('descanso', config.breakTime);
    this.router.navigate(['/timer']);
  }

  startNewFocusSession() {
    const config = this.storage.getConfig();
    this.timerService.startTimer('enfoque', config.focusTime);
    this.router.navigate(['/timer']);
  }

  goToHome() {
    this.router.navigate(['/tabs/tab1']);
  }

  private playNotificationSound() {
    // Puedes agregar un sonido personalizado aquí
    try {
      const audio = new Audio('assets/sounds/notification.mp3');
      audio.play().catch(err => console.log('Error playing sound:', err));
    } catch (error) {
      console.log('Audio not available');
    }
  }
}
