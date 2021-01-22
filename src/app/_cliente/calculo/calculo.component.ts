import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_service/cliente.service';
import { CalculosService } from 'src/app/_service/calculos.service';
import { Cliente } from 'src/app/_model/cliente';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.css']
})
export class CalculoComponent implements OnInit {

  
  edadPromedio : number = 0;
  desviacionEstandar : number = 0;  
  clienteList : Cliente[] = [];  

  constructor(private clienteService : ClienteService, private calculosService : CalculosService) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
    .snapshotChanges()
    .subscribe(item =>{
      this.clienteList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();        
        this.clienteList.push(x as Cliente);        
      });
      this.edadPromedio = this.calculosService.obtenerEdadPromedio(this.clienteList);      
      this.desviacionEstandar = this.calculosService.obtenerDesviacionEstandar(this.clienteList);      
    });
  }

}
