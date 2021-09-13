import { Component, Input, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService, MenuGroupService, PageService } from '../services';
import { Menu } from '../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit{

  menu = {} as Menu;
  menus: Menu[];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.getMenus();
  }

  // defini se um menu será criado ou atualizado
  saveMenu(form: NgForm) {
    if (this.menu.id !== undefined) {
      this.menuService.updateMenu(this.menu).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.menuService.saveMenu(this.menu).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os menus
  getMenus() {
    this.menuService.getMenus().subscribe((menus: Menu[]) => {
      this.menus = menus;
    });
  }

  // deleta um menu
  deleteMenu(menu: Menu) {
    this.menuService.deleteMenu(menu).subscribe(() => {
      this.getMenus();
    });
  }

  // copia o menu para ser editado.
  editMenu(menu: Menu) {
    this.menu = { ...menu };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getMenus();
    form.resetForm();
    this.menu = {} as Menu;
  }


}
