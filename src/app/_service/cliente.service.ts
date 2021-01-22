import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from '../_model/cliente';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  clienteList: AngularFireList<any>;
  selectCliente: Cliente = new Cliente();
  clienteLista : Cliente[] = [];

  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();
  
  //private url = `${environment.HOST}/clientes`;
  
  constructor(private firebase: AngularFireDatabase) { 
    this.clienteList = this.firebase.list('/clientes', (ref) =>
      ref.orderByChild('nombres')
    );
  }

  getClientes(){
    return this.clienteList = this.firebase.list('clientes');
  }

  getClientesReal(){   

    this.firebase.list('clientes')
    .snapshotChanges()
    .subscribe(item =>{
      this.clienteLista = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;                    
        this.clienteLista.push(x as Cliente);        
      });
    });

    return this.clienteLista;
  }

  registrarCliente(cliente : Cliente){     
    
      this.clienteList.push({        
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        edad: cliente.edad,
        fechaNacimiento: cliente.fechaNacimiento
      });
    
  }

  modificarCliente(cliente : Cliente){

    return this.clienteList.update(cliente.$key, {
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      edad: cliente.edad,
      fechaNacimiento: cliente.fechaNacimiento
    });
  }

  eliminarCliente(idCliente : string){
    return this.clienteList.remove(idCliente);
  }

  
  getClienteCambio(){
    return this.clienteCambio.asObservable();
  }

  setClienteCambio(cliente : Cliente[]){
    this.clienteCambio.next(cliente);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
}