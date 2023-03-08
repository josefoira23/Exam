import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable()
export class ConvertService {
    
    constructor(
        private http: HttpClient
      ) { }


      
    ConvertString(string: any) {
        return this.http.get("api/Exam/Converter?value=" + string, { responseType: 'text' });
    }
}
