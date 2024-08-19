# Parquet Bun

To install dependencies:

```bash
bun install
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

### License

MIT