import { Injectable } from '@angular/core';
import {RandomUser} from "../interface/random-user";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MessageService} from "./message.service";
import {map, Observable, of, tap, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';

/**
 * @auther:Jiawei CHEN
 */
@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  private usersUrl = 'https://randomuser.me/api/?results=10';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * function used to handle errors
   * @param error
   */
  handleError(error: HttpErrorResponse){
    let errorMessage = "Unknown error!";
    if(error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * function used to get 10 random users from API RandomUsers Generator
   */
  getUsers(): Observable<RandomUser>{
    return this.http.get<RandomUser>(this.usersUrl).
    pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError)
    );

  }
}
