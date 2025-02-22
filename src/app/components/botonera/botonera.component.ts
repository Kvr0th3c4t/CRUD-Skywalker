import { Component, inject, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { IUsuario } from '../../interfaces/i-usuario';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  usersService = inject(UserServiceService);
  router = inject(Router);
  miUser!: IUsuario;

  @Input() _id: string;
  @Input() parent: string;

  constructor(){
    this._id = "";
    this.parent = "";
  }

  eliminarUser(_id: string) {
    
    this.usersService.getById(_id).subscribe((user: IUsuario) => {
      this.miUser = user;
  
      Swal.fire({
        title: "¿Estás seguro, joven padawan?",
        text: `El destino de ${this.miUser.first_name} está en tus manos.`,
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/vader.gif') no-repeat center center / cover",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar", 
        color: "#FFD700",
        customClass: {
            popup: 'star-wars-popup',
            title: 'star-wars-title',
            htmlContainer: 'star-wars-text',
            icon: 'custom-icon-container',
            confirmButton: 'jediGreenSaber', 
            cancelButton: 'sithSaber'
        }
    }).then(resultado => {
        if (resultado.value) {
          this.usersService.delete(_id).subscribe((response: any) => {
            if (response._id) {
              Swal.fire({
                title: `Me has fallado por última vez, ${this.miUser.first_name}`,
                text: `${this.miUser.first_name} eliminado. Su existencia ya no perturbará el equilibrio.`,
                background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/vaderFail.gif') no-repeat center center / cover",
                confirmButtonText: "Que la Fuerza te acompañe",
                color: "#FFD700",
                customClass: {
                    popup: 'star-wars-popup',
                    title: 'star-wars-title',
                    htmlContainer: 'star-wars-text',
                    confirmButton: 'jediGreenSaber', 
                }
              });
              if (this.parent === 'view') {
                this.router.navigate(['/users']);
              }
            }
          });
          
        } else {
          Swal.fire({

            title: "Decisión sabia, joven padawan",
            text: "El usuario sigue formando parte de la Orden Jedi.",
            background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/yoda.gif') no-repeat center center / cover",
            confirmButtonText: "Que la Fuerza te acompañe",
            color: "#FFD700",
            customClass: {
                popup: 'star-wars-popup',
                title: 'star-wars-title',
                htmlContainer: 'star-wars-text',
                confirmButton: 'jediGreenSaber', 
            }
          });
        }
      });
    });
  }

}
