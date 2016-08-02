(function(mui, doc, app) {
    mui.init();

    $(function() {


        $('.tabs').on('click', '.item-content', function() {
            mui.openWindow({
                url: './room.html',
                id: 'views_building_room',
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

 


        $.init();
    });
}(mui, document, window.app));
