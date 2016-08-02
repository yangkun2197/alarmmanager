/**
 * 地图页 控制器 views/main/index.html
 */
(function(mui, doc, app) {
	var currentView = null, //当前视图
		map_em = null, //地图容器
		map = null, // 地图控件
		layerContrlView = null, //图层控制
		headerBarView = null, //顶部bar
		footerBarView = null, //底部bar
		myIndexView = null, //侧边栏
		messageIndexView = null, //消息中心
		faultIndexView = null, //故障列表
		floorContrlView = null, //楼层控制
		faultAddView = null, //我要报修
		buildingRoomView = null, //房间详情
		buildingDetailView = null, //楼宇详情
		searchView = null, //搜索
		buildingAirconView = null, //空调控制
		buildingDeviceView = null, //电表设备控制
		mapOverlayManager = {
			'floor0': {
				'room': [],
				'green': [],
				'roomName': [],
				'device': []
			},
			'floor1': {
				'room': [],
				'green': [],
				'roomName': [],
				'device': []
			},
			'floor2': {
				'room': [],
				'green': [],
				'roomName': [],
				'device': []
			}
		},
		map_option = {
			defualtZoom: 16, //初始缩放率
			currentZoom: 16,
			lastZoom: 3,
			defaultCenter: [121.947272, 30.935716], //初始中心坐标,
			iconPath: {
				myLocation: '',
				roomName: '',
				buildingName: '',
				aircon: '',
				electricity: '',
			},
			currentFloor: 0,
		};
	var stylesAndroid = {
		'floor_contrl': {
			right: "2%",
			//left: "auto",
			bottom: "64px",
			width: "30%",
			height: "27px",
			zindex: 0
		},
		'my_index': {
			left: "0",
			top: "0",
			width: "80%",
			height: "100%",
			zindex: 0
		},
		'layer_contrl': {
			//right: "0",
			left: "0",
			bottom: "0px",
			width: "100%",
			height: "230px",
			zindex: 0
		},
		'footer_bar': {
			//right: "2%",
			left: "2%",
			bottom: "4px",
			width: "96%",
			height: "46px",
			zindex: 0
		},
		'header_bar': {
			right: "0",
			top: "0",
			width: "100%",
			height: "44px",
			zindex: 0
				/*,
				            background: 'transparent'*/
		}
	};
	var stylesIOS = { 
		'floor_contrl': {
			right: "1.5%",
			left: "auto",
			bottom: "64px",
			width: "30%",
			height: "27px",
			zindex: 0
		},
		'footer_bar': {
			right: "1.5%",
			left: "1.5%",
			bottom: "4px",
			width: "97%",
			height: "45px",
			zindex: 0
		} 
	};
	mui.init({
		swipeBack: false,
		preloadPages: [{
			url: "./floor-contrl.html",
			id: 'views_main_floor_contrl',
			styles: mui.os.ios?stylesIOS.floor_contrl:stylesAndroid.floor_contrl
		}, {
			url: "./search.html",
			id: 'views_main_search',
			styles: {
				zindex: 1
			}
		},  {
			url: "../message/index.html",
			id: 'views_message_index',
			styles: {
				zindex: 1
			}
		}, {
			url: "../building/room.html",
			id: 'views_building_room',
			styles: {
				zindex: 1
			}
		}, {
			url: "../building/detail.html",
			id: 'views_building_detail',
			styles: {
				zindex: 1
			}
		}, {
			url: "./layer-contrl.html",
			id: 'views_main_layer_contrl',
			styles: stylesAndroid.layer_contrl
		}, {
			url: "../my/index.html",
			id: 'views_my_index',
			styles: stylesAndroid.my_index
		}],
		subpages: [{
			url: "./header-bar.html",
			id: 'views_main_header-bar',
			styles: stylesAndroid.header_bar
		}, {
			url: "./footer-bar.html",
			id: 'views_main_footer-bar',
			styles: mui.os.ios?stylesIOS.footer_bar:stylesAndroid.footer_bar
		}]
	});
	mui.plusReady(function() {
		plusReady();
	});
	// H5 plus事件处理
	function plusReady() {
		// 确保DOM解析完成
		if (!map_em || !window.plus || map) {
			return;
		};
		currentView = plus.webview.currentWebview();
		// currentView.addEventListener("maskClick", function() {
		//     currentView.setStyle({
		//         mask: "none"
		//     });
		//     setMyIndexDisplay(0);
		// }, false);
		//地图图标初始化
		initMapIcon();
		map = new plus.maps.Map("map");
		//定位中心点
		map.centerAndZoom(new plus.maps.Point(map_option.defaultCenter[0], map_option.defaultCenter[1]), map_option.defualtZoom, plus.maps.MapType.MAPTYPE_NORMAL, false, true);
		map.onclick = function(point) {
			setLayerContrlDisplay(0);
			setMyIndexDisplay(0);
		};
		//地图状态变化跟踪
		map.onstatuschanged = function(e) {
				setLayerContrlDisplay(0);
				setMyIndexDisplay(0);
				setTimeout(function() {
					map_option.currentZoom = e.zoom;
					var bounds = e.bounds;

					setMarkersToMap(bounds.southwest.longitude, bounds.southwest.latitude, bounds.northease.longitude, bounds.northease.latitude, map_option.currentFloor);
					if (app.config.debug) {
						//console.log('地图-onstatuschanged，当前缩放为' + currentZoom + '，上次缩放为' + lastZoom + '，最大缩放为' + defaultZoomValue);
					}
					if (app.config.debug) {
						//console.log('地图-onstatuschanged，当前坐标范围' + JSON.stringify(bounds) + ',缩放比例：' + e.zoom);
						console.log('地图-上次缩放' + map_option.lastZoom + ',本次缩放：' + e.zoom);
					}
					map_option.lastZoom = e.zoom;
				}, 500);
			}
			//初始化地图上的覆盖物
		setTimeout(function() {
			var bounds = map.getBounds();
			//这个方法5+sdk 有BUG，暂时做反向处理 
			showBuildingFloor(0);
			//setMarkersToMap(bounds.northease.longitude, bounds.northease.latitude, bounds.southwest.longitude, bounds.southwest.latitude, 0);
		}, 500);
		//回退按钮控制
		var backButtonPress = 0;
		mui.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
		//窗口切换到前台 开启同步
		document.addEventListener("resume", function() {
			if (mui.os.ios) {
				plus.runtime.setBadgeNumber(0);
			}
		}, false);
		//实时监测网络变化
		document.addEventListener("netchange", function() {
			var crrNetworkinfo = plus.networkinfo.getConnectionType();
			if (crrNetworkinfo == plus.networkinfo.CONNECTION_NONE) {
				plus.nativeUI.toast('网络连接失败');
				//return false;
			}
			if (crrNetworkinfo == plus.networkinfo.CONNECTION_CELL2G) {
				plus.nativeUI.toast('当前网络环境不是太好，可能会影响使用');
			}
		}, false);
	}
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	// DOMContentloaded事件处理
	document.addEventListener("DOMContentLoaded", function() {
		map_em = document.getElementById("map");
		plusReady();
	}, false);
	//将绿化添加到地图
	function addGreenOverlay(floor) {
		____map_data[floor].green.forEach(function(el) {
			//console.log(JSON.stringify(el));
			var points = [];
			el.forEach(function(el2) {
				points.push(new plus.maps.Point(el2.lng, el2.lat));
			});
			var polygonObj = new plus.maps.Polygon(points);
			// 设置多边形的填充颜色为绿色
			polygonObj.setFillColor("#DCF2D5");
			// 设置多边形填充为半透明
			polygonObj.setFillOpacity(0.5);
			// 设置多边形边框为半透明
			polygonObj.setStrokeOpacity(0.5);
			// 设置多边形边框为绿色
			polygonObj.setStrokeColor("#DCF2D5");
			polygonObj.setLineWidth(2);
			map.addOverlay(polygonObj);
		});
	}
	//将房间添加到地图
	function addRoomOverlay(floor) {
		var flag = 0;
		____map_data[floor].room.forEach(function(el) {
			//console.log(JSON.stringify(el));
			var points = [];
			el.forEach(function(el2) {
				points.push(new plus.maps.Point(el2.lng, el2.lat));
			});
			var polygonObj = new plus.maps.Polygon(points);
			// 设置多边形的填充颜色为绿色
			polygonObj.setFillColor(flag != 5 ? "#B5D6EA" : "#ff0000");
			// 设置多边形填充为半透明
			polygonObj.setFillOpacity(0.5);
			// 设置多边形边框为半透明
			polygonObj.setStrokeOpacity(0.5);
			// 设置多边形边框为绿色
			polygonObj.setStrokeColor(flag != 5 ? "#B5D6EA" : "#ff0000");
			polygonObj.setLineWidth(2);
			map.addOverlay(polygonObj);
			flag++;
		});
	}
	//将房间名标注添加到地图
	function addRoomNameOverlay(floor) {
		____map_data[floor].roomName.forEach(function(el) {
			//el.lng = parseFloat((el.lng+0.000454).toFixed(6));
			var marker = new plus.maps.Marker(new plus.maps.Point(el.lng + 0.000454, mui.os.ios?el.lat:(el.lat- 0.000454)));
			marker.setLabel(el.name);
			var bubble = new plus.maps.Bubble(el.name);
			marker.setBubble(bubble, false);
			if (el.name.indexOf('韬奋楼') > -1) {
				marker.setIcon(map_option.iconPath.buildingName);
				marker.onclick = function(mk) {
					map.setCenter(mk.point);
					setTimeout(function() {
						//currentZoom = defaultZoomValue;
						//map.setZoom(defaultZoomValue);
						setShowBuildingDetailDisplay(1);
						mk.bringToTop();
					}, 500);
				};
			} else {
				marker.setIcon(map_option.iconPath.roomName);
				marker.onclick = function(mk) {
					map.setCenter(mk.point);
					setTimeout(function() {
						//currentZoom = defaultZoomValue;
						//map.setZoom(defaultZoomValue);
						setShowBuildingRoomDisplay(1);
						mk.bringToTop();
					}, 500);
				};
			}
			map.addOverlay(marker);
		});
	}
	//将设备标注添加到地图
	function addDeviceOverlay(floor) {
		____map_data[floor].device.forEach(function(el) {
			//el.lng = parseFloat((el.lng+0.000454).toFixed(6));
			var marker = new plus.maps.Marker(new plus.maps.Point(el.lng + 0.000454,  mui.os.ios?el.lat:(el.lat- 0.000454)));
			marker.setLabel(el.name);
			var bubble = new plus.maps.Bubble(el.name);
			marker.setBubble(bubble, false);
			if (el.name.indexOf('空调') > -1) {
				marker.setIcon(map_option.iconPath.aircon);
				marker.onclick = function(mk) {
					map.setCenter(mk.point);
					setTimeout(function() {
						setShowBuildingAirconDisplay(1);
						mk.bringToTop();
					}, 500);
				};
			} else {
				marker.setIcon(map_option.iconPath.electricity);
				marker.onclick = function(mk) {
					map.setCenter(mk.point);
					setTimeout(function() {
						setShowBuildingDeviceDisplay(1);
						mk.bringToTop();
					}, 500);
				};
			}
			map.addOverlay(marker);
		});
	}
	/**
	 * 添加标注到地图
	 * @param {Object} nelng	左上角经度
	 * @param {Object} nelat	左上角纬度
	 * @param {Object} swlng	右上角经度
	 * @param {Object} swlat	右上角纬度
	 */
	function setMarkersToMap(nelng, nelat, swlng, swlat, floor) {
		//如果是平移操作，则不执行加点
		if (map_option.currentZoom == map_option.lastZoom) {
			return false;
		}
		if (map_option.currentZoom <= map_option.defualtZoom) {
			//console.log('0---------------')
			if(map_option.currentFloor ==0)return false;
			map_option.currentFloor = 0;
			setFloorContrlDisplay(0);
			// if (map_option.lastZoom < map_option.defualtZoom) {
			//             return false;
			//         }
			//map_option.currentFloor = 0;
			showBuildingFloor(0);
		} else {
			if(map_option.currentFloor ==1)return false;
			map_option.currentFloor = 1;
			floor = 1;
			setFloorContrlDisplay(1);

			if (map_option.lastZoom > map_option.defualtZoom) {
				return false;
			}
			//map_option.currentFloor = floor;
			//setFloorContrlDisplay(1);
			showBuildingFloor(floor);
			//console.log(floor + '---------------');
		}
	}
	/**
	 * 楼层显示切换
	 * @param  {[type]} floor 楼层
	 * @return {[type]}       [description]
	 */
	function showBuildingFloor(floor) {
		map.clearOverlays();
		//setFloorContrlDisplay(1);
		map_option.currentFloor = floor;
		if (floor == 0) {
			addGreenOverlay('floor1');
			addRoomOverlay('floor1');
			addRoomNameOverlay('floor0');
			addDeviceOverlay('floor0');
			return false;
		}
		if (floor == 1) {
			addGreenOverlay('floor1');
			addRoomOverlay('floor1');
			addRoomNameOverlay('floor1');
			addDeviceOverlay('floor1');
			return false;
		}
		if (floor == 2) {
			addGreenOverlay('floor2');
			addRoomOverlay('floor2');
			addRoomNameOverlay('floor2');
			addDeviceOverlay('floor2');
			// //显示第2层
			// mapOverlayManager.floor2.green.forEach(function(overlayObj) {
			//     overlayObj.show();
			//     map.addOverlay(overlayObj);
			// });
			// mapOverlayManager.floor2.room.forEach(function(overlayObj) {
			//     overlayObj.show();
			//     map.addOverlay(overlayObj);
			// });
			// mapOverlayManager.floor2.roomName.forEach(function(overlayObj) {
			//     overlayObj.show();
			//     map.addOverlay(overlayObj);
			// });
			return false;
		}
	}
	//楼层显示切换
	window.addEventListener('views_main_index:ShowBuildingFloor', function(event) {
		//获得事件参数
		var floor = event.detail.floor;
		showBuildingFloor(floor);
	});
	//定位到自己的位置
	function userLocation() {
		map.showUserLocation(true);
		setTimeout(function() {
			map.getUserLocation(function(state, pos) {
				if (0 == state) {
					map.setCenter(pos);
					map.setZoom(18);
					currentZoom = 18;
					lastZoom = 18;
				}
			});
		}, 500);
	}
	//定位到自己的位置
	window.addEventListener('views_main_index:UserLocation', function(event) {
		userLocation();
	});
	//显示或隐藏 搜索界面
	function setSearchDisplay(type) {
		if (searchView == null) {
			searchView = plus.webview.getWebviewById('views_main_search');
		}
		if (searchView != null) {
			if (type == 1) {
				searchView.show();
			} else {
				searchView.hide();
			}
		}
	}
	//显示或隐藏 图层控制控件
	function setLayerContrlDisplay(type) {
		if (layerContrlView == null) {
			layerContrlView = plus.webview.getWebviewById('views_main_layer_contrl');
		}
		if (layerContrlView != null) {
			if (type == 1) {
				layerContrlView.show();
			} else {
				layerContrlView.hide();
			}
		}
	}
	//显示或隐藏 楼层控制控件
	function setFloorContrlDisplay(type) {
		if (floorContrlView == null) {
			floorContrlView = plus.webview.getWebviewById('views_main_floor_contrl');
		}
		if (floorContrlView != null) {
			if (type == 1) {
				floorContrlView.show();
			} else {
				mui.fire(floorContrlView, 'views_main_floor_contrl:Reload');
				floorContrlView.hide();
			}
		}
	}
	//显示或隐藏侧边栏
	function setMyIndexDisplay(type) {
		if (myIndexView == null) {
			myIndexView = plus.webview.getWebviewById('views_my_index');
		}
		if (myIndexView != null) {
			if (type == 1) {
				myIndexView.show('slide-in-left');
			} else {
				myIndexView.hide('slide-out-left');
			}
		}
	}
	//显示或隐藏消息中心
	function setShowMessageIndexDisplay(type) {
		messageIndexView = mui.openWindow({
			url: '../message/index.html',
			id: 'views_message_index',
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
		if (type == 1) {
			messageIndexView.show();
		} else {
			messageIndexView.hide();
		}
	}
	//显示或隐藏  我要报修
	function setShowFaultAddDisplay(type) {
		faultAddView = mui.openWindow({
			url: '../fault/add.html',
			id: 'views_fault_add',
			show: {
				aniShow: 'slide-in-bottom' //页面显示动画，默认为”slide-in-right“；
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
		if (type == 1) {
			faultAddView.show('slide-in-bottom');
		} else {
			faultAddView.hide('slide-out-bottom');
		}
	}
	//显示或隐藏  电表详情
	function setShowBuildingDeviceDisplay(type) {
		buildingDeviceView = mui.openWindow({
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
		if (type == 1) {
			buildingDeviceView.show('slide-in-right');
		} else {
			buildingDeviceView.hide('slide-out-right');
		}
	}
	//显示或隐藏  空调详情
	function setShowBuildingAirconDisplay(type) {
		buildingAirconView = mui.openWindow({
			url: '../building/remote-aircon.html',
			id: 'views_building_remote_aircon',
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
		if (type == 1) {
			buildingAirconView.show('slide-in-right');
		} else {
			buildingAirconView.hide('slide-out-right');
		}
	}
	//显示或隐藏  房间详情
	function setShowBuildingRoomDisplay(type) {
		buildingRoomView = mui.openWindow({
			url: '../building/room.html',
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
				zindex: 1
			}
		});
		if (type == 1) {
			buildingRoomView.show('slide-in-right');
		} else {
			buildingRoomView.hide('slide-out-right');
		}
	}
	//显示或隐藏  楼宇详情
	function setShowBuildingDetailDisplay(type) {
		buildingDetailView = mui.openWindow({
			url: '../building/detail.html',
			id: 'views_building_detail',
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
		if (type == 1) {
			buildingDetailView.show('slide-in-right');
		} else {
			buildingDetailView.hide('slide-out-right');
		}
	}
	//显示或隐藏故障列表
	function setShowFaultIndexDisplay(type) {
		faultIndexView = mui.openWindow({
			url: '../fault/index.html',
			id: 'views_fault_index',
			show: {
				aniShow: 'slide-in-bottom' //页面显示动画，默认为”slide-in-right“；
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
		if (type == 1) {
			faultIndexView.show('slide-in-bottom');
		} else {
			faultIndexView.hide('slide-out-bottom');
		}
	}
	//显示或隐藏视图
	window.addEventListener('views_main_index:ShowWebView', function(event) {
		var displayType = event.detail.displayType;
		var viewId = event.detail.viewId;
		switch (viewId) {
			case 'views_message_index':
				setShowMessageIndexDisplay(displayType);
				break;
			case 'views_main_layer_contrl':
				setLayerContrlDisplay(displayType);
				break;
			case 'views_my_index':
				setMyIndexDisplay(displayType);
				break;
			case 'views_fault_index':
				setShowFaultIndexDisplay(displayType);
				break;
			case 'views_main_floor_contrl':
				setFloorContrlDisplay(displayType);
				break;
			case 'views_fault_add':
				setShowFaultAddDisplay(displayType);
				break;

			case 'views_building_room':
				setShowBuildingRoomDisplay(displayType);
				break;
			case 'views_main_search':
				setSearchDisplay(displayType);
				break;
			case 'views_building_detail':
				setShowBuildingDetailDisplay(displayType);
				break;

			default:
				break;
		}
	});

	//定位到某个坐标
	function locate(lng, lat) {
		var ptObj = new plus.maps.Point(map_option.defaultCenter[0], map_option.defaultCenter[1]);
		map.setCenter(ptObj);
		setTimeout(function() {
			if (map_option.currentZoom < map_option.defualtZoom) {
				map.setZoom(defaultZoomValue);
			}
			if (!mui.os.ios) {
				var bounds = map.getBounds();
				setMarkersToMap(bounds.southwest.longitude, bounds.southwest.latitude, bounds.northease.longitude, bounds.northease.latitude, 0);
			}
		}, 300);
	}
	//收藏夹定位   搜索定位
	window.addEventListener('views_main_index:SetLocation', function(event) {
		//获得事件参数
		var lng = event.detail.lng;
		var lat = event.detail.lat;
		locate(lng, lat);
	});
	//地图图标初始化
	function initMapIcon() {
		//判断是不是高清屏幕
		var screenHeight = (plus.screen.resolutionHeight * plus.screen.scale);
		//console.log(screenHeight + "," + plus.screen.resolutionHeight + "," + plus.screen.scale);

		if (mui.os.ios) {
			if (screenHeight >= 1900) {
				map_option.iconPath.myLocation = "../../images/map/ios/ic_me2@3x.png";
				map_option.iconPath.roomName = "../../images/map/ios/ic_marker@3x.png";
				map_option.iconPath.buildingName = "../../images/map/ios/ic_building@3x.png";
				map_option.iconPath.electricity = "../../images/map/ios/ic_electricity@3x.png";
				map_option.iconPath.aircon = "../../images/map/ios/ic_aircon@3x.png";

			} else if (screenHeight < 1900 && screenHeight >= 960) {
				map_option.iconPath.myLocation = "../../images/map/ios/ic_me2@2x.png";
				map_option.iconPath.roomName = "../../images/map/ios/ic_marker@2x.png";
				map_option.iconPath.buildingName = "../../images/map/ios/ic_building@2x.png";
				map_option.iconPath.electricity = "../../images/map/ios/ic_electricity@2x.png";
				map_option.iconPath.aircon = "../../images/map/ios/ic_aircon@2x.png";

			} else {
				map_option.iconPath.myLocation = "../../images/map/ios/ic_me2.png";
				map_option.iconPath.roomName = "../../images/map/ios/ic_marker.png";
				map_option.iconPath.buildingName = "../../images/map/ios/ic_building.png";
				map_option.iconPath.electricity = "../../images/map/ios/ic_electricity.png";
				map_option.iconPath.aircon = "../../images/map/ios/ic_aircon.png";

			}
		} else {
			if (screenHeight >= 1900) {
				map_option.iconPath.myLocation = "../../images/map/android/ic_me2@3x.png";
				map_option.iconPath.roomName = "../../images/map/android/ic_marker@3x.png";
				map_option.iconPath.buildingName = "../../images/map/android/ic_building@3x.png";
				map_option.iconPath.electricity = "../../images/map/android/ic_electricity@3x.png";
				map_option.iconPath.aircon = "../../images/map/android/ic_aircon@3x.png";

			} else if (screenHeight < 1900 && screenHeight >= 1770) {
				map_option.iconPath.myLocation = "../../images/map/android/ic_me2@2x.png";
				map_option.iconPath.roomName = "../../images/map/android/ic_marker@2x.png";
				map_option.iconPath.buildingName = "../../images/map/android/ic_building@2x.png";
				map_option.iconPath.electricity = "../../images/map/android/ic_electricity@2x.png";
				map_option.iconPath.aircon = "../../images/map/android/ic_aircon@2x.png";

			} else if (screenHeight < 1770 && screenHeight >= 1200) {
				map_option.iconPath.myLocation = "../../images/map/android/ic_me2@2x.png";
				map_option.iconPath.roomName = "../../images/map/android/ic_marker@2x.png";
				map_option.iconPath.buildingName = "../../images/map/android/ic_building@2x.png";
				map_option.iconPath.electricity = "../../images/map/android/ic_electricity@2x.png";
				map_option.iconPath.aircon = "../../images/map/android/ic_aircon@2x.png";

			} else {
				map_option.iconPath.myLocation = "../../images/map/android/ic_me2.png";
				map_option.iconPath.roomName = "../../images/map/android/ic_marker.png";
				map_option.iconPath.buildingName = "../../images/map/android/ic_building.png";
				map_option.iconPath.electricity = "../../images/map/android/ic_electricity.png";
				map_option.iconPath.aircon = "../../images/map/android/ic_aircon.png";

			}
		}
	}

}(mui, document, window.app));