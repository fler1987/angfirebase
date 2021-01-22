import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/_model/cliente';
import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/_service/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteDialogoComponent } from '../cliente-dialogo/cliente-dialogo.component';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  displayedColumns = ['nombres', 'apellidos', 'edad', 'fechaNacimiento', 'acciones'];
  dataSource !: MatTableDataSource<Cliente>;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  clienteList : Cliente[] = [];  
  
  constructor(private clienteService : ClienteService,  private dialog : MatDialog) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
    .snapshotChanges()
    .subscribe(item =>{
      this.clienteList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"] = element.key;                    
        this.clienteList.push(x as Cliente);        
      });
      this.crearTabla(this.clienteList);      
    });    
  }

  filtrar(event: Event){      
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  eliminar(key : string){
    this.clienteService.eliminarCliente(key);
    this.dataSource = new MatTableDataSource(this.clienteList);   
  }

  crearTabla(data: Cliente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  abrirDialogo(cliente?: Cliente){
    let cli = cliente!= null? cliente : new Cliente();
    this.dialog.open(ClienteDialogoComponent, {
      width: '250px',
      data: cli
    });
  }

}
