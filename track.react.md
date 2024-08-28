```tsx
const [someSatate, setSomeSatate] = useState<Record<string, any>>({});

useEffect(() => {
  if (someState?.someId) {
  } else {
  }
}, [someState?.someId]);
```

`someState?.someId` 这样写，只有 someId 改变才会执行，someState 其他属性变更不会执行

状态 -react-> 视图 -事件-> 状态

state -> node -> event -> request -> state
