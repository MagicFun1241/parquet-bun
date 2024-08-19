import {suffix} from 'bun:ffi';

import {join} from 'path';

const packageData = await Bun.file(join('package.json')).json();

const version = packageData.version;
const arch = process.arch;

const file = `parquet.${suffix}`;

try {
    const response = await fetch(`https://github.com/MagicFun1241/parquet-bun/releases/download/v${version}/parquet-${arch}.${suffix}`);
    await Bun.write(file, response);
} catch (e) {
    const error = e as Error;

    console.log(error.message);
}