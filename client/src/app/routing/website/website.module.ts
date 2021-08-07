import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGuestGuard } from './guards/admin-guest.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { DEFAULT_ROUTER_FEATURENAME, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./routing/home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'admin/auth',
        loadChildren: () => import('./routing/admin-auth/admin-auth.module').then((module) => module.AdminAuthModule),
        canActivate: [AdminGuestGuard],
        canLoad: [AdminGuestGuard],
      },
      {
        path: 'admin',
        loadChildren: () => import('./routing/admin/admin.module').then((module) => module.AdminModule),
        canActivate: [AdminAuthGuard],
        canLoad: [AdminAuthGuard],
      },
      {
        path: 'not-found',
        loadChildren: () => import('./routing/not-found/not-found.module').then((mod) => mod.NotFoundModule),
      },
      { path: '**', redirectTo: 'not-found' },
    ]),
  ],
  providers: [AdminGuestGuard, AdminAuthGuard],
})
export class WebsiteModule {}
