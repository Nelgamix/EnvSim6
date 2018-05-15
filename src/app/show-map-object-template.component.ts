import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Obj} from '../../projects/worldsim/src/lib/model/Obj';

@Component({
  selector: 'app-show-map-object-template',
  styles: [`
    #display-top {
      text-align: center;
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      font-size: 12px;
      background-color: #828282;
    }
    #display-bottom {
      text-align: center;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      font-size: 13px;
      background-color: aquamarine;
    }
    #container {
      min-width: 88px;
      display: flex;
      position: relative;
      padding: 4px;
    }
    #icon {
      width: 36px;
      height: 36px;
      margin-right: 4px;
    }
  `],
  template: `
    <div id="container" [ngStyle]="styles">
      <div id="display-top">
        <app-show-map-slider
            *ngIf="mOn && modifiable"
            [val]="modificationValue + modifier"
            [min]="modificationMin"
            [max]="modificationMax"
            [format]="modificationFormat"
            [calculateColor]="calculateColor">
        </app-show-map-slider>
      </div>
      <div id="icon">
        <ng-content></ng-content>
      </div>
      <div>
        <div *ngFor="let p of props" style="line-height: 18px">{{p()}}</div>
      </div>
      <div *ngIf="mOn && displayName != null"
           id="display-bottom">
        <span style="font-weight: bold">{{displayName}}</span>
      </div>
    </div>
  `
})
export class ShowMapObjectTemplateComponent implements OnInit {
  @Input() object: Obj;
  @Input() props: (() => string)[];
  @Input() onConfigure: (o: Obj) => void;
  @Input() displayName: string;
  @Input() calculateColor: (n: number) => string;

  @Input() modifiable: boolean;
  @Input() modification: (m: number) => void;
  @Input() modificationValue: number;
  @Input() modificationFormat: string;
  @Input() modificationMin: number;
  @Input() modificationMax: number;
  @Input() modificationStrength: number;

  protected mDown = false;
  protected mOn = false;
  protected last: MouseEvent;
  protected modifier = 0;
  protected styles = {
    background: 'none',
    cursor: this.modifiable ? 'w-resize' : 'pointer'
  };

  @HostListener('mouseenter') onMouseEnter() {
    this.styles.background = '#aaa8';
    this.mOn = true;

    this.mouseEnter();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.styles.background = '#fff0';
    this.mDown = false;
    this.mOn = false;

    this.launchModification();
    this.mouseLeave();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.mDown = true;
    this.last = event;

    this.mouseDown();
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.mDown) {
      this.modifier = Math.round((event.clientX - this.last.clientX) / (this.modificationStrength == null ? 1 : this.modificationStrength));
    }

    this.mouseMove();
  }

  @HostListener('mouseup') onMouseUp() {
    this.mDown = false;

    this.launchModification();
    this.mouseUp();
  }

  @HostListener('click') onClick() {
    this.onConfigure(this.object);
    this.mouseClick();
  }

  ngOnInit(): void {
    this.styles.cursor = this.modifiable ? 'w-resize' : 'pointer';
  }

  protected mouseEnter() {
  }

  protected mouseLeave() {
  }

  protected mouseDown() {
  }

  protected mouseMove() {
  }

  protected mouseUp() {
  }

  protected mouseClick() {
  }

  private launchModification() {
    if (!this.modifiable || this.modifier === 0) {
      return;
    }

    this.modification(this.modifier);
    this.modifier = 0;
  }
}
