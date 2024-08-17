import {dlopen, FFIType, suffix} from "bun:ffi";

import {existsSync} from "node:fs";
import {join} from 'node:path';

import {isBuilding} from "@/lib/helpers";

const {
    cstring,
    i32,
    i64 ,
    bool
} = FFIType;

const path = resolveLocation();
if (!isBuilding) {
    console.log();
    console.log('parquet location', path);
}

function resolveLocation(): string {
    const name = `parquet.${suffix}`;

    let path: string;

    const nativePath = join('../parquet', name);

    const workingPath = join(process.cwd(), name);

    if (existsSync(nativePath)) {
        path = nativePath;
    } else if (existsSync(workingPath)) {
        path = `./${name}`;
    }

    if (path! == null) return name;
    else return path;
}

function stringToBuffer(value: string) {
    return Buffer.from(`${value}\0`);
}

const open = () => dlopen(path, {
    Prepare: {
        args: [cstring]
    },
    Close: {
        args: [cstring]
    },
    Write: {
        args: [cstring]
    },
    Ready: {
        args: [cstring, cstring]
    },
    AppendString: {
        args: [cstring, cstring]
    },
    AppendInt32: {
        args: [cstring, i32]
    },
    AppendInt64: {
        args: [cstring, i64]
    },
    AppendBool: {
        args: [cstring, bool]
    },
    AppendNull: {
        args: [cstring]
    },
    AppendSchemaProperty: {
        args: [cstring, cstring]
    }
});

const library: ReturnType<typeof open>  = isBuilding ? ({
    symbols: {}
}) as never : open();

export function prepare(name: string) {
    library.symbols.Prepare(stringToBuffer(name));
}

export function close(name: string) {
    library.symbols.Close(stringToBuffer(name));
}

export function write(name: string) {
    library.symbols.Write(stringToBuffer(name));
}

export function ready(name: string, file: string) {
    library.symbols.Ready(stringToBuffer(name), stringToBuffer(file));
}

export function appendString(name: string, value: string) {
    library.symbols.AppendString(stringToBuffer(name), stringToBuffer(value));
}

export function appendInt32(name: string, value: number) {
    library.symbols.AppendInt32(stringToBuffer(name), value);
}

export function appendInt64(name: string, value: number) {
    library.symbols.AppendInt64(stringToBuffer(name), value);
}

export function appendNull(name: string) {
    library.symbols.AppendNull(stringToBuffer(name));
}

export function appendBoolean(name: string, value: boolean) {
    library.symbols.AppendBool(stringToBuffer(name), value);
}

export function appendSchemaProperty(name: string, value: string) {
    library.symbols.AppendSchemaProperty(stringToBuffer(name), stringToBuffer(value));
}
