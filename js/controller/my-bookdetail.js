var myPhotoBrowserStandalone;  
(function(mui, doc, app) {
	mui.init();

	$(function() {
		/*=== 默认为 standalone ===*/
		myPhotoBrowserStandalone = $.photoBrowser({
			photos: [
				'../../images/file/tu1.jpg'
			]
		});
		
		//点击时打开图片浏览器
		$('.content-block').on('click', '.pb-standalone', function() {
			myPhotoBrowserStandalone.open();
		});
		
		$('#books').on('tap', function() {
            mui.openWindow({
                url: './books.html',
                id: 'views_my_books',
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
            currentView.hide('slide-out-left');
        });
		

		$.init();
	});
}(mui, document, window.app));