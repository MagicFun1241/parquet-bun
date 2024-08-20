export type Int64 = {
    type: 'INT64';

    convertedType?: 'TIMESTAMP_MILLIS' | 'TIMESTAMP_MICROS' | 'INT_64' | 'UINT_64' | 'TIME_MICROS';
    logicalType?: {
        type: 'TIMESTAMP' | 'TIME';
        isAdjustedToUTC?: boolean;
        unit?: 'MILLIS' | 'MICROS';
    };
};

export type Int32 = {
    type: 'INT32';

    convertedType?: 'INT_8' | 'INT_16' | 'INT_32' | 'UINT_8' | 'UINT_16' | 'UINT_32' | 'DATE' | 'TIME_MILLIS';
    logicalType?: {
        type: 'DECIMAL' | 'DATE' | 'TIME';
        precision?: number;
        scale?: number;
        isAdjustedToUTC?: boolean;
        unit?: 'MILLIS';
    };

    repetitionType?: 'REPEATED';
};

export type FixedLenByteArray = {
    type: 'FIXED_LEN_BYTE_ARRAY';
    length: number;
    convertedType?: 'INTERVAL' | 'DECIMAL';
    logicalType?: {
        type: 'DECIMAL';
        precision?: number;
        scale?: number;
    };
};

export type Float = {
    type: 'FLOAT';
};

export type Double = {
    type: 'DOUBLE';
};

export type ByteArray = {
    type: 'BYTE_ARRAY';

    convertedType?: 'UTF8' | 'ENUM' | 'DECIMAL';
    encoding?: 'PLAIN_DICTIONARY';
    logicalType?: {
        type: 'DECIMAL';
        precision?: number;
        scale?: number;
    };
};

export type List = {
    type: 'MAP';
    convertedType?: 'LIST';
    valueType: ByteArray;
    valueConvertedType?: 'UTF8';
};

export type Map = {
    type: 'MAP';
    convertedType?: 'MAP';
    keyType: ByteArray;
    keyConvertedType?: 'UTF8';

    valueType: Int32 | ByteArray;
};

export type Boolean = {
    type: 'BOOLEAN';
};