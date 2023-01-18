import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducerService } from 'src/app/services/producer.service';
import { Producer } from 'src/app/models/producer.model';

@Component({
  selector: 'app-producer-details',
  templateUrl: './producer-details.component.html',
  styleUrls: ['./producer-details.component.css']
})
export class ProducerDetailsComponent implements OnInit {
  
  @Input() viewMode = false;
  
  @Input() currentProducer: Producer = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    last_modified: new Date(),
    last_modifier: ''
  };

  message = '';

  constructor(
    private ProducerService: ProducerService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProducer(this.route.snapshot.params["id"]);
    }
  }

  getProducer(id: string): void {
    this.ProducerService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProducer = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    
    // get producer data to present
    const data = {
      id: this.currentProducer.id,
      username: this.currentProducer.username,
      first_name: this.currentProducer.first_name,
      last_name: this.currentProducer.last_name,
      email: this.currentProducer.email,
      last_modified: this.currentProducer.last_modified,
      last_modifier: this.currentProducer.last_modifier
    };
    
    this.message = '';

    this.ProducerService.update(this.currentProducer.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateProducer(): void {
    this.message = '';

    this.ProducerService.update(this.currentProducer.id, this.currentProducer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Producer was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteProducer(): void {
    this.ProducerService.delete(this.currentProducer.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/Producers']);
        },
        error: (e) => console.error(e)
      });
  }

}