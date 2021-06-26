import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    console.log('gaurdtrigged');
    if (this.authService.loggedIn()) {

      return true;

    }
    else {
      this.router.navigateByUrl('');
    }
    return this.authService.loggedIn();
  }
}
