import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmployerService } from "./../../employer/services/employer.service";

@Component({
  selector: "app-job-detail-list",
  templateUrl: "./job-detail-List.component.html",
  styleUrls: ["./job-detail-List.component.css"]
})
export class JobDetailListComponent implements OnInit {
  data;
  job;
  constructor(private employerService: EmployerService, route: ActivatedRoute) {
    route.params.subscribe(param => {
      let jobId = param.id;
      this.employerService.getJobDetailById(jobId).subscribe(
        response => {
          console.log("Fetched Candidates",response);
          this.job = response["data"];
          this.data = response["data"]["candidates"];
        },
        error => console.log(error)
      );
    });
  }

  ngOnInit() {}
}
