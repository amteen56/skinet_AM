import { AccountService } from './account/account.service';
import { BasketService } from "./basket/basket.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Skinet";

  constructor(private BasketService: BasketService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadbasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem("token");
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(
        () => {
          console.log("user loaded successfully");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  loadbasket() {
    const basketid = localStorage.getItem("basket_id");
    if (basketid) {
      this.BasketService.getBasket(basketid).subscribe(
        () => {
          console.log("initialzed basket");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
