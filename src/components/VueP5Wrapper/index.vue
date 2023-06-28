<script lang="ts" setup>
/**
 * NOTE 渲染 p5.js，它是一个创意编程式函数库，以 canvas 的形式实现很多有创意的作品，动画，3D 等
 * 参考资料：
 * - https://juejin.cn/post/7173451612654927908#heading-0
 * - https://p5js.org/zh-Hans/examples/
 */
import P5 from 'p5';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  sketch: (p: P5Methods) => void; // p5.js 渲染
  options?: {
    [key: string]: any;
  };
}

const props = defineProps<Props>();

const canvas = ref<HTMLCanvasElement | null>(null);
let p: P5Methods | null = null;

// 挂载 p5 实例
const setupP5 = () => {
  if (!canvas.value) return;

  p = new P5((sk: P5Methods) => {
    console.log('sk: ', sk);
    Object.assign(sk, props.options || {});
    props.sketch(sk);
  }, canvas.value);
};

// 卸载 p5 实例
const destroyP5 = () => {
  if (!p) return;

  p.remove();
  p = null;
};

onMounted(() => {
  setupP5();
});

onUnmounted(() => {
  destroyP5();
});

/** 监听 props 的变化，重绘 p5 */
watch(
  () => props.options,
  (newVal) => {
    if (!newVal) return;
    // 参数变化时触发更新
    p?.updateWithProps && p.updateWithProps(newVal);
  },
  { deep: true }
);
</script>

<template>
  <div ref="canvas" />
</template>
