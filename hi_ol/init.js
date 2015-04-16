var map,
    baselayer,
    vectorLayer,
    vectorLayer2,
    styleCache,
    geoLayer;

function init(){
  map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    view: new ol.View({
      projection: 'EPSG:900913',
      center: [-8015003.33712,4160979.44405],
      zoom: 5
    })
  });
  baselayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  vectorLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      preload: Infinity,
      url: 'http://felek.cns.umass.edu:8080/geoserver/wms',
      serverType: 'geoserver',
      params: {
        'LAYERS': "Streams:Developed", 'TILED': true
      }
    })
  });

  vectorLayer2 = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      preload: Infinity,
      url: 'http://felek.cns.umass.edu:8080/geoserver/wms',
      serverType: 'geoserver',
      params: {
        'LAYERS': "Streams:Deposition_of_Nitrogen", 'TILED':true
      }
    }),
  });

  styleCache = {};
  geoLayer = new ol.layer.Vector({
    source: new ol.source.GeoJSON({
      projection: 'EPSG:900913',
      url: './myGeoJson.json'
    }),
    style: function(feature,resolution){
      var text = resolution < 5000 ? feature.get('name') : ''
      if(!styleCache[text]){
        styleCache[text] = [new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.1)'
          }),
          stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
          }),
          text: new ol.style.Text({
            font: '12px Calibri, sans-serif',
            text: text,
            fill: new ol.style.Fill({
              color: '#000'
            }),
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 3
            })
          }),
          zIndex: 999
        })];
      }
      return styleCache[text];
    }
  });


  //设置透明度
  //vectorLayer.setOpacity(.3);
  map.addLayer(baselayer);
  //map.addLayer(vectorLayer);
  map.addLayer(vectorLayer2);
  map.addLayer(geoLayer);

  //Attribution
  // var myAttributionControl = new ol.control.Attribution({
  //   className: 'ol-attribution',
  //   target: null
  // });
  // map.addControl(myAttributionControl);

  //MousePosition
  var mousePosition = new ol.control.MousePosition({
    className: 'ol-full-screen',
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: undefined,
    undefinedHTML: '&nbsp;'
  });
  map.addControl(mousePosition);

  //FullScreen
  var myFullScreenControl = new ol.control.FullScreen();
  map.addControl(myFullScreenControl);

  //Rotate
  //var myRotateControl = new ol.control.Rotate();
  //map.addControl(myRotateControl);

  //ScaleLine
  var myScaleControl = new ol.control.ScaleLine();
  map.addControl(myScaleControl);

  //Zoom
  var myZoomControl = new ol.control.Zoom();
  map.addControl(myZoomControl);

  //ZoomSlider
  var myZoomSliderControl = new ol.control.ZoomSlider();
  map.addControl(myZoomSliderControl);

  //ZoomToExtent
  var myZoomToExtentControl = new ol.control.ZoomToExtent({
    extent: undefined
  });
  map.addControl(myZoomToExtentControl);

  map.on('singleclick',function(evt){
    var coord = evt.coordinate;
    var viewProjction = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();
    var url = vectorLayer.getSource().getGetFeatureInfoUrl(coord,viewResolution, viewProjction,{
      'INFO_FORMAT': 'application/json'
    });
    if(url){
      console.log(url);
      $.getJSON(url, function(d){
        console.log(d);
      });
    }else{
      console.log('Oh no.');
    }
    spawnPopup(coord, viewProjction.a);
  });

  function spawnPopup(coord,projection){
    var transformed_coordinate = ol.proj.transform(coord, projection, 'EPSG:4326');
    var popup = $("<div class='popup'>"+transformed_coordinate+"</div>");
    var overlay = new ol.Overlay({
      element: popup
    });
    map.addOverlay(overlay);
    overlay.setPosition(coord);
  }
}

function removeTopLayer(){
  //map.removeLayer(vectorLayer);
  vectorLayer.setVisible(false);
}

function swapTopLayer(){
  var layers = map.getLayers();
  var topLayer = layers.removeAt(2);
  layers.insert(1,topLayer);
}
