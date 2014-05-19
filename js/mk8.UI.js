//Define the cartBuilder namespace if it doesn't exist.
//pass in reference to its parent, the window, jquery and undefined incase someone did something dumb
mk8.UI = (function(mk8,window,$,undefined) {
	var my = {},
		currentColumn = 'karts',
		isAnimating = false,
		driverbox = $('#builder-driver'),
		totalsbox = $('#builder-totals'),
		loadingbox = $('#loading-modal'),
		infobox = $('#builder-info'),
		drivertemplate = '<div class="driver-portrait" data-drivername="{X}"></div>',
		karttemplate = '<div class="item-image" data-kartname="{X}"><img src="img/kart_0.png"/></div>',
		tirestemplate = '<div class="item-image" data-tirename="{X}"><img src="img/tire_0.png"/></div>',
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
				equipmentbox.find('.karts-container').append(karttemplate.replace("{X}",k[x].name));
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
				equipmentbox.find('.tires-container').append(tirestemplate.replace("{X}",k[x].name));
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
				equipmentbox.find('.gliders-container').append(glidertemplate.replace("{X}",k[x].name));
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
			infobox.find('.info-name').text($(this).data('drivername'));
			updateTotals(mk8.builder.calculateTotals());
		});

		equipmentbox.on('click', '.column-selector',function(){
			//Move the selector box to each column selected.
			selectorbox.animate({left:$(this).position().left-5});
			currentColumn = $(this).data('columnname');
		});

		/* Allows for keybard navigation of columns but to work right it needs
			-alot- more work than initially assumed and im not sure its really even desired.
		$('body').on('keydown', function(event){
			if(event.which == 40 && currentColumn != 'driver'){  //down
				event.preventDefault();
				slideItems(-1);
			}else if(event.which == 38 && currentColumn != 'driver'){ //up
				event.preventDefault();
				slideItems(1);
			}
		});
		*/

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
		//get the first box in the list, we'll use its height
		var box = equipmentbox.find('.' + currentColumn + '-container .item-image').first();
		//get the offset of the entire column (we move it around to fake animation)
		var currentoffset = equipmentbox.find('.' + currentColumn + '-container').position().top;

		if(direction > 0){
			//if we clicked up,we move the list down, take the last box and put it on the top of the list
			equipmentbox.find('.' + currentColumn + '-container .item-image').last().prependTo(equipmentbox.find('.' + currentColumn + '-container'));
			equipmentbox.find('.' + currentColumn + '-container').css({top:currentoffset - box.height() -20});
			//Get the current offset again after we shifted everything.
			currentoffset = equipmentbox.find('.' + currentColumn + '-container').position().top;
		}		

		//dont allow a click action to take place IF we are already animating. Prevents jquery from puking and getting stuck between 2 items
		if(!isAnimating){
			isAnimating = true;
			equipmentbox.find('.' + currentColumn + '-container').animate(
				{
					top:(currentoffset + (direction * box.height())) + (direction > 0 ? 0 : -20) //20px is the margin difference
				},200,'swing',function(){
					isAnimating = false;
					if(direction < 0){
						equipmentbox.find('.' + currentColumn + '-container .item-image').first().appendTo(equipmentbox.find('.' + currentColumn + '-container'));
						equipmentbox.find('.' + currentColumn + '-container').css({top:currentoffset - 10});
					}
					selectItem(equipmentbox.find('.' + currentColumn + '-container .item-image').eq(1));
				});
		}
	};

	var selectItem = function(item){
		switch(currentColumn){
			case 'tires':
				infobox.find('.info-name').text(item.data('tirename'));
				mk8.builder.setTire(item.data('tirename'));
				break;
			case 'gliders':
				infobox.find('.info-name').text(item.data('glidername'));
				mk8.builder.setGlider(item.data('glidername'));
				break;
			case 'karts':
				infobox.find('.info-name').text(item.data('kartname'));
				mk8.builder.setChassie(item.data('kartname'));
				break;
			default:
				break;
		}

		updateTotals(mk8.builder.calculateTotals());
	};

	//endregion #Privates
	return my;

}(window.mk8,this,jQuery,undefined));