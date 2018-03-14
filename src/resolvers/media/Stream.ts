import { IStream } from "../../models/IStream";
import { ConfigStreamInfo } from "./ConfigStreamInfo";

export class Stream implements IStream {
  private _stream: ConfigStreamInfo;

  constructor(stream: ConfigStreamInfo) {
    this._stream = stream;
  }

  getType(): number {
    return this._stream.mediaType;
  }

  getFile(): string {
    return this._stream.file;
  }

  getHost(): string | undefined {
    return this._stream.host;
  }

  getDuration(): number {
    return this._stream.metadata.duration;
  }
  
  getWidth(): number {
    return this._stream.metadata.width;
  }
  
  getHeight(): number {
    return this._stream.metadata.height;
  }

  getEncodeId(): string {
    return this._stream.videoEncodeId;
  }
}