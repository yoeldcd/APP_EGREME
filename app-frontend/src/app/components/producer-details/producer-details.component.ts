import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducerService } from 'src/app/services/producer.service';
import { Producer } from 'src/app/models/producer.model';

@Component({
  selector: 'app-producer-details',
  templateUrl: './producer-details.component.html',
  styleUrls: ['./producer-details.component.css'],
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
    last_modifier: '',
  };

  message = '';

  constructor(
    private ProducerService: ProducerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submited = false

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProducer(this.route.snapshot.params['id']);
    }
  }

  getProducer(id: string): void {
    this.ProducerService.get(id).subscribe({
      next: (data) => {
        this.currentProducer = data;
        console.log(data);
      },
      error: (e) => {
        console.error(e);
      },
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
      last_modifier: this.currentProducer.last_modifier,
    };

    this.message = '';

    this.ProducerService.update(this.currentProducer.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.submited = true
        
      },
      error: (e) => console.error(e),
    });
  }

  updateProducer(): void {
    this.message = '';

    this.ProducerService.update(
      this.currentProducer.id,
      this.currentProducer
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This Producer was updated successfully!';
      },
      error: (e) => {
        let data = e.error;
        let duplicated = '';
        let empty = '';

        for (let field of data.duplicated_fields) {
          duplicated += ' - ' + field + '\n';
        }

        for (let field of data.empty_fields) {
          empty += ' - ' + field + '\n';
        }

        let message = 'ERROR EN LOS DATOS INTRODUCIDOS';

        if (empty.length > 0)
          message += '\nRELLENE LOS CAMPOS VACIOS: \n' + empty;

        if (duplicated.length > 0)
          message += '\nCAMBIE LOS CAMPOS DUPLICADOS: \n' + duplicated;

        console.error(e);
        alert(message);
      },
    });
  }

  deleteProducer(): void {
    this.ProducerService.delete(this.currentProducer.id).subscribe({
      next: (res) => {
        alert('Productor eliminado satisfacoriamente')
        this.router.navigate(['']);
      },
      error: (e) => console.error(e),
    });
  }
}
