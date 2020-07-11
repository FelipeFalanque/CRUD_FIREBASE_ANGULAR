import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Funcionario } from './funcionario';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private _angularFireDatabase: AngularFireDatabase) { }

  private nomeNo : string = "funcionarios";

  insert(funcionario: Funcionario) {
    this._angularFireDatabase
    .list(this.nomeNo)
    .push(funcionario)
    .then((result: any) => {
      //console.log(result)
      //console.log(result.key)
    });
  }

  update(funcionario: Funcionario, key: string) {
    this._angularFireDatabase
    .list(this.nomeNo)
    .update(key, funcionario)
    .then((result: any) => {
      //console.log(result)
      //console.log(result.key)
    });
  }

  getAll() {
    return this._angularFireDatabase
    .list(this.nomeNo)
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...<any>c.payload.val() }));
      })
    );
  }

  delete(key: string) {
    this._angularFireDatabase.object(`${this.nomeNo}/${key}`).remove();
  }
}
