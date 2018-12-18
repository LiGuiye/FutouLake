//将地图内容与容器绑定
var map = L.map('Mymap', {
	center: [29.98859882, 114.30317402],
	zoom: 11,
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

	"斧头湖控制线": myLayer_controlline,
	"斧头湖控制线桩点": myLayer_controlline_pilepoint,
	"斧头湖保护线": myLayer_protectionline,
	"斧头湖保护线桩点": myLayer_protectionline_pilepoint,

	
};

// //右边的图层控件
L.control.layers(baseLayers).addTo(map);
L.control.layers('', overlayLayers, {
	position: 'topleft',
	autoZIndex: true
}).addTo(map);


$('a.ajax').click(function() {
	$('#map').load(this.href);
	return false;
});
