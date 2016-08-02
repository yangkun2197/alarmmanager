(function(mui, doc, app) {
	mui.init();
//	var slider = doc.getElementById('slider');
//	noUiSlider.create(slider, {
//		start: 1,
//		orientation: "vertical",
//		//connect: true,
//		snap: true,
//		range: {
//			'min': 1,
//			'max': 2
//		}
//	});
	
	 
	var currentView = null;
	var parent = null;
	// H5 plus事件处理
	function plusReady() {
		currentView = plus.webview.currentWebview();
		parent = currentView.opener();

//		slider.noUiSlider.on('update', function(values, handle) {
//			//skipValues[handle].innerHTML = values[handle];
//			console.log(values[handle])
//			var floor = parseInt(values[handle]);
//			$('.noUi-handle').html('F' + floor);
//			
//			 
//			mui.fire(parent, 'views_main_index:ShowBuildingFloor', {
//				'floor': floor
//			});
//		});
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
	
	//重置滑块
	window.addEventListener('views_main_floor_contrl:Reload', function(event) {
		//获得事件参数
		//slider.noUiSlider.set(0);
		//console.log('reload-------------------')
		$('#ctrl_floors a').removeClass('active');
		$('#ctrl_floors a').first().addClass('active');
	});

	$(function() {
		
		$('#ctrl_floors').on('tap','a',function(){
			var self = $(this);
			var floor = parseInt(self.attr('title'));
			console.log(floor);
			$('#ctrl_floors a').removeClass('active');
			self.addClass('active');
			mui.fire(parent, 'views_main_index:ShowBuildingFloor', {
				'floor': floor
			});
		});
		
		$.init();
	});
}(mui, document, window.app));