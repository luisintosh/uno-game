import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class RealTimeDatabaseService {
  constructor(private db: AngularFireDatabase) {}

  getOne<T>(path: string, key: string): Observable<T> {
    return this.db.object<T>(`${path}/${key}`).valueChanges();
  }

  getAll<T>(path: string, key: string): Observable<T[]> {
    return this.db.list<T>(`${path}/${key}`).valueChanges();
  }

  set<T>(path: string, key: string, object: any): Promise<T> {
    if (!key) {
      key = this.db.createPushId();
      object.id = key;
    }
    return this.db
      .object<T>(`${path}/${key}`)
      .set(object)
      .then(() => object);
  }

  update<T>(path: string, key: string, object: any): Promise<T> {
    return this.db
      .object<T>(`${path}/${key}`)
      .update(object)
      .then(() => object);
  }

  delete<T>(path: string, key: string) {
    return this.db.object<T>(`${path}/${key}`).remove();
  }
}
