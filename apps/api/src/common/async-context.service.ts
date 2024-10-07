import { Global, Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable({})
export class AsyncContextService {
  private asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  run(callback: () => void) {
    const store = new Map<string, any>();
    this.asyncLocalStorage.run(store, callback);
  }

  getStore(): Map<string, any> | undefined {
    return this.asyncLocalStorage.getStore();
  }

  set(key: string, value: any) {
    this.getStore()?.set(key, value);
  }

  get(key: string): any {
    return this.getStore()?.get(key);
  }
}
