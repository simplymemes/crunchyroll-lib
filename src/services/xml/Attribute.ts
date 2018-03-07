import { Node } from "./Node";

export class Attribute {
  name: string;
  namespaceURI: string|undefined;
  localName: string;
  prefix: string|undefined;
  value: string;

  constructor(name: string, namespaceURI: string|undefined, localName: string, prefix: string|undefined, value: string) {
    this.name = name;
    this.namespaceURI = namespaceURI;
    this.localName = localName;
    this.prefix = prefix;
    this.value = value;
  }
}