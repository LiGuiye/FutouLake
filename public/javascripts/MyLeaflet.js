//将地图内容与容器绑定
var map = L.map('map', {
	center: [30.58141017095, 114.329577684],
	zoom: 1,
	//默认图层
	//layers: [Geoq],
	zoomControl: false
});
//==========================定义地图和地图标注========================================================
//智图
var Geoq = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
		maxZoom: 18,
		minZoom: 5
	}).addTo(map),
	//谷歌卫星影像
	satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
		maxZoom: 18,
		minZoom: 5
	}).addTo(map),
	//天地图卫星影像
	imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
		maxZoom: 18,
		minZoom: 5
	}),
	//天地图路网
	imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
		maxZoom: 18,
		minZoom: 5
	});
	///////////////////////////////////////////////////////////
// 	http://localhost:6060/geoserver/Lake_fth/wms?service=WMS&version=1.1.0&request=GetMap&layers=Lake_fth%3Ars_fth_2016&bbox=166021.4430960765%2C0.0%2C833978.556903922%2C9329005.182450451&width=330&height=768&srs=EPSG%3A32649&format=image%2Fpng
// 	http://localhost:6060/geoserver/Lake_fth/wms?service=WMS&version=1.1.0&request=GetMap&layers=Lake_fth%3Ars_fth_1998&bbox=166021.4430960765%2C0.0%2C833978.556903922%2C9329005.182450451&width=330&height=768&srs=EPSG%3A32649&format=image%2Fpng
//地图服务地址WMS
var url1 = 'http://47.106.158.161:6060/geoserver/Lake_fth/wms'
//构建地图服务连接串
const bounderLayer1 = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:rs_fth_2016',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "2016年ndvi © 2018 Hubu Liguiye"
});
///////////////////////////////////////////////////////////
//构建地图服务连接串
const bounderLayer2 = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:rs_fth_1998',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "1998年ndvi © 2018 Hubu Liguiye"
});

//////////////////////////////////WFS服务//////////////////////////////////
//WFS服务的完整路径
var url =
	"http://localhost:8080/geoserver/liguiye/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=liguiye%3Apoempoint&maxFeatures=250&outputFormat=application%2Fjson"
//创建一个空的GeoJSON图层并将其分配给变量，以便以后可以添加更多功能
var myLayer = L.geoJSON(null, {

	onEachFeature: function(feature, marker) {
		marker.bindPopup(
			feature.properties.poemname
		);
		shiming = feature.properties.poemname;

	}
});
//ajax调用
$.ajax({
	url: url, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer.addData(data);
	},
});
///////////////////////////////////////////////////////////////////////////////////////////////


//右侧的图层控件
var baseLayers = {
	"智图": Geoq,
	"谷歌卫星影像": satelliteMap,
	"天地图卫星影像": imgm,
	"天地图路网": imga,
};
var overlayLayers = {
	"1998年ndvi": bounderLayer2,
	"2016年ndvi": bounderLayer1,
};

// //右边的图层控件
L.control.layers(baseLayers, overlayLayers).addTo(map);
// L.control.sideBySide()
// 	.setLeftLayers(Geoq)
// 	.setRightLayers(satelliteMap)
// 	.addTo(map);
console.log(overlayLayers);
console.log(overlayLayers._leaflet_id);
//更改变量来实现
var left = Geoq;
var right = bounderLayer1;
right = bounderLayer2;

L.control.sideBySide(left,right).addTo(map);



//地图监听
map.on('click', function() {
	console.log('--->click 点击事件')
});
map.on('mousedown', function() {
	console.log('--->mousedown 按下不抬起')
});
map.on('mouseup', function() {
	console.log('--->mouseup 按下抬起');
});
map.on('dblclick', function() {
	console.log('--->dblclick 双击触发');
});



$('a.ajax').click(function() {
	$('#map').load(this.href);
	return false;
});
