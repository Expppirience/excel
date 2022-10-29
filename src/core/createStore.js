export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: "__INIT__" });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
}

// export class CreateStore {
//   constructor(rootReducer, initialState = {}) {
//     this.state = rootReducer({ ...initialState }, { type: "__INIT__" });
//     this.listeners = [];
//   }

//   subscribe(callback) {
//     this.listeners.push(callback);
//   }

//   unsubscribe(callback) {
//     this.listeners.forEach((l) => l !== callback);
//   }

//   dispatch(action) {
//     this.state = rootReducer(this.state, action);
//     this.listeners.forEach((l) => l(state));
//   }

//   getState() {
//     return this.state;
//   }
// }
