import { ISubtitle } from '../../models/ISubtitle';
import { DOMParser } from '../../services/xml/DOMParser';
import { Document } from '../../services/xml/Document';
import { Element } from '../../services/xml/Element';
import { ISubtitleContent, ISubtitleContentStyle, ISubtitleContentEvent } from '../../models/ISubtitleContent';

export class BaseXMLModel {
  protected _element: Element;

  constructor(element: Element) {
    this._element = element;
  }
  
  protected _getElement(tagName: string): Element {
    const children = this._element.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName === tagName) {
        return children[i];
      }
    }
    throw new Error("Element " + tagName + " not found.");
  }
}

export class SubtitleXMLModel extends BaseXMLModel implements ISubtitleContent {
  get id(): number {
    return parseInt(this._element.getAttribute("id"), 10);
  }

  get title(): string {
    return this._element.getAttribute("title");
  }

  get locale(): string {
    const locale = this._element.getAttribute("lang_code");
    for (let i = 0; i < locale.length; i++) {
      if (locale[i] === "-" || locale[i] === "_") {
        return locale.substring(0, i) + "-" + locale.substring(i + 1);
      } else if (locale[i].toUpperCase() === locale[i]) {
        return locale.substring(0, i) + "-" + locale.substring(i);
      }
    }

    return locale;
  }

  get localeString(): string {
    return this._element.getAttribute("lang_string");
  }

  get wrapStyle(): string {
    return this._element.getAttribute("wrap_style");
  }

  get playResX(): string {
    return this._element.getAttribute("play_res_x");
  }

  get playResY(): string {
    return this._element.getAttribute("play_res_y");
  }

  get styles(): ISubtitleContentStyle[] {
    return this._getElement("styles")
      .getElementsByTagName("style")
      .map(x => new SubtitleStyleXMLModel(x));
  }

  get events(): ISubtitleContentEvent[] {
    return this._getElement("events")
      .getElementsByTagName("event")
      .map(x => new SubtitleEventXMLModel(x));
  }
}

export class SubtitleStyleXMLModel extends BaseXMLModel implements ISubtitleContentStyle {
  get name(): string {
    return this._element.getAttribute("name");
  }

  get fontName(): string {
    return this._element.getAttribute("font_name");
  }

  get fontSize(): string {
    return this._element.getAttribute("font_size");
  }

  get primaryColour(): string {
    return this._element.getAttribute("primary_colour");
  }

  get secondaryColour(): string {
    return this._element.getAttribute("secondary_colour");
  }

  get outlineColour(): string {
    return this._element.getAttribute("outline_colour");
  }

  get backColour(): string {
    return this._element.getAttribute("back_colour");
  }

  get bold(): string {
    return this._element.getAttribute("bold") === '1' ? '-1' : '0';
  }

  get italic(): string {
    return this._element.getAttribute("italic") === '1' ? '-1' : '0';
  }

  get underline(): string {
    return this._element.getAttribute("underline") === '1' ? '-1' : '0';
  }

  get strikeout(): string {
    return this._element.getAttribute("strikeout") === '1' ? '-1' : '0';
  }

  get scaleX(): string {
    return this._element.getAttribute("scale_x");
  }

  get scaleY(): string {
    return this._element.getAttribute("scale_y");
  }

  get spacing(): string {
    return this._element.getAttribute("spacing");
  }

  get angle(): string {
    return this._element.getAttribute("angle");
  }

  get borderStyle(): string {
    return this._element.getAttribute("border_style");
  }

  get outline(): string {
    return this._element.getAttribute("outline");
  }

  get shadow(): string {
    return this._element.getAttribute("shadow");
  }

  get alignment(): string {
    return this._element.getAttribute("alignment");
  }

  get marginL(): string {
    return this._element.getAttribute("margin_l");
  }

  get marginR(): string {
    return this._element.getAttribute("margin_r");
  }

  get marginV(): string {
    return this._element.getAttribute("margin_v");
  }

  get encoding(): string {
    return this._element.getAttribute("encoding");
  }
}

export class SubtitleEventXMLModel extends BaseXMLModel implements ISubtitleContentEvent {
  get start(): string {
    return this._element.getAttribute("start");
  }

  get end(): string {
    return this._element.getAttribute("end");
  }

  get style(): string {
    return this._element.getAttribute("style");
  }

  get name(): string {
    return this._element.getAttribute("name");
  }

  get marginL(): string {
    return this._element.getAttribute("margin_l");
  }

  get marginR(): string {
    return this._element.getAttribute("margin_r");
  }

  get marginV(): string {
    return this._element.getAttribute("margin_v");
  }

  get effect(): string {
    return this._element.getAttribute("effect");
  }

  get text(): string {
    return this._element.getAttribute("text");
  }
}