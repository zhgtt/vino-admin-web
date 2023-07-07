declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare module '@/sketchs' {
  const waves: (p: P5Methods) => void;
  export { waves };
}

declare module '*.svg' {
  const content: string;
  export default content;
}
