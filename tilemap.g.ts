// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`0b001200030303030303030303030304040404040404040404040404040404040404040404010101010101010101010102020202020202020202020404040404040404040404010101010101010101010102020202020202020202020404040404040404040404010101010101010101010102020202020202020202020101010101010101010101020202020202020202020204040404040404040404040101010101010101010101020202020202020202020204040404040404040404040505050505050505050505`, img`
2 2 2 2 2 2 2 2 2 2 2 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
. . . . . . . . . . . 
`, [myTiles.transparency16,sprites.vehicle.roadHorizontal,myTiles.tile1,sprites.castle.saplingPine,sprites.castle.tileGrass1,sprites.castle.tileGrass2], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "road2":
            case "tile1":return tile1;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
