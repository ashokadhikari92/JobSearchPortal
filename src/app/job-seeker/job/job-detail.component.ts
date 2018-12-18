import { AuthService } from '../../auth/services/auth.service';
import { LoaderService } from '../../_partials/services/loader.service';
import { Router } from '@angular/router';
import { JsdataService } from '../services/jsdata.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: "app-job-detail-list",
  templateUrl: "./job-detail.component.html",
  styleUrls: ["./job-detail.component.css"]
})
export class DefaultJobDetailComponent implements OnInit {
  jobId;

  constructor(
    private service: JsdataService,
    private router: Router,
    private loader: LoaderService,
    route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {
    route.params.subscribe(
      param => {
        this.jobId = param.id;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {}

  applyToJo() {
    this.loader.stopLoader();
    this.service.applyJob(this.jobId).subscribe(
      result => {
        this.flashMessage.show('You successfully applied to the job.', {cssClass: 'alert-success'});
        this.loader.stopLoader();
        this.router.navigate(['/']);
      },
      (err) => {
        this.flashMessage.show(err.error.message, {cssClass: 'alert-danger'});
        this.loader.stopLoader();
        console.log(err);
        // this.router.navigate(['/']);
      }
    );
  }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }
  isJobSeekerPage() {
    if (this.authService.isSeeker()) {
      return true;
    }
    return false;
  }
}
