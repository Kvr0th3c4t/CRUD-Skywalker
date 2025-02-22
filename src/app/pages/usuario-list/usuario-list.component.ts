import { Component, inject } from '@angular/core';
import { IUsuario } from '../../interfaces/i-usuario';
import { UserServiceService } from '../../services/user-service.service';
import { UsuarioCardComponent } from "../../components/usuario-card/usuario-card.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [UsuarioCardComponent, NgxPaginationModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent{
  arrayUsers: IUsuario[] = [];
  p: number;
  itemsPerPage: number;
  totalUsers:any;

  constructor(){
    this.p = 0;
    this.itemsPerPage = 0;
    this.totalUsers = 0;
    
  }

  userService = inject(UserServiceService);

  ngOnInit(): void {
  
    this.userService.getAll(0,3).subscribe((data: any) => {
      this.arrayUsers = data.results;
      this.p = data.page;
      this.itemsPerPage = data.per_page - 4;
      this.totalUsers = data.total;
    });
  }

  inc(){
    if(this.itemsPerPage < this.arrayUsers.length){
      this.itemsPerPage += 3;
    }
  }

  dec(){
    if(this.itemsPerPage > 3){
      this.itemsPerPage -= 3;
    }
      
  }
  
}
