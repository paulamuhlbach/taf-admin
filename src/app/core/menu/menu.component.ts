import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceListComponent } from '../../core/base-resource'

import { MenuService } from '../services/menu.service';
import { MenuGroupService } from '../services/menuGroup.service';
import { PageService } from '../services/page.service';
import { Menu, MenuGroup, Page } from '../models';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent extends BaseResourceListComponent<Page> implements OnInit{

  @Output() public sidenavToggle = new EventEmitter();

  title: string = 'Menu Principal'

  menuGroups: Array<MenuGroup>;
  menus: Array<Menu>;
  idMenuGroup: number = 2;
  menuGroup: MenuGroup;
  noContent: string;

  constructor(
    private menuService: MenuService,
    private menuGroupService: MenuGroupService,
    private pageService: PageService) {

    super(pageService)
   }

   ngOnInit() {
    this.loadMenuGroups();
    this.loadMenus();
    super.ngOnInit();
  }

   protected loadMenuGroups(){
    this.menuGroupService.getById(this.idMenuGroup).subscribe(
      menuGroup => this.menuGroup = menuGroup
    );
  }

  protected loadMenus(){
    this.menuService.getAll().subscribe(
      menus => this.menus = menus
    );
  }


  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
