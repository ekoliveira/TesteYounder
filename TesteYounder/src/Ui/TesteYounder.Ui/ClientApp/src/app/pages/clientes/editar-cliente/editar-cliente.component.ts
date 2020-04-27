import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClienteViewModel } from 'src/app/core/models/cliente-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  @Input() cliente : ClienteViewModel;
  @Output() clienteEditado : EventEmitter<ClienteViewModel> = new EventEmitter();
  formCliente : FormGroup;

  constructor(
    private _clienteService : ClienteService,
    private formBuilder : FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initializeForm();
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
    this.formCliente.controls.Id.setValue(this.cliente.Id);
    this.formCliente.controls.Nome.setValue(this.cliente.Nome);
    this.formCliente.controls.Cpf.setValue(this.cliente.Cpf);
    this.formCliente.controls.Rg.setValue(this.cliente.Rg);
    this.formCliente.controls.DataNascimento.setValue(this.dataFormatada(this.cliente.DataNascimento));
  }

  updateCliente(cliente : ClienteViewModel){
    cliente.Cpf = cliente.Cpf.replace(/\D/g, '')
    cliente.Rg = cliente.Rg.replace(/\D/g, '')
    this._clienteService.putCliente(cliente).subscribe((resp:any) => {
      this.clienteEditado.emit(cliente);
      this.activeModal.close();
    });
  }

  dataFormatada(data : Date) : string{
    var ano  = data.toString().substr(0,4);
    var mes  = data.toString().substr(5,2);
    var dia = data.toString().substr(8,2);    
    var dataFormatada = ano + "-" + mes + "-" + dia
    return dataFormatada;
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
