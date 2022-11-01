import { Page } from "./../core/Page";
import { normalizeIntitialState } from "./../redux/initialState";
import { debounce, storage } from "./../core/utils";
import { rootReducer } from "./../redux/rootReducer";
import { Excel } from "@/components/excel/Excel";
import { Header } from "./../components/header/Header";
import { Toolbar } from "./../components/toolbar/Toolbar";
import { Formula } from "./../components/formula/Formula";
import { Table } from "./../components/table/Table";
import { createStore } from "./../core/store/createStore";

function storageNameGenerator(param) {
  return `excel-` + param;
}

export class ExcelPage extends Page {
  getRoot() {
    // localStorage.removeItem("excel-state");
    this.params = this.params ? this.params : Date.now().toString();
    const state = storage(storageNameGenerator(this.params));
    const store = createStore(rootReducer, normalizeIntitialState(state));

    const stateListener = debounce((state) => {
      console.log("App state", state);
      storage(storageNameGenerator(this.params), false, state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
