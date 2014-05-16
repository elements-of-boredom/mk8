//Define the cartBuilder namespace if it doesn't exist.
//pass in reference to its parent, the window, jquery and undefined incase someone did something dumb
mk8.UI = (function(mk8,window,$,undefined) {
	var my = {},
		currentColumn = 'karts',
		driverbox = $('#builder-driver'),
		totalsbox = $('#builder-totals'),
		loadingbox = $('#loading-modal'),
		drivertemplate = '<div class="driver-portrait" data-drivername="{X}"></div>',
		karttemplate = '<div class="item-image" data-kartname="{X}"><img src="img/kart_0.png"/></div>',
		tirestemplate = '<div class="item-image" data-wheelname="{X}"><img src="img/tire_0.png"/></div>',
		glidertemplate = '<div class="item-image" data-glidername="{X}"><img src="img/glider_0.png"/></div>',
		selectedbox = $('#driver-highlight'),
		totalbartemplate = '<div class="verticalbar"></div>',
		selectorbox = $('#builder-equipment .equipment-selector'),
		upArrow = $('#builder-equipment .uppertriangle'),
		downArrow = $('#builder-equipment .lowertriangle'),
		equipmentbox = $('#builder-equipment');

	my.init = function(){
		buildDriverSquares();
		buildTotalsBars();
		buildKartBar();
		buildWheelBar();
		buildGliderBar();
		wireEvents();
		console.log('UI initialized');
		
	};

	my.refreshStats = function(stats){
		updateTotals(stats);
	};

	my.hideLoading = function(){
		loadingbox.hide();
	};


	//region #Privates
	var buildDriverSquares = function(){
		var drivers = mk8.data.getDriverGrid();
		for(var x = 0; x < drivers.length; x++ ){
			driverbox.append(drivertemplate.replace("{X}",drivers[x]));
		}
	};

	var buildTotalsBars = function(){
		totalsbox.find('.statbar').each(function(){
			for(var x = 0; x < 6; x++){
				$(this).append(totalbartemplate);
			}
		});
	};

	var buildKartBar = function(){
		var k = mk8.data.getChassieDataByName();//no name gets all karts
		var i = 0;
		for(var x in k){
			if(k.hasOwnProperty(x) && k[x].name != "BLANK"){
				i++;
				equipmentbox.find('.karts').append(karttemplate.replace("{X}",k[x].name));
				if(i == 2){
					//We default our selects to the 2nd in the list for now.
					mk8.builder.setChassie(k[x].name);
				}
			}
		}
	};

	var buildWheelBar = function(){
		var k = mk8.data.getTireDataByName();//no name gets all wheels
		var i = 0;
		for(var x in k){
			if(k.hasOwnProperty(x) && k[x].name != "BLANK"){
				i++;
				equipmentbox.find('.tires').append(tirestemplate.replace("{X}",k[x].name));
				if(i == 2){
					//We default our selects to the 2nd in the list for now.
					mk8.builder.setTire(k[x].name);
				}
			}
		}
	};

	var buildGliderBar = function(){
		var k = mk8.data.getGliderDataByName();//no name gets all gliders
		var i = 0;
		for(var x in k){
			if(k.hasOwnProperty(x) && k[x].name != "BLANK"){
				i++;
				equipmentbox.find('.gliders').append(glidertemplate.replace("{X}",k[x].name));
				if(i == 2){
					//We default our selects to the 2nd in the list for now.
					mk8.builder.setGlider(k[x].name);
				}
			}
		}
	};

	var wireEvents = function(){
		driverbox.on('click','.driver-portrait',function(){
			mk8.builder.setDriver($(this).data('drivername'));
			highlightDriver($(this));
			var stats = mk8.builder.calculateTotals();
			console.log(stats);
			updateTotals(stats);
		});

		equipmentbox.on('click', '.column-selector',function(){
			//Move the selector box to each column selected.
			selectorbox.animate({left:$(this).position().left-5});
			currentColumn = $(this).data('columnname');
		});

		upArrow.on('click', function(){
			slideItems(1);
		});

		downArrow.on('click', function(){
			slideItems(-1);
		});
	};

	//example of stats:
	//Object {Speed: 2.25, Acceleration: 3.25, Weight: 2.25, Handling: 4.75, Grip: 4.5}
	var updateTotals = function(stats){
		for(var x in stats){
			if(stats.hasOwnProperty(x)){
				//use the name of the property to build the dynamic id. Then update the width
				//of the field based off the value / 6 to get the %. 
				$('#' + x.toLowerCase() + '-amount').animate({width:((stats[x] / 6) * 100)+"%"})
				$('#builder-totals .'+ x.toLowerCase() + '-amount').text(stats[x]);
			}
		};
	};

	var highlightDriver = function(target){
		var p = target.position();		
		selectedbox.show().css({top:p.top-5, left:p.left-((p.left / target.width()) + 1)});
	};

	var slideItems = function(direction){
		//animate the column up or down 
		//equipmentbox.find('.' + currentColumn).animate({top:})
	};

	//endregion #Privates
	return my;

}(window.mk8,this,jQuery,undefined));