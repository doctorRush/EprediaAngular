import { DeviceTelemetry } from './../../models/device-telemetry';
import { DeviceService } from './../../services/device.service';
import { deviceTelemetry, selectSelectedDevice } from './../../store/selectors/device.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighChartGuage from 'highcharts/highcharts-more';
import HC_more from 'highcharts/highcharts-more';
import { Store } from '@ngrx/store';
HC_more(Highcharts);



@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  device: DeviceTelemetry[] =[];
  activeFeature = 'pressure_chamber';
  from: any;
  to: any;
  rangeData: any;
  show: boolean = false;
  constructor(private _store: Store<IAppState>, private deviceService: DeviceService) { }

  highchartGuage = HighChartGuage;
  highcharts = Highcharts;
  updateFlag = false;
  chartOptions = {
      plotOptions: {
          series: {
              animation: false
          }
      },
      chart: {
          type: 'spline',
          animation: false
      },
      title: {

          text: 'Temprature'
      },
      xAxis: {

          categories: []
      },
      yAxis: {
          labels: {
              enabled: true
          },
          title: {
              text: 'Unit'
          }

      },
      tooltip: {
          valueSuffix: ''
      },
      series: [
          { marker: {
              enabled: true

          },
              name: 'data',
              data: []
          }
      ],

  };

  rangeChartOptions = {
      plotOptions: {
          series: {
              animation: false
          },
          line: {
              marker: {
                  enabled: false
              }
          }
      },
      chart: {
          type: 'spline',
          animation: false
      },
      title: {

          text: 'Time Range Graph For: pressure_chamber'
      },
      xAxis: {
          categories: []
      },
      yAxis: {
          labels: {
              enabled: true
          },
          title: {
              text: 'Unit'
          },
      },
      tooltip: {
          valueSuffix: ''
      },
      series: [
          {

              marker: {
                  enabled: false

              },
              name: 'data',
              data: []
          }
      ],

  };


  getChartObjectFromData(data: DeviceTelemetry[]): { time: string, values: number }[] {

      const dataSeries = [];
      for (const i of data) {
          if (i.hasOwnProperty(this.activeFeature)) {
              const temp = {
                  time: i.timestamp,
                  value: i[this.activeFeature]
              }
              dataSeries.push(temp);
          }

      }
      return dataSeries;
  }

  setSeriesdata(data: any[]) {
      this.chartOptions.xAxis.categories = [];
      this.chartOptions.series[0].data = [];
      for (const i of data) {

          this.chartOptions.series[0].data.push(i.value);
          this.chartOptions.xAxis.categories.push(new Date(i.time).toLocaleTimeString());
      }
      console.log(this.chartOptions.xAxis, this.chartOptions.series);
      this.chartOptions.title.text = 'Realtime Graph for :' + this.activeFeature;
      this.updateFlag = true;
  }
  ngOnInit() {

      this._store.select(deviceTelemetry).subscribe(res => {
          console.log(res);
          this.device = res;
          this.show=true;
          if (this.device) {
              this.setSeriesdata(this.getChartObjectFromData(this.device));
              this.rangeChartOptions.title.text = 'Time Range Graph for :' + this.activeFeature;
          }

      });

  }


  updateChartSeries(ev: any) {
      console.log(ev.target.value);
      this.activeFeature = ev.target.value;
      this.setSeriesdata(this.getChartObjectFromData(this.device));
      this.setSeriesdataRange(this.getChartObjectFromData(this.rangeData));
      this.rangeChartOptions.title.text = 'Time Range Graph for :' + this.activeFeature;

  }
  selectRange(ev: any) {
      console.log(ev);

      this.deviceService.getTelemetryByRange(ev.from, ev.to).subscribe(
          res => {
              this.rangeData = res;
              this.setSeriesdataRange(this.getChartObjectFromData(res));
          }
      )

  }

  setSeriesdataRange(data: any[]) {
      this.rangeChartOptions.xAxis.categories = [];
      this.rangeChartOptions.series[0].data = [];
      this.rangeChartOptions.title.text = 'Time Range Graph for: ' +  this.activeFeature;
      for (const i of data) {

          this.rangeChartOptions.series[0].data.push(i.value);
          this.rangeChartOptions.xAxis.categories.push(new Date(i.time).toLocaleDateString());
          // this.rangeChartOptions.xAxis.categories.push(Date.parse(i.time));
      }
      this.updateFlag = true;
  }
}
