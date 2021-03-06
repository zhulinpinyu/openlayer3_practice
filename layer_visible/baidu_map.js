var resolutions = [];
var tileSize = 256;

var projection = ol.proj.get("EPSG:3857");

for (var i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i);
}

var tilegrid = new ol.tilegrid.TileGrid({
    origin: [0,0],
    resolutions: resolutions
});

var tilesource = new ol.source.TileImage({
    projection: projection,
    tileGrid: tilegrid,
    tileUrlFunction: function (xyz, obj1, obj2) {
        if (!xyz) {
            return "";
        }
        var z = xyz[0];
        var x = xyz[1];
        var y = xyz[2];
        if (x < 0) {
            x = "M" + (-x);
        }
        if (y < 0) {
            y = "M" + (-y);
        }
        return "http://online2.map.bdimg.com/tile/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20150428&scaler=1"
    }
});