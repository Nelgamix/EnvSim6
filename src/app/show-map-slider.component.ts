import {Component, Input, OnChanges} from '@angular/core';
import {DecimalPipe} from '@angular/common';

/* TODO: change le bug */
@Component({
  selector: 'app-show-map-slider',
  styles: [`
    #span {
      font-weight: bold;
      color: #ffffff;
    }
    #overlay {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: hsla(200, 50%, 60%, .6);
      opacity: .33;
    }
  `],
  template: `
    <div id="overlay" [style.width]="progress+'%'" [style.background-color]="progressColor"></div>
    <span id="span">{{sf}}</span>
  `
})
export class ShowMapSliderComponent implements OnChanges {
  @Input() val: number;
  @Input() min: number;
  @Input() max: number;
  @Input() format: string;
  @Input() calculateColor: (n: number) => string;

  sf: string;
  progress: number;
  progressColor: string;

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnChanges() {
    const val = Math.max(this.min, Math.min(this.val, this.max));
    this.sf = this.format.replace('%d', '' + this.decimalPipe.transform(val, '1.0-2'));
    this.progress = ((val - this.min) / (this.max - this.min));
    this.progressColor = this.calculateColor(this.progress);
    this.progress *= 100;
  }
}
