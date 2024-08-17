package main

import "C"

//export AppendString
func AppendString(name *C.char, value *C.char) {
    goName := stringArg(name)
    goValue := stringArg(value)

    instance := instances[goName]

    instance.item = append(instance.item, goValue)
}

//export AppendInt32
func AppendInt32(name *C.char, value int32) {
    goName := stringArg(name)

    instance := instances[goName]

    instance.item = append(instance.item, value)
}

//export AppendInt64
func AppendInt64(name *C.char, value int64) {
    goName := stringArg(name)

    instance := instances[goName]

    instance.item = append(instance.item, value)
}

//export AppendBool
func AppendBool(name *C.char, value bool) {
    goName := stringArg(name)

    instance := instances[goName]

    instance.item = append(instance.item, value)
}

//export AppendNull
func AppendNull(name *C.char) {
    goName := stringArg(name)

    instance := instances[goName]

    instance.item = append(instance.item, nil)
}