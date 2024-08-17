export type Int64 = {
    type: 'INT64';

    convertedType?: 'TIMESTAMP_MILLIS';
};

export type Int32 = {
    type: 'INT32';

    convertedType?: 'INT_16' | 'INT_32';
};

export type FixedLenByteArray = {
    type: 'FIXED_LEN_BYTE_ARRAY';
    length: number;
}

export type Float = {
    type: 'FLOAT';
};

export type ByteArray = {
    type: 'BYTE_ARRAY';

    convertedType?: 'UTF8';
    encoding?: 'PLAIN_DICTIONARY';
};

export type Boolean = {
    type: 'BOOLEAN';
};