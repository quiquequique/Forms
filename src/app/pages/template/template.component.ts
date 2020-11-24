import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  paises: any[];

  usuario = {
    nombre: 'Enrique',
    apellido: 'Abramzon',
    email: 'eabramzon@gmail.com',
    pais: ''
  };

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {

    this.paisService.getPaises().subscribe( _paises => {
      this.paises = _paises;

      this.paises.unshift({
        nombre: 'Seleccione un pais',
        codigo: ''
      });

      // console.log( this.paises );

    });
  }

  guardar( form: NgForm ): void {
    // console.log( form );

    if ( form.invalid ) {  // este if vuelve is-invalid si hay submit antes de tocar los campos del form

      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });

      return;

    }
    console.log( form.value );

  }

}
