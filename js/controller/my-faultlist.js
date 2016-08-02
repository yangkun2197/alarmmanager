(function(mui, doc, app) {
	mui.init(); 
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = plus.webview.getWebviewById('views_main_index');
 

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
				url: '../my/fault.html',
				id: 'views_my_fault',
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

		$.init();
	});
}(mui, document, window.app));