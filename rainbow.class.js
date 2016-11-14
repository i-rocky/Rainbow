/**
 * Rainbow class
 * Created by Rocky
 * Date: 11-14-2016
 * Usage:
 *
 * var rainbow = new Rainbow;
 * rainbow.setup({
 *   selector: '.text
 * });
 * rainbow.start();
 */

(function () {
    this.Rainbow = function () {
        var defaults = {
            selector: '.rainbow',
            speed: 1000
        };
        var data = {
            nodes: {},
            hue: 0,
            j: 0,
            interval: 10
        };
        this.setup = function (setup) {
            if(setup.selector!=null) defaults.selector = setup.selector;
            if(setup.speed!=null) defaults.speed = setup.speed;
        };
        this.start = function () {
            init();
            setInterval(function () {
                run();
            }, data.interval);
        };
        function init() {
            data.nodes = document.querySelectorAll(defaults.selector);
            data.interval = Math.ceil(defaults.speed / 100);
        }
        function run() {
            var rainbowtext = '';
            for (var n = 0; n < data.nodes.length; n++) {
                if(data.nodes[n].text == undefined) data.nodes[n].text = data.nodes[n].innerHTML;
                var text = data.nodes[n].text;
                if (text == null)continue;
                if (text.length > 0)
                    data.step = 360 / (text.length);
                for (var i = 0; i < text.length; i++) {
                    rainbowtext = rainbowtext + '<span style="color:' + color_from_hue(data.hue) + '">' + text.charAt(i) + '</span>';
                    data.hue += data.step;
                    if (data.hue > 360) data.hue -= 360;
                }
                data.nodes[n].innerHTML = rainbowtext;
                rainbowtext = '';
            }
            data.hue = data.j;
            data.j++;
            if (data.j > 360) data.j = 0;
        }
        function color_from_hue(hue) {
            var h = hue/60;
            var c = 255;
            var x = (1 - Math.abs(h%2 - 1))*255;
            var color;
            var i = Math.floor(h);
            if (i == 0) color = rgb_to_hex(c, x, 0);
            else if (i == 1) color = rgb_to_hex(x, c, 0);
            else if (i == 2) color = rgb_to_hex(0, c, x);
            else if (i == 3) color = rgb_to_hex(0, x, c);
            else if (i == 4) color = rgb_to_hex(x, 0, c);
            else color = rgb_to_hex(c, 0, x);
            return color;
        }
        function rgb_to_hex(red, green, blue) {
            var h = ((red << 16) | (green << 8) | (blue)).toString(16);
            while (h.length < 6) h = '0' + h;
            return '#' + h;
        }
    };
})();
