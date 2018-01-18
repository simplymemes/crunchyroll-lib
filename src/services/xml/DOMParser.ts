import * as sax from 'sax';
import { Document } from './Document';
import { Node } from './Node';
import { Element } from './Element';
import { Text } from './Text';

export class DOMParser {
  async parseFromString(content: string): Promise<Document> {
    const parser = sax.parser(true, {
      xmlns: false
    });

    const doc: Document = new Document();

    let currentNode: Node = doc;

    return new Promise((resolve, reject) => {
      parser.onerror = (err: Error) => reject(err);
      parser.onend = () => resolve();

      parser.onopentag = (tag: sax.Tag) => {
        const node = new Element(tag.name, tag.attributes);

        node.parentNode = currentNode;
        currentNode.childNodes.push(node);

        currentNode = node;
      };

      parser.onclosetag = (tagName: string) => {
        if (currentNode.parentNode) {
          currentNode = currentNode.parentNode;
        }
      };

      parser.ontext = (text: string) => {
        const node = new Text(text);

        node.parentNode = currentNode;
        currentNode.childNodes.push(node);
      };

      parser.write(content);
      parser.close();
    })
    .then(() => doc);
  }
}