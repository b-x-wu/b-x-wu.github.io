export const getById = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const ele = document.getElementById(id);
  if (ele === null) {
    throw new Error(`Found no element with id: ${id}`);
  }

  return ele as T;
};

export const killEvent = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

export class HTMLStringBuilder {
  private readonly tag: string;
  private readonly attributes: Record<string, string> = {};
  private readonly innerHTML: string = "";

  private constructor(
    tag: string,
    attributes: Record<string, string>,
    innerHTML: string,
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.innerHTML = innerHTML;
  }

  public static fromTag(tag: string): HTMLStringBuilder {
    return new HTMLStringBuilder(tag, {}, "");
  }

  public withAttribute(name: string, value: string): HTMLStringBuilder {
    return new HTMLStringBuilder(
      this.tag,
      { ...this.attributes, [name]: value },
      this.innerHTML,
    );
  }

  public withInnerHtml(innerHTML: string): HTMLStringBuilder {
    return new HTMLStringBuilder(this.tag, this.attributes, innerHTML);
  }

  public asString(): string {
    const { attributes, tag, innerHTML } = this;
    const attributesString = Object.entries(attributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(" ");
    return `<${tag} ${attributesString}>${innerHTML}</${tag}>`;
  }
}
