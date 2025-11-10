import { Routes, RouterModule} from '@angular/router';
//1. Importar todos nuestros componentes pagina
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Departamentos } from './pages/departamentos/departamentos';
import { UsuariosDepartamento } from './pages/usuarios-departamento/usuarios-departamento';
import { RegisterDepartamentoPage } from './pages/register-departamento/register-departamento';
import { Usuario } from './pages/usuario/usuario';
import { Login } from './pages/login/login';
import { Users } from './pages/admin/users/users';
import { Inventory } from './pages/admin/inventory/inventory';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    { path: '', component: Home, title: 'Prueba Tecnica' },

    {
        path: 'dashboard', // path: 'admin' -> ruta principal
        component: Admin,
        title: 'Dashboard',
        canActivate: [authGuard],
        canActivateChild: [authGuard], //Proteger rutas hijas
        children: [
            { path: '', component: Users },
            { path: 'inventory', component: Inventory } //title es opcional
        ]
    },

    { path: 'admin', component: Admin, title: 'Admin' },
    { path: 'register', component: Register, title: 'Register' },
    { path: 'usuario', component: Usuario, title: 'Usuario' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'departamentos', component: Departamentos, title: 'Departamentos' },
    { path: 'registerDepartamento', component: RegisterDepartamentoPage,  title: 'Crear-Departamentos'},
    { path: 'usuariosDepartamento', component: UsuariosDepartamento, title: 'Usuarios-Departamento' },
    { path: '**', component: NotFound, title: '404' }
];
