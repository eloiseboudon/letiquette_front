import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';


import 'rxjs/add/operator/toPromise';

import {Famille} from './famille';

@Injectable()
export class FamilleService {

    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    private familleUrl = 'http://api.letiquette-shop.fr/familles';

    constructor(private http: Http) {
    }

    getAllFamilles(): Promise<Famille[]> {
        return this.http.get(this.familleUrl)
            .toPromise()
            .then(response =>
                response.json() as Famille[])
            .catch(this.handleError);
    }


    getFamilleBySexe(sexe: string): Promise<Famille[]> {
        return this.http.get(this.familleUrl + '/' + sexe)
            .toPromise()
            .then(response =>
                response.json() as Famille[])
            .catch(this.handleError);
    }


    getFamilleByFamilleGlobalAndSexe(sexe: string, familleGlobaleID: number): Promise<Famille[]> {
        return this.http.get(this.familleUrl + '/' + sexe + '/' + familleGlobaleID)
            .toPromise()
            .then(response =>
                response.json() as Famille[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
