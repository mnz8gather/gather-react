interface PropertyContainer<T, K extends keyof T> {
  item: T;
  propertyName: K;
  getPropertyValue: () => T[K];
}

function createContainer<T, K extends keyof T>(item: T, propertyName: K): PropertyContainer<T, K> {
  return {
    item,
    propertyName,
    getPropertyValue: () => item[propertyName],
  };
}

// 使用示例
const person = { name: 'John', age: 30 };

const container = createContainer(person, 'age');
console.log(container.getPropertyValue()); // 输出: 30

const nameContainer = createContainer(person, 'name');
console.log(nameContainer.getPropertyValue()); // 输出: John



type ValueOf<T> = T[keyof T];
interface Profile {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  age: number;
  isOnline: boolean;
}
type ProfileValues = ValueOf<Profile>;