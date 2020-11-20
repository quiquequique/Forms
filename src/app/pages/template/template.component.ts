import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Enrique',
    apellido: 'Abramzon',
    email: 'eabramzon@gmail.com'
  };

  constructor() { }

  ngOnInit(): void {
  }

  guardar( formInfo: NgForm ): void {
    console.log( formInfo.value );

    if ( formInfo.invalid ) {  // este if vuelve is-invalid si hay submit antes de tocar los campos del form

      Object.values( formInfo.controls ).forEach( control => {
        control.markAsTouched();
      });

      return;

    }
  }

}
