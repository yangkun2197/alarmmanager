(function(mui, doc, app) {
    mui.init();

    $(function() { 

        $('.content').on('tap', '.item-content', function() {
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
