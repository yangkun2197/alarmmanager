(function(mui, doc, app) {
    mui.init();
var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = currentView.opener();
 
		
		    $(function() { 
		        $('.list-block').on('click', '.item-content', function() {
		        	
		            mui.fire(parent, 'views_main_index:SetLocation', {
						'lng': 121.961567,
						'lat': 30.933956
					});
					
					mui.back();
		        }); 
		        $.init();
    });
		
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
	
	
	
	

}(mui, document, window.app));
