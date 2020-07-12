import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../funcionario';
import { FuncionarioDataService } from '../funcionario-data.service';
import { FuncionarioService } from '../funcionario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public modalRef: BsModalRef; // {1}
  public funcionarios: Observable<any[]>;
  public countFuncionarios: Observable<number>;
  public page: number = 1;
  private recordsPerPage: number = 4;
  public numberOfPages: number = 0;

  private hash = new Map();

  public funcionarioDelete: Funcionario = null;
  private keyFuncionarioDelete: string = null;

  constructor(
    private _funcionarioService: FuncionarioService,
    private _funcionarioDataService: FuncionarioDataService,
    private _modalService: BsModalService) { }

  ngOnInit(): void {
    this.funcionarios = this._funcionarioService.getRange();
    this.funcionarios.subscribe(array => {
      this.hash.set(this.page, { firstkey: array[0].key, lastkey: array[array.length - 1].key });
      console.log(this.hash);
    })
    this.countFuncionarios = this._funcionarioService.count();
    this.countFuncionarios.subscribe(count => {
      this.numberOfPages = Math.ceil(count / this.recordsPerPage);
    })
  }

  nextPage() {
    if (this.page < this.numberOfPages) {
      this.page++;
      this.funcionarios = this._funcionarioService.getRange(this.hash.get(this.page - 1).lastkey);
      this.funcionarios.subscribe(array => {
        this.hash.set(this.page, { firstkey: array[0].key, lastkey: array[array.length - 1].key });
        console.log(this.hash);
      })
    }
  }

  lastPage() {
    if (this.page > 1) {
      this.page--;
      this.funcionarios = this._funcionarioService.getRange(this.page == 1 ? null : this.hash.get(this.page).firstkey);
      this.funcionarios.subscribe(array => {
        this.hash.set(this.page, { firstkey: array[0].key, lastkey: array[array.length - 1].key });
        console.log(this.hash);
      })
    }
  }

  edit(funcionario: Funcionario, key: string) {
    this._funcionarioDataService.obterFuncionario(funcionario, key);
  }

  delete() {
    if (this.keyFuncionarioDelete) {
      this._funcionarioService.delete(this.keyFuncionarioDelete);
    }

    this.funcionarioDelete = null;
    this.keyFuncionarioDelete = null;
  }

  openModal(funcionario: Funcionario, key: string, template: TemplateRef<any>) {

    this.funcionarioDelete = funcionario;
    this.keyFuncionarioDelete = key;

    this.modalRef = this._modalService.show(template); // {3}
  }

}
