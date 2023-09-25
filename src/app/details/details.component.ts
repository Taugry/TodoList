import { Component } from '@angular/core';
import { Todo } from '../Model/todo';
import { Router } from '@angular/router';
import { TodoService } from 'src/services/todo-service.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  todo: Todo = new Todo();
  title!: String;

  constructor(private router: Router, private todoService: TodoService){}

  ngOnInit(): void {
    this.title = history.state.data;    
    this.todoService.getName(this.title).subscribe(todo => {this.todo = todo; });
  }
  goBack(){
    this.router.navigateByUrl("/");
  }
}
