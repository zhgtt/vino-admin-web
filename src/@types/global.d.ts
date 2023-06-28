declare type Lazy<T> = () => Promise<T>;

declare type CustomContentType = string | (() => JSX.Element) | import('vue').Component;

declare type P5Methods = import('P5') & {
  updateWithProps?: (props: { [key: string]: any }) => void;
};
