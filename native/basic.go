package main

import "C"

import (
    "github.com/xitongsys/parquet-go/source"
    "log"

    "github.com/xitongsys/parquet-go-source/local"
    "github.com/xitongsys/parquet-go/writer"
)

var instances = map[string]*Instance{}

func stringArg(some *C.char) string {
    goArg := C.GoString(some)

    return goArg
}

type Instance struct {
    schema []string
    item   []any

    fileWriter source.ParquetFile

    csvWrite *writer.CSVWriter
}

//export Prepare
func Prepare(name *C.char) {
    goName := stringArg(name)

    instances[goName] = &Instance{
        schema: []string{},
        item:   []any{},
    }
}

//export Ready
func Ready(name *C.char, file *C.char) {
    goName := stringArg(name)
    goFile := stringArg(file)

    instance := instances[goName]

    fw, err := local.NewLocalFileWriter(goFile)
    if err != nil {
        log.Println("Can't open file", err)
        return
    }

    pw, err := writer.NewCSVWriter(instance.schema, fw, 4)
    if err != nil {
        log.Println("Can't create csv writer", err)
        return
    }

    instance.fileWriter = fw
    instance.csvWrite = pw
}

//export Write
func Write(name *C.char) {
    goName := stringArg(name)

    instance := instances[goName]

    if err := instance.csvWrite.Write(instance.item); err != nil {
        log.Println("Write error", err)
    }
    
    instance.item = []any{}
}

//export Close
func Close(name *C.char) {
    goName := stringArg(name)

    instance := instances[goName]

    if err := instance.csvWrite.WriteStop(); err != nil {
        log.Println("WriteStop error", err)
    }

    err := instance.fileWriter.Close()
    if err != nil {
        return
    }

    delete(instances, goName)
}

func main() {}
