import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(public http: HttpClient) { }

 addEmployerProfile(employer){
    return this.http.post('http://localhost:3600/api/employers/profile/add',employer);
 }

 addJob(jobForm){
   return this.http.post('http://localhost:3600/api/employers/job/add',jobForm);
 }

 getJobDetailById(jobId){
  return this.http.get('http://localhost:3600/api/employers/job/'+jobId);
}


 getCandidateById(candidateId){
  return this.http.get('http://localhost:3600/api/employers/candidate/detail/'+candidateId);
}

}