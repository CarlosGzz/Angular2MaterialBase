import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [SidenavListComponent, PageNotFoundComponent, HeaderNavigationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [SidenavListComponent, PageNotFoundComponent, HeaderNavigationComponent]
})
export class CoreModule { }
