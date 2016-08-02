(function(mui, doc, app) {
    mui.init();
    $(function() {
        $('#tab1').on('click', '.item-content', function() {

            mui.openWindow({
                url: '../fault/detail.html',
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
                    zindex: 1,
                    softinputMode: 'adjustPan',
                    scrollIndicator: 'none'
                }
            });
        });
        $('#tab3').on('tap', '.item-content', function() {
            var $self = $(this);
            var selId = $self.attr('id');

            var id = '';
            var url = '';
            switch (selId) {
                case 'floor':
                    url = './floor.html';
                    id = 'views_building_floor';
                    break;
                case 'devicelist':
                    url = './devicelist.html';
                    id = 'views_building_devicelist';
                    break;
                case 'remote':
                    url = './remote.html';
                    id = 'views_building_remote';
                    break;
                case 'books':
                    url = '../my/books.html';
                    id = 'views_my_books';
                    break;
                case 'monitor':
                    url = './monitor.html';
                    id = 'views_building_monitor';
                    break;
                default:
                     url = './devicelist.html';
                    id = 'views_building_devicelist';
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
        });
        $.init();
    });
}(mui, document, window.app));
