// interface LowProps<T> {
//   materials: Material<T, T['type']>[];
//   data?: T[];
// }

// interface DesignerValueItem extends Pick<Material, 'Display' | 'SettingsComponent' | 'tooltip'> {
//   type: string;
//   id: string;
//   hasError?: boolean;
//   validateStatus?: unknown;
// }

// interface LowProps<T extends DesignerValueItem = DesignerValueItem, K extends T['type']> extends Pick<MaterialProps, 'reserveGroupId'> {
//   materials: Material<T, K>[];
//   data?: T[];
//   onChange?: (data: T[]) => void;
// }

// interface Material<T, U> {
//   type: U;
//   groupId?: string;
//   Symbol: React.ComponentType<{ handleClick: () => void; item: Material<T, U> }>;
//   Display: React.ComponentType<{ item: DesignerValueItem }>;
//   SettingsComponent: React.ComponentType<SettingsComponentProps<T>>;
//   defaultSettings?: Partial<T>;
//   tooltip?: string;
// }

// interface SettingsComponentProps<T> {
//     item: T;
//     designerValue: T[];
// }

// ==========================================================================================================

// interface DesignerValueItem {
//   id: string;
//   hasError?: boolean;
//   validateStatus?: unknown;
// }

/**
 * T Low 组件的数据
 *
 */
// interface Material<T, K> {
//   type: K;
//   groupId?: string;
//   Symbol: React.ComponentType<{ handleClick: () => void; item: Material<T, K> }>;
//   Display: React.ComponentType<{ item: T }>;
//   SettingsComponent: React.ComponentType<SettingsComponentProps<T>>;
//   defaultSettings?: Partial<Omit<T, keyof DesignerValueItem>>;
//   tooltip?: string;
// }

// interface LowProps<T extends DesignerValueItem = DesignerValueItem, K = string> extends MaterialProps {
//   materials: Material<T, K>[];
//   data?: T[];
//   onChange?: (data: T[]) => void;
// }

// interface SettingsComponentProps<T> {
//   item: T;
//   designerValue: T[];
// }

// interface MaterialProps {
//   reserveGroupId: string;
// }

interface DesignerValueItem<T> {
  id: string;
  type: string;
  required?: boolean;
  title?: string;
  materialLabel: string;
  tooltip?: string;
  Display: React.ComponentType<{ item: DesignerValueItem<T> }>;
  SettingsComponent: React.ComponentType<SettingsComponentProps<DesignerValueItem<T>>>;
  hasError?: boolean;
  validateStatus?: unknown;
  // 可以添加额外的泛型依赖属性，比如默认设置
  defaultSettings?: Partial<T>;
}

interface SettingsComponentProps<T> {
  item: T;
  designerValue: T[];
}

// 调整 Material 接口以匹配新的泛型 DesignerValueItem
interface Material<T extends DesignerValueItem<U>, U> {
  type: string;
  Symbol: React.ComponentType<{ handleClick: () => void; item: Material<T, U> }>;
  Display: React.ComponentType<{ item: T }>;
  SettingsComponent: React.ComponentType<SettingsComponentProps<T>>;
  defaultSettings?: Partial<T>;
  groupId?: string;
  tooltip?: string;
}
