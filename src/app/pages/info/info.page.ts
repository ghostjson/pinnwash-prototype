import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-info",
  templateUrl: "./info.page.html",
  styleUrls: ["./info.page.scss"]
})
export class InfoPage implements OnInit {
  today: any = new Date();

  constructor() {
    this.today = formatDate(this.today, "yyyy-mm-dd", "en_IN");
    console.log(this.today);
  }

  ngOnInit() {}
}
