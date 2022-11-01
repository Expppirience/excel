import { createStore } from "./createStore.js";

describe("TEST", () => {
  test("test", () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
		