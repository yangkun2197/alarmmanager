(function(mui, doc, app) {
	mui.init();
	$(function() {
		$('.tools').on('tap', '.tab-item', function() {
			var $self = $(this);
			var selId = $self.attr('id');
			if (selId == 'done') {
				var btnArray = ['已解决', '暂未解决'];
				mui.prompt('请输入维修日志', '请输入维修日志', '故障解决了吗', btnArray, function(e) {
					if (e.index == 0) {
						if (e.value.length == 0) {
							return false;
						}
						plus.nativeUI.toast('操作成功');
					}
				});
				return false;
			}
			var id = '';
			var url = '';
			switch (selId) {
				case 'repairlog':
					url = './repairlog.html';
					id = 'views_fault_repairlog';
					break;
				case 'file':
					url = './file.html';
					id = 'views_fault_file';
					break;
				case 'bookdetail':
					url = '../my/bookdetail.html';
					id = 'views_my_bookdetail';
					break;
				case 'repair':
					url = './repair.html';
					id = 'views_fault_repair';
					break;
				default:
					url = './repairlog.html';
					id = 'views_fault_repairlog';
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
		$('#device').on('tap', function() {
			mui.openWindow({
				url: '../building/device.html',
				id: 'views_building_device',
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
		$('#chat').on('tap', function() {
			mui.openWindow({
				url: '../message/chat.html',
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
					zindex: 1
				}
			});
		});
		$.init();
	});
}(mui, document, window.app));