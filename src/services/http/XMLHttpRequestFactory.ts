import { IXMLHttpRequestFactory } from "../../models/http/IXMLHttpRequestFactory";

export class XMLHttpRequestFactory implements IXMLHttpRequestFactory {
  create(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}