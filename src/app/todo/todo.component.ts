import { Component, OnInit, TemplateRef } from '@angular/core';
import { Todo } from '../Model/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TodoService } from 'src/services/todo-service.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoValue: string = '';
  todoList: Todo[] = [];
  finishList: Todo[]= [];

  constructor(private todoService: TodoService,
    private modalService: NgbModal,
    private router: Router){}


    
  ngOnInit(): void {
    this.todoService.getAll().pipe(first()).subscribe(backTodoList =>{
      backTodoList.forEach(element => {
        if(element.value === true){
          this.finishList.push(element);
        }else if(element.value === false){
          this.todoList.push(element);
        }
        
      })      
    });    
       
  }

  changeTodo(i: number){
    const item = this.todoList.splice(i,1);
    this.finishList.unshift(item[0]);
  }
  changeFinished(i: number){
    const item = this.finishList.splice(i,1);  
    this.todoList.unshift(item[0]);
  }

  addTodo(){
    if(this.todoValue){
      this.todoService.create({title:this.todoValue, description:"", value:false}).subscribe();
      this.todoList.unshift({title:this.todoValue, description:"",   value:false});
      this.todoValue = '';
    }
  }

  redirect(i: number, type: String){
    if(type == 'todoList'){
      let todo: Todo = this.todoList[i];
      let urlTitle: String = todo.title.replace(/\s/g, '');
      this.router.navigate(["details/"+urlTitle],{
        state:{
          data: urlTitle
        }
      })
    }else{
      let todo: Todo = this.finishList[i];
      let urlTitle: String = todo.title.replace(/\s/g, '');
      this.router.navigate(["details/"+urlTitle],{
        state:{
          data: urlTitle
        }
      })
    }
    
  }

  openModal(deleteTodo: TemplateRef<Element>, i: number, type: String){
    this.modalService.open(deleteTodo, {ariaLabelledBy: 'model-basic-title'}).result.then(
      (result)=>{
        if(type == 'todoList'){
          let temp: Todo = this.todoList[i];
          this.todoService.delete(temp.title).subscribe();      
          this.todoList.splice(i,1);    
        }else{
          let temp: Todo = this.finishList[i];
          this.todoService.delete(temp.title).subscribe();;
          this.finishList.splice(i,1);
        }
      },
      (reason)=>{
      }
    )
  }

}
