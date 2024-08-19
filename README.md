# Parquet Bun

To install library:

```bash
bun add parquet-bun
```

### Example

```typescript
import {openFile} from "parquet-bun";

const schema = {
    'name': {
        type: 'BYTE_ARRAY',
        convertedType: 'UTF8',
        encoding: 'PLAIN_DICTIONARY'
    },
    'male': {
        type: 'BOOLEAN',
    }
} as const;

const writer = openFile('test', schema, 'test.parquet');

writer.appendRow({
    name: 'Emily',
    male: false
});

writer.appendRow({
    name: 'Bob',
    male: true
});

writer.close();
```

### Roadmap

- [x] Implement POC
- [ ] Support all types from [TypeList](https://github.com/xitongsys/parquet-go/blob/693d3323dee08f6a710c9012d40f3f709ee65cd1/example/type.go#L13)
- [ ] Improve schema building
- [ ] Improve inference from schema

### License

MIT
