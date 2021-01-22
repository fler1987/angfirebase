import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from 'src/app/_model/cliente';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/_service/cliente.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit {

  cliente !: Cliente;
    
  constructor(
    private dialogRef: MatDialogRef<ClienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data : Cliente,
    private clienteService : ClienteService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.cliente = this.data;
    this.cliente.$key = this.data.$key;
    this.cliente.nombres = this.data.nombres;
    this.cliente.apellidos = this.data.apellidos;
    this.cliente.edad = this.data.edad;
    this.cliente.fechaNacimiento = this.data.fechaNacimiento;
  }

  operar(){

    let key = this.cliente.$key;
    key = key==null?'':key;
    
    if(this.cliente != null && key != ''){

      //actualizar    
      this.clienteService.modificarCliente(this.cliente);
      this.toastr.success("Se actualizó", "Aviso"); 
    }else{
     //registrar      
     this.clienteService.registrarCliente(this.cliente);
     this.toastr.success("Se registró", "Aviso");          
    }

    this.cerrar();

  }
  cerrar(){
    this.dialogRef.close();
  }

}
