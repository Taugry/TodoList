import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../Model/todo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoValue: string = '';
  todoList: Todo[] = [];
  finishList: Todo[]= [];

  ngOnInit(): void {
    this.todoList = [
      {
        title: "Conduire",
        description: "etre au volant d'un vehicule et le faire deplacer",
        value: false
      },
      {
        title: "Manger",
        description: "action qui permet d'ingerer des aliments",
        value: false
      },
      {
        title: "dormir",
        description: "action permettant d'entrer en etat de veille profond",
        value: false
      }
    ];
  
    this.finishList = [
      {
        title: "Eveil",
        description: "detre dans l'etat inverse de dormir, etre donc pret et attentif",
        value: true
      }
    ];
  }

  constructor(private modalService: NgbModal,
    private router: Router){}

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
      this.todoList.unshift({
        title:this.todoValue,
        description:"",
        value:false
      });
      this.todoValue = '';
    }
  }

  redirect(i: number, type: String){
    if(type == 'todoList'){
      let todo: Todo = this.todoList[i];
      let urlTitle: String = todo.title.replace(/\s/g, '');
      this.router.navigate(["details/"+urlTitle],{
        state:{
          data: todo
        }
      })
    }else{
      let todo: Todo = this.finishList[i];
      let urlTitle: String = todo.title.replace(/\s/g, '');
      this.router.navigate(["details/"+urlTitle],{
        state:{
          data: todo
        }
      })
    }
    
  }

  openModal(deleteTodo: TemplateRef<Element>, i: number, type: String){
    this.modalService.open(deleteTodo, {ariaLabelledBy: 'model-basic-title'}).result.then(
      (result)=>{
        if(type == 'todoList'){
          this.todoList.splice(i,1);
        }else{
          this.finishList.splice(i,1);
        }
      },
      (reason)=>{
      }
    )
  }

}
