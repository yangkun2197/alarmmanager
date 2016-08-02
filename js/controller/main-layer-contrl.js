(function(mui, doc, app) {
	mui.init();

//	var ctrl_locate = doc.getElementById('locate');
//	var ctrl_list = doc.getElementById('list');
//	var ctrl_type = doc.getElementById('type');
//	var ctrl_add = doc.getElementById('add');
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = currentView.opener();

//		ctrl_locate.addEventListener("tap", function(event) {
//			mui.fire(parent, 'views_main_index:UserLocation');
//		}, false);
		
		
		
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