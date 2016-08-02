(function(mui, doc, app) {
	mui.init({
		keyEventBind: { //返回设置
			backbutton: false
		}
	});
	mui.plusReady(function() {
		//plus.screen.lockOrientation("portrait-primary");
		plus.navigator.setStatusBarBackground("#347AEA");
		plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackTranslucent");
		function plusReady() {
			//$('#reload').hide();
			var crrNetworkinfo = plus.networkinfo.getCurrentType();
			if ((crrNetworkinfo == plus.networkinfo.CONNECTION_NONE)) {
				plus.nativeUI.alert('网络连接失败，请稍后重试');
				//$('#reload').show();
				//return false;
			}
			if (crrNetworkinfo == plus.networkinfo.CONNECTION_CELL2G) {
				plus.nativeUI.alert('当前网络环境不是太好，可能会影响使用');
			}
			if (mui.os.ios) {
				plus.runtime.setBadgeNumber(0);
			}
			redirect();
		}
		plusReady();
		/*1.1 */
		function redirect() {
			redirectToMain(4);
			setTimeout(function() {
				//plus.nativeUI.alert('同步出错');
				redirectToMain(4);
			}, 20 * 1000);
		}
		//跳转到首页
		function redirectToMain(syncCount) {
			if (syncCount != 4) {
				return false;
			}
			mui.openWindow({
				url: 'views/my/login.html',
				id: 'views_my_login',
				show: {
					aniShow: 'fade-in' //页面显示动画，默认为”slide-in-right“；
				},
				waiting: {
					autoShow: false //自动显示等待框，默认为true
				}
			});
			setTimeout(function() {
				plus.navigator.closeSplashscreen();
				mui.currentWebview.close('none');
			}, 10000);
		}
	});
}(mui, document, window.app));