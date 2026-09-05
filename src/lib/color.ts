export class Color {
  red: number;
  green: number;
  blue: number;

  private constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  public static fromRgb(rgb: {
    red: number;
    green: number;
    blue: number;
  }): Color {
    const { red, green, blue } = rgb;
    return new Color(red, green, blue);
  }

  public asRgbString(): string {
    const { red, green, blue } = this;
    return `rgb(${red} ${green} ${blue})`;
  }
}
