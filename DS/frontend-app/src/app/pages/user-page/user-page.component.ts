import {Component, OnDestroy, OnInit} from '@angular/core';
import {Device} from "../../model/device/device.model";
import {DeviceService} from "../../service/device.service";
import {EncryptionService} from "../../service/encryption.service";
import {Chart, registerables} from 'chart.js';
import {Monitoring} from "../../model/monitoring/monitoring.model";
import 'chartjs-adapter-date-fns';
import {MonitoringService} from "../../service/monitoring.service";
import annotationPlugin from 'chartjs-plugin-annotation';
import {Subscription} from "rxjs";
import {WebSocketService} from "../../service/web-socket.service";
import {Router} from "@angular/router";

Chart.register(annotationPlugin);

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy {

  private webSocketSubscription!: Subscription;
  devices: Device[] = [];
  userId: string = '';
  monitoringData: Monitoring[] = [];
  chart!: Chart;
  selectedDate: string = '';
  constructor(private webSocketService: WebSocketService, private deviceService: DeviceService, private encryptService: EncryptionService, private monitoringService: MonitoringService, protected router: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId') !== null) {
      this.userId = this.encryptService.decrypt(sessionStorage.getItem('userId') as string);
      this.getAllDevices();
    }
    // this.getMonitoring(5);
    this.initializeChart();
    this.webSocketSubscription = this.webSocketService.getMessage().subscribe(message => {
      if (message !== null) {
        alert("Consumption exceeded!");
      }
    });
  }

  ngOnDestroy(): void {
    if (this.webSocketSubscription) {
      this.webSocketSubscription.unsubscribe();
    }
    this.webSocketService.closeConnection();
  }

  getAllDevices() {
    let id = +this.userId;
    this.deviceService.getAllByUserId(id).subscribe({
      next: (response) => {
        if (response) {
          this.devices = response;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  initializeChart() {
    Chart.register(...registerables);
    const ctx = document.getElementById('monitoringChart') as HTMLCanvasElement;
    const maxConsumptionValue = Math.max(...this.monitoringData.map(data => data.measurementValue));

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.monitoringData.map(data => new Date(data.timestamp)),
        datasets: [{
          label: 'Measurement Value',
          data: this.monitoringData.map(data => data.measurementValue),
          borderColor: 'rgba(75, 192, 192)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second'
            }
          },
          y: {
            beginAtZero: true
          }
        },
      }
    });
  }

  filterDataByDate(deviceId: number) {
    const filteredData = this.monitoringData.filter(data => {
      const dataDate = new Date(data.timestamp).toISOString().split('T')[0];
      return dataDate === this.selectedDate && data.deviceId === deviceId;
    });
    if (this.chart) {
      this.chart.data.labels = filteredData.map(data => new Date(data.timestamp));
      this.chart.data.datasets[0].data = filteredData.map(data => data.measurementValue);
      this.chart.update();
    }
    document.getElementById('chartContainer')!.classList.remove('hidden');
  }

  getMonitoring(id: number) {
    this.monitoringService.getAllMonitoringById(id).subscribe({
      next: (response) => {
        if (response) {
          this.monitoringData = response;
          console.log(this.monitoringData);
          this.filterDataByDate(id);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
