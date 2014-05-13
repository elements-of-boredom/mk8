var BaseEntity = Class.extend({
	init : function(name){
		this.name = name;
	},
	stats : mk8.data.baseStats
})

var Driver = BaseEntity.extend({
	init : function(name,weightclass){
		this._super(name);
		this.stats = mk8.data.getDriverStatsByClass(weightclass);
	}
});

var Chassie = BaseEntity.extend({
	init : function(name){
		this._super(name);
		this.stats = mk8.data.getChassieDataByName(name);
	}
});

var Tire = BaseEntity.extend({
	init : function(name){
		this._super(name);
		this.stats = mk8.data.getTireDataByName(name);
	}
});

var Glider = BaseEntity.extend({
	init : function(name){
		this._super(name);
		this.stats = mk8.data.getGliderDataByName(name);
	}
});


