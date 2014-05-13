//Define mk8 namespace if it doesnt exist.
window.mk8 = window.mk8 || {};

//Define the cartBuilder namespace if it doesn't exist.
//pass in reference to its parent, the window, jquery and undefined incase someone did something dumb
mk8.builder = (function(mk8,window,$,undefined) {
	var my = {},
		currentDriver = null,
		currentChassie = null,
		currentTire = null,
		currentGlider = null;

	my.init = function(){
		mk8.data.init();
		mk8.UI.init();
		SetBaseChassie("Standard Kart");
		SetBaseTire("Standard Wheels");
		SetBaseGlider("Wario Glider");
		SetBaseDriver("Baby Mario");

		console.log(mk8.builder.calculateTotals());
	};

	my.SetDriver = function(drivername){
		SetBaseDriver(drivername);
	};

	my.SetChassie = function(chassiename){
		SetBaseChassie(chassiename);
	};

	my.SetTire = function(tirename){
		SetBaseTire(tirename);
	};

	my.SetGlider = function(glidername){
		SetBaseGlider(glidername);
	};

	my.calculateTotals = function(){
		var totals =  mk8.data.baseStats();
		var targets = [currentDriver,currentChassie,currentGlider,currentTire];

		//for each target, loop its stats and add its values to the totals
		//this is the closest to reflection we get.
		$(targets).each(function(index,value){
			for(var statType in value.stats){
				if(value.stats.hasOwnProperty(statType)){
					totals[statType] += value.stats[statType];
				}
			}
		});

		return totals;
	};


	//PRIVATE SECTION 
	var SetBaseDriver = function(drivername){
		try{
			currentDriver = mk8.data.getDriverByName(drivername);
		}catch(err){
			console.log(err);
		};
	};

	var SetBaseChassie = function(chassiename){
		try{
			currentChassie = mk8.data.getChassieByName(chassiename);
		}catch(err){
			console.log(err);
		};
	};

	var SetBaseTire = function(tirename){
		try{
			currentTire = mk8.data.getTireByName(tirename);
		}catch(err){
			console.log(err);
		}
	};

	var SetBaseGlider = function(glidername){
		try{
			currentGlider = mk8.data.getGliderByName(glidername);
		}catch(err){
			console.log(err);
		}
	};

	return my;
}(window.mk8,this,jQuery,undefined))

