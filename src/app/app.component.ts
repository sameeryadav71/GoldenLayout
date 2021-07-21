import { Component, ComponentFactoryResolver, ApplicationRef, Injector, NgZone, ComponentRef, Inject, ChangeDetectorRef } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
import { Panel1Component } from './panel1/panel1.component';
import { Panel3Component } from './panel3/panel3.component';
import { Panel2Component } from './panel2/panel2.component';


type NgComponent<T> = { new(...params: any[]): T };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Golden Layout';

  private layout: GoldenLayout = null;

  private config = {
    settings: {
      showPopoutIcon: false // Angular SPA. it will not be working in multi window app
    },

    content: [{
      type: 'column',
      content: [

        {
          type: 'row',
          content: [
            {
              type: 'component',
              componentName:'panel1'
            },
            {
              type: 'component',
              componentName:'panel2'
            }
          ]
        },
        {
        type: 'component',
        componentName: 'panel3'
      }
    ],

    }]
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private zone: NgZone
  ) {

    this.layout = new GoldenLayout(this.config);
    this.registerComponent('panel1', Panel1Component);
    this.registerComponent('panel2', Panel2Component);
    this.registerComponent('panel3', Panel3Component)
    this.layout.init();
  }

  registerComponent<T>(componentName: string, entryComponent: NgComponent<T>) {

    this.layout.registerComponent(componentName, (container: GoldenLayout.Container) => {

      let component: ComponentRef<T>;

      // create angular component in angular zone and append it in to layout container
      this.zone.run(_ => {
        component = this.createComponent(entryComponent, container);
        const view:HTMLElement = ( component.hostView as any ).rootNodes[0];
        container.getElement().append(view);
      });

      // destroy angular component
      container.on('destroy', () => {
        this.zone.run(_ => {
          this.destroyComponent(component);
        });
      });
    });
  }

  createComponent<T>(entryComponent: NgComponent<T>, container: GoldenLayout.Container) {
    const factory = this.componentFactoryResolver.resolveComponentFactory<T>(entryComponent);

    // inject container to component; we can get this value in component constructor
    const injector = Injector.create([
      { provide: 'Container', useValue: container },
      { provide: 'GoldenLayout', useValue: this.layout }
    ], this.injector);

    const component = factory.create(injector);
    this.appRef.attachView(component.hostView);

    return component;
  }

  destroyComponent(component: ComponentRef<any>) {
    this.appRef.detachView(component.hostView);
    component.destroy();
  }

}
