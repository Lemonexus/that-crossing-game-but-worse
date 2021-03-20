namespace SpriteKind {
    export const UncollectedCherry = SpriteKind.create()
    export const CollectedCherry = SpriteKind.create()
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    duck.y -= 16
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    duck.x -= 16
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.UncollectedCherry, function (playerSprite, cherrySprite) {
    // cherrySprite.setImage(img`
    // `)
    if (heldCherry == null) {
        info.startCountdown(crossingTime)
        heldCherry = cherrySprite
        cherrySprite.setFlag(SpriteFlag.Invisible, true)
        cherriesLeft--
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    duck.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    duck.y += 16
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass2, function (sprite, location) {
	if(heldCherry != null){
        info.startCountdown(crossingTime)
        tiles.placeOnTile(heldCherry, location)
        heldCherry.setFlag(SpriteFlag.Invisible, false)
        heldCherry.setKind(SpriteKind.CollectedCherry)
        heldCherry = null

        if(cherriesLeft == 0){
            game.over(true)
        }
    }
})
function spawnCherries (numCherries: number, startColumn: number, startRow: number, gap: number) {
    for (let index = 0; index < numCherries; index++) {
        cherry = sprites.create(img`
            . . . . . . . . . . . 6 6 6 6 6 
            . . . . . . . . . 6 6 7 7 7 7 8 
            . . . . . . 8 8 8 7 7 8 8 6 8 8 
            . . e e e e c 6 6 8 8 . 8 7 8 . 
            . e 2 5 4 2 e c 8 . . . 6 7 8 . 
            e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
            e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
            e 2 e e 2 2 2 2 e e e e c 6 8 . 
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
            . c 2 e e e 2 e 2 4 2 2 2 2 c . 
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
            . . . e c c e c 2 2 2 2 2 2 2 e 
            . . . . . . . c 2 e e 2 2 e 2 c 
            . . . . . . . c e e e e e e 2 c 
            . . . . . . . . c e 2 2 2 2 c . 
            . . . . . . . . . c c c c c . . 
            `, SpriteKind.UncollectedCherry)
        cherry.z = -1
        tiles.placeOnTile(cherry, tiles.getTileLocation(startColumn, startRow))
        startColumn += 1 + gap
    }
}
let rightCar: Sprite = null
let leftCar: Sprite = null
let startColumn = 0
let cherry: Sprite = null
let heldCherry: Sprite = null
let duck: Sprite = null
let cherriesLeft = 4
scene.setBackgroundColor(7)
tiles.setTilemap(tilemap`level1`)
duck = sprites.create(img`
    . . . . . . . . . . b 5 b . . .
    . . . . . . . . . b 5 b . . . .
    . . . . . . . . . b c . . . . .
    . . . . . . b b b b b b . . . .
    . . . . . b b 5 5 5 5 5 b . . .
    . . . . b b 5 d 1 f 5 5 d f . .
    . . . . b 5 5 1 f f 5 d 4 c . .
    . . . . b 5 5 d f b d d 4 4 . .
    b d d d b b d 5 5 5 4 4 4 4 4 b
    b b d 5 5 5 b 5 5 4 4 4 4 4 b .
    b d c 5 5 5 5 d 5 5 5 5 5 b . .
    c d d c d 5 5 b 5 5 5 5 5 5 b .
    c b d d c c b 5 5 5 5 5 5 5 b .
    . c d d d d d d 5 5 5 5 5 d b .
    . . c b d d d d d 5 5 5 b b . .
    . . . c c c c c c c c b b . . .
`, SpriteKind.Player)
tiles.placeOnTile(duck, tiles.getTileLocation(5, 17))
scene.cameraFollowSprite(duck)
duck.setFlag(SpriteFlag.StayInScreen, true)
spawnCherries(cherriesLeft, 2, 1, 1)
game.onUpdateInterval(500, function () {
    leftCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 2 2 2 2 . . 
        . . . . . 2 c 2 2 2 2 2 2 4 2 . 
        . . . . 2 c c 2 2 2 2 2 2 4 c 2 
        . . d 2 4 c c 2 4 4 4 4 4 4 c c 
        . d 2 2 4 c b e e e e e e e 2 c 
        . 2 2 2 4 b e e b b b e b b e 2 
        . 2 2 2 2 2 e b b b b e b b b e 
        . 2 2 2 2 e 2 2 2 2 2 e 2 2 2 e 
        . 2 d d 2 e f e e e f e e e e e 
        . d d 2 e e e f e e f e e e e e 
        . e e e e e e e f f f e e e e e 
        . e e e e f f f e e e e f f f f 
        . . . e f f f f f e e f f f f f 
        . . . . f f f f . . . . f f f . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(leftCar, sprites.vehicle.roadHorizontal)
    leftCar.x = 180
    leftCar.vx = -50
    leftCar.setFlag(SpriteFlag.DestroyOnWall, true)
})
game.onUpdateInterval(500, function () {
    rightCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 4 2 2 2 2 2 2 c 2 . . . 
        . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
        . 2 c 2 e e e e e e e b c 4 2 2 
        . 2 2 e b b e b b b e e b 4 2 2 
        . 2 e b b b e b b b b e 2 2 2 2 
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
        . e e e e e e f e e e f e 2 d d 
        . e e e e e e f e e f e e e 2 d 
        . e e e e e e f f f e e e e e e 
        . e f f f f e e e e f f f e e e 
        . . f f f f f e e f f f f f e . 
        . . . f f f . . . . f f f f . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(rightCar, assets.tile`road2`)
    rightCar.x = -20
    rightCar.vx = 50
    rightCar.setFlag(SpriteFlag.DestroyOnWall, true)
})
info.setLife(3)

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})

game.showLongText("Get to the other side and bring the cherries back! Make sure to not get hit by any cars!", DialogLayout.Full)

let crossingTime = 20
info.startCountdown(crossingTime)