declare function unescape(s: string): string;
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
declare const atob: any;
// Import the registration model
import { Registration } from './registration.model';

/*
  Generated class for product service.  
*/
@Injectable()
export class AppService {
    registration: Registration[];
    constructor(public http: Http) { }

    getAll(): Observable<any> {
        let res = this.http.get('https://profile-app-dev-robert-leidl.c9users.io/' + 'registration')
            .map(response => response.json())
            .map((registrations: Array<any>) => {
                let result: Array<Registration> = [];
                if (registrations) {
                    registrations.forEach((registration) => {
                        let id = registration._id.toString();
                        registration.playerID = id.substr(id.length - 5);
                        result.push(registration);
                    });
                }
                return result;
            })
            .catch(this.handleError);
        return res;
    }

    downloadfile(): Observable<any> {
        var headers = new Headers();
        headers.append('responseType', 'arraybuffer');
        return this.http.get('https://profile-app-dev-robert-leidl.c9users.io/registration/test/csvDownload', { headers: headers })
            // .map(
            // (res: any) => res.text()            
            // )
            .map((res: any) => {
                return res.text();
                // return btoa(unescape(encodeURIComponent(res._body)));
            }
            )
            .catch(this.handleError);
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}