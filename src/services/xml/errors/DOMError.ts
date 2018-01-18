export class DOMError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = "DOMException";
  }
}