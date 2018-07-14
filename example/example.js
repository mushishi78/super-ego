const id = require('incremental-dom')
const SuperEgo = require('../super-ego')
const { $open, $close, $text } = SuperEgo

// Pass a copy of incremental dom
SuperEgo.id(id)

// Set up some state
let showMessage = false

// Initial render on page load
window.onload = () => SuperEgo.patch('root-element', render)

// Main render function
function render() {
    $open('page')
        $open('menu')
            menuItem('onions', 'Onions')
            menuItem('legumes', 'Legumes')
            menuItem('tie-dye', 'Tie Dye')
        $close()
        $open('main')
            $open('press-me-button', {
                tag: 'button',
                classes: { active: showMessage },
                $onclick: () => {
                    showMessage = !showMessage
                    SuperEgo.patch('root-element', render)
                }
            })
                $text('Press me!')
            $close('button')

            $open('message')
                if (showMessage) {
                    $text('Hello there!')
                }
            $close()
        $close()
    $close()
}

// Helper for generating menu items
function menuItem(key, label) {
    $open('menu-item', {
        key: key,
        classes: { selected: location.search.includes(key) },
        $onclick: () => location.search = key
    })
        $text(label)
    $close()
}
