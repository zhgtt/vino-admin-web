/**
 * 色值 -> RGB 转换
 * @param value - 色值
 * @param opacity - 透明度，范围是 0 - 1
 */
export const _colorToRGB = (value: string, opacity: number) => {
  if (!value) return '';

  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 16 进制颜色值的正则
  let color = value.toLowerCase(); // 把颜色值变成小写

  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) color = color.padEnd(7, color.slice(1));

    // 处理六位的颜色值，转为RGB
    const colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2))); // 将颜色值三等分，与 '0x' 进行拼接，利用 parseInt() 将其转换成十进制的值，如 parseInt('0xff') => 255
    }
    return `rgba(${colorChange.join(', ')}, ${opacity})`;
  }
  return color;
};
