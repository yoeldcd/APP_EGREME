import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducerListComponent } from './components/producer-list/producer-list.component';
import { ProducerDetailsComponent } from './components/producer-details/producer-details.component';
import { AddProducerComponent } from './components/add-producer/add-producer.component';

// define CRUD management sreen routes
const routes: Routes = [
  { path: 'producers/list/', component: ProducerListComponent },
  { path: 'producer/:id', component: ProducerDetailsComponent },
  { path: 'add', component: AddProducerComponent },
  { path: '', redirectTo: 'producers/list/', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }