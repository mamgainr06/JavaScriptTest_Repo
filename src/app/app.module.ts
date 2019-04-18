import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule,MatTableModule,MatCardModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SubredditService } from './services/reddit.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule, HttpClientModule, BrowserAnimationsModule,MatTableModule,
    MatPaginatorModule,MatCardModule
  ],
  exports:[MatTableModule,MatPaginatorModule],
  providers: [SubredditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
