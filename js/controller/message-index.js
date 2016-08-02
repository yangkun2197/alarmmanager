(function(mui, doc, app) {
    mui.init(); 
    $(function() {
        $('.infinite-scroll-preloader').hide();

        $('#list-messages').on('click', '.swipe-remove', function() {
            var rParent = $(this).parents('.item-content').first(); 

            rParent.remove();
        }); 
        $('#addresslist').on('tap', function() {
            mui.openWindow({
                url: '../my/addresslist.html',
                id: 'views_my_addresslist',
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
        $('#list-messages').on('click', '.item-content', function() {
            //console.log('1111')
            mui.openWindow({
                url: './chat.html',
                id: 'views_message_chat',
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
                	softinputMode:'adjustPan', 
						scrollIndicator: 'none' 
                }
            });
        }); 
        function suiListSwipe() {
            var right = 80;
            $(window).on('swipeLeft', '.sui-swipe-li', function(event) {
                console.log('左划');
                event.preventDefault();
                event.stopPropagation();
                var obj = $(this);
                obj.animate({
                    '-webkit-transform': "translateX(" + -right + "px)",
                    'transform': "translateX(" + -right + "px)"
                }, 100)
            });
            $(window).on('swipeRight', '.sui-swipe-li', function(event) {
                console.log('右划');
                event.preventDefault();
                event.stopPropagation();
                var obj = $(this);
                obj.animate({
                    '-webkit-transform': "translateX(" + 0 + "px)",
                    'transform': "translateX(" + 0 + "px)"
                }, 100)
            }); 
            $(window).on('longTap', '.sui-swipe-li', function(event) {
                event.preventDefault();
                event.stopPropagation();
                var rParent = $(this);
                var messageId = rParent.attr('data-MessageId');
                console.log(messageId);
                var buttons1 = [{
                    text: '请选择',
                    label: true
                }, {
                    text: '删除',
                    bold: true,
                    color: 'danger',
                    onClick: function() {
                        rParent.remove();
                    }
                }];
                var buttons2 = [{
                    text: '取消'
                        /*,
                                            bg: 'danger'*/
                }];
                var groups = [buttons1, buttons2];
                $.actions(groups);

            });
        } 
        suiListSwipe();
        $.init();
    });
}(mui, document, window.app));
