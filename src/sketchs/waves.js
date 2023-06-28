export default function waves(p) {
  // 配置项，也是传递给外部的可控的状态
  let mountains = [];
  let bgColor = '#e6e6e6';
  // let bgColor = '249, 249, 249, 20';
  // let isDarkMode = false; // 是否暗黑模式
  let waveColor = p?.waveColor || '#005CAF'; // 默认色值
  let bg = null; // 背景图片

  p.preload = function () {
    bg = p.loadImage('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png');
  };

  /** 初始化画布 */
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight); // 创建画布，默认是 2D 形式
    mountains = [];
    growMountains(p, mountains, waveColor);
    mountains.forEach((m) => m.display(p));
  };

  /** 在画布上执行动画效果，可以看作是一个动画循环的函数，可以在这里绘制图形，处理事件交互等 */
  p.draw = function () {
    // p.background(bgColor);
    p.background(bg); // 设置画布的背景色
    mountains.forEach((m) => m.display(p));
  };

  /** 浏览器窗口大小发生变化时调用 */
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  /** p5 组件配置项发生改变时调用（自定义的方法，会传递到外部） */
  p.updateWithProps = function (newProps) {
    console.log('newProps: ', newProps);
    // !newProps.isPlaying ? p.frameRate(0) : p.frameRate(30);
    // bgColor = newProps.isDarkMode ? '#323232' : '#e6e6e6';

    // if (isDarkMode !== newProps.isDarkMode || waveColor !== newProps.waveColor) {
    //   waveColor = newProps.waveColor;
    //   isDarkMode = newProps.isDarkMode;
    //   p.setup();
    // }

    if (waveColor !== newProps.waveColor) {
      waveColor = newProps.waveColor;
      p.setup();
    }
  };

  // p.keyPressed = function () {
  //   if (p.keyCode === 39 || p.keyCode === 37) {
  //     // left or right arrow keys
  //     mountains = [];
  //     growMountains(p, mountains, isDarkMode);
  //     p.background(bgColor);
  //     mountains.forEach((m) => m.display(p));
  //   }
  // };
}

class Mountain {
  constructor(color, y, p) {
    this.c = color;
    this.y = y;
    this.offset = p.random(100, 200);
    this.t = 0;
  }

  display(p) {
    let xoff = 0;

    p.noStroke();
    p.fill(this.c); // 设置形状填充的颜色、样式（可以为图片）

    p.noiseDetail(1.7, 1.3); // 平滑的调整动画效果，波浪效果（波浪的大小，高度）

    // 和 vertex 结合使用，自定义形状
    p.beginShape();

    for (let x = 0; x <= p.width + 25; x += 25) {
      const yoff = p.map(p.noise(xoff + this.offset, this.t + this.offset), 0, 1, 0, 200);
      const y = this.y - yoff;
      p.vertex(x, y);

      xoff += 0.08; // 圆润度
    }
    p.vertex(p.width + 100, p.height);
    p.vertex(0, p.height);

    p.endShape(p.CLOSE);

    this.t += 0.005; // 动画时间
  }
}

function growMountains(p, mountains, hexColor) {
  const c = p.color(hexColor);

  // 设置几层波浪纹，及其颜色，透明度（目前为 5 层）
  new Array(5).fill(1).map((_, i) => {
    // const a = 255 - 50 * i;
    const a = 255 - 40 * i;
    c.setAlpha(a); // 设置透明度，0-255
    const h = p.height - 50 * i;
    const m = new Mountain(c, h, p);
    mountains.push(m);
  });
}
