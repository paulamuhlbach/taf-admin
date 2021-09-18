import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceListComponent } from '../../core/base-resource'
import { MenuService, MenuGroupService, PageService } from '../services';
import { Menu, MenuGroup, Page } from '../models';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent extends BaseResourceListComponent<Menu> implements OnInit{

  title: string = 'Menu Principal'

  menuGroups: Array<MenuGroup>;
  pages: Array<Page>;

  constructor(
    private menuService: MenuService,
    private menuGroupService: MenuGroupService,
    private pageService: PageService) {

    super(pageService)
   }

   ngOnInit() {
    this.loadMenuGroups();
    super.ngOnInit();
  }

   protected loadMenuGroups(){
    this.menuGroupService.getAll().subscribe(
      menuGroups => this.menuGroups = menuGroups
    );
  }

  protected loadPages(){
    this.pageService.getAll().subscribe(
      pages => this.pages = pages
    );
  }




}
