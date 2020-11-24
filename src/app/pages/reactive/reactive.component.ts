import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formGr: FormGroup;

  constructor( private fBuilder: FormBuilder, private validators: ValidatorsService ) {
    this.crearFormulario();
    this.cargarDatosForm();
    this.activarListeners();
  }

  ngOnInit(): void {
    this.agregarHobbie();
  }

  get hobbies(): any {

    return this.formGr.get('hobbies') as FormArray;

  }

  get nombreNoValido(): boolean {
    return this.formGr.get('nombre').invalid && this.formGr.get('nombre').touched;
  }

  get apellidoNoValido(): boolean {
    return this.formGr.get('apellido').invalid && this.formGr.get('apellido').touched;
  }

  get emailNoValido(): boolean {
    return this.formGr.get('email').invalid && this.formGr.get('email').touched;
  }

  get usuarioNoValido(): boolean {
    return this.formGr.get('usuario').invalid && this.formGr.get('usuario').touched;
  }

  get provinciaNoValida(): boolean {
    return this.formGr.get( 'direccion.provincia' ).invalid && this.formGr.get( 'direccion.provincia' ).touched;
  }

  get ciudadNoValida(): boolean {
    return this.formGr.get( 'direccion.ciudad' ).invalid && this.formGr.get( 'direccion.ciudad' ).touched;
  }

  get pass1Invalid(): boolean {
    return this.formGr.get( 'pass1' ).invalid && this.formGr.get( 'pass1' ).touched;
  }

  get pass2Invalid(): boolean {

    const pass1 = this.formGr.get( 'pass1' ).value;
    const pass2 = this.formGr.get( 'pass2' ).value;

    return (pass1 === pass2 ) ? false : true;
  }

  crearFormulario(): any {

      this.formGr = this.fBuilder.group({
        // formato array validador = ['valor default', [validadores sincronos], [validadores asincronos]]
        nombre   : ['', [Validators.required, Validators.minLength(5)] ],
        apellido : ['', [Validators.required, Validators.minLength(5), this.validators.noGonzales] ],
        email    : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
        usuario  : ['', , this.validators.userExist], // las validaciones asincronas son el tercer argumento del arreglo
        pass1    : ['', [Validators.required]],
        pass2    : ['', [Validators.required]],
        direccion: this.fBuilder.group({
          provincia: ['', Validators.required ],
          ciudad   : ['', Validators.required ]
        }),
        hobbies: this.fBuilder.array([])
      }, {
        validators: this.validators.samePass( 'pass1', 'pass2')
      });
  }

  activarListeners(): void {  // distintos listeners sobre el formulario o campo del mismo

    this.formGr.valueChanges.subscribe( valor => {

      console.log( valor );

    });

    this.formGr.statusChanges.subscribe( status => console.log( { status } ));

    this.formGr.get('nombre').valueChanges.subscribe( console.log );
  }

  agregarHobbie(): void {
    this.hobbies.push( this.fBuilder.control( 'Nuevo Elemento', [Validators.required]) );
  }

  borrarHobbie( i: number ): void {
    this.hobbies.removeAt( i );
  }

  guardar(): void {

    console.log( this.formGr );

    if ( this.formGr.invalid ) {  // este if vuelve is-invalid si hay submit antes de tocar los campos del form

      return Object.values( this.formGr.controls ).forEach( control => {

        if ( control instanceof FormGroup) {
          Object.values( control.controls ).forEach( controlAnidado =>
            controlAnidado.markAsTouched() );
          } else {
            control.markAsTouched();
        }
      });
    }
    // aca iria el posteo de la informacion al back
    // reseteo del form y seteo de defaults despueds del submit

    this.formGr.reset({
      nombre: 'Nombre Guardado',
      apellido: 'lo que quiera',
      email: 'email@guargdado.si.hay'
    });
  }

  cargarDatosForm(): void {
    // this.formGr.setValue({
      // si se utiliza setValue hay que mandar todos los campos del objeto, reset manda los campos por defecto y no dispara el error
      this.formGr.reset({
      nombre: 'Enrique',
      apellido: 'Abramzon',
      email: 'eabramzon@gmail.com',
      direccion: {
        provincia: 'Santa Fe',
        ciudad: 'Santa Fe'
      }
    });
    // para cargar datos a los campos dinamicos podria ser asi =
    // ej:
    // ['comer', 'dormir'].forEach( valor => this.hobbies.push( this.fBuilder.control( valor ) ) );
  }
}
