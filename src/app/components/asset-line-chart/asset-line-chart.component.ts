import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { AssetHistoryFromApi, History } from 'src/app/models/assetHistory';
import { CoinCapService } from 'src/app/services/coin-cap.service';

@Component({
  selector: 'app-asset-line-chart',
  templateUrl: './asset-line-chart.component.html',
  styleUrls: ['./asset-line-chart.component.css']
})
export class AssetLineChartComponent{
  // We need input from the component to pull the right asset data with
  @Input()
  assetId!: string;

  public assetHistory$: Observable<AssetHistoryFromApi>;
  public assetHistory: History[] = [];

  // Configuration for the charts
  // We will dynamically set the data and labels later
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Price in USD of Asset',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderColor: 'rgba(0,0,0,1)',
        pointBackgroundColor: 'rgba(0,0,0,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private coinCapService: CoinCapService) {
    this.assetHistory$ = this.coinCapService.getAssetHistory(this.assetId);
  }

  ngOnChanges(){
    this.assetHistory$ = this.coinCapService.getAssetHistory(this.assetId);
    this.assetHistory$.subscribe(data => {
      this.assetHistory = data.data;
      this.initializeChartData();
      this.chart?.chart?.update();
    })
  }

  // Called in the constructor after we get data, initialize the chart to have all the data
  public initializeChartData(): void {
    // First clear chart data
    this.lineChartData.datasets[0].data = [];
    this.lineChartData.labels = [];

    // We are going to grab a select few samples from the data from the past year
    for(let i=0; i<this.assetHistory.length; i++){
      if(i % 30 == 0){
        // multiple of 30, only want 12 samples

        // Get day
        let day: History = this.assetHistory[i];

      this.lineChartData.datasets[0].data.push(parseFloat(day.priceUsd));
      this.lineChartData.labels?.push(day.date.substring(0,10));
      }

    }
  }
}
