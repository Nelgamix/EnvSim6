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

  static randomColorRGB(min: number = 0, max: number = 256): string {
    if (min >= max) {
      console.error('randomColor: min can\'t be superior to max.');
      return '#000';
    }

    return 'rgb(' +
      Math.floor(min + Math.random() * (Math.min(256, max) - min)) + ', ' +
      Math.floor(min + Math.random() * (Math.min(256, max) - min)) + ', ' +
      Math.floor(min + Math.random() * (Math.min(256, max) - min)) + ')';
  }

  static randomColorHSL(contrast: {min: number, max: number}, lightness: {min: number, max: number}): string {
    if (contrast === null || contrast.min < 0 || contrast.max > 100) contrast = {min: 0, max: 100};
    if (lightness === null || lightness.min < 0 || lightness.max > 100) lightness = {min: 0, max: 100};

    return 'hsl(' +
        Math.floor(Math.random() * 360) + ',' +
        Math.floor(contrast.min + Math.random() * (contrast.max - contrast.min)) + '%,' +
        Math.floor(lightness.min + Math.random() * (lightness.max - lightness.min)) + '%)';
  }
}
