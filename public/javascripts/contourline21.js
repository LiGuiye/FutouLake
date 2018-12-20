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
//完整路径
var url_21m =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_contourline_xn21&maxFeatures=50&outputFormat=application%2Fjson";
//GeoJSON图层
var myLayer_21m = L.geoJSON(null, {});
//ajax调用
$.ajax({
	url: url_21m, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_21m.addData(data);
	},
});
myLayer_21m.addTo(map);

