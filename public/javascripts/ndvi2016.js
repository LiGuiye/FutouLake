//将地图内容与容器绑定
var map = L.map('Mymap', {
	center: [29.99, 114.30317402],
	zoom: 11,
	//默认图层
	//layers: [Geoq],
	zoomControl: false
});
//天地图卫星影像
var imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
	maxZoom: 18,
	minZoom: 5
}).addTo(map);
//ndvi
var url1 = 'http://47.106.158.161:6060/geoserver/Lake_fth/wms'
const rs_fth_2016 = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:rs_fth_2016',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "2016年ndvi © 2018 Hubu Liguiye"
});
rs_fth_2016.addTo(map);
//卷帘
var left = rs_fth_2016;
var right = imgm;
L.control.sideBySide(left, right).addTo(map);
