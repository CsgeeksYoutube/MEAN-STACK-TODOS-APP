import{ TodosComponent} from './todos/todos.component';
import{ HomeComponent} from './home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{path : '',redirectTo:'/home', pathMatch:'full'},
{path: 'home', component: HomeComponent},
{path: 'todos',component: TodosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
