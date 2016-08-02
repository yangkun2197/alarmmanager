(function(mui, doc, app) {
	mui.init();
	var txtbuilding = doc.getElementById('txtbuilding');
	//var txtbuilding = doc.getElementById('txtbuilding');
	var btnadd = doc.getElementById('btnadd');
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = currentView.opener();
		btnadd.addEventListener("tap", function(event) {
			mui.openWindow({
				url: '../message/chat.html',
				id: 'views_message_chat',
				show: {
					aniShow: 'slide-in-right' //页面显示动画，默认为”slide-in-right“；
				},
				waiting: {
					autoShow: false //自动显示等待框，默认为true
				},
				styles: {
					width: "100%",
					height: "100%",
					zindex: 1
				},
				extras: {
					'mtype':1
				}
			});
		}, false);
	}
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	// DOMContentloaded事件处理
	document.addEventListener("DOMContentLoaded", function() {
		window.plus && plusReady();
	}, false);
	//重置滑块
	window.addEventListener('views_main_floor_contrl:Reload', function(event) {
		//获得事件参数
		slider.noUiSlider.set(0);
		//console.log('reload-------------------')
	});
	$(function() {

		$("#txtbuilding").picker({
			toolbarTemplate: '<header class="bar bar-nav">\
							  <button class="button button-link pull-right close-picker">确定</button>\
							  <h1 class="title">请选择位置</h1>\
							  </header>',
			cols: [{
				textAlign: 'center',
				values: ['韬奋楼', '东风楼', '致远楼']
			}]
		});
		$("#txtfaultType").faultPicker({
			toolbarTemplate: '<header class="bar bar-nav">\
						    <button class="button button-link pull-right close-picker">确定</button>\
						    <h1 class="title">请选择故障</h1>\
						    </header>'
		});
		$.init();
	});
}(mui, document, window.app));