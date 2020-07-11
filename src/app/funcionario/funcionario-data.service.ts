import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funcionario } from './funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioDataService {

  private funcionarioSource = new BehaviorSubject({ funcionario: null, key: '' });
  funcionarioAtual = this.funcionarioSource.asObservable();

  constructor() { }

  obterFuncionario(funcionario: Funcionario, key: string){
    this.funcionarioSource.next({ funcionario: funcionario, key: key});
  }
}
