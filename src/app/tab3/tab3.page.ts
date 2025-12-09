import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
         IonLabel, IonBadge, IonIcon, IonText, IonButton, IonSegment,
         IonSegmentButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { time, cafe, calendar } from 'ionicons/icons';
import { StatisticsService } from '../services/statistics.service';
import { PomodoroSession } from '../models/session.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
            IonItem, IonLabel, IonBadge, IonIcon, IonText, IonButton,
            IonSegment, IonSegmentButton],
})
export class Tab3Page implements OnInit {
  sessions: PomodoroSession[] = [];
  filteredSessions: PomodoroSession[] = [];
  selectedFilter: 'all' | 'today' | 'week' = 'all';

  constructor(private statisticsService: StatisticsService) {
    addIcons({ time, cafe, calendar });
  }

  ngOnInit() {
    this.loadSessions();
  }

  ionViewWillEnter() {
    this.loadSessions();
  }

  loadSessions() {
    try {
      this.sessions = this.statisticsService.getAllSessions();
      this.applyFilter();
    } catch (error) {
      console.error('Error loading sessions:', error);
      this.sessions = [];
      this.filteredSessions = [];
    }
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.applyFilter();
  }

  applyFilter() {
    try {
      const now = new Date();
      const today = now.toDateString();

      switch (this.selectedFilter) {
        case 'today':
          this.filteredSessions = this.sessions.filter(s => {
            try {
              return s && s.date && new Date(s.date).toDateString() === today;
            } catch {
              return false;
            }
          });
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          this.filteredSessions = this.sessions.filter(s => {
            try {
              return s && s.date && new Date(s.date) >= weekAgo;
            } catch {
              return false;
            }
          });
          break;
        default:
          this.filteredSessions = this.sessions.filter(s => s && s.date);
      }
    } catch (error) {
      console.error('Error applying filter:', error);
      this.filteredSessions = [];
    }
  }

  formatDate(date: Date | undefined): string {
    try {
      if (!date) return 'Fecha desconocida';

      const d = new Date(date);
      if (isNaN(d.getTime())) return 'Fecha inválida';

      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (d.toDateString() === today) {
        return 'Hoy';
      } else if (d.toDateString() === yesterday) {
        return 'Ayer';
      } else {
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha inválida';
    }
  }

  getSessionIcon(type: string): string {
    return type === 'enfoque' ? 'time' : 'cafe';
  }

  getSessionColor(type: string): string {
    return type === 'enfoque' ? 'success' : 'secondary';
  }

  groupSessionsByDate(): { date: string, sessions: PomodoroSession[] }[] {
    try {
      const groups: { [key: string]: PomodoroSession[] } = {};

      this.filteredSessions.forEach(session => {
        try {
          if (!session || !session.date) return;

          const sessionDate = new Date(session.date);
          if (isNaN(sessionDate.getTime())) return;

          const dateKey = sessionDate.toDateString();
          if (!groups[dateKey]) {
            groups[dateKey] = [];
          }
          groups[dateKey].push(session);
        } catch (error) {
          console.error('Error processing session:', error, session);
        }
      });

      return Object.keys(groups)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(date => ({
          date,
          sessions: groups[date]
        }));
    } catch (error) {
      console.error('Error grouping sessions:', error);
      return [];
    }
  }
}

