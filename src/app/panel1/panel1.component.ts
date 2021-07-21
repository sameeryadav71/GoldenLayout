import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Container } from 'golden-layout';
import * as GoldenLayout from 'golden-layout';
import { DataService } from '../shared/service/data.service';


@Component({
  selector: 'app-panel1',
  templateUrl: './panel1.component.html',
  styleUrls: ['./panel1.component.css']
})
export class Panel1Component implements OnInit {

  // inject parent container
  constructor(
    @Inject('Container') public container: Container,
    @Inject('GoldenLayout') public layout: GoldenLayout,
    private detector: ChangeDetectorRef,
    public service: DataService
  ) {


  }

  ngOnInit() {
    console.log('main view initialized');
  }

}
