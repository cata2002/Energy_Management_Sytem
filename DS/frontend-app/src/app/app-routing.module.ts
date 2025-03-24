import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {ChatComponent} from "./pages/chat/chat.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'user', component: UserPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'chat', component: ChatComponent},
  {path: '**', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
