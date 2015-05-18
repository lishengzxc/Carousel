;
(function($) {
    var Carousel = function(poster) {
        var self = this;
        this.poster = poster;
        this.posterItemMain = poster.find("ul");
        this.prevBtn = poster.find(".prev");
        this.nextBtn = poster.find(".next");
        this.posterItems = poster.find("li")
        this.posterFirstItem = this.posterItems.eq(0);
        this.posterLastItem = this.posterItems.last();
        this.rotateFlag = true;

        this.setting = {
            'width': 900,
            'height': 270,
            'posterWidth': 640,
            'posterHeight': 270,
            'verticalAlign': 'middle',
            'scale': 0.9,
            'speed': 500
        };
        $.extend(this.setting, this.getSetting());
        this.setSettingValue();
        this.setPosterPos();

        this.nextBtn.click(function(event) {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouselRotate("left");
            }

        });

        this.prevBtn.click(function(event) {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouselRotate("right");
            }
        });
    };

    Carousel.prototype = {
        carouselRotate: function(dir) {
            var _this_ = this;
            if (dir === "left") {
                this.posterItems.each(function() {
                    var self = $(this);
                    var prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem;
                    var width = prev.width();
                    var height = prev.height();
                    var zIndex = prev.css("zIndex");
                    var opacity = prev.css("opacity");
                    var left = prev.css("left");
                    var top = prev.css("top");

                    self.animate({
                        width: width,
                        height: height,
                        zIndex: zIndex,
                        opacity: opacity,
                        left: left,
                        top: top
                    }, _this_.setting.speed, function() {
                        _this_.rotateFlag = true;
                    });

                })
            } else {
                this.posterItems.each(function() {
                    var self = $(this);
                    var next = self.next().get(0) ? self.next() : _this_.posterFirstItem;
                    var width = next.width();
                    var height = next.height();
                    var zIndex = next.css("zIndex");
                    var opacity = next.css("opacity");
                    var left = next.css("left");
                    var top = next.css("top");

                    self.animate({
                        width: width,
                        height: height,
                        zIndex: zIndex,
                        opacity: opacity,
                        left: left,
                        top: top
                    }, _this_.setting.speed, function() {
                    	_this_.rotateFlag = true;
                    });

                })
            }
        },

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
                left: w,
                width: this.setting.posterWidth,
                height: this.setting.posterHeight,
                zIndex: Math.floor(this.posterItems.size() / 2)
            });
        },

        setPosterPos: function() {
            var _self_ = this;
            var sliceItems = this.posterItems.slice(1);
            var sliceSize = sliceItems.size();
            var rightSlice = sliceItems.slice(0, sliceSize / 2);

            var rlevel = Math.floor(this.posterItems.size() / 2);
            var rw = this.setting.posterWidth;
            var rh = this.setting.posterHeight;
            var gap = (this.setting.width - this.setting.posterWidth) / 2 / rlevel;
            var firstLeftR = (this.setting.width - this.setting.posterWidth) / 2
            var fixOffsetLeft = firstLeftR + rw;


            rightSlice.each(function(i) {
                rlevel--;
                rw = rw * _self_.setting.scale;
                rh = rh * _self_.setting.scale;

                $(this).css({
                    zIndex: rlevel,
                    width: rw,
                    height: rh,
                    opacity: 1 / (++i),
                    top: (_self_.setting.height - rh) / 2,
                    left: fixOffsetLeft + (i) * gap - rw
                });
            });

            var leftSlice = sliceItems.slice(sliceSize / 2);

            var llevel = Math.floor(this.posterItems.size() / 2);
            var lw = rightSlice.last().width();
            var lh = rightSlice.last().height();

            leftSlice.each(function(j) {

                $(this).css({
                    zIndex: rlevel,
                    width: lw,
                    height: lh,
                    opacity: 1 / llevel,
                    top: (_self_.setting.height - lh) / 2,
                    left: j * gap
                });
                llevel--;
                lw = lw / _self_.setting.scale;
                lh = lh / _self_.setting.scale;
            })
        },
        setVerticalAlign: function() {

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
