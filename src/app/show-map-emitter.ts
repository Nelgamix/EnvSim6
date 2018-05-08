import {HostListener, Input} from '@angular/core';
import {Emitter} from '../../projects/worldsim/src/lib/model/Emitter';

export class ShowMapEmitter {
  @Input() emitter: Emitter;
  @Input() onConfigure: (Obj) => void;

  protected mDown = false;
  protected mOn = false;
  protected last: MouseEvent;
  protected modifier = 0;
  protected background = 'none';

  @HostListener('mouseenter') onMouseEnter() {
    this.background = '#aaa8';
    this.mOn = true;

    this.mouseEnter();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.background = '#fff0';
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
      this.modifier = event.clientX - this.last.clientX;
    }

    this.mouseMove();
  }

  @HostListener('mouseup') onMouseUp() {
    this.mDown = false;

    this.launchModification();
    this.mouseUp();
  }

  @HostListener('click') onClick() {
    this.onConfigure(this.emitter);
    this.mouseClick();
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
    if (this.modifier === 0) {
      return;
    }

    this.modify(this.modifier);
    this.modifier = 0;
  }

  protected modify(modifier: number) {
  }
}
