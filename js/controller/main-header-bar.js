(function(mui, doc, app) {
	mui.init();

	var ctrl_myindex = doc.getElementById('myindex');
	var ctrl_message = doc.getElementById('message');
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = currentView.opener();


		ctrl_myindex.addEventListener("tap", function(event) {
			mui.fire(parent, 'views_main_index:ShowWebView', {
				'displayType': 1,
				'viewId': 'views_my_index'
			});
		}, false);
		ctrl_message.addEventListener("tap", function(event) {
			mui.fire(parent, 'views_main_index:ShowWebView', {
				'displayType': 1,
				'viewId': 'views_message_index'
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
		
		
		$('#searchKey').on('tap', function(e) {
			e.preventDefault();
			mui.fire(parent, 'views_main_index:ShowWebView', {
				'displayType': 1,
				'viewId': 'views_main_search'
			});
			return false;
		});
		
		
//		$('#searchKey').bind('input propertychange', function() {
//			var $this = $(this);
//			setTimeout(function() {
//				var key = $this.val();
//				if (key == '1') {
//					mui.fire(parent, 'views_main_index:SetLocation', {
//						'lng': 121.961567,
//						'lat': 30.933956
//					});
//				}
//			}, 1000);
//		});


		$.init();
	});
}(mui, document, window.app));