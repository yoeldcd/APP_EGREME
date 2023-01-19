import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/models/producer.model';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.css'],
})
export class ProducerListComponent implements OnInit {
  producers?: Producer[];
  currentProducer: Producer = {};
  currentIndex = -1;
  title = '';

  constructor(private producerService: ProducerService) {}

  ngOnInit(): void {
    this.retrieveProducers();
  }

  retrieveProducers(): void {
    this.producerService.getAll().subscribe({
      next: (data) => {
        this.producers = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveProducers();
    this.currentProducer = {};
    this.currentIndex = -1;
  }

  setActiveProducer(producer: Producer, index: number): void {
    this.currentProducer = producer;
    this.currentIndex = index;
  }
  
  deleteActiveProducer(): void {
    this.producerService.delete(this.currentProducer.id).subscribe({
      next: (res) => {
        this.refreshList();
        alert('Productor eliminado satisfacoriamente');
      },
      error: (e) => console.error(e),
    });
  }
  
  deleteAllProducers(): void {
    this.producerService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
        alert('Todos los productores fueron elimienados satisfactoriamente')
      },
      error: (e) => console.error(e),
    });
  }
}
