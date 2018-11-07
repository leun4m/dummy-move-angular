import { Component, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { ChildAComponent } from './child-a/child-a.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('containerA', {read: ViewContainerRef}) containerA: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    const factoryA = this.componentFactoryResolver.resolveComponentFactory(ChildAComponent);
    this.containerA.createComponent(factoryA);
  }
}
