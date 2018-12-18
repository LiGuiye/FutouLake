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
//地图服务地址WMS
var url1 = 'http://47.106.158.161:6060/geoserver/Lake_fth/wms'
//构建地图服务连接串
const rs_fth_2016 = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:rs_fth_2016',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "2016年ndvi © 2018 Hubu Liguiye"
});
const rs_fth_1998 = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:rs_fth_1998',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "1998年ndvi © 2018 Hubu Liguiye"
});
const CHIRP19980102 = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:CHIRP19980102',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "1998年ndvi © 2018 Hubu Liguiye"
});
const rs_dem = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:rs_dem',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "dem © 2018 Hubu Liguiye"
});


//////////////////////////////////等高线WFS服务//////////////////////////////////
//完整路径
var url_21m =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_contourline_xn21&maxFeatures=50&outputFormat=application%2Fjson";
var url_22m =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_contourline_xn22&maxFeatures=50&outputFormat=application%2Fjson";
var url_23m =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_contourline_xn23&maxFeatures=50&outputFormat=application%2Fjson";
var url_24m =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_contourline_xn24&maxFeatures=50&outputFormat=application%2Fjson";
//GeoJSON图层
var myLayer_21m = L.geoJSON(null, {});
var myLayer_22m = L.geoJSON(null, {});
var myLayer_23m = L.geoJSON(null, {});
var myLayer_24m = L.geoJSON(null, {});
//ajax调用
$.ajax({
	url: url_21m, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_21m.addData(data);
	},
});
$.ajax({
	url: url_22m, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_22m.addData(data);
	},
});
$.ajax({
	url: url_23m, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_23m.addData(data);
	},
});
$.ajax({
	url: url_24m, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_24m.addData(data);
	},
});
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////控制线WFS服务//////////////////////////////////
var shp_controlline_fth =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_controlline_fth&maxFeatures=500&outputFormat=application%2Fjson";
var shp_controlline_pilepoint_fth =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_controlline_pilepoint_fth&maxFeatures=500&outputFormat=application%2Fjson";
var shp_protectionline_fth =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_protectionline_fth&maxFeatures=500&outputFormat=application%2Fjson";
var shp_protectionline_pilepoint_fth =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_protectionline_pilepoint_fth&maxFeatures=500&outputFormat=application%2Fjson";
var myLayer_controlline = L.geoJSON(null, {});
var myLayer_controlline_pilepoint = L.geoJSON(null, {});
var myLayer_protectionline = L.geoJSON(null, {});
var myLayer_protectionline_pilepoint = L.geoJSON(null, {

	onEachFeature: onEachFeature
// 	function(feature, marker) {
// 		marker.bindPopup(
// 			"桩点序号"+feature.properties.num
// 		);
// // 		console.log("feature.properties:::::"+feature.properties.num);
// // 		shiming = feature.properties.poemname;
// 
// 	}
});
$.ajax({
	url: shp_controlline_fth, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_controlline.addData(data);
	},
});
$.ajax({
	url: shp_controlline_pilepoint_fth, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_controlline_pilepoint.addData(data);
	},
});
$.ajax({
	url: shp_protectionline_fth, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_protectionline.addData(data);
	},
});
$.ajax({
	url: shp_protectionline_pilepoint_fth, //WFS服务的完整路径
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(data) {
		myLayer_protectionline_pilepoint.addData(data);
	},
});

//点击地图要素事件回调函数
	function onEachFeature(feature, marker) {
		//获取选中要素的行政区编码
		var code = feature.properties.num;
		var ss2 = "url(../images/" + code + ".png)";
		//新建弹出窗体并设置大小
		var content = '<div style="width: 100px; height: 100px;" id="popupwindow"></div>'+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+"桩点序号:"+feature.properties.num;
		//点击弹出窗口，并设置最大宽度，因为默认宽度为301，不一定够一个Echart的正常显示
		marker.bindPopup(content, {maxWidth : 100});
		//点击弹出信息窗口		
		marker.on('popupopen',function(e){
			
			document.getElementById("popupwindow").style.backgroundImage = ss2;
			document.getElementById("popupwindow").style.backgroundSize = "100px 100px";


		});

	}

////////////////////////////////////////////////////////////////////
//右侧的图层控件
var baseLayers = {
	"智图": Geoq,
	"谷歌卫星影像": satelliteMap,
	"天地图卫星影像": imgm,
	"天地图路网": imga,

};
var overlayLayers = {
	"1998年ndvi": rs_fth_1998,
	"2016年ndvi": rs_fth_2016,
	"21米等高线": myLayer_21m,
	"22米等高线": myLayer_22m,
	"23米等高线": myLayer_23m,
	"24米等高线": myLayer_24m,
// 	"斧头湖控制线": myLayer_controlline,
// 	"斧头湖控制线桩点": myLayer_controlline_pilepoint,
// 	"斧头湖保护线": myLayer_protectionline,
// 	"斧头湖保护线桩点": myLayer_protectionline_pilepoint,
	// "CHIRP19980102":CHIRP19980102,
	"DEM":rs_dem
	
};

// //右边的图层控件
L.control.layers(baseLayers,overlayLayers).addTo(map);
// L.control.layers('', overlayLayers, {
// 	position: 'topleft',
// 	autoZIndex: true
// }).addTo(map);


// //更改变量来实现
// var left = Geoq;
// var right = rs_fth_1998;
// // right = rs_fth_2016;
// 
// L.control.sideBySide(left, right).addTo(map);


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
