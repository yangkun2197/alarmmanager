(function(mui, doc, app) {
	mui.init();

	var ctrl_locate = doc.getElementById('locate');
	var ctrl_list = doc.getElementById('list');
	var ctrl_type = doc.getElementById('type');
	var ctrl_add = doc.getElementById('add');
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = currentView.opener();

		ctrl_locate.addEventListener("tap", function(event) {
			mui.fire(parent, 'views_main_index:UserLocation');
		}, false);


		ctrl_type.addEventListener("tap", function(event) {
			mui.fire(parent, 'views_main_index:ShowWebView', {
				'displayType': 1,
				'viewId': 'views_main_layer_contrl'
			});
		}, false);
		
		
		ctrl_list.addEventListener("tap", function(event) {
			mui.fire(parent, 'views_main_index:ShowWebView', {
				'displayType': 1,
				'viewId': 'views_fault_index'
			});
		}, false);
		
		ctrl_add.addEventListener("tap", function(event) {
			mui.fire(parent, 'views_main_index:ShowWebView', {
				'displayType': 1,
				'viewId': 'views_fault_add'
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

	$(function() {
		$.init();
	});
}(mui, document, window.app));