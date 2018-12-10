var map;

function init() {

	// openstreetmap底图
	var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
		foo: 'bar'
	});
	// mapbox-street底图
	var mapboxstreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiamVuZXkxNTkiLCJhIjoiY2oxbGk1cm9mMDAyNzMybGIzZTd1Y2l4YSJ9.bEJ00z8iymugaS-k5qSCEQ'
	})
	//天地图
	var TDnormalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', { //天地图常规地图
			maxZoom: 18,
			minZoom: 4
		}),
		TDnormala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', { //天地图常规地图标注
			maxZoom: 18,
			minZoom: 4
		}),
		TDimgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', { //天地图卫星影像
			maxZoom: 18,
			minZoom: 4
		}),
		TDimga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', { //天地图卫星影像标注
			maxZoom: 18,
			minZoom: 4
		});
	//天地图、影像与标注图层组合
	var TDnormal = L.layerGroup([TDnormalm, TDnormala]), //地图与标注组合
		TDimage = L.layerGroup([TDimgm, TDimga]); //影像与标注组合
	//谷歌
	var GoogleMap = L.tileLayer.chinaProvider('Google.Normal.Map', { //谷歌地图
			maxZoom: 18,
			minZoom: 4
		}),
		Googlesatellite = L.tileLayer.chinaProvider('Google.Satellite.Map', { //谷歌影像
			maxZoom: 18,
			minZoom: 4
		});
	//高德地图
	var Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', { //高德地图
		maxZoom: 18,
		minZoom: 4
	});
	//高德影像
	var Gaodeimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', { //高德影像
		maxZoom: 18,
		minZoom: 4
	});
	var Gaodeimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', { //高德影像标注
		maxZoom: 18,
		minZoom: 4
	});
	var Gaodeimage = L.layerGroup([Gaodeimgem, Gaodeimga]);

	map = L.map('map').setView([40, 112], 5); //地图中心及缩放级别

	//**************中国行政区**************************************************************************************************************

	//	var url = "http://localhost:8080/geoserver/JeneyMapData/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JeneyMapData%3AChinaProvince&maxFeatures=50&outputFormat=application%2Fjson"
	//
	//	var LoadChinaGeoJSON = L.geoJson(null, {
	//		onEachFeature: function(feature, marker) {
	//			marker.bindPopup('行政区名称：' + feature.properties.NAME_0);
	//		}
	//	}).addTo(map);
	//	//ajax调用
	//	$.ajax({
	//		url: url, //WFS服务的完整路径
	//		dataType: 'json',
	//		outputFormat: 'text/javascript',
	//		success: function(data) {
	//			//将调用出来的结果添加至之前已经新建的空geojson图层中
	//			LoadChinaGeoJSON.addData(data);
	//		},
	//	});

	//**************荆州行政区***************************************************************************************************

	var url =
		"http://localhost:8080/geoserver/JeneyMapData/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JeneyMapData%3AJingzhouCountyBoundary&maxFeatures=50&outputFormat=application%2Fjson"

	var LoadJingzhouGeoJSON = L.geoJson(null, {
		onEachFeature: function(feature, marker) {
			marker.bindPopup('行政区名称：' + feature.properties.NAME);
		}
	}).addTo(map);
	//ajax调用
	$.ajax({
		url: url, //WFS服务的完整路径
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(data) {
			//将调用出来的结果添加至之前已经新建的空geojson图层中
			LoadJingzhouGeoJSON.addData(data);
		},
	});

	//****************点击响应与回调函数部分（点击多边形弹出窗口并显示Echart图表）*****************************************************************************************************
	//点击地图要素事件回调函数
	function onEachFeature(feature, marker) {
		//获取选中要素的行政区编码
		var code = feature.properties.CODE;
		//console.log(feature);
		//新建弹出窗口并设置大小
		var content = '<div style="width:520px;height:320px;"id="popupwindow"></div>';
		//点击弹出窗口，并设置最大宽度
		marker.bindPopup(content, {
			maxWidth: 560
		});
		//点击弹出信息窗口
		marker.on('popupopen', function(e) {
			//定义chart图表显示容器
			var myChart = echarts.init(document.getElementById('popupwindow'));

			//*********************根据行政区编码查询数据，加对应的数据并传给myChart加载柱状图********************
			getDatabyCode(code, myChart);

		});

	}

	/*
	 * 用ajax将选中省份的code传给路由，并从数据库中读取相关数据返回
	 * code：行政区代码，用于地图要素和属性数据库的关联字段
	 * myChart：chart图表对象
	 */
	function getDatabyCode(code, myChart) {
		var xValue = [];
		var yValue = [];
		$.ajax({
			url: '/GDPQuery?code=' + code,
			type: 'get',
			dataType: 'json',
			outputFormat: 'text/javascript',
			success: function(result) {
				//测试是否返回数据
				//			console.log(result[0].GDP);
				//请求成功时执行该函数内容，result即为服务器返回的json对象
				if (result) {
					for (var i = 0; i < result.length; i++) {
						//取出x轴--年份
						xValue.push(result[i].datayear);
					}
					for (var i = 0; i < result.length; i++) {
						//取出y轴--GDP数据
						yValue.push(result[i].GDP);
					}
					//获取省行政区名称
					var pro_name = result[0].pro_name
					//******调用Echarts函数生成Echarts图表**********************
					getChart(xValue, yValue, myChart, pro_name);
				}
			},
			error: function(data) {
				alert('error::' + data[0] + '---图表请求数据失败');
			}
		});
	}

	/*
	 * Echarts构建函数
	 * xValue:横坐标参数
	 * yValue:纵坐标参数
	 * myChart：echart对象
	 * pro_name省行政区名称
	 */
	function getChart(xValue, yValue, myChart, pro_name) {
		//测试值是否正常传递进来
		console.log("xValue:" + xValue);
		console.log("yValue:" + yValue);
		var option = {
			title: {
				//显示到弹出窗口的标题栏
				text: pro_name + '历年GDP柱状图'
			},
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			//x横轴
			xAxis: [{
				type: 'category',
				//data值为ajax传递过来的值
				data: xValue,
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: {},
			series: [{
				name: 'GDP(万元)',
				type: 'bar',
				barWidth: '40%',
				data: yValue,
				//鼠标放在柱状图上面时，显示数值
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'top'
						}
					}
				}
			}]
		};
		//清除上一次数据缓存
		myChart.clear();
		//开始制图
		myChart.setOption(option);
	}


	//**************四大省行政区**************************************************************************************************************

	var url =
		"http://localhost:8080/geoserver/JeneyMapData/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JeneyMapData%3AYangziRiver_Middle&maxFeatures=50&outputFormat=application%2Fjson"

	var LoadYangziRiver_MiddleGeoJSON = L.geoJson(null, {
		onEachFeature: onEachFeature,
		//		onEachFeature: function(feature, marker) {
		//			marker.bindPopup('行政区名称：' + feature.properties.NAME);
		//		}
	}).addTo(map);
	//ajax调用
	$.ajax({
		url: url, //WFS服务的完整路径
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(data) {
			//将调用出来的结果添加至之前已经新建的空geojson图层中
			LoadYangziRiver_MiddleGeoJSON.addData(data);
		},
	});

	//定义底图
	var baseMaps = {
		"OpenstreetMap": openstreetmap,
		"MapboxStreets": mapboxstreet,
		"天地图": TDnormal,
		"天地图影像": TDimage,
		"谷歌地图": GoogleMap,
		"谷歌影像": Googlesatellite,
		"高德地图": Gaode,
		"高德影像": Gaodeimage
	};
	//定义专题图层
	var overlayMaps = {
		//"荆州行政边界":LoadJingzhouGeoJSON,
		//"中国行政边界":LoadChinaGeoJSON
		//		"荆州行政边界": bounderLayer
	};
	//加载底图与专题图层
	L.control.layers(baseMaps, overlayMaps).addTo(map);

	//*************************************************位置检索*********************************************************
	map.addControl(new L.Control.Search({
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		textPlaceholder: 'Search',
		propertyLoc: ['lat', 'lon'],
		marker: L.circleMarker([0, 0], {
			radius: 30
		}),
		autoCollapse: true,
		autoType: false,
		minLength: 2
	}));

	//************************************************属性检索与高亮显示***********************************************************
	var searchControl = new L.Control.Search({
		layer: LoadJingzhouGeoJSON,
		propertyName: 'NAME',
		marker: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
			map.setView(latlng, zoom); // access the zoom
		}
	});

	searchControl.on('search:locationfound', function(e) {

		e.layer.setStyle({
			fillColor: '#3f0',
			color: '#0f0'
		});
		if (e.layer._popup)
			e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		featuresLayer.eachLayer(function(layer) { //restore feature color
			featuresLayer.resetStyle(layer);
		});
	});

	map.addControl(searchControl); //inizialize search control

}

$('a.ajax').click(function() {
	$('#map').load(this.href);
	return false;
});
