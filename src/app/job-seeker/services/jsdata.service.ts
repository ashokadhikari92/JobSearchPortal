import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsdataService {

  constructor(public http:HttpClient) { }

  addProfile(seeker){
    return this.http.post('http://localhost:3600/api/seekers/profile/add', seeker);
  }
  loadProfile(){
    return this.http.get('http://localhost:3600/api/seekers/profile/detail');
  }
  applyJob(jobId){
    return this.http.get('http://localhost:3600/api/seekers/job/apply/' + jobId);
  }
  loadJobs(filters = {}){
    return this.http.get('http://localhost:3600/api/seekers/jobs', {params: filters});
  }
  filterJobs(filters = {}) {
    return this.http.get('http://localhost:3600/api/seekers/jobs/filter', {params: filters});
  }
  loadMyJobs() {
    return this.http.get('http://localhost:3600/api/seekers/jobs/applied');
  }

  getJobDetailById(jobId) {
    return this.http.get('http://localhost:3600/api/seekers/job/' + jobId);
  }
}
