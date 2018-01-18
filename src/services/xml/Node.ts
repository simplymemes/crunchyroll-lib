import { DOMError } from './errors/DOMError';

export class Node {
  nodeName: string;
  nodeType: number = -1;
  childNodes: Node[] = [];
  parentNode: Node|undefined;

  constructor(nodeName: string) {
    this.nodeName = nodeName;
  }

  appendChild(child: Node): Node {
    if (child.contains(this))
      throw new DOMError("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");

    // Remove the node first before appending it.
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }

    // Append the node
    child.parentNode = this;
    this.childNodes.push(child);

    return child;
  }

  insertBefore(child: Node, referenceNode: Node): Node {
    const index = this.childNodes.indexOf(referenceNode);
    if (index === -1)
      throw new DOMError("Failed to execute 'insertBefore' on 'Node': The reference node is not a child of this node.");
    if (child.contains(this))
      throw new DOMError("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");

    // Remove the node first before appending it.
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }

    this.childNodes.splice(index, 0, child);
    child.parentNode = this;

    return child;
  }

  removeChild(child: Node): Node {
    const index = this.childNodes.indexOf(child);
    if (index === -1)
      throw new DOMError("Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.");

    this.childNodes.splice(index, 1);
    child.parentNode = undefined;

    return child;
  }

  replaceChild(newChild: Node, oldChild: Node): Node {
    if (newChild === oldChild)
      throw new DOMError("Failed to execute 'replaceChild' on 'Node': The new child element contains the old element.");
    if (newChild.contains(this))
      throw new DOMError("Failed to execute 'replaceChild' on 'Node': The new child element contains the parent.");

    // Remove the node first before appending it.
    if (newChild.parentNode) {
      newChild.parentNode.removeChild(newChild);
    }

    const index = this.childNodes.indexOf(oldChild);
    if (index === -1)
      throw new DOMError("Failed to execute 'replaceChild' on 'Node': The node to be replaced is not a child of this node.");

    this.childNodes.splice(index, 1, newChild);
    oldChild.parentNode = undefined;
    newChild.parentNode = this;

    return oldChild;
  }

  contains(child: Node): boolean {
    if (child === this) return false;

    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i] === child) {
        return true;
      } else if (this.childNodes[i].contains(child)) {
        return true;
      }
    }
    return false;
  }

  get firstChild(): Node|undefined {
    if (this.childNodes.length > 0) {
      return this.childNodes[0];
    }
    return undefined;
  }

  get lastChild(): Node|undefined {
    if (this.childNodes.length > 0) {
      return this.childNodes[this.childNodes.length - 1];
    }
    return undefined;
  }

  get nextSibling(): Node|undefined {
    if (!this.parentNode) return undefined;
    const nextSiblingIndex = this.parentNode.childNodes.indexOf(this) + 1;

    if (nextSiblingIndex >= this.parentNode.childNodes.length) return undefined;

    return this.parentNode.childNodes[nextSiblingIndex];
  }

  get previousSibling(): Node|undefined {
    if (!this.parentNode) return undefined;
    const nextSiblingIndex = this.parentNode.childNodes.indexOf(this) - 1;

    if (nextSiblingIndex < 0) return undefined;

    return this.parentNode.childNodes[nextSiblingIndex];
  }

  get textContent(): string {
    return this.childNodes.map(node => node.textContent).join("");
  }

  set textContent(text: string) {
    throw new Error("Not implemented");
  }
}