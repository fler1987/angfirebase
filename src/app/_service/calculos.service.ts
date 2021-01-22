import { Injectable } from '@angular/core';
import { Cliente } from '../_model/cliente';
import { Calculo } from '../_model/calculo';

@Injectable({
  providedIn: 'root'
})
export class CalculosService {

  edadPromedio : number = 0;
  desviacionEstandar : number = 0;  

  constructor() { 
    
  }

  obtenerCalculos(data: Cliente[]){
      this.edadPromedio = this.obtenerEdadPromedio(data),
      this.desviacionEstandar = this.obtenerDesviacionEstandar(data)
  }

  obtenerEdadPromedio(data : Cliente[]){
    
    var average = Object
        .values(data)
        .reduce((avg, { edad }, _, { length }) => avg + edad / length, 0);        
    return average;
  }

obtenerDesviacionEstandar(data : Cliente[]){

  let desviacion : number = 0.0;    

  if(data.length>0){

    let promedio : number = 0.0;      
    let sumaDesviacion: number = 0;
    let n : number = (data.length); 

    promedio = Object
    .values(data)
    .reduce((avg, { edad }, _, { length }) => avg + edad / length, 0);          

    data.forEach(valor =>{
      let resta = (valor.edad-promedio);
      let pow2 = Math.pow(resta, 2);
      sumaDesviacion+= pow2;      
    });
  
    let dividendo : number = n-1;

    if(dividendo>0){
      desviacion = (sumaDesviacion/dividendo);
      desviacion = Math.sqrt(desviacion);
    }
  }
  return desviacion;    
}

}
