//Define the cartBuilder namespace if it doesn't exist.
//pass in reference to its parent, the window, jquery and undefined incase someone did something dumb
mk8.UI = (function(mk8,window,$,undefined) {
	var my = {},
		driverbox = $('#builder-driver'),
		loadingbox = $('#loading-modal'),
		drivertemplate = '<div class="driver-portrait" data-drivername="{X}"></div>',
		selectedbox = $('#driver-highlight');

	my.init = function(){
		buildDriverSquares();
		wireEvents();
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

	var wireEvents = function(){
		driverbox.on('click','.driver-portrait',function(){
			mk8.builder.setDriver($(this).data('drivername'));
			highlightDriver($(this));
			mk8.builder.calculateTotals();
		});
	};

	var highlightDriver = function(target){
		var p = target.position();		

		selectedbox.show().css({top:p.top-5, left:p.left-((p.left / target.width()) + 1)});
	};

	//endregion #Privates


	return my;

}(window.mk8,this,jQuery,undefined));