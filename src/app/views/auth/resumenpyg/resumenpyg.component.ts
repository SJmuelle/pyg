import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PygService } from 'src/app/core/setting/pyg.service';
import { UtilityService } from 'src/app/core/setting/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumenpyg',
  templateUrl: './resumenpyg.component.html',
  styleUrls: ['./resumenpyg.component.css']
})
export class ResumenpygComponent implements OnInit {

  form: FormGroup;
  listado: any;
  hoy: number;

  constructor(
    private _utilityService: UtilityService,
    private _pygService: PygService
  ) {
    this.form = new FormGroup({
      fecha: new FormControl(new Date().getFullYear(), Validators.compose([ Validators.max(this.hoy), Validators.min(2017), Validators.required])),
    });
  }

  ngOnInit(): void {
    this.hoy = new Date().getFullYear();
  }
  consulta(dataEnviada: any) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let url=this._pygService.pyg.url;
    this._utilityService.postQuery(url, dataEnviada).subscribe((res: any) => {
      Swal.close();
      if(res){
        this.listado=res;
      }
    });
  }

  generate() {
    let dataEnviada = {
      opcion: "RES",
      year: this.form.value.fecha
    }
    this.form.reset();
    this.consulta(dataEnviada);

  }

}
