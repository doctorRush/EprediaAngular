import { DeviceTelemetry } from './../../models/device-telemetry';
import { DeviceService } from './../../services/device.service';
import { IAppState } from 'src/app/store/state/app.state';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import { Store } from '@ngrx/store';

HC_more(Highcharts);

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.css']
})
export class ChartDemoComponent implements OnInit {


  graph = {
    data: [
      { x: [], y: [], type: 'line', mode: 'lines+points', marker: { color: 'blue' } }
    ],
    layout: {
      title: 'Pressure Chamber',
      xaxis: {
        tickmode: "linear", //  If "linear", the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick`
        tick0: '1999-12-15',
        dtick: 60 * 60 * 1000, // milliseconds
        title: {
          text: 'Time',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
        // showgrid:false,
        showgrid: false,
        zeroline: false,
        showline: true,
        autotick: true,
        ticks: 'outside'
      },
      yaxis: {
        showgrid: false,
        zeroline: false,
        showline: true,
        ticks: 'outside',
        tick0: 0,
        // dtick: 500,
        range: [0, 1500],
        tickfont: { size: 12 },
        title: {
          text: 'Pressure mB',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    }

  };
  device: DeviceTelemetry[] = [];
  activeFeature = 'pressure_chamber';
  from: any;
  to: any;
  rangeData: any;
  show: boolean = false;
  constructor(private _store: Store<IAppState>, private deviceService: DeviceService) { }

  // highchartGuage = HighChartGuage;
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
      type: "datetime",
      min: Date.now(),
      max: Date.now(),
      tickInterval: 3600 * 1000,
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
      {
        pointStart: Date.now(),
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
    // this.chartOptions.xAxis.categories = [];
    // this.chartOptions.series[0].data = [];
    for (const i of data) {

      // this.chartOptions.series[0].data.push(i.value);
      // this.chartOptions.xAxis.categories.push(new Date(i.time).toLocaleTimeString());
    }
    console.log(this.chartOptions.xAxis, this.chartOptions.series);
    this.chartOptions.title.text = 'Realtime Graph for :' + this.activeFeature;
    this.updateFlag = true;
  }
  ngOnInit() {

    this.deviceService.getPressureChamber().subscribe(
      res => {
        this.setValue(res);

      }
    );

  }

  private setValue(res: any) {
    this.show = true;
    console.log(res);
    this.graph.data[0].x = [];
    this.graph.data[0].y = [];

    this.chartOptions.xAxis.min = new Date(res.timestamp[0]).getTime();
    this.chartOptions.series[0].pointStart = new Date(res.timestamp[0]).getTime();
    this.graph.layout.xaxis.tick0 = new Date(res.timestamp[0]).getTime().toString();
    this.chartOptions.xAxis.max = new Date(res.timestamp[res.timestamp.length - 1]).getTime();
    for (const key in res.value) {
      if (res.value.hasOwnProperty(key)) {
        const element = res.value[key];
        const datapoint = [];
        const time = new Date(res.timestamp[key]).getTime();
        datapoint.push(time);
        this.graph.data[0].x.push(new Date(res.timestamp[key]));
        if (element == '') {
          datapoint.push(null);
          this.graph.data[0].y.push(null);
        }
        else {
          this.graph.data[0].y.push(element);
          datapoint.push(parseFloat(element));
        }
        this.chartOptions.series[0].data.push(datapoint);
      }
    }
    this.updateFlag = true;
  }

  updateChartSeries(ev: any) {
    const val = ev.target.value;

    switch (val) {
      case '0': {
        this.deviceService.getPressureChamber().subscribe(
          res => {
            this.graph.layout.yaxis.range = [0,1500];
            this.graph.layout.xaxis.dtick  = 60 * 60 * 1000;
            this.setValue(res);

          }
        );

        break;
      }
      case '1': {
        this.deviceService.getSpecificGravity().subscribe(
          res => {
            this.graph.layout.xaxis.dtick  = 24 * 60 * 60 * 1000;
this.graph.layout.yaxis.range = [0,200]
            this.setValue(res);

          }
        );

        break;
      }
      case '2': {
        this.deviceService.getTempratureFluid().subscribe(
          res => {
            this.graph.layout.yaxis.range = [0,100];
            this.graph.layout.yaxis.title.text = 'Temperature ( ^C)'

            this.graph.layout.xaxis.dtick  = 60 * 60 * 1000;
            this.setValue(res);

          }
        );

        break;
      }
      case '3': {
        this.deviceService.getTempWaxBath1().subscribe(
          res => {
            this.graph.layout.xaxis.dtick  = 24 * 60 * 60 * 1000;
            this.graph.layout.yaxis.range = [0,100];
this.graph.layout.yaxis.title.text = 'Temperature ( ^C)'
            this.setValue(res);

          }
        );

        break;
      }
      case '4': {
        this.deviceService.getTempWaxBath3().subscribe(
          res => {
this.graph.layout.yaxis.title.text = 'Temperature ( ^C)'

            this.graph.layout.xaxis.dtick  = 24 * 60 * 60 * 1000;
            this.graph.layout.yaxis.range = [0,100]

            this.setValue(res);

          }
        );

        break;
      }
      default:
        break;
    }

  }



}
