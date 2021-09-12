import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from '../base-resource';
import { MenuService } from '../service/menu.service';
import { Menu } from '../model';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
