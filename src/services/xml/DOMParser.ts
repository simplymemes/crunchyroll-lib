import * as sax from 'sax';
import { Document } from './Document';
import { Node } from './Node';
import { Element } from './Element';
import { Text } from './Text';
import { Attribute } from './Attribute';

export class DOMParser {
  async parseFromString(content: string): Promise<Document> {
    const parser = sax.parser(true, {
      xmlns: true
    });

    const doc: Document = new Document();

    let currentNode: Node = doc;

    return new Promise((resolve, reject) => {
      parser.onerror = (err: Error) => reject(err);
      parser.onend = () => resolve();

      parser.onopentag = (tag: sax.QualifiedTag) => {
        const attributes: {[key: string]: Attribute} = {};
        for (let key in tag.attributes) {
          if (tag.attributes.hasOwnProperty(key)) {
            const attr = tag.attributes[key];
            attributes[key] = new Attribute(attr.name, attr.uri, attr.local, attr.prefix, attr.value);
          }
        }
        const node = new Element(tag.name, tag.prefix, tag.local, attributes);

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