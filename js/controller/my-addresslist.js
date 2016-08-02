(function(mui, doc, app) {
	mui.init();

	$(function() {
		$('.contacts-block').on('tap', '.item-content', function() {
			mui.openWindow({
				url: './address.html',
				id: 'views_my_address',
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
				}
			});
		});

		$.init();
	});
}(mui, document, window.app));