/**
 * Rainbow object
 * Created by Rocky
 * Date: 11-14-2016
 * Usage:
 *
 * Rainbow.defaults.selector = '.text';
 * Rainbow.defaults.speed = 100;
 * Rainbow.start();
 */


var Rainbow = {
    defaults: {
        selector: '#rainbow',
        speed: 1000
    },
    data: {
        nodes: {},
        hue: 0,
        j: 0,
        interval: 10
    },
    init: function() {
        this.data.nodes = document.querySelectorAll(this.defaults.selector);
        this.data.interval = Math.ceil(this.defaults.speed / 100);
    },
    start: function () {
        var _ = this;
        _.init();
        setInterval(function () {
            _.run(_);
        }, _.data.interval);
    },
    run: function (self) {
        var rainbowtext = '';
        for (var n = 0; n < self.data.nodes.length; n++) {
            if(self.data.nodes[n].text == undefined) self.data.nodes[n].text = self.data.nodes[n].innerHTML;
            var text = self.data.nodes[n].text;
            if (text == null)continue;
            if (text.length > 0)
                self.data.step = 360 / (text.length);
            for (var i = 0; i < text.length; i++) {
                rainbowtext = rainbowtext + '<span style="color:' + self.color_from_hue(self.data.hue) + '">' + text.charAt(i) + '</span>';
                self.data.hue += self.data.step;
                if (self.data.hue > 360) self.data.hue -= 360;
            }
            self.data.nodes[n].innerHTML = rainbowtext;
            rainbowtext = '';
        }
        self.data.hue = self.data.j;
        self.data.j++;
        if (self.data.j > 360) self.data.j = 0;
    },
    color_from_hue: function (hue) {
        var h = hue/60;
        var c = 255;
        var x = (1 - Math.abs(h%2 - 1))*255;
        var color;
        var i = Math.floor(h);
        if (i == 0) color = this.rgb_to_hex(c, x, 0);
        else if (i == 1) color = this.rgb_to_hex(x, c, 0);
        else if (i == 2) color = this.rgb_to_hex(0, c, x);
        else if (i == 3) color = this.rgb_to_hex(0, x, c);
        else if (i == 4) color = this.rgb_to_hex(x, 0, c);
        else color = this.rgb_to_hex(c, 0, x);
        return color;
    },
    rgb_to_hex: function (red, green, blue) {
        var h = ((red << 16) | (green << 8) | (blue)).toString(16);
        while (h.length < 6) h = '0' + h;
        return '#' + h;
    }
};
