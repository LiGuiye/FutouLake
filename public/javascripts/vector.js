var map = L.map('Mymap', {
	center: [29.98859882, 114.30317402],
	zoom: 12,
	//默认图层
	//layers: [Geoq],
	zoomControl: false
});
/////////////////////////保护线服务地址WMS////////////////////////////////////
var url1 = 'http://47.106.158.161:6060/geoserver/Lake_fth/wms'
const myLayer_protectionline = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:shp_protectionline_fth',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "保护线 © 2018 Hubu Liguiye"
});
const myLayer_controlline = L.tileLayer.wms(url1, {
	layers: 'Lake_fth:shp_controlline_fth',
	format: "image/png",
	//		crs: L.CRS.EPSG3857,
	opacity: 1,
	transparent: true,
	attribution: "控制线 © 2018 Hubu Liguiye"
});
//////////////////////////////////控制线WFS服务//////////////////////////////////
var shp_controlline_pilepoint_fth =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_controlline_pilepoint_fth&maxFeatures=500&outputFormat=application%2Fjson";
var shp_protectionline_pilepoint_fth =
	"http://47.106.158.161:6060/geoserver/Lake_fth/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Lake_fth%3Ashp_protectionline_pilepoint_fth&maxFeatures=500&outputFormat=application%2Fjson";
var myLayer_controlline_pilepoint = L.geoJSON(null, {});
var myLayer_protectionline_pilepoint = L.geoJSON(null, {
	onEachFeature: onEachFeature
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
	var erweima = "url(../images/" + code + ".png)";
	//新建弹出窗体并设置大小
	var content = '<div style="width: 100px; height: auto;" id="popupwindow"></div>' +
		"桩点序号：" + feature.properties.num + '<br/>' + "经度：" + feature.properties.longitude + '<br/>' + "纬度：" + feature.properties.latitude;
	//点击弹出窗口，并设置最大宽度，因为默认宽度为301，不一定够一个Echart的正常显示
	marker.bindPopup(content, {
		maxWidth: 120,
	});
///////////////////////////建议添加label显示序号
	//点击弹出信息窗口		
	marker.on('popupopen', function(e) {
////////////如果增加了二维码，记得改这里/////////////////////////////
		if(code>=42&&code<=62){
			document.getElementById("popupwindow").style.height = "100px";
		}
		document.getElementById("popupwindow").style.backgroundImage = erweima;
		document.getElementById("popupwindow").style.backgroundSize = "100px 100px";
	});


}

myLayer_protectionline.addTo(map);
myLayer_protectionline_pilepoint.addTo(map);

function ChangeColor(id) {
	
	$.ajax({
		url: '/protectionline_pilepoint',
		type: 'get',
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(result) {
			//第一个表
			if (result) {
				L.marker([result.data[id].latitude, result.data[id].longitude], {
					icon: redIcon
				}).addTo(map);
			}
		}
	});
}
////////////////////////////底图//////////////////////////////////////////////
var Geoq = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
		maxZoom: 18,
		minZoom: 5
	}),
	//谷歌卫星影像
	satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
		maxZoom: 18,
		minZoom: 5
	}),
	//天地图卫星影像
	imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
		maxZoom: 18,
		minZoom: 5
	}).addTo(map),
	//天地图路网
	imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
		maxZoom: 18,
		minZoom: 5
	});
///////////////////////////转移至数据库中的点///////////////////////////////////
var latitude = [],
	longitude = [];
$.ajax({
	url: '/protectionline_pilepoint',
	type: 'get',
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(result) {

		//测试是否返回数据
		console.log(result.data);
		//第一个表
		if (result) {
			for (var i = 0; i < result.data.length; i++) {
				latitude[i] = result.data[i].latitude;
				longitude[i] = result.data[i].longitude;
			}

			sss(latitude, longitude);
		}
	}
});

function sss(latitude, longitude) {

	// 	for (var i = 0; i < 288; i++) {
	// 		L.marker([latitude[i], longitude[i]], {icon: redIcon}).addTo(map);
	// 	}

}
////////////////更改颜色//////////////////////////////////////////
var yellowIcon = new L.Icon({
	iconUrl: '../MarkerImages/marker-icon-yellow.png',
	shadowUrl: '../MarkerImages/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
var greenIcon = new L.Icon({
	iconUrl: '../MarkerImages/marker-icon-green.png',
	shadowUrl: '../MarkerImages/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
var redIcon = new L.Icon({
	iconUrl: '../MarkerImages/marker-icon-red.png',
	shadowUrl: '../MarkerImages/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
////////////////////////////////////////////////////////////////////
//右侧的图层控件
var baseLayers = {
	"天地图卫星影像": imgm,
	"天地图路网": imga,
	"智图": Geoq,
	"谷歌卫星影像": satelliteMap,
};
var overlayLayers = {
	//"myGroup": myGroup,
	"斧头湖保护线": myLayer_protectionline,
	"斧头湖保护线桩点": myLayer_protectionline_pilepoint,
	"斧头湖控制线": myLayer_controlline,
	"斧头湖控制线桩点": myLayer_controlline_pilepoint,

};
//右边的图层控件
L.control.layers(baseLayers).addTo(map);
L.control.layers('', overlayLayers, {
	position: 'topleft',
	autoZIndex: true
}).addTo(map);


$('a.ajax').click(function() {
	$('#map').load(this.href);
	return false;
});
