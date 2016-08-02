(function(mui, doc, app) {
    mui.init();
    var currentView;
// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview(); 
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
        $('.my-menu').on('tap', '.item-link', function() {
            var $self = $(this);
            var id = '';
            var url = '';

            switch ($self.attr('id')) {
                case 'addresslist':
                    url = './addresslist.html';
                    id = 'views_my_addresslist';
                    break;
                case 'books':
                    url = './books.html';
                    id = 'views_my_books';
                    break;
                case 'faultlist':
                    url = './faultlist.html';
                    id = 'views_my_faultlist';
                    break;
                case 'collect':
                    url = './collect.html';
                    id = 'views_my_collect';
                    break;
                case 'logout':
                    url = './login.html';
                    id = 'views_my_login';
                    break;
                default:
                   	url = './addresslist.html';
                    id = 'views_my_addresslist';
                    break;
            }

            mui.openWindow({
                url: url,
                id: id,
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
