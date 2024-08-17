package main

import "C"

//export AppendSchemaProperty
func AppendSchemaProperty(name *C.char, value *C.char) {
    goName := stringArg(name)
    goValue := stringArg(value)

    instance := instances[goName]

    instance.schema = append(instance.schema, goValue)
}