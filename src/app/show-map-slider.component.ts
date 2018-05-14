import {Component, Input, OnChanges} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-show-map-slider',
  styles: [`
    #div {
      width: 100%;
      height: 100%;
    }
    #span {
      font-weight: bold;
    }
  `],
  template: `
    <div id="div" [style.width]="width + 'px'">
      <span id="span">{{sf}}</span>
    </div>
  `
})
export class ShowMapSliderComponent implements OnChanges {
  @Input() val: number;
  @Input() min: number;
  @Input() max: number;
  @Input() format: string;
  @Input() width: number;

  sf: string;

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnChanges() {
    const val = Math.max(this.min, Math.min(this.val, this.max));
    this.sf = this.format.replace('%d', '' + this.decimalPipe.transform(val, '1.0-2'));
  }
}
