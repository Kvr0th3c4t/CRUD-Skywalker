import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../interfaces/i-usuario';
import { Observable } from 'rxjs';
import { BotoneraComponent } from "../../components/botonera/botonera.component";

@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  imports: [BotoneraComponent],
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.css'
})
export class UsuarioDetailComponent {

  userService = inject(UserServiceService);
  activatedRoute = inject(ActivatedRoute);

  miUser! : IUsuario;

  ngOnInit(): void{

    this.activatedRoute.params.subscribe((params: any)=>{
      let _id: string = params._id as string;

      this.userService.getById(_id).subscribe((user:IUsuario) =>{
        this.miUser = user;}
      );
    
    });
  }
}
