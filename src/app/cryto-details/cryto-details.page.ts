import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-cryto-details',
  templateUrl: './cryto-details.page.html',
  styleUrls: ['./cryto-details.page.scss'],
})
export class CrytoDetailsPage implements OnInit {
  header : any;
  detailProduct:any;
  constructor(public route: ActivatedRoute,private router: Router) { 
  }

  ngOnInit() {
     //Get the data of selected crypto Currency
    this.detailProduct = this.router.getCurrentNavigation().extras.state;
  }

  ionViewDidEnter() {
    this.containerChart();
    this.barChartPopulation();
  }

  //Char to show Percentage vs Time Graph
  containerChart() {
    HighCharts.chart('container', {
      chart: {
        type: 'spline'
      },
      title: {
        text: this.detailProduct.name
      },
      xAxis: {
        categories: ['90D','60D','30D','7D','24hr','1hr'],
      },
      yAxis: {
        min: -50,
        max: 30,
        title: {
          text: 'Price Change (in Percentage)',
          align: 'middle'
        },
      },
      series: [{
        type: undefined,
        name: 'Time',
        data: [this.detailProduct.quote.USD.percent_change_90d,this.detailProduct.quote.USD.percent_change_60d,
          this.detailProduct.quote.USD.percent_change_30d,this.detailProduct.quote.USD.percent_change_7d,
          this.detailProduct.quote.USD.percent_change_24h,this.detailProduct.quote.USD.percent_change_1h]
      }]
    });
  }

  //Char to show Volume Graph
  barChartPopulation() {
    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: [this.detailProduct.name],
      },
      yAxis: {
        min: 0
      },
      series: [{
        type: undefined,
        name: 'Volume',
        data: [this.detailProduct.quote.USD.volume_24h]
      }]
    });
  }
}
