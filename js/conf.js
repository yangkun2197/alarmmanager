/**
 * 站点全局配置文件
 * @param {Object} app
 */
(function(app) {
	/**
	 * 站点全局配置文件
	 */
	app.config = {
		debug: true, //发布的时候把这个改成 false
		version: 1, //版本号 
		app_type: {
			"poweralarm_andoird": 1, //app类型 
			"poweralarm_ios": 2
		},
		localDataBase: {
			db: 'com.jundiantech.poweralarm.appdb',
			dbName: 'Poweralarm Database',
			dbSize: 10 * 1024 * 1024
		}
	}
	//解决变宽1px  0.5px问题
	if (window.devicePixelRatio && devicePixelRatio >= 2) {
	  var testElem = document.createElement('div');
	  testElem.style.border = '.5px solid transparent';
	  document.body.appendChild(testElem);
	  if (testElem.offsetHeight == 1)
	  {
	    document.querySelector('html').classList.add('hairlines');
	  }
	  document.body.removeChild(testElem);
	}
}(window.app = {}));