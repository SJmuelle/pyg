import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PygService } from 'src/app/core/setting/pyg.service';
import { UtilityService } from 'src/app/core/setting/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepyg',
  templateUrl: './updatepyg.component.html',
  styleUrls: ['./updatepyg.component.css']
})
export class UpdatepygComponent implements OnInit {
  form: FormGroup;
  listado: any;

  constructor(
    private _utilityService: UtilityService,
    private _pygService: PygService
  ) {
    this.form = new FormGroup({
      empresa: new FormControl('', Validators.required),
      fechaInicial: new FormControl('',Validators.required),
      fechaFinal: new FormControl('',Validators.required),
      step: new FormControl(false),
    });
  }

  ngOnInit(): void {
    let dataEnviada = {
      empresa: 'FINT',
      mesFinal:'12',
      mesInicial: '01',
      opcion: "LOG",
      year: '2022'
    }
    this.consulta(dataEnviada);
  }
  consulta(dataEnviada:any){
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let url=this._pygService.pyg.url;
    this._utilityService.postQuery(url, dataEnviada).subscribe((res: any) => {
      Swal.close()
      if(res){
        if(res.success==true){
          Swal.fire({
            title: 'Información',
            text: "El proceso se realizo con exito",
            icon: 'success',
            confirmButtonText: 'ok'
          })
          if(dataEnviada.opcion=='STA'){
            dataEnviada.opcion=this.form.value.step==true?'BI':'BD'
            this.consulta(dataEnviada);
          }
        }else if(res.success==false){
          Swal.fire({
            title: 'Información',
            text: "Hay un proceso en curso",
            icon: 'warning',
            confirmButtonText: 'ok'
          })
      
        }else if(res.success=="true"){
          dataEnviada.opcion='LOG'
          this.consulta(dataEnviada);
      
        }else{
          this.listado=res;
        }
      }
     
    });
  }

  generate() {
   
    const datos={
      empresa:this.form.value.empresa,
      fechaInicial:this.form.value.fechaInicial.split('-'),
      fechaFinal:this.form.value.fechaFinal.split('-'),
    }
    let dataEnviada = {
      empresa: datos.empresa,
      mesFinal: datos.fechaFinal[1],
      mesInicial: datos.fechaInicial[1],
      opcion: "STA",
      year: datos.fechaFinal[0]
    }
    this.form.reset();
    this.consulta(dataEnviada);

  }

}
