(function(mui, doc, app) {
	mui.init();
	var ctrl_add = doc.getElementById('ctrl_add');
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = plus.webview.getWebviewById('views_main_index');

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
		$('.infinite-scroll-preloader').hide(); 
		$('.media-list').on('click', '.swipe-remove', function() {
			var rParent = $(this).parents('.item-content').first();
			var messageId = rParent.attr('data-MessageId');

			rParent.remove();
		});
		$('.media-list').on('click', '.item-content', function() {

			mui.openWindow({
				url: './detail.html',
				id: 'views_fault_detail',
				show: {
					aniShow: 'slide-in-right' //页面显示动画，默认为”slide-in-right“；
				},
				waiting: {
					autoShow: false //自动显示等待框，默认为true
				},
				styles: {
					width: "100%",
					height: "100%",
					zindex:1,
                softinputMode:'adjustPan', 
						scrollIndicator: 'none'
				}
			});
		});
		$('.open-panel-search').on('click', function() {
 			$.openPanel("#panel-search");
		});
		$.init();
	});
}(mui, document, window.app));