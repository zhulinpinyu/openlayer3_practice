function init_map(){
  var center = new AMap.LngLat(114.03,22.53);
  var map = new AMap.Map('container',{
    view: new AMap.View2D({
      center: center,
      zoom: 14,
      rotation: 0
    }),
    lang: "zh_cn"
  });
}