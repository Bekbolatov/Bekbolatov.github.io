

//apologies, this code is dirty

var calc = function(n, l, p) {
    if (p == 1) return n ^ (1 << (l - 1));

    var scale = (1 << (l - p));
    var box = (1 << p);
    var sn = Math.floor(n / scale) - Math.floor(Math.floor(n / scale) / box) * box;

// console.log(scale);
 //console.log(box);
// console.log(sn);


    if (sn == 0 || sn == (box - 1)) return n;
    if ((sn % 2) == 0) return n - scale;
    return n + scale;
};


var gen = function(d) {
    d = parseInt(d);

    var K = 25/(d + 1)/(d+1);


var ww = 25*K;
var ww1 = 20*K;
var ww2 = 7*K;
var h = 30*K;

var xL = ww;
var xT = h + 20;
var xR = 0;

var ps = pairs(d);

var x = xL + ww1;

var xsize = x;
for( l = 0; l < ps.length; l++) {
    var stage = ps[l];
    for (d = 0; d < stage.length; d++) {
        var xx = xsize;
        var bottom = -1;
        var cs = stage[d];
        for (var c in cs) {
            var nodes = c.split(":");
            var p1 = parseInt(nodes[0]);
            var p2 = parseInt(nodes[1]);
            if (bottom >= p1) {
                xsize += ww2;
            } else {
                xsize = xx;
            }
            bottom = p2;
        }
        xsize += ww1;
    }
    xsize += ww;
}

    var c = document.getElementById("myCanvas");
    var cp = c.parentElement;
    cp.removeChild(c);

    var mycanvas = document.createElement("canvas");
    mycanvas.id = "myCanvas";
    mycanvas.width = xsize + ww;
    mycanvas.height = Math.pow(2, d) * h + xT;


    cp.appendChild(mycanvas);

    var ctx = mycanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fill();


    ctx.font="15px Georgia";
    ctx.fillText("Batcher's Odd-Even Sorting Network of degree " + d, 10, 15);

    ctx.beginPath();


for( l = 0; l < ps.length; l++) {
    var stage = ps[l];
    for (d = 0; d < stage.length; d++) {
        var xx = x;
        var bottom = -1;
        var cs = stage[d];
        for (var c in cs) {
            var nodes = c.split(":");
            var p1 = parseInt(nodes[0]);
            var p2 = parseInt(nodes[1]);
            if (bottom >= p1) {
                x = x + ww2;
            } else {
                x = xx;
            }
            bottom = p2;
            ctx.moveTo(x, nodes[0]*h + xT);
            ctx.lineTo(x, nodes[1]*h + xT);
        }
        x = x + ww1;
    }
    x = x + ww;
}

for( i = 0; i < Math.pow(2, d); i++) {
    ctx.moveTo(xL, i*h + xT);
    ctx.lineTo(xL + x - ww, i*h + xT);
}


ctx.stroke();
}

var genit = function() {
    var deg=document.getElementById("deg");
    gen(deg.value);
}

var pairs = function(d) {
    var A = [];
    for (l = 1; l <= d; l++) {
        var X = [];
        for (p = 1; p <= l; p++) {
            var Y = [];
            for (n = 0; n < Math.pow(2, d); n++) {
                var partner = calc(n, l, p);
                //console.log("[" + l + ", " + p + "] " + n + " ~ " + partner);
                if (partner != n) {
                    var partner1, partner2;
                    if (partner > n) {
                        partner1 = n;
                        partner2 = partner;
                    } else {
                        partner1 = partner;
                        partner2 = n;
                    }
                    Y[partner1 + ":" + partner2] = partner1 + ":" + partner2;
                }
            }
            X.push(Y);
        }
        A.push(X);
    }
    return A;
}

$(document).ready(function() {



gen(3);





});



