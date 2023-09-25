import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from 'src/app/Model/todo';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url:string = "http://localhost:8080/api";

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin' : '*'
    }),
  };

  constructor(private http: HttpClient) { }

  initData() {
    return this.http.get<void>(`${this.url}`, this.httpHeaders);
  }

  getAll() {
    return this.http.get<Todo[]>(`${this.url}/get`, this.httpHeaders);
  }

  getName(title: String) {
    return this.http.get<Todo>(`${this.url}/get/${title}`, this.httpHeaders)
      .pipe(map(todoFound => {return todoFound;}));
  }

  create(todo: Todo) {
    return this.http.post<any>(`${this.url}/add`, todo, this.httpHeaders);
  }

  delete(title: String) {
    return this.http.delete(`${this.url}/delete/${title}`, this.httpHeaders);
  }



}
