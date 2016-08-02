(function(mui, doc, app) {
    mui.init();

    $(function() {
		
		$('#bookdetail').on('click', function() {
            mui.openWindow({
                url: '../my/bookdetail.html',
                id: 'views_my_bookdetail',
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
                default:
                    case 'aircon':
                    url = './remote-aircon.html';
                id = 'views_building_remote_aircon';
                break;
                case 'monitor':
                        url = './remote-monitor.html';
                    id = 'views_building_remote_monitor';
                    break;
                case 'device':
                        url = './device.html';
                    id = 'views_building_device';
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
