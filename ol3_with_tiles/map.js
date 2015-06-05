var local_osm_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://172.15.1.195/osm/{z}/{x}/{y}.png"
    //"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  })
});

var amap_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
  })
});

var google_layer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "http://mt1.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil"
    //Options: mt0.google.cn mt1.google.cn mt2.google.cn mt3.google.cn
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
  layers: [local_osm_layer],
  view: view
});