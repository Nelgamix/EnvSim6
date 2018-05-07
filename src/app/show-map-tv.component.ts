import {Component, HostListener, Input} from '@angular/core';
import {TV} from '../../projects/worldsim/src/lib/model/TV';

@Component({
  selector: 'app-show-map-tv',
  styles: [`
    .no-select {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Chrome and Opera */
      cursor: w-resize;
    }
  `],
  template: `
    <div style="width: 96px" class="no-select" [style.background-color]="background">
      <div style="width: 36px; display: inline-block">
        <i class="material-icons md-36" style="display: inline">tv</i>
      </div>
      <div style="display: inline-block">
        <span>{{tv.channel}}</span> <br>
        <span>{{tv.volume * 100 | number:'1.0-2'}}%</span>
      </div>
    </div>
  `
})
export class ShowMapTvComponent {
  @Input() tv: TV;
  @Input() onConfigure: (Obj) => void;

  mDown = false;
  last: MouseEvent;
  modIntensity: number;
  background = 'none';

  @HostListener('mouseenter') onMouseEnter() {
    this.background = '#aaa8';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.background = '#fff0';
    this.mDown = false;
    this.saveIntensity();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.mDown = true;
    this.last = event;
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.mDown) {
      this.modIntensity = event.clientX - this.last.clientX;
    }
  }

  @HostListener('mouseup') onMouseUp() {
    this.mDown = false;
    this.saveIntensity();
  }

  @HostListener('click') onClick() {
    this.onConfigure(this.tv);
  }

  private saveIntensity(): void {
    if (this.modIntensity) {
      this.tv.modifyVolume(this.modIntensity / 100);
      this.modIntensity = 0;
    }
  }
}
