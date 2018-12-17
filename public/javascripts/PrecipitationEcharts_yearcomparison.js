var myChart1 = echarts.init(document.getElementById('echarts1'));
var myChart2 = echarts.init(document.getElementById('echarts2'));
var year = 1998;
var month = 1;

$(function() {
	$('#select_year').on('change', function() {
		var val = $(this).val();
		year = val;
		// alert(year);
		// PrecipitationCharts(year);
	});
	$('#select_month').on('change', function() {
		var value = $(this).val();
		month = value;

		PrecipitationCharts(year, month);
	});

});

function PrecipitationCharts(year, month) {

	$.ajax({
		url: '/PrecipitationYear?year=' + year,
		type: 'get',
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(result) {
			//测试是否返回数据
			console.log(result);
			//第一个表
			if (result) {
				var xValue = [],
					yValue1 = [],
					yValue2 = [],
					yValue3 = [],
					yValue4 = [],
					yValue5 = [],
					yValue6 = [],
					yValue7 = [];
				for (var i = 0; i < result.data.length; i++) {
					//取出x轴--月份     
					xValue.push(result.data[i].month);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出x轴--年份     
					yValue1.push(result.data[i].year);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴2--max数据
					yValue2.push(result.data[i].max);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴3--min数据
					yValue3.push(result.data[i].min);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴4--mean数据
					yValue4.push(result.data[i].mean);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴5--range数据
					yValue5.push(result.data[i].range);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴6--std数据
					yValue6.push(result.data[i].std);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴7--sum数据，但表格里没用，因为效果不好
					yValue7.push(result.data[i].sum);
				}

				//指定图表的配置项和数据
				var option1 = {
					title: {
						text: year + '年数据波动情况'
					},
					tooltip: {
						trigger: 'axis'
					},
					// 						legend: {
					// 							data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					// 						},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: xValue
					},
					yAxis: {
						type: 'value'
					},
					series: [
						// 						{
						// 							name: 'area',
						// 							type: 'line',
						// 							stack: '总量',
						// 							data: yValue1
						// 						},
						{
							name: 'max',
							type: 'line',
							stack: '总量',
							data: yValue2
						},
						{
							name: 'min',
							type: 'line',
							stack: '总量',
							data: yValue3
						},
						{
							name: 'mean',
							type: 'line',
							stack: '总量',
							data: yValue4
						},
						{
							name: 'range',
							type: 'line',
							stack: '总量',
							data: yValue5
						},
						{
							name: 'std',
							type: 'line',
							stack: '总量',
							data: yValue6
						}
					]
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart1.setOption(option1);

				//清除上一次数据缓存
				myChart1.clear();
				//开始制图
				myChart1.setOption(option1);
			}
		},
		error: function(data) {
			alert('error::' + data[0] + '---图表请求数据失败');
		}
	});

	$.ajax({
		url: '/PrecipitationMonth?month=' + month,
		type: 'get',
		dataType: 'json',
		outputFormat: 'text/javascript',
		success: function(result) {
			//测试是否返回数据
			console.log(result);
			//第一个表
			if (result) {
				var xValue = [],
					yValue1 = [],
					yValue2 = [],
					yValue3 = [],
					yValue4 = [],
					yValue5 = [],
					yValue6 = [],
					yValue7 = [];
				for (var i = 0; i < result.data.length; i++) {
					//取出x轴--月份     
					xValue[i] = result.data[i].month;
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴1--年份     
					yValue1[i] = result.data[i].year;
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴2--max数据
					yValue2.push(result.data[i].max);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴3--min数据
					yValue3.push(result.data[i].min);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴4--mean数据
					yValue4.push(result.data[i].mean);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴5--range数据
					yValue5.push(result.data[i].range);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴6--std数据
					yValue6.push(result.data[i].std);
				}
				for (var i = 0; i < result.data.length; i++) {
					//取出y轴7--sum数据，但表格里没用，因为效果不好
					yValue7.push(result.data[i].sum);
				}

				//指定图表的配置项和数据
				var option2 = {
					title: {
						text: month + '历年同期数据对比'
					},
					tooltip: {
						trigger: 'axis'
					},
					// 						legend: {
					// 							data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					// 						},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: yValue1
					},
					yAxis: {
						type: 'value'
					},
					series: [
						// 						{
						// 							name: 'area',
						// 							type: 'line',
						// 							stack: '总量',
						// 							data: yValue1
						// 						},
						{
							name: 'max',
							type: 'line',
							stack: '总量',
							data: yValue2
						},
						{
							name: 'min',
							type: 'line',
							stack: '总量',
							data: yValue3
						},
						{
							name: 'mean',
							type: 'line',
							stack: '总量',
							data: yValue4
						},
						{
							name: 'range',
							type: 'line',
							stack: '总量',
							data: yValue5
						},
						{
							name: 'std',
							type: 'line',
							stack: '总量',
							data: yValue6
						}
					]
				};
				myChart2.setOption(option2);

				//清除上一次数据缓存
				myChart2.clear();
				//开始制图
				myChart2.setOption(option2);
			}
		},
		error: function(data) {
			alert('error::' + data[0] + '---图表请求数据失败');
		}
	});
}


///////////////////////////////////////////////////////////////////
//将地图内容与容器绑定
var map = L.map('Mymap', {
	center: [30.58141017095, 114.329577684],
	zoom: 1,
	//默认图层
	//layers: [Geoq],
	zoomControl: false
});
var Geoq = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
	maxZoom: 18,
	minZoom: 5
}).addTo(map);





///////////////////////////////////////////////////////////////

//打开时的默认页面,很蠢的写法，千万不要学
$.ajax({
	url: '/PrecipitationYear?year=' + 1998,
	type: 'get',
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(result) {
		//测试是否返回数据
		console.log(result);
		//第一个表
		if (result) {
			var xValue = [],
				yValue1 = [],
				yValue2 = [],
				yValue3 = [],
				yValue4 = [],
				yValue5 = [],
				yValue6 = [],
				yValue7 = [];
			for (var i = 0; i < result.data.length; i++) {
				//取出x轴--月份     
				xValue.push(result.data[i].month);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出x轴--年份     
				yValue1.push(result.data[i].year);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴2--max数据
				yValue2.push(result.data[i].max);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴3--min数据
				yValue3.push(result.data[i].min);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴4--mean数据
				yValue4.push(result.data[i].mean);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴5--range数据
				yValue5.push(result.data[i].range);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴6--std数据
				yValue6.push(result.data[i].std);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴7--sum数据，但表格里没用，因为效果不好
				yValue7.push(result.data[i].sum);
			}

			//指定图表的配置项和数据
			var option1 = {
				title: {
					text: 1998 + '年数据波动情况'
				},
				tooltip: {
					trigger: 'axis'
				},
				// 						legend: {
				// 							data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				// 						},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xValue
				},
				yAxis: {
					type: 'value'
				},
				series: [
					// 						{
					// 							name: 'area',
					// 							type: 'line',
					// 							stack: '总量',
					// 							data: yValue1
					// 						},
					{
						name: 'max',
						type: 'line',
						stack: '总量',
						data: yValue2
					},
					{
						name: 'min',
						type: 'line',
						stack: '总量',
						data: yValue3
					},
					{
						name: 'mean',
						type: 'line',
						stack: '总量',
						data: yValue4
					},
					{
						name: 'range',
						type: 'line',
						stack: '总量',
						data: yValue5
					},
					{
						name: 'std',
						type: 'line',
						stack: '总量',
						data: yValue6
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart1.setOption(option1);

			//清除上一次数据缓存
			myChart1.clear();
			//开始制图
			myChart1.setOption(option1);
		}
	},
	error: function(data) {
		alert('error::' + data[0] + '---图表请求数据失败');
	}
});

$.ajax({
	url: '/PrecipitationMonth?month=' + 'jan',
	type: 'get',
	dataType: 'json',
	outputFormat: 'text/javascript',
	success: function(result) {
		//测试是否返回数据
		console.log(result);
		//第一个表
		if (result) {
			var xValue = [],
				yValue1 = [],
				yValue2 = [],
				yValue3 = [],
				yValue4 = [],
				yValue5 = [],
				yValue6 = [],
				yValue7 = [];
			for (var i = 0; i < result.data.length; i++) {
				//取出x轴--月份     
				xValue[i] = result.data[i].month;
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴1--年份     
				yValue1[i] = result.data[i].year;
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴2--max数据
				yValue2.push(result.data[i].max);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴3--min数据
				yValue3.push(result.data[i].min);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴4--mean数据
				yValue4.push(result.data[i].mean);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴5--range数据
				yValue5.push(result.data[i].range);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴6--std数据
				yValue6.push(result.data[i].std);
			}
			for (var i = 0; i < result.data.length; i++) {
				//取出y轴7--sum数据，但表格里没用，因为效果不好
				yValue7.push(result.data[i].sum);
			}

			//指定图表的配置项和数据
			var option2 = {
				title: {
					text: 'jan' + '历年同期数据对比'
				},
				tooltip: {
					trigger: 'axis'
				},
				// 						legend: {
				// 							data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
				// 						},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: yValue1
				},
				yAxis: {
					type: 'value'
				},
				series: [
					// 						{
					// 							name: 'area',
					// 							type: 'line',
					// 							stack: '总量',
					// 							data: yValue1
					// 						},
					{
						name: 'max',
						type: 'line',
						stack: '总量',
						data: yValue2
					},
					{
						name: 'min',
						type: 'line',
						stack: '总量',
						data: yValue3
					},
					{
						name: 'mean',
						type: 'line',
						stack: '总量',
						data: yValue4
					},
					{
						name: 'range',
						type: 'line',
						stack: '总量',
						data: yValue5
					},
					{
						name: 'std',
						type: 'line',
						stack: '总量',
						data: yValue6
					}
				]
			};
			myChart2.setOption(option2);

			//清除上一次数据缓存
			myChart2.clear();
			//开始制图
			myChart2.setOption(option2);
		}
	},
	error: function(data) {
		alert('error::' + data[0] + '---图表请求数据失败');
	}
});
