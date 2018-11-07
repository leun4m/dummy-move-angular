import { Injectable, ViewContainerRef, EventEmitter, ComponentRef } from '@angular/core';
import { ChildAComponent } from './child-a/child-a.component';

@Injectable({
  providedIn: 'root'
})
export class MoveChildService {
  toApp: EventEmitter<ComponentRef<ChildAComponent>>
  toParentA: EventEmitter<ComponentRef<ChildAComponent>>
  toParentB: EventEmitter<ComponentRef<ChildAComponent>>

  constructor() {
    this.toApp = new EventEmitter<ComponentRef<ChildAComponent>>();
    this.toParentA = new EventEmitter<ComponentRef<ChildAComponent>>();
    this.toParentB = new EventEmitter<ComponentRef<ChildAComponent>>();
  }
}
