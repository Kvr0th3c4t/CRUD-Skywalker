import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/i-usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {


  router = inject(Router);
  userService = inject(UserServiceService);
  activatedRoute = inject(ActivatedRoute);

  usersForm: FormGroup;
  tipo: string;
  afiliado: string;
  miUser!:IUsuario;

  constructor(){
    this.tipo = "Reclutar";
    this.afiliado = "iniciado"
    this.usersForm = new FormGroup({

      _id: new FormControl(''),
      id: new FormControl(''),
      first_name: new FormControl('',[Validators.required, Validators.minLength(4)]),
      last_name:new FormControl('',[Validators.required, Validators.minLength(4)]),
      username:new FormControl('',[Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),

      image: new FormControl('',[
        Validators.required, 
        Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/i)]),

      password: new FormControl('', [
        Validators.required,
      ]),
      
    },
      
      []);

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params._id) {
        this.tipo = "Convertir";
        this.afiliado ="acólito"
  
        this.userService.getById(params._id).subscribe((user: IUsuario) => {
          this.miUser = user;
  
          this.usersForm = new FormGroup({
            _id: new FormControl(this.miUser._id),
            id: new FormControl(this.miUser.id,),
            first_name: new FormControl(this.miUser.first_name, [Validators.required, Validators.minLength(4)]),
            last_name: new FormControl(this.miUser.last_name, [Validators.required, Validators.minLength(4)]),
            username: new FormControl(this.miUser.username, [Validators.required, Validators.minLength(4)]),
            email: new FormControl(this.miUser.email, [
              Validators.required,
              // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
            ]),
            image: new FormControl(this.miUser.image, [
              Validators.required,
              Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[^\s]*)?$/i)
            ]),
            password: new FormControl(this.miUser.password, [
              Validators.required, Validators.minLength(5)
            ])
          });
        });
      }
    });
  }
  
  getDataForm() {
    
    let user: IUsuario = this.usersForm.value;

    if(user._id){
      this.userService.update(user).subscribe((response:any)=>{
        if(response._id){
          Swal.fire({

            title: "¡Do It!",
            text: "Acepta el cambio. Un poder ilimitado te espera...",
            background: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/assets/images/palpatine.gif') no-repeat center center / cover",
            confirmButtonText: "Acepto mi destino",
            color: "#FFD700",
            customClass: {
                popup: 'star-wars-popup',
                title: 'star-wars-title',
                htmlContainer: 'star-wars-text',
                confirmButton: 'jediGreenSaber', 
            }
          });
        this.router.navigate(['/users']);
        }else{

          Swal.fire({
            title: "NOOOOPE",
            text: "Alert de update",
            icon: 'info',
            confirmButtonText: "Cerrar"
          });
        }
      })
    }else{

        this.userService.insert(user).subscribe((response:any)=>{
          console.log('Datos enviados:', user);
          if(response.id){
            Swal.fire({

              title: "La Fuerza es inusualmente fuerte en él.",
              text: "Bienvenido a la orden, my jóven aprendiz.",
              background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/obiwan.gif') no-repeat center center / cover",
              confirmButtonText: "Un Jedi debe estar seguro.",
              color: "#FFD700",
              customClass: {
                  popup: 'star-wars-popup',
                  title: 'star-wars-title',
                  htmlContainer: 'star-wars-text',
                  confirmButton: 'jediGreenSaber', 
              }
            });
            console.log('Respuesta del servidor:', response);
            this.router.navigate(['/users']);

          }else{
            Swal.fire({

              title: "NOOOOPE",
              text: "Alert de Insert",
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
            console.log('Respuesta del servidor:', response);
          }
        })
    }
  }

  checkControl(formControlName: string, validador: string): boolean | undefined{
    return this.usersForm.get(formControlName)?.hasError(validador) && this.usersForm.get(formControlName)?.touched
}
}

