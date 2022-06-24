import { IUser } from "./../shared/models/user";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private httpclient: HttpClient, private router: Router) {}

  getCurrentUser() {
    return this.currentUserSource.value;
  }

  loadCurrentUser(token: String) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);

    return this.httpclient
      .get(this.baseUrl + "GetCurrentUserAsync", { headers })
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem("token", user.token);
            this.currentUserSource.next(user);
          }
        })
      );
  }

  login(values: any) {
    return this.httpclient.post(this.baseUrl + "login", values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem("token", user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  register(values: any) {
    return this.httpclient.post(this.baseUrl + "register", values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem("token", user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl("/");
  }

  checkEmailExist(email: string) {
    return this.httpclient.get(
      this.baseUrl + "CheckEmailExistsAsync?email=" + email
    );
  }
}
