import { Component, Input, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserProfileService } from '../../../core/services';
import { UserProfile } from '../../../core/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-perfis-usuarios',
  templateUrl: './lista-perfis-usuarios.component.html',
  styleUrls: ['./lista-perfis-usuarios.component.css']
})

export class ListaPerfisUsuariosComponent implements OnInit{

  userProfile = {} as UserProfile;
  userProfiles: UserProfile[];

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.getUserProfiles();
  }

  // defini se um userProfile será criado ou atualizado
  saveUserProfile(form: NgForm) {
    if (this.userProfile.id !== undefined) {
      this.userProfileService.updateUserProfile(this.userProfile).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.userProfileService.saveUserProfile(this.userProfile).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os userProfiles
  getUserProfiles() {
    this.userProfileService.getUserProfiles().subscribe((userProfiles: UserProfile[]) => {
      this.userProfiles = userProfiles;
    });
  }

  // deleta um userProfile
  deleteUserProfile(userProfile: UserProfile) {
    this.userProfileService.deleteUserProfile(userProfile).subscribe(() => {
      this.getUserProfiles();
    });
  }

  // copia o userProfile para ser editado.
  editUserProfile(userProfile: UserProfile) {
    this.userProfile = { ...userProfile };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getUserProfiles();
    form.resetForm();
    this.userProfile = {} as UserProfile;
  }


}
