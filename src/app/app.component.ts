import { Component, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ChildAComponent } from './child-a/child-a.component';
import { Router } from '@angular/router';
import { MoveChildService } from './move-child.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('containerA', {read: ViewContainerRef}) containerA: ViewContainerRef;

  @ViewChild('containerB', {read: ViewContainerRef}) containerB: ViewContainerRef;

  private childContainerRef: ComponentRef<ChildAComponent>;
  private isChildUp = true;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private router: Router, private moveChildService: MoveChildService) {}
  
  ngAfterViewInit() {
    const factoryA = this.componentFactoryResolver.resolveComponentFactory(ChildAComponent);
    this.childContainerRef = this.containerA.createComponent(factoryA);
    this.childContainerRef.changeDetectorRef.detectChanges();
    
    this.moveChildService.toApp.subscribe({
      next: (componentRef: ComponentRef<ChildAComponent>) => {
        console.log('Event toApp called!', componentRef);
        this.childContainerRef = componentRef;
        const index = this.containerA.indexOf(this.childContainerRef.hostView);
        this.containerA.detach(index);
        this.containerA.insert(this.childContainerRef.hostView);
        this.childContainerRef.changeDetectorRef.detectChanges();
        this.isChildUp = true;
      }
    })
  }

  gotoParentA() {
    this.router.navigateByUrl('/a');
  }
  
  gotoParentB() {
    this.router.navigateByUrl('/b');
  }

  moveChildToParentA() {
    this.moveChildService.toParentA.emit(this.childContainerRef);
  }

  moveChildToParentB() {
    this.moveChildService.toParentB.next(this.childContainerRef);
  }

  moveChildDown() {
    if (this.isChildUp) {
      const index = this.containerA.indexOf(this.childContainerRef.hostView);
      this.containerA.detach(index);
      this.containerB.insert(this.childContainerRef.hostView);
      this.childContainerRef.changeDetectorRef.detectChanges();
      this.isChildUp = false;
    }
  }

  moveChildUp() {
    if (!this.isChildUp) {
      const index = this.containerB.indexOf(this.childContainerRef.hostView);
      this.containerB.detach(index);
      this.containerA.insert(this.childContainerRef.hostView);
      this.childContainerRef.changeDetectorRef.detectChanges();
      this.isChildUp = true;
    }
  }
}
