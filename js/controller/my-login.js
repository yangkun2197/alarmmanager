(function(mui, doc, app) {
	var mainView;
	mui.init({
		swipeBack: false/*,
		preloadPages: [{
			url: "../main/index.html",
			id: 'views_main_index'
		}]*/
	});
	$(function() {
		$('#login').on('tap', function() {
			/*if(mainView ==null){
				mainView = plus.webview.getWebviewById('views_main_index');
			}
			mainView.show('slide-in-right');
			return false;*/
			mainView = mui.openWindow({
				url: '../main/index.html',
				id: 'views_main_index',
				show: {
					aniShow: 'slide-in-right' //页面显示动画，默认为”slide-in-right“；
				},
				waiting: {
					autoShow: false //自动显示等待框，默认为true
				},
				styles: {
					width: "100%",
					height: "100%"
				}
			});
		});
		$('#service,#service2').on('tap', function() {
			mui.openWindow({
				url: '../my/service.html',
				id: 'views_my_service',
				show: {
					aniShow: 'slide-in-right' //页面显示动画，默认为”slide-in-right“；
				},
				waiting: {
					autoShow: false //自动显示等待框，默认为true
				},
				styles: {
					width: "100%",
					height: "100%"
				}
			});
		}); 
		$.init();
	});
}(mui, document, window.app));