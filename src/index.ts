import * as ffi from '@/core/ffi';
import * as types from '@/core/native';

type NativeType<T> = {
    native: T;
};

type SchemaProperty = (types.ByteArray & NativeType<string>)
    | (types.FixedLenByteArray & NativeType<string>)
    | (types.Int64 & NativeType<number>)
    | (types.Int32 & NativeType<number>)
    | (types.Float & NativeType<number>)
    | (types.Double & NativeType<number>)
    | (types.Map & NativeType<Map<string, any>>)
    | (types.List & NativeType<any[]>)
    | (types.Boolean & NativeType<boolean>);

export function openFile<T extends Record<string, SchemaProperty['native']>>(
    instance: string,
    schema: Record<keyof T, Omit<SchemaProperty, 'native'>>,
    path: string
) {
    ffi.prepare(instance);

    const order: (keyof T)[] = [];

    for (const [key, property] of Object.entries(schema)) {
        const formatted = Object
            .entries({ name: key, ...property })
            .map(([key, value]) => `${key.toLocaleLowerCase()}=${value}`)
            .join(', ');

        ffi.appendSchemaProperty(instance, formatted);

        order.push(key as keyof T);
    }

    ffi.ready(instance, path);

    return {
        appendRow: function appendRow(record: T) {
            for (const key of order) {
                const value = record[key];

                if (value == null) {
                    ffi.appendNull(instance);
                    continue;
                }

                const typeName = schema[key].type;

                switch (typeName) {
                    case 'BYTE_ARRAY':
                    case 'FIXED_LEN_BYTE_ARRAY':
                        ffi.appendString(instance, value as string);
                        break;

                    case 'INT32':
                        ffi.appendInt32(instance, value as number);
                        break;

                    case 'INT64':
                        ffi.appendInt64(instance, value as number);
                        break;

                    case 'BOOLEAN':
                        ffi.appendBoolean(instance, value as boolean);
                        break;

                    default:
                        console.log('unsupported type "%s"', typeName);

                        ffi.appendNull(instance);
                        break;
                }
            }

            ffi.write(instance);
        },
        close: () => {
            ffi.close(instance);
        },
    };
}

export * from '@/core/native';