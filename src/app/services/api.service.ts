import { Injectable } from '@angular/core';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
    url_api = `${environment.apiUrl}/api/v1/`;
    token: string = '';
    email: string = '';

    url_logo_company: string = '';
    url_avatar_profile: string = '';
    name_user: string = '';

    constructor(
                    public http: HTTP,
                    public storage: NativeStorage,
                ){
                    if (!this.token) {
                        this.storage.getItem('token')
                        .then(
                            data => this.token = data,
                            error => console.log('error token storage')
                          );
                    }
                }


      forgetPassword(email: string) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');

            return this.http.post(`${environment.apiUrl}/api/set-code/`,  { email: email }, {})
                              .then(( res: any) => {
                                    let data = JSON.parse(res.data);
                                    this.email = email;
                                    return data;
                              }).catch(this.handleError);
      }


      sendCodeVerification() {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');

            return this.http.post(`${environment.apiUrl}/api/set-code/`,  { email: this.email }, {})
                              .then(( res: any) => {
                                    let data = JSON.parse(res.data);
                                    return data;
                              }).catch(this.handleError);
      }

      verifyCode(codigo: string) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');

            return this.http.post(`${environment.apiUrl}/api/verify-code/`,  { email: this.email , codigo: codigo }, {})
                              .then(( res: any) => {
                                    let data = JSON.parse(res.data);
                                    this.storage.setItem('token', data.token);
                                    this.token = data.token;
                                    return data
                              }).catch(this.handleError);
      }

      setPassword(password: string) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');

            return this.http.post(`${environment.apiUrl}/api/set-password/`,  { password: password }, {})
                              .then(( res: any) => {
                                    let data = JSON.parse(res.data);
                                    return data
                              }).catch(this.handleError);
      }

      
      loginUser(username: string, password:string ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
      
            return this.http.post(`${environment.apiUrl}/api/token/`, {username: username, password:password },  {}  )
                            .then(( res: any) => {
                                    let data = JSON.parse(res.data);
                                    console.log(data)
                                    this.storage.setItem('token', data['access']);
                                    this.token = data['access'];
                              }).catch(this.handleError);
        }

      ratingUser(rating: number, dia: number ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
      
            return this.http.post(`${environment.apiUrl}/api/rating/`, {rating: rating, dia: dia},  {}  )
                            .then(( res: any) => {
                                    let data = JSON.parse(res.data);
                                    return data
                              }).catch(this.handleError);
        }



      getProfile( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
            return this.http.get(this.url_api + 'profiles/profile', {},  {}  )
                            .then(( res: any) => {
                                          let data = JSON.parse(res['data']);
                                          this.url_logo_company = `${environment.apiUrl}` + data['results'][0]['company_logo'];
                                          this.url_avatar_profile = data['results'][0]['avatar'];
                                          this.name_user = data['results'][0]['first_name'];
                                          return data;
                              }).catch(this.handleError);
        }



        getUserProfile( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'profiles/user-profile', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getCompanyProfile( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'profiles/company-profile', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getRangeAge( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/range-age', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getGender( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/gender', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getCountryOrigin( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/country-origin', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getProfession( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/profession', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getCivilStatus( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/civil-status', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getBusinessCategory( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/business-category', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getWorkArea( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/work-area', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getSkillImprove( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/skill-improve', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getHierarchicalLevel( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/hierarchical-level', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getResponsabilityLevel( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/responsability-level', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getStressLevel( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/stress-level', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getPositionJob( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/position-job', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


        getGoalAchieve( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'maintance/goal-achieve', {},  {}  )
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        setProfileUser( dataPost: any, id: number ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.patch(`${this.url_api}profiles/user-profile/${id}/`, dataPost, {})
                            .then(( res: any) => {
                                    return res;
                              }).catch(this.handleError);
        }

        setProfileCompany( dataPost: any, id: number ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.patch(`${this.url_api}profiles/company-profile/${id}/`, dataPost, {})
                            .then(( res: any) => {
                                    return res;
                              }).catch(this.handleError);
        }

        getQuestionDaysProfile( ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'evaluation/days', {}, {})
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }

        getQuestionProfile( dia: any ) {
            this.http.setHeader('*', 'Accept', 'application/json', );
            this.http.setHeader('*', 'Content-Type', 'application/json');
            this.http.setHeader('*', 'Authorization', 'Bearer ' + this.token );
      
            return this.http.get(this.url_api + 'evaluation/questions-day', {dia: dia}, {})
                            .then(( res: any) => {
                                    return JSON.parse(res['data']);
                              }).catch(this.handleError);
        }


      private handleError(error: any): Promise<any> {
            return Promise.reject(
                  error);
      }
 }