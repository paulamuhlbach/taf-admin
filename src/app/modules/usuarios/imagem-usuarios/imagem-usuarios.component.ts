import { Component, Input, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ImagemService } from '../../../core/services';
import { Imagem } from '../../../core/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-imagem-usuarios',
  templateUrl: './imagem-usuarios.component.html',
  styleUrls: ['./imagem-usuarios.component.css']
})

export class ImagemUsuariosComponent implements OnInit{

  imagem = {} as Imagem;
  imagens: Imagem[];

  constructor(private imagemService: ImagemService) {}

  ngOnInit() {
    this.getImagems();
  }

  // defini se um imagem será criado ou atualizado
  saveImagem(form: NgForm) {
    if (this.imagem.id !== undefined) {
      this.imagemService.updateImagem(this.imagem).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.imagemService.saveImagem(this.imagem).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os imagens
  getImagems() {
    this.imagemService.getImagems().subscribe((imagens: Imagem[]) => {
      this.imagens = imagens;
    });
  }

  // deleta um imagem
  deleteImagem(imagem: Imagem) {
    this.imagemService.deleteImagem(imagem).subscribe(() => {
      this.getImagems();
    });
  }

  // copia o imagem para ser editado.
  editImagem(imagem: Imagem) {
    this.imagem = { ...imagem };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getImagems();
    form.resetForm();
    this.imagem = {} as Imagem;
  }


}
