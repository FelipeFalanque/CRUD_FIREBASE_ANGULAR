import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../funcionario';
import { FuncionarioDataService } from '../funcionario-data.service';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  funcionarios: Observable<any[]>;

  constructor(
    private _funcionarioService: FuncionarioService, 
    private _funcionarioDataService: FuncionarioDataService) { }

  ngOnInit(): void {
    this.funcionarios = this._funcionarioService.getAll();
  }

  edit(funcionario: Funcionario, key: string) {
    this._funcionarioDataService.obterFuncionario(funcionario, key);
  }

  delete(key: string) {

    if (confirm("Remover o funcionario ?")) {
      this._funcionarioService.delete(key);
    }

  } 

}
