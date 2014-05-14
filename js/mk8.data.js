//Define the cartBuilder namespace if it doesn't exist.
//pass in reference to its parent, the window, jquery and undefined incase someone did something dumb
mk8.data = (function(mk8,window,$,undefined) {
	var my = {},
	drivers = [],
	chassies = [],
	tires = [],
	gliders = [];

	my.init = function(){
		initDrivers();
		initChassies();
		initTires();
		initGliders();
	};

	//region #Driver Data 
	my.getDriverStatsByClass = function(weightclass){
		switch(weightclass){
			case 0: //Light class
				return {
					Speed : 2.25,
					Acceleration : 3.25,
					Weight : 2.25,
					Handling : 4.75,
					Grip : 4.5
				};
			case 1: //Light-Medium
				return {
					Speed : 2.75,
					Acceleration : 3.0,
					Weight : 2.75,
					Handling : 4.25,
					Grip : 4.25
				};
			case 2: //Medium
				return {
					Speed : 3.25,
					Acceleration : 2.75,
					Weight : 3.25,
					Handling : 3.75,
					Grip : 4.0
				};
			case 3: //Fast-Medium
				return {
					Speed : 3.75,
					Acceleration : 2.5,
					Weight : 3.75,
					Handling : 3.25,
					Grip : 3.75
				};
			case 4: //Fast-Heavy
				return {
					Speed : 4.25,
					Acceleration : 2.25,
					Weight : 4.25,
					Handling : 2.75,
					Grip : 3.5
				};
			case 5: //Heavy
				return {
					Speed : 4.25,
					Acceleration : 2.0,
					Weight : 4.75,
					Handling : 2.75,
					Grip : 3.25
				};
			case 6: //Super Heavy
				return {
					Speed : 4.75,
					Acceleration : 2.0,
					Weight : 4.75,
					Handling : 2.25,
					Grip : 3.25
				};
			default:
				return baseStats;
		}
	};

	//Initializes the driver array
	var initDrivers = function(){
		//For each weight class, build each driver
		for(var x = 0; x < 7; x++){
			$(driverList[x]).each(function(index,value){
				drivers[value] =  new Driver(value,x); 
			});
		}
	};

	my.getDriverByName = function(drivername){
		if(drivername){
			if(drivers.hasOwnProperty(drivername)){
				return drivers[drivername];
			}else{
				throw "Unable to find driver named:" + drivername;
			}
		}else{
			return new Driver("BLANK",-1);
		}
	};

	my.getDriverGrid = function(){
		return driverGrid;
	};
	//endregion #DriverData

	//region #Chassie Data
	my.getChassieDataByName = function(chassie){
		if(chassie){
			if(chassiesList.hasOwnProperty(chassie)){
				return chassiesList[chassie];
			}else{
				throw "Unable to find chassie named:" + chassie;
			}
		}else{
			return chassies;
		}
	};

	my.getChassieByName = function(chassiename){
		if(chassiename){
			if(chassies.hasOwnProperty(chassiename)){
				return chassies[chassiename];
			}else{
				throw "Unable to find chassie named:" + chassiename;
			}
		}else{
			return new Chassie("BLANK");
		}
	};

	var initChassies = function(){
		for(var x in chassiesList){
			if(chassiesList.hasOwnProperty(x)){
				chassies[x] = new Chassie(x);
			}
		}
	};

	//endregion #Chassie Data

	//region #Tire Data
	my.getTireDataByName = function(tirename){
		if(tirename){
			if(tiresList.hasOwnProperty(tirename)){
				return tiresList[tirename];
			}else{
				throw "Unable to find tire:" + tirename;
			}
		}else{
			return tires;
		}
	};

	my.getTireByName = function(tirename){
		if(tirename){
			if(tires.hasOwnProperty(tirename)){
				return tires[tirename];
			}else{
				throw "Unable to find tire named:" + tirename;
			}
		}else{
			return new Tire("BLANK");
		}
	};


	var initTires = function(){
		for(var x in tiresList){
			if(tiresList.hasOwnProperty(x)){
				tires[x] = new Tire(x);
			}
		}
	};
	//endregion #TireData

	//region #Glider Data
	my.getGliderDataByName = function(glidername){
		if(glidername){
			if(glidersList.hasOwnProperty(glidername)){
				return glidersList[glidername];
			}else{
				throw "Unable to find glider named:" + glidername;
			}
		}else{
			return gliders;
		}
	};

	my.getGliderByName = function(glidername){
		if(glidername){
			if(gliders.hasOwnProperty(glidername)){
				return gliders[glidername];
			}else{
				throw "Unable to find glider named:" + glidername;
			}
		}else{
			return new Glider("BLANK");
		}
	};

	var initGliders = function(){
		for(var x in glidersList){
			if(glidersList.hasOwnProperty(x)){
				gliders[x] = new Glider(x);
			}
		}
	};

	//endregion #Glider Data

	my.baseStats = function(){
		return {
			Speed : 0,
			Acceleration : 0,
			Weight : 0,
			Handling : 0,
			Grip : 0
		}
	}

	var baseStats = {
		Speed : 0,
		Acceleration : 0,
		Weight : 0,
		Handling : 0,
		Grip : 0
	};

	var driverList = {
		0 : ["Baby Mario", "Baby Luigi", "Baby Daisy","Baby Peach", "Baby Rosalina", "Lemmy", "Mii(Light)"], //Light
		1 : ["Toad","Toadette","Wendy","Larry","Lakitu","Koopa Troopa","Shy Guy"], //Light Medium
		2 : ["Yoshi","Peach","Daisy","Mii (Medium)"], //Medium
		3 : ["Mario","Luigi","Ludwig","Iggy"], //Fast-Medium
		4 : ["Donkey Kong","Roy","Waluigi","Rosalina"], //Fast-Heavy
		5 : ["Metal Mario","Pink Gold Peach", "Mii (Heavy)"], //Heavy
		6 : ["Wario", "Morton", "Bowser"] //Super Heavy
	};

	var chassiesList = {
		"Standard Kart" : baseStats,
		"Prancer" : baseStats,
		"Cat Cruiser" : baseStats,
		"Sneakart" : baseStats,
		"Mach 8" : {Speed : 0.5, Acceleration : -0.25, Weight : 0.25, Handling : 0, Grip : -1},
		"Steel Diver" : {Speed : 0, Acceleration : -0.25, Weight : 25, Handling : 0, Grip : -1},
		"Badwagon" : {Speed : 0, Acceleration : -0.5, Weight : 0.5, Handling : -0.5, Grip : 0.5},
		"Tri-Speeder" : {Speed : 0, Acceleration : -0.5, Weight : 0.5, Handling : -0.5, Grip : 0.5},
		"Biddybuggy" : {Speed : -0.75, Acceleration : 1.25, Weight : -0.5, Handling : 0.5, Grip : -0.25},
		"Landship" : {Speed	: -0.75, Acceleration : 1.25, Weight : -0.5, Handling : 0.5, Grip : -0.25},
		"Circuit Special" : {Speed : 0.5, Acceleration : -0.25, Weight : 0.25, Handling : 0, Grip : 1},
		"Pipe Frame" : {Speed : -0.25, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0.25},
		"Gold Standard" : {Speed : 0.25, Acceleration : -0.25, Weight : 0.25, Handling : 0, Grip : -0.25},
		"Sports Coupe" : {Speed : 0.5, Acceleration : -0.25, Weight : 0.25, Handling : 0, Grip : -1.0},

		"Standard Bike" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0.5, Grip : -0.5},
		"Sport Bike" : {Speed : 0, Acceleration : 0.75, Weight : -0.25, Handling : 0.75, Grip : -1.25},
		"Yoshi Bike" : {Speed : 0, Acceleration : 0.75, Weight : -0.25, Handling : 0.75, Grip : 1.25},
		"Jet Bike" : {Speed : 0, Acceleration : 0.75, Weight : -0.25, Handling : 0.75, Grip : -1.25},
		"Comet" : {Speed : 0, Acceleration : 0.75, Weight : -0.25, Handling : 0.75, Grip : 1.25},
		"Mr. Scooty" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0.5, Grip : -0.5},
		"Flame Rider" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0.5, Grip : -0.25},
		"Mr. Scooty" : {Speed : -0.75, Acceleration : 1.25, Weight : -0.5, Handling : 0.5, Grip : -0.25},
		"The Duke" : baseStats,

		"Standard Quad" : {Speed : -0, Acceleration : -0.5, Weight : 0.5, Handling : -0.5, Grip : 0.5},
		"Bear Rider" : baseStats,
		"Wild Wiggler" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0.5, Grip : -0.5},
		"BLANK" : baseStats
	};

	var tiresList = {
	     "Standard" : baseStats,
	     "Monster" : {Speed : 0, Acceleration : -0.5, Weight : 0.5, Handling : -.75, Grip : 0.75},
	     "Hot Monster" : {Speed : 0, Acceleration : -0.5, Weight : 0.5, Handling : -.75, Grip : 0.75},
	     "Slick" : {Speed : 0.5, Acceleration : -0.25, Weight : 0.25, Handling : 0, Grip : -1},
	     "Cyber Slick" : {Speed : 0.5, Acceleration : -0.25, Weight : 0.25, Handling : 0, Grip : -1},
	     "Roller" : {Speed : -0.5, Acceleration : 1, Weight : -0.5, Handling : 0.25, Grip : -0.25},
	     "Azure Roller" : {Speed : -0.5, Acceleration : 1, Weight : -0.5, Handling : 0.25, Grip : -0.25},
	     "Slim" : {Speed : 0.25, Acceleration : -0.25, Weight : 0, Handling : 0.25, Grip : -0.5},
	     "Crimson Slim" : {Speed : 0.25, Acceleration : -0.25, Weight : 0, Handling : 0.25, Grip : -0.5},
	     "Metal" : {Speed : 0.25, Acceleration : -0.5, Weight : 0.5, Handling : 0, Grip : -0.5},
	     "Retro Off-Road" : baseStats,
	     "Wood" : {Speed : -0.25, Acceleration : 0.25, Weight : -0.25, Handling : -0.25, Grip : 0.5},
	     "Gold Tires" : {Speed : 1, Acceleration : -0.5, Weight : 0.5, Handling : -1.25, Grip : -2.5},
	     "Sponge" : {Speed : -0.25, Acceleration : 0.5, Weight : -0.75, Handling : 0, Grip : 0},
	     "Normal Blue" : baseStats,
	     "Block" : baseStats,
	     "Button" : baseStats,
	     "Cushion" : {Speed : -0.25, Acceleration : 0.25, Weight : -0.25, Handling : -0.25, Grip : 0.5},
	     
	     "BLANK" : baseStats
	};

	var glidersList = {
       "Wario Glider" : baseStats,
       "Waddle Wing" : baseStats,
       "Sail Plane" : baseStats,
       "Cloud Balloon" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0},
       "Flower Glider" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0},
       "Koopa Kite" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0},
       "MKTV Parafoil" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0},
       "Peach Parasol" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0},
       "Parachute" : {Speed : 0, Acceleration : 0.25, Weight : -0.25, Handling : 0, Grip : 0},
       "Super Glider" : baseStats,
       "BLANK" : baseStats
	};

	/// Defines the Driver Grid. Order is Left->Right, Top -> Bottom
	var driverGrid = [
		"Mario","Luigi","Peach","Daisy","Rosalina","Metal Mario", //Row 1
		"Yoshi","Toad","Koopa Troopa","Shy Guy","Lakitu","Toadette", //Row 2
		"Baby Mario", "Baby Luigi","Baby Peach", "Baby Daisy", "Baby Rosalina","Pink Gold Peach", //Row 3
		"Bowser", "Donkey Kong", "Wario", "Waluigi", "Lemmy","Roy", //Row 4
		"Iggy","Larry","Wendy","Ludwig","Morton","Mii" //Row 5
	];

	return my;
}(window.mk8,this,jQuery,undefined))

