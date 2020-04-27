import { Component, OnInit } from '@angular/core';
import { ClienteViewModel } from 'src/app/core/models/cliente-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

class Alert{
  constructor(type:string, message:string){
    this.type = type;
    this.message = message;
  }
  type : string;
  message : string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes : ClienteViewModel [] = [];
  alert : Alert;
  formCliente : FormGroup;

  constructor(
    private _clienteService : ClienteService,
    private formBuilder : FormBuilder,
    private modalService : NgbModal
  ) { }

  ngOnInit() {
    this.getClientes();
    this.initializeForm();
  }

  getClientes(){
    this._clienteService.getClientes().subscribe((resp:ClienteViewModel[]) => {
      this.clientes = resp;
    });
  }

  initializeForm(){
    let cliente = new ClienteViewModel();
    this.formCliente = this.formBuilder.group({
      Id : [cliente.Id],
      Nome : [cliente.Nome],
      Cpf : [cliente.Cpf],
      Rg : [cliente.Rg],
      DataNascimento : [cliente.DataNascimento]
    })
  }

  insertCliente(cliente : ClienteViewModel){
    cliente.Id = 0;
    cliente.Cpf = cliente.Cpf.replace(/\D/g, '')
    cliente.Rg = cliente.Rg.replace(/\D/g, '')
    this._clienteService.postCliente(cliente).subscribe((resp:any) => {
      this.formCliente.reset();
      this.getClientes();
      this.alert = new Alert('success', 'Cliente Cadastrado!');
    })
  }

  updateCliente(cliente : ClienteViewModel){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
    }
    const modal = this.modalService.open(EditarClienteComponent, ngbModalOptions);

    modal.componentInstance.cliente = cliente;

    modal.componentInstance.clienteEditado.subscribe((resp:any) => {
      this.clientes = null;
      this.getClientes();
      this.alert = new Alert('info', 'Cliente Editado!');
    });
  }

  deleteCliente(id : number){
    this._clienteService.deleteCliente(id).subscribe((resp:any) => {
      this.clientes = null;
      this.getClientes();
      this.alert = new Alert('danger', 'Cliente Deletado!');
    });
  }

  dataFormatada(data : Date) : string{
      var ano  = data.toString().substr(0,4);
      var mes  = data.toString().substr(5,2);
      var dia = data.toString().substr(8,2);    
      var dataFormatada = dia+"/"+mes+"/"+ano
      return dataFormatada;
  }

  aplicarMascaraCpf(v: string) : string {
      // Remove tudo o que não é dígito
      v = v.replace(/\D/g, '');
      
      // Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, '$1.$2');

      // Coloca um ponto entre o terceiro e o quarto dígitos
      // (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d)/, '$1.$2');

      // Coloca um hífen entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return v;
  }

  aplicarMascaraRg(v: string) : string {
      v=v.replace("-","");
      v=v.replace(".","");
      if(v.length <= 8){
        v = v.replace(/\D/g, '');
      }
      v=v.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9A-Za-z]{1})$/,"$1.$2.$3-$4");
      return v
  }

  nomeFormatado(nome:string) : string{
      let retorno = "";
      let nomeSeparado = nome.split(" ");

      nomeSeparado.forEach(e => {
          e.toLocaleLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toLocaleUpperCase(); });
          if(retorno == ""){
            retorno = retorno + e;
          }else{
            retorno = retorno + " " + e;
          }
      });

      return retorno;
  }

  disableSubmit(){
    if(this.formCliente.controls.Nome.value == null || this.formCliente.controls.Nome.value == ""){
      return true;
    }

    if(this.formCliente.controls.DataNascimento.value == null || this.formCliente.controls.DataNascimento.value == ""){
      return true;
    }

    if(this.formCliente.controls.Cpf.value == null || this.formCliente.controls.Cpf.value == "" && this.formCliente.controls.Cpf.value.length < 11){
      return true;
    }

    if(this.formCliente.controls.Rg.value == null || this.formCliente.controls.Rg.value == "" && this.formCliente.controls.Rg.value.length < 12){
      return true;
    }

    return false;
  }

}
