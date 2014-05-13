//Define the cartBuilder namespace if it doesn't exist.
//pass in reference to its parent, the window, jquery and undefined incase someone did something dumb
mk8.UI = (function(mk8,window,$,undefined) {
	var my = {},
		driverbox = $('#builder-driver'),
		loadingbox = $('#loading-modal'),
		drivertemplate = '<div class="driver-portrait" data-drivername="{X}"></div>';

	my.init = function(){
		buildDriverSquares();
		console.log('UI initialized');
		loadingbox.hide();
	};


	//region #Privates
	var buildDriverSquares = function(){
		var drivers = mk8.data.getDriverGrid();
		for(var x = 0; x < drivers.length; x++ ){
			driverbox.append(drivertemplate.replace("{X}",drivers[x]));
		}
	};

	//endregion #Privates


	return my;

}(window.mk8,this,jQuery,undefined));