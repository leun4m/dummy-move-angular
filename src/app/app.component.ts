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
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private childContainerRef: ComponentRef<ChildAComponent>;

  constructor(private router: Router, private moveChildService: MoveChildService) {

  }

  ngAfterViewInit() {
    this.moveChildService.toApp.subscribe({
      next: (componentRef: ComponentRef<ChildAComponent>) => {
        console.log('Event toApp called!', componentRef);
        this.childContainerRef = componentRef;
        this.container.insert(this.childContainerRef.hostView);
        this.childContainerRef.changeDetectorRef.detectChanges();
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
    // this.moveChildService.toParentA.next(this.childContainerRef);
  }
}
