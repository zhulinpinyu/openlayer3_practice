var osm_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://10.211.55.25/osm/{z}/{x}/{y}.png"
    //"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //http://10.211.55.24/osm/8/213/111.png
  })
});

var amap_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
  })
});

var center = ol.proj.transform([114.026,22.532],'EPSG:4326','EPSG:3857');

var view = new ol.View({
  center: center,
  zoom: 17,
  maxZoom: 18,
  minZoom: 4
});

var map = new ol.Map({
  target: 'map',
  layers: [amap_layer],
  view: view
});