import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ChildAComponent } from '../child-a/child-a.component';
import { MoveChildService } from '../move-child.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parent-b',
  templateUrl: './parent-b.component.html',
  styleUrls: ['./parent-b.component.css']
})
export class ParentBComponent implements AfterViewInit, OnDestroy {

  @ViewChild('containerA', {read: ViewContainerRef}) containerA: ViewContainerRef;
  @ViewChild('containerB', {read: ViewContainerRef}) containerB: ViewContainerRef;

  private childContainerRef: ComponentRef<ChildAComponent>;
  private isChildUp = true;

  private parentBSub: Subscription;

  constructor(private moveChildService: MoveChildService) {}

  ngAfterViewInit() {
     this.parentBSub = this.moveChildService.toParentB.subscribe({
      next: (componentRef: ComponentRef<ChildAComponent>) => {
        console.log('Event toParentB called!', componentRef);
        this.childContainerRef = componentRef;
        // const index = this.containerA.indexOf(this.childContainerRef.hostView);
        // this.containerA.detach(index);
        this.containerA.insert(this.childContainerRef.hostView);
        this.childContainerRef.changeDetectorRef.detectChanges();
      }
    });
  }

  // moveDown() {
  //   if (this.isChildUp) {
  //     const index = this.containerA.indexOf(this.childContainerRef.hostView);
  //     this.containerA.detach(index);
  //     this.containerB.insert(this.childContainerRef.hostView);
  //     this.childContainerRef.changeDetectorRef.detectChanges();
  //     this.isChildUp = false;
  //   }
  // }

  // moveUp() {
  //   if (!this.isChildUp) {
  //     const index = this.containerB.indexOf(this.childContainerRef.hostView);
  //     this.containerB.detach(index);
  //     this.containerA.insert(this.childContainerRef.hostView);
  //     this.childContainerRef.changeDetectorRef.detectChanges();
  //     this.isChildUp = true;
  //   }
  // }

  moveToApp() {
    this.moveChildService.toApp.emit(this.childContainerRef);
  }

  ngOnDestroy() {
    this.parentBSub.unsubscribe();
  }
}
