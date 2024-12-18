import "@testing-library/jest-dom";


if (typeof global.structuredClone === "undefined") {
    global.structuredClone = (value) => JSON.parse(JSON.stringify(value));
  }