# SuperEgo

SuperEgo is a small wrapper around [Incremental DOM](https://google.github.io/incremental-dom). This just to give a slightly friendlier API, as Incremental DOM was design as a compile target, so the design favours efficiency over ease of typing. This wrapper is just meant to tip the balance in the other direction.

## Installation

With npm:

```
> npm install --save-dev super-ego
```

Or yarn:

```
> yarn add -D super-ego
```

## Usage

Setup by passing a copy of Increment DOM to SuperEgo:

```JavaScript
import * as id from 'incremental-dom'
import * as SuperEgo from 'super-ego'

// Pass in a copy of incremental dom
SuperEgo.id(id)
```

Create elements with `$open`, `$close`, `$text`, `$void` like this:

```JavaScript
const { $open, $close, $text, $void } = SuperEgo

function helloMessage() {
    $open('message')
        $text('Hello there!')
    $close()
}
```

Update the DOM with those element using `patch`:

```JavaScript
SuperEgo.patch('root-element', helloMessage)
```

The finds the element with an id 'root-element' and applys the patch to it.

## $open

`$open` opens a html element, defaulting to a `div` tag unless otherwise specified with the `tag` option.

It takes two arguments:

1. A `string` called the `keyClass`. By default this will be used for both the `key` and the first of the classes for the element. Either default can be overwritten, however the assuption of the library is that for most elements having both values set will be desirable.

2. An `object` specifiying attributes and element options: (`tag`, `classes` and `key`).

The  `key` is used to uniquely identify the element if the order it appears in changes. It also is necessary for static attributes optimisation to work.

If an attribute is prefixed with `$`, it is intended to be static for the lifetime of the element and Incremental DOM will not diff against it for changes. This only will take affect if a `key` is also provided.

The `classes` option is a dictionary mapping `className`s to `boolean`s. If the boolean is `true`, than className will be included when creating the `class` string, together with the `keyClass` which will always be included.

Here's is an example:

```JavaScript
$open('my-input' {
    tag: 'input',
    $type:'text',
    classes: { active: isActive },
    $oninput: (event) => {
        handleInput(event.target.value)
    }
})
```
