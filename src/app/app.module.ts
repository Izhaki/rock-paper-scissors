import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player.component';
import { ZeroPadderPipe } from './zeroPadder.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ZeroPadderPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
