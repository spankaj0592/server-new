import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  isloggedIn: any;
  // private url = 'https://la-superadmin-dev.xmanna.com/adminActions/login';

  constructor(private http: HttpClient) { }

  loginUser(loginForm) {
    return this.http.post<any>(this.url, loginForm)
  }
  loggedIn() {
    console.log('loggedintriggered');
    return !!localStorage.getItem('token')
  }
}
