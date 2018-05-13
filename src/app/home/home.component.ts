import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger("items", [
      transition("* => *", [
        query(":enter", style({opacity: 0}), {optional: true}), 

        query(":enter", stagger("200ms", [
          animate(".6s ease-in", keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}), 
            style({opacity: .5, transform: 'translateY(15px)', offset: 0.5}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))]), {optional: true}),

        query(":leave", stagger("200ms", [
          animate(".6s ease-out", keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}), 
            style({opacity: .5, transform: 'translateY(15px)', offset: 0.5}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemsCount : number;
  submitText : string = "Add item";
  itemText : string = "GTX 1050 Ti";
  inventoryItems = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.itemsCount = this.inventoryItems.length;
    this._data.items.subscribe(res => this.inventoryItems = res);
    this._data.changeItem(this.inventoryItems);
  }

  addItem(){
    this.inventoryItems.push(this.itemText);
    this.itemText = "";
    this.itemsCount = this.inventoryItems.length;
    this._data.changeItem(this.inventoryItems);
  }

  removeItem(i){
    this.inventoryItems.splice(i, 1);
    this._data.changeItem(this.inventoryItems);
    //testasdada
  }
}
