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
              enabled: false

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

  guageChartOptions = {
      title: {

          text: 'Device Status'
      },
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      },

      pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#FFF'],
                      [1, '#333']
                  ]
              },
              borderWidth: 0,
              outerRadius: '109%'
          }, {
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#333'],
                      [1, '#FFF']
                  ]
              },
              borderWidth: 1,
              outerRadius: '107%'
          }, {
              // default background
          }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
          }]
      },

      // the value axis
      yAxis: {

          min: 0,
          max: 100,

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation: 'auto',
              enabled: false
          },
          title: {
              text: 'status'
          },
          plotBands: [{
              from: 0,
              to: 15,
              color: '#808080'
          }, {
              from: 15,
              to: 30,
              color: '#DDDF0D' // yellow
          }, {
              from: 30,
              to: 50,
              color: '#55BF3B' // green
          }, {
              from: 50,
              to: 70,
              color: '#DF5353' // red
          },
          {
              from: 70,
              to: 100,
              color: '#FF4500' // orange
          }]
      },
      plotOptions: {
          gauge: {
              dataLabels: {
                  enabled: false
              }
          }
      },
      series: [{
          name: 'Status',
          data: [70]
      }]

  }

  getChartObjectFromData(data: DeviceTelemetry[]): { time: string, values: number }[] {

      const dataSeries = [];
      for (const i of data) {
          if (i.hasOwnProperty(this.activeFeature)) {
              const temp = {
                  time: i.timestamp,
                  value: i[this.activeFeature]
              }
              dataSeries.push(temp)
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
      this.chartOptions.title.text = this.activeFeature;
      this.updateFlag = true;
  }
  ngOnInit() {


      // const device = await this._store.select(selectSelectedDevice).toPromise();
      // console.log(device);

      this._store.select(deviceTelemetry).subscribe(res => {
          console.log(res);
          this.device = res;
          this.show=true;
          if (this.device) {

              // const data = ;
              this.setSeriesdata(this.getChartObjectFromData(this.device));
              this.rangeChartOptions.title.text = this.activeFeature;
              // this.updateChart(this.getValueFromStatus(this.device.status));
          }

      });

      // timer(0, environment.timer).subscribe(() => {
      //     this.updateChart(0);
      // });

  }

  getValueFromStatus(status: string): number {

      switch (status) {
          case 'Error':
              return 10;
              break;
          case 'Idle':
              return 25;
              break;
          case 'Processing':
              return 45;
              break;
          case 'Available':
              return 65;
              break;

          default:
              return 0
              break;
      }

  }

  updateChart(value = 0) {
      // if (this.device) {
      //     value = this.getValueFromStatus(this.device.status);
      // }
      // else {
      //     return;
      // }
      // const value = Math.ceil(5 * Math.random() * 6);
      console.log(this.chartOptions.xAxis);
      this.chartOptions.xAxis.categories.push(new Date().toLocaleTimeString());
      this.chartOptions.series[0].data.push(value);
      this.guageChartOptions.series[0].data = [value];
      if (this.chartOptions.series[0].data.length >= 10) {
          this.chartOptions.series[0].data.shift();
          this.chartOptions.xAxis.categories.shift();
      }
      // this.stackChartOptions.series[0].data.push();
      this.updateFlag = true;


  }
  updateChartSeries(ev: any) {
      console.log(ev.target.value);
      this.activeFeature = ev.target.value;
      this.setSeriesdata(this.getChartObjectFromData(this.device));
      this.setSeriesdataRange(this.getChartObjectFromData(this.rangeData));
      this.rangeChartOptions.title.text = this.activeFeature;

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
      this.rangeChartOptions.title.text = this.activeFeature;
      for (const i of data) {

          this.rangeChartOptions.series[0].data.push(i.value);
          this.rangeChartOptions.xAxis.categories.push(new Date(i.time).toLocaleDateString());
          // this.rangeChartOptions.xAxis.categories.push(Date.parse(i.time));
      }
      console.log(this.rangeChartOptions.xAxis, this.rangeChartOptions.series);
      this.updateFlag = true;
  }
}
