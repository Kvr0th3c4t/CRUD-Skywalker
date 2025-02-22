import { Routes } from '@angular/router';
import { UsuarioListComponent } from './pages/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './pages/usuario-form/usuario-form.component';
import { UsuarioDetailComponent } from './pages/usuario-detail/usuario-detail.component';

export const routes: Routes = [

    { path: "", pathMatch: "full", redirectTo: "users" },
    { path: "users", component: UsuarioListComponent },
    { path: "newUser", component: UsuarioFormComponent },
    { path: "users/:_id", component: UsuarioDetailComponent },
    { path: "actualizar/user/:_id", component: UsuarioFormComponent },
    { path: "**", redirectTo: "users"}
];
