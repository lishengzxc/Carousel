;(function($){
	var Carousel = function(poster) {
		this.poster = poster;
		this.posterItemMain = poster.find("ul");
		this.prevBtn = poster.find(".prev");
		this.nextBtn = poster.find(".next");
		this.posterFirstItem = this.posterItemMain.find("li").eq(0);

		this.setting = {
			'width':800,
			'height': 270,
			'posterWidth': 640,
			'posterHeight': 270,
			'verticalAlign': 'middle',
			'scale': 0.9,
			'speed': 500
		};
		$.extend(this.setting, this.getSetting());
		this.setSettingValue();
	};

	Carousel.prototype = {
		getSetting: function() {
			var setting = this.poster.attr("data-setting");
			if (setting && setting !== "") {
				return $.parseJSON(setting);
			} else {
				return {};
			}	
		},

		setSettingValue: function() {
			this.poster.css({
				width: this.setting.width,
				height: this.setting.height
			});
			this.posterItemMain.css({
				width: this.setting.width,
				height: this.setting.height
			});
			var w = (this.setting.width - this.setting.posterWidth) / 2;
			this.prevBtn.css({
				width: w,
				height: this.setting.height
			});
			this.nextBtn.css({
				width: w,
				height: this.setting.height
			});
			this.posterFirstItem.css({
				left: w
			});



		}
	};
	Carousel.init = function(posters) {
		var _this_ = this;
		posters.each(function() {
			new _this_($(this));
		})
	};

	window["Carousel"] = Carousel;
})(jQuery);