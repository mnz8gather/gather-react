// vscode source: tests\cases\compiler\pickOfLargeObjectUnionWorks.ts
interface HTMLDataAttributes {
  [data: `data-${string}`]: unknown;
}

// antd components/menu/interface.ts
// data- attributes can be anything but we avoid using `any`. As we don't use the attributes anywhere ourselves, we don't care what type they actually have, hence `unknown`
export type DataAttributes = {
  [Key in `data-${string}`]: unknown;
};
