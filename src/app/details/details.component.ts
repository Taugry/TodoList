import { Component } from '@angular/core';
import { Todo } from '../Model/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  todo: Todo = new Todo();

  constructor(private router: Router){}

  ngOnInit(): void {
    this.todo = history.state.data;
  }
  goBack(){
    this.router.navigateByUrl("/");
  }
}
