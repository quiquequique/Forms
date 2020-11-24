import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidator {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noGonzales( control: FormControl ): {[s: string]: boolean} {

    if ( control.value?.toLowerCase() === 'gonzales'){

      return{
        noGonzales: true
      };
    }
    return null;
  }

  samePass( pass1Form: string, pass2Form: string): any {

    return ( formGroup: FormGroup ) => {
      const pass1form = formGroup.controls[pass1Form];
      const pass2form = formGroup.controls[pass2Form];

      if ( pass1form.value === pass2form.value) {
        // console.log( pass1form ); compara 2 instancias de formControl de NG
        pass2form.setErrors( null );
      } else {
        pass2form.setErrors( { noEsIgual: true } );
      }
    };

  }

  userExist( control: FormControl ): Promise<ErrorValidator> | Observable<ErrorValidator> {

    if ( !control.value ) {
      return Promise.resolve( null );
    }

    return new Promise( ( resolve, reject ) => {

      setTimeout(() => {

        if ( control.value === 'quique' ) {

          resolve({ exist: true});

        } else {

          resolve ( null );
        }

      }, 4000); //  simula el pedido a DB

    });

  }
}
