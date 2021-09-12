import { OnInit, Injectable } from '@angular/core';

import { BaseResourceModel }  from './base-resource.model';
import { BaseResourceService } from './base-resource.service';


@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit(){

    this.resourceService.getAll().subscribe(
      resources => this.resources = resources['value'],
      error => alert("Erro ao carregar a lista")
    )

  }

  deleteResource(resource: T){
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete){
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert("Erro ao tentar excluir")
      )
    }
  }

}
