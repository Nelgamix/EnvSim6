import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Thermometer} from '../../../projects/worldsim/src/lib/model/objects/Thermometer';
import {Utils} from '../utils';

@Component({
  selector: 'app-show-map-thermometer',
  template: `
    <app-show-map-object-template
        [object]="object"
        [props]="props"
        [onConfigure]="onConfigure"
        [modifiable]="true"
        [modificationValue]="object.temperature"
        [modificationMin]="Thermometer.TEMPERATURE_MIN"
        [modificationMax]="Thermometer.TEMPERATURE_MAX"
        [modificationFormat]="format"
        [modificationStrength]="3"
        [modification]="modify"
        displayName="Thermometer"
        [calculateColor]="calculateColor">
      <div>
        <i class="material-icons md-36" [style.color]="iconColor">whatshot</i>
      </div>
    </app-show-map-object-template>
  `
})
export class ShowMapThermometerComponent implements OnChanges {
  @Input() object: Thermometer;
  @Input() onConfigure: (Obj) => void;

  Thermometer = Thermometer;
  iconColor: string;
  format = 'Temp.: %d°C';

  props = [
    () => this.object.temperature + '°C'
  ];

  calculateColor = (n: number) => {
    const cold = '0000ff';
    const hot = 'ff0000';

    return Utils.scaleColor(n, cold, hot);
  };

  ngOnChanges(changes: SimpleChanges): void {
    const ratio = (this.object.temperature - Thermometer.TEMPERATURE_MIN) / (Thermometer.TEMPERATURE_MAX - Thermometer.TEMPERATURE_MIN);
    this.iconColor = this.calculateColor(ratio);
  }

  protected modify(modifier: number) {
    this.object.modifyTemperature(modifier);
  }
}
