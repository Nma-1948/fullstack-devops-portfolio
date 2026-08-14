import "@testing-library/jest-dom";

const storage = new Map();

const localStorageMock = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null;
  },

  setItem(key, value) {
    storage.set(String(key), String(value));
  },

  removeItem(key) {
    storage.delete(key);
  },

  clear() {
    storage.clear();
  },

  get length() {
    return storage.size;
  },

  key(index) {
    return Array.from(storage.keys())[index] ?? null;
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  value: IntersectionObserverMock,
  configurable: true,
});
