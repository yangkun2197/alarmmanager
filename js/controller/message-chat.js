(function(mui, doc, app) {
	mui.init();
	var ctrl_resolve = doc.getElementById('resolve');
	var ctrl_address = doc.getElementById('address');
	var currentView;
	var faultAddView;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		currentView.setStyle({
			softinputMode: "adjustResize"
		}); 
		faultAddView = plus.webview.getWebviewById('views_fault_add');
		if (currentView.mtype == 1) {
			var old_back = mui.back;
			mui.back = function() {
				var btn = ["已解决", "未解决"];
				mui.confirm('故障解决了吗', '提示', btn, function(e) {
					if (e.index == 0) { 
					} 
					faultAddView.hide();
					//执行mui封装好的窗口关闭逻辑；
					old_back();
				});
			}
		}
		ctrl_resolve.addEventListener("tap", function(event) {
			// 弹出系统选择按钮框
			plus.nativeUI.actionSheet({
				title: "故障解决了吗?",
				style: 'destructive',
				cancel: "取消",
				buttons: [{
					title: "已解决"
				}, {
					title: "未解决"
				}]
			}, function(e) {
				console.log("User pressed: " + e.index);
			});

		}, false);
		ctrl_address.addEventListener("tap", function(event) {
			mui.openWindow({
				url: '../my/address.html',
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
		}, false);


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
		$.init();
	});

}(mui, document, window.app));