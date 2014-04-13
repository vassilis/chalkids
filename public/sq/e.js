

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

jQuery.fn.extend({
	update: function() {
		return this.each(function() {
			var $el = $(this);
			var style = $el.attr("style");
			if (clearing) {
				$.undone("register",
					function () { $el.removeAttr("style"); },
					function () { $el.attr("style", style); }
				);
			} else {
				$.undone("register",
					function () { $el.attr("style", "background:" + hex); },
					function () { $el.removeAttr("style"); }
				);
			}
		});
	}
});

$(function() {

	$.undone();

	window.acting = false;
	window.clearing = false;

	var $options = $("#options");
	var $del = $('<div class="color del"></div>');
	var colors = [
		"#000","#111","#222","#333","#444","#555",
		"#666","#777","#888","#999","#AAA","#BBB",
		"#CCC","#DDD","#EEE","#FFF",
		"#371A48","#532B71","#C3A3E6","#CBBDCA",
		"#D57CAC","#FF3577","#FEA597","#AD0747","#810253","#B0CC92",
		"#D3D5C0","#C8EE87","#EEF207","#FFF07F",
		"#FEAE01","#F13F01","#D20607","#C6D8DC",
		"#A9B2B7","#D5BDA5",
		"#8E9A76","#4F5A3A","#7F5E3D","#F16A56",
		"#1F1F41","#2C3E56","#61667C","#7099AF","#5D3DC4","#0084C2",
		"#0EC8BB","#009A66","#375659"
	]
	$colors = $("<div id='colors'></div>");
	for (i=0;i<colors.length;i++){
		var $color = $('<div class="color"></div>');
		$color.css("background-color", colors[i]);
		$colors.append($color);
	}
	$colors.append($del);
	$options.append($colors);

	var $body = $("body");
	var $container = $('<div class="container"></div>');
	var $sq = $("<b><i></i><i></i><i></i></b>");
	var w = $(window).width();
	// h = $(window).height();
	// a = w / h;
	var n = 12;
	// xpx = w / n;
	var x = w / n * 100 / w;
	// y = h / n * 100 / h / 2;
	// ypx = w / n / a;
	// y = (ypx / h) * 100;
	// y_count = h / ypx;
	// y = h / n * 100 / h;
	var total = n * 100;
	// hex = getRandomColor();
	hex = "#000";
	del = false;

	$("body").append("<style>b{width:"+x+"%;height:30px;}</style>");

	for (i = 1; i <= total; i++) {
		$sqx = $sq.clone();
		$container.append($sqx);
	}

	$body.append($container.clone().addClass("main"));
	$body.append($container.clone().addClass("grid"));


	// events

	$body.on("mousedown", "i", function(){
		// var $el = $(this);
		// var style = $el.attr("style");
		// $(this).css("background-color", getRandomColor());
		// $(this).css("background-color", hex);
		// $el.attr("style","background:"+hex);
		// var file = "/sq/2.mp3";
		// var snd = new Audio(file);
		// snd.play();
		// return false;
		$(this).update();
	});

	$body.on("mouseenter", "i", function(){
		if (acting) $(this).update();
	});

	$body.on("keydown", function(e){
		var key = e.which;
		// console.log(key);
		if (e.ctrlKey) { // ctrl
			if (key === 90) {
				$.undone("undo"); // z
			}
			if (key === 89) $.undone("redo"); // y
		}
		if (key == 32) $("#options").fadeToggle("fast"); // space
		if (key == 71) { // g
			if ($body.hasClass("show-grid")) {
				$body.removeClass("show-grid");
			} else {
				$body.addClass("show-grid");
			}
		}
		// return false;
	});

	$body.on("click", ".color", function(e){
		var $el = $(this);
		$el.addClass("active").siblings().removeClass("active");
		if ($el.hasClass("del")) {
			clearing = true;
		} else {
			clearing = false;
			hex = $el.css("background-color");
		}
		$("#options").fadeOut("fast");
	});

	$body.on("mousedown", function(e){
		acting = true;
		e.preventDefault();
	});

	$body.on("mouseup", function(e){
		acting = false;
		// e.preventDefault();
	});

	// $(window).on("undone:change", function(e, name, undoLen, redoLen){
		// console.log(name);
		// console.log(undoLen);
		// console.log(redoLen);
	// });
});