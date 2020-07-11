import { Component, OnInit } from '@angular/core';
import { DataHora } from '../data-hora';
import { Funcionario } from '../funcionario';
import { FuncionarioDataService } from '../funcionario-data.service';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  funcionario: Funcionario;
  key: string = '';
  formVisible: boolean = false;

  constructor(
    private _funcionarioService: FuncionarioService, 
    private _funcionarioDataService: FuncionarioDataService) { }

  ngOnInit(): void {

    this.funcionario = new Funcionario();
    this._funcionarioDataService.funcionarioAtual.subscribe(data => {
      if(data.funcionario && data.key) {

        this.formVisible = true;

        this.funcionario = new Funcionario();
        this.funcionario.nome =  data.funcionario.nome;
        this.funcionario.departamento =  data.funcionario.departamento;
        this.funcionario.dhCadastro =  data.funcionario.dhCadastro;
        this.funcionario.dhAtualizacao =  data.funcionario.dhAtualizacao;
        this.key = data.key;
      }
    });

  }

  onSubmit() {

    if(this.key) {

      let dh = new Date();
      this.funcionario.dhAtualizacao =  new DataHora(dh.getFullYear(),dh.getMonth(),dh.getDate(),dh.getHours(),dh.getMinutes())
      //console.log(this.funcionario);
      this._funcionarioService.update(this.funcionario, this.key);
    }else {

      let dh = new Date();
      this.funcionario.dhCadastro =  new DataHora(dh.getFullYear(),dh.getMonth(),dh.getDate(),dh.getHours(),dh.getMinutes())
      //console.log(this.funcionario);
      this._funcionarioService.insert(this.funcionario);
    }

    this.funcionario = new Funcionario();
    this.key = null;
    this.formVisible = false;

  }

  cancelar() {

    this.funcionario = new Funcionario();
    this.key = null;
    this.formVisible = false;

  }

  habilitarForm() {

    this.formVisible = true;

  }

}
