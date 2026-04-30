var canvas = document.getElementById("editor")
var ctx = canvas.getContext("2d")

var sent_btn = document.getElementById("send_btn")
var pop_btn = document.getElementById("pop_btn")
var hmirror_btn = document.getElementById("hmirror_btn")
var vmirror_btn = document.getElementById("vmirror_btn")
var textarea = document.getElementById("textarea")
var message = document.getElementById("message")

const tiles = new Image(); // Create new img element
tiles.src = "minitiles9-table-9-9.png";
const MAX_WIDTH = 40
const MAX_HEIGHT = 30
const TILE = 9
const SCALE = 3

const WATER = "-"
const MOUNTAIN = "1"
const CASTLE = "c"
const HOUSE = "n"
const PATH = "x"
const WOOD = "w"
const GROUND = " "

var map = [
    "--   w   ",
    "- c111www",
    "- wn1wnww",
    "-wxw1n   ",
    "-wx 1  c ",
    "- xxxxxxx",
    "-w  1  w ",
]

var pickedChar = GROUND
canvas.width = TILE * SCALE * MAX_WIDTH
canvas.height = TILE * SCALE * MAX_HEIGHT
textarea.cols = MAX_WIDTH + 5
textarea.rows = MAX_HEIGHT

canvas.addEventListener("contextmenu", mouseDown)
canvas.addEventListener("mousedown", mouseDown)
canvas.addEventListener("mouseup", mouseUp)
canvas.addEventListener("mousemove", mouseMove)

sent_btn.addEventListener("click", send)
pop_btn.addEventListener("click", allitems)
hmirror_btn.addEventListener("click", hmirror)
vmirror_btn.addEventListener("click", vmirror)

var mouse_down = false
var rightClicked = false

window.onload = function () {
    render()
    render_textarea()
}



function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.imageSmoothingEnabled = false
    for (var j = 0; j < map.length; j++) {
        var row = map[j]
        for (i = 0; i < row.length; i++) {
            var char = row.charAt(i)
            var index = 0
            if (char == WATER) {
                index = 1
            } else if (char == WOOD) {
                index = 2
            } else if (char == MOUNTAIN) {
                index = 3
            } else if (char == PATH) {
                index = 4
            } else if (char == CASTLE) {
                index = 5
            } else if (char == HOUSE) {
                index = 6
            }
            ctx.drawImage(tiles, index * TILE, 0, TILE, TILE, TILE * i * SCALE, TILE * j * SCALE, TILE * SCALE, TILE * SCALE)
        }
    }
}

function send() {
    var text = textarea.value
    var array = text.split(",")
    for (var i = 0; i < array.length; i++) {
        var row = array[i]
        var first = row.indexOf("\"")
        var second = row.indexOf("\"", first + 1)
        array[i] = row.substring(first + 1, second)
    }
    array.pop()
    map = array
    render()
    render_textarea()
}

function allitems() {
    put(WATER, 0, 0)
    put(MOUNTAIN, 1, 0)
    put(CASTLE, 2, 0)
    put(HOUSE, 3, 0)
    put(PATH, 4, 0)
    put(WOOD, 5, 0)
    put(GROUND, 6, 0)
    render()
    render_textarea()
}

function hmirror() {
    for (var j = 0; j < map.length; j++) {
        var row = map[j]
        var half_column = Math.floor(row.length / 2)
        for (i = 0; i < half_column; i++) {
            var char = row.charAt(i)
            put(char, row.length - i - 1, j)
        }
    }
    render()
    render_textarea()
}

function vmirror() {
    var half_row = Math.floor(map.length / 2)
    for (var j = 0; j < half_row; j++) {
        var row = map[j]
        for (i = 0; i < row.length; i++) {
            var char = row.charAt(i)
            put(char, i, map.length - j - 1)
        }
    }
    render()
    render_textarea()
}

function put(char, column, row) {
    if (row < map.length) {
        var text = map[row]
        if (column < text.length) {
            map[row] = text.substring(0, column) + char + text.substring(column + 1, text.length)
        } else {
            for (var i = 0; i < map.length; i++) {
                map[i] = map[i] + WATER.repeat(column - map[i].length + 1)
            }
        }

    } else {
        var water = WATER.repeat(map[0].length)
        var different = row - map.length
        for (var i = 0; i <= different; i++) {
            map.push(water)
        }
    }

}

function mouseDown(event) {
    mouse_down = true
    if (event.button == 0) {
        add(event)
    } else if (event.button == 2) {
        pick(event)
    }
}

function add(event) {
    var x = event.clientX - canvas.offsetLeft
    var y = event.clientY - canvas.offsetTop
    var column = Math.floor(x / TILE / SCALE)
    var row = Math.floor(y / TILE / SCALE)
    put(pickedChar, column, row)
    render_message(column, row)
    render()
    render_textarea()
}

function render_message(column, row) {
    var text = map[0].length + " x " + map.length
    text += "<br>" + column + "," + row
    message.innerHTML = text
}

function mouseMove(event) {
    var x = event.clientX - canvas.offsetLeft
    var y = event.clientY - canvas.offsetTop
    var column = Math.floor(x / TILE / SCALE)
    var row = Math.floor(y / TILE / SCALE)
    if (mouse_down) {
        add(event)
    }
    render_message(column, row)
}

function mouseUp(event) {
    mouse_down = false
}

function render_textarea() {
    var text = ""
    for (var j = 0; j < map.length; j++) {
        var row = map[j]
        text += "\"" + row + "\","
        text += "\n"
    }
    textarea.value = text
}

function pick(event) {
    event.preventDefault();
    var x = event.clientX - canvas.offsetLeft
    var y = event.clientY - canvas.offsetTop
    x = Math.floor(x / TILE / SCALE)
    y = Math.floor(y / TILE / SCALE)
    if (y < map.length) {
        pickedChar = map[y].charAt(x)
    } else {
        pickedChar = GROUND
    }
}

