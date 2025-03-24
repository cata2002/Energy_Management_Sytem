import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ChatComponent } from './pages/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserPageComponent,
    AdminPageComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
