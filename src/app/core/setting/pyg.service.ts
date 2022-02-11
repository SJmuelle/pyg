import { Injectable } from '@angular/core';
import { EndPoint } from './endpoint';

@Injectable({
  providedIn: 'root'
})
export class PygService {

  constructor() { }

  public pyg = {
    url: EndPoint.uriBase('apoteosys_io/Pyg'),
  }
}
