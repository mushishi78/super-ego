
var id

exports.id = function(newId) {
    id = newId
}

exports.patch = function(elementId, fn) {
    id.patch(document.getElementById(elementId), fn)
}

exports.$close = function(tag) {
    tag = tag || 'div'
    id.elementClose(tag)
}

exports.$text = function(str) {
    id.text(str)
}

exports.$open = function(keyClass, opts) {
    id.elementOpen.apply(id, getArgs(keyClass, opts))
}

exports.$void = function(keyClass, opts) {
    id.elementVoid.apply(id, getArgs(keyClass, opts))
}

function getArgs(keyClass, opts) {
    let tag = 'div'
    let key = keyClass
    const staticsArray = []
    const dynamicsArray = []
    let classAdded = false

    for (var k in opts) {
        // Tag name
        if (k === 'tag' || k === '$tag') {
            tag = opts[k]
            continue
        }

        // Key
        if (k === 'key' || k === '$key') {
            key = opts[k]
            continue
        }

        // Static classes
        if (k === '$classes') {
            const classNames = [keyClass]

            for (let className in opts['$classes']) {
                // Ignore if value is falsey
                if (!opts['$classes'][className]) continue

                classNames.push(className)
            }

            // Add to static attributes array
            staticsArray.push('class', classNames.filter(Boolean).join(' '))
            classAdded = true
            continue
        }

        // Dynamic classes
        if (k === 'classes') {
            const classNames = [keyClass]

            for (let className in opts['classes']) {
                // Ignore if value is falsey
                if (!opts['classes'][className]) continue

                classNames.push(className)
            }

            // Add to the variadic dynamic attributes
            dynamicsArray.push('class', classNames.filter(Boolean).join(' '))
            classAdded = true
            continue
        }

        // Static atttributes
        if (k[0] === '$') {
            staticsArray.push(k.slice(1), opts[k])
            continue
        }

        // Dynamic attributes
        dynamicsArray.push(k, opts[k])
    }

    // If no classes configuration used,
    // still need to added the keyClass
    if (!classAdded && keyClass != null) {
        staticsArray.push('class', keyClass)
    }

    return [tag, key, staticsArray].concat(dynamicsArray)
}
