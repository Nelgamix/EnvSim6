export class Utils {
  static dec2hex(x: number): string {
    const xs = x.toString(16);
    return (xs.length === 1) ? '0' + xs : xs;
  }

  static scaleColor(ratio: number, min: string, max: string): string {
    const ratioInv = 1 - ratio;

    const parse = (s: string, r: number): number => {
      return parseInt(s, 16) * r;
    };

    const red = Math.ceil(parse(max.substring(0, 2), ratio) + parse(min.substring(0, 2), ratioInv));
    const green = Math.ceil(parse(max.substring(2, 4), ratio) + parse(min.substring(2, 4), ratioInv));
    const blue = Math.ceil(parse(max.substring(4, 6), ratio) + parse(min.substring(4, 6), ratioInv));

    return '#' + Utils.dec2hex(red) + Utils.dec2hex(green) + Utils.dec2hex(blue);
  }

  static randomColor(): string {
    return 'rgb(' +
      Math.floor(64 + Math.random() * 192) + ', ' +
      Math.floor(64 + Math.random() * 192) + ', ' +
      Math.floor(64 + Math.random() * 192) + ')';
  }
}
