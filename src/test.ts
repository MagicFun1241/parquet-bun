import {openFile} from "./index";

console.time('ffi');

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
    name: 'Nikita',
    male: true
});

writer.close();

console.timeEnd('ffi');