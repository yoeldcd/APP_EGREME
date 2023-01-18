import { Component } from '@angular/core';
import { Producer } from 'src/app/models/producer.model';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})

export class AddProducerComponent {
  
  producer : Producer = {
    username: '',
    first_name: '',
    last_name: '',
    email: ''
  };
  submitted = false;

  constructor(private producerService: ProducerService) { }
  
  saveProducer(): void {
    
    // get producer data from form fields
    const data = {
      username: this.producer.username,
      first_name: this.producer.first_name,
      last_name: this.producer.last_name,
      email: this.producer.email,
    };
    
    // execute api POST request
    this.producerService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  
  newProducer(): void {
    this.submitted = false;
    this.producer = {
      username: '',
      first_name: '',
      last_name: '',
      email: ''
    };
  }

}