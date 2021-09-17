import { Component, OnInit, Input } from '@angular/core';

interface BreadCrumbItem{
  text: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  @Input() itens: Array<BreadCrumbItem> = []

  constructor() { }

  ngOnInit(): void {
  }

  isTheLastItem(item: BreadCrumbItem): boolean{
    const index = this.itens.indexOf(item);
    return index + 1 == this.itens.length;
  }

}
