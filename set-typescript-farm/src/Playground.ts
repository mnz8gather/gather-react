// 约束
// https://juejin.cn/post/7106038466139389959
// https://github.com/joye61/typescript-tutorial/blob/master/%E6%B3%9B%E5%9E%8B/%E6%B3%9B%E5%9E%8B%E7%BA%A6%E6%9D%9F.md

interface Dog {
  bark: () => void;
}

function dogBark<T extends Dog>(arg: T) {
  arg.bark();
}

let dogA = {
  weight: 12,
  age: 4,
};

let dogB = {
  weight: 12,
  age: 4,
  bark: () => console.log('dogB is barking'),
};

dogBark(dogA);

dogBark(dogB);

interface DogC {
  bark: () => void;
  age: number;
}

const dogC: DogC = {
  age: 8,
  bark() {
    console.log('dogC is barking');
  },
};

dogBark(dogC);
