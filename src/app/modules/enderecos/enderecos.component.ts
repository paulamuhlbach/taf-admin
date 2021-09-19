import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceListComponent } from '../../core/base-resource'
import { FormGroup } from "@angular/forms";
import { EnderecoService } from '../../core/services/endereco.service';
import { Endereco } from '../../core/models';



@Component({
  selector: 'app-enderecos-form',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css'],
})

export class EnderecosComponent extends BaseResourceListComponent<Endereco> implements OnInit{

  title: string = 'Endereço';
  @Input() enderecoForm: FormGroup;

  constructor(
    private enderecoService: EnderecoService) {

    super(enderecoService)
   }



}
