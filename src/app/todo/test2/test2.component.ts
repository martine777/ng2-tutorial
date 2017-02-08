import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  selected: string;
  slider: number;
  constructor() { }

  ngOnInit() {
  }
  process1(event: any) {
    console.log(this.selected, '事件信息', event);
  }

}
