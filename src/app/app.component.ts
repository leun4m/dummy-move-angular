import { Component, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ChildAComponent } from './child-a/child-a.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('containerA', {read: ViewContainerRef}) containerA: ViewContainerRef;
  @ViewChild('containerB', {read: ViewContainerRef}) containerB: ViewContainerRef;

  private childContainerRef: ComponentRef<ChildAComponent>;
  private isChildUp = true;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    const factoryA = this.componentFactoryResolver.resolveComponentFactory(ChildAComponent);
    this.childContainerRef = this.containerA.createComponent(factoryA);
    this.childContainerRef.changeDetectorRef.detectChanges();
  }

  moveDown() {
    if (this.isChildUp) {
      const index = this.containerA.indexOf(this.childContainerRef.hostView);
      this.containerA.detach(index);
      this.containerB.insert(this.childContainerRef.hostView);
      this.childContainerRef.changeDetectorRef.detectChanges();
      this.isChildUp = false;
    }
  }

  moveUp() {
    if (!this.isChildUp) {
      const index = this.containerB.indexOf(this.childContainerRef.hostView);
      this.containerB.detach(index);
      this.containerA.insert(this.childContainerRef.hostView);
      this.childContainerRef.changeDetectorRef.detectChanges();
      this.isChildUp = true;
    }
  }
}
