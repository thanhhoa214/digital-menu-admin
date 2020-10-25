import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}
