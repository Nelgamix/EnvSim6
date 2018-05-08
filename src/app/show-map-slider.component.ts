import {Component, Input, OnChanges} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-show-map-slider',
  template: `
    <div style="text-align: center; position: absolute; top: -20px; left: 0; right: 0; font-size: 80%" [style.width]="width + 'px'">
      {{sf}}
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
