import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: 'auth', useClass: AuthService},
    {provide: 'user', useClass: UserService},
    AuthGuardService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
