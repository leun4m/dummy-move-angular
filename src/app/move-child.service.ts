import { Injectable, ViewContainerRef, EventEmitter, ComponentRef } from '@angular/core';
import { ChildAComponent } from './child-a/child-a.component';

@Injectable({
  providedIn: 'root'
})
export class MoveChildService {
  toAppEvent: EventEmitter<ComponentRef<ChildAComponent>>

  constructor() {
    this.toAppEvent = new EventEmitter<ComponentRef<ChildAComponent>>();
   }

  moveChildToApp(componentRef: ComponentRef<ChildAComponent>): void {
    this.toAppEvent.emit(componentRef);
  }
}
