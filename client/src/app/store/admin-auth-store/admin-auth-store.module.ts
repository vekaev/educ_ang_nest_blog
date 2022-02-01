import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { ADMIN_AUTH_FEATURE_NAME, adminAuthReducer } from './store/admin-auth.reducer';
import { AdminAuthEffects } from './store/admin-auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminAuthInterceptor } from './interceptors/admin-auth.interceptor';

@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true }],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (req) => req as any,
      },
    }),
    StoreModule.forFeature(ADMIN_AUTH_FEATURE_NAME, adminAuthReducer),
    EffectsModule.forFeature([AdminAuthEffects]),
  ],
})
export class AdminAuthStoreModule {}
