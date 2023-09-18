import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component:TodoComponent},
  { path: 'details/:id', component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
