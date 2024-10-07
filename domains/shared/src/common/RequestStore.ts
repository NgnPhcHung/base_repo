const asyncHooks = require("async_hooks");

const store = new Map();
const hook = asyncHooks.createHook({
  init(asyncId: any, type: any, triggerAsyncId: any) {
    if (store.has(triggerAsyncId)) {
      store.set(asyncId, store.get(triggerAsyncId));
    }
  },
  destroy(asyncId: any) {
    store.delete(asyncId);
  },
});
hook.enable();

export class RequestStore {
  private static requestStore = new Map();

  private static getRequestId() {
    const asyncHooks = require("async_hooks");
    return asyncHooks.executionAsyncId();
  }
  static set(key: any, value: any) {
    store.set(asyncHooks.executionAsyncId(), {
      ...store.get(asyncHooks.executionAsyncId()),
      [key]: value,
    });
  }

  static get(key: any) {
    return store.get(asyncHooks.executionAsyncId())?.[key];
  }

  static getUser() {
    const requestId = this.getRequestId();
    return this.requestStore.get(requestId);
  }

  static setUser(user: any) {
    const requestId = this.getRequestId();
    this.requestStore.set(requestId, user);
  }
}
