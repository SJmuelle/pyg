import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class UtilityService {





  constructor(private _httpClient: HttpClient) { }


  postQuery(URL: string, data: any) {
    return this._httpClient.post(URL, data).pipe(catchError(this.handleError));
  }



  //Funcion para el Manejo de errores
  handleError = (err: any): Observable<HttpEvent<any>> => {
    // debugger;
    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    let icon: string = 'question';
    console.log("Algo se daño");
    let res: any = {}
    if (err.error instanceof ErrorEvent) {
      icon = "question";
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
          setTimeout(() => {
            Swal.fire({
              title: 'Error',
              text: "Datos de acceso incorrecto, favor volver iniciar sesión",
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          }, 100);
          break;
        case 402:
          setTimeout(() => {
            Swal.fire({
              title: 'Error',
              text: "Datos de acceso incorrecto, favor volver iniciar sesión",
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          }, 100);
          break;
        case 403:
          errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
          if (err.error.msg == 'La session ha expirado') {
          }
          if (err.error.msg !== undefined && typeof err.error.msg == 'string') {
            errorMessage = `${err.error.msg}`;
          }
          break;
        case 404:
          errorMessage = `${err.error.msg}`
          break;
        case 500:
          errorMessage = `${err.error.msg}`;
          break;
        default:
          errorMessage = `${err.statusText.msg}`;
          break;
      }
    }
    if (err.status !== 401 && err.error !== 'La session ha expirado') {


      if ((errorMessage != "undefined") && (errorMessage !== undefined) && (errorMessage != null) && (errorMessage != "") && (errorMessage != "UNKNOWN ERROR!")) {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })

      } else {
        Swal.fire({
          title: 'Error',
          text: "No hubo respuesta por parte del servidor, favor intente nuevamente",
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
        
      }
    }
    return throwError(errorMessage);
  }


}


