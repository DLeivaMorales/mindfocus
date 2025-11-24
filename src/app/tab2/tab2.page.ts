import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
         IonCardTitle, IonCardContent, IonButton, IonIcon, IonText, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { statsChart, flame, calendar, playCircle } from 'ionicons/icons';
import { StatisticsService } from '../services/statistics.service';
import { WeeklyStats, DailyStats } from '../models/session.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
            IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
            IonText, IonBadge]
})
export class Tab2Page implements OnInit {
  weeklyStats?: WeeklyStats;
  todayStats?: DailyStats;
  weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  maxHours = 3;

  constructor(
    private statisticsService: StatisticsService,
    private router: Router
  ) {
    addIcons({ statsChart, flame, calendar, playCircle });
  }

  ngOnInit() {
    this.loadStatistics();
  }

  ionViewWillEnter() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.weeklyStats = this.statisticsService.getWeeklyStats();
    this.todayStats = this.statisticsService.getTodayStats();

    // Calcular el máximo de horas para escalar el gráfico
    if (this.weeklyStats) {
      const maxValue = Math.max(...Object.values(this.weeklyStats.days));
      this.maxHours = Math.max(3, Math.ceil(maxValue));
    }
  }

  getBarHeight(day: string): number {
    if (!this.weeklyStats) return 0;
    const hours = this.weeklyStats.days[day] || 0;
    return (hours / this.maxHours) * 100;
  }

  getBarClass(day: string): string {
    const dayIndex = this.weekDays.indexOf(day);
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1; // Ajustar domingo
    return dayIndex === adjustedToday ? 'today' : 'past';
  }

  formatHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }

  startSession() {
    this.router.navigate(['/tabs/tab1']);
  }
}

