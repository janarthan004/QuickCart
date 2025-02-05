import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
path:'',
component:AppComponent,
children:[{
  path:'dashboard',
  component:DashboardComponent
},
{
  path:'register',
  component:RegistrationComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'',
  redirectTo:'dashboard',
  pathMatch:'full'
}

]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
