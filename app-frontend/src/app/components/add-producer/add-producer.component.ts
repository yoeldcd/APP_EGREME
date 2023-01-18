import { Component } from '@angular/core';
import { Producer } from 'src/app/models/producer.model';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css'],
})
export class AddProducerComponent {
  producer: Producer = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  };
  submitted = false;

  constructor(private producerService: ProducerService) {}

  saveProducer(): void {
    // get producer data from form fields
    const data = {
      username: this.producer.username,
      first_name: this.producer.first_name,
      last_name: this.producer.last_name,
      email: this.producer.email,
    };

    // execute api POST request
    this.producerService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
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

  newProducer(): void {
    this.submitted = false;
    this.producer = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    };
  }
}
