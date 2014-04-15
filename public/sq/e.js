

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
	},
	select_add: function() {
		return this.each(function() {
			var $el = $(this);
			var current_top = $el.offset().top;
			var current_left = $el.offset().left;
			$.undone("register",
				function () {
					$('.main i').removeClass("sel").filter(function() {
						var $this = $(this);
						var top = $this.offset().top;
						var left = $this.offset().left;
						var c1 = top >= select_top && top <= current_top;
						var c2 = top <= select_top && top >= current_top;
						var c3 = left <= select_left && left >= current_left;
						var c4 = left >= select_left && left <= current_left;
						return (c1 || c2) && (c3 || c4);
					}).addClass("sel");
					// console.log(Math.abs(select_left - current_left));
					// $select_box.css({
					// 	top: select_top <= current_top ? select_top : current_top,
					// 	left: select_left <= current_left ? select_left: current_left,
					// 	width: Math.abs(select_left - current_left) +  $el.outerWidth(),
					// 	height: Math.abs(select_top - current_top) + $el.outerHeight()
					// })
				},
				function () { $('i').removeClass("sel"); }
			);
		});
	},
	select_del: function() {
		return this.each(function() {
			var $el = $(this);
			$.undone("register",
				function () { $el.removeClass("sel"); },
				function () { $el.addClass("sel"); }
			);
		});
	}
});

$(function() {

	$.undone();

	window.acting = false;
	window.clearing = false;
	window.selecting = false;
	window.select_left = 0;
	window.select_top = 0;
	// window.$select_box = $('<div class="select-box"></div>');
	window.$body = $("body");

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

	// var $body = $("body");
	var $container = $('<div class="container"></div>');
	var $sq = $("<b><i></i><i></i><i></i></b>");
	var w = $(window).width();
	// h = $(window).height();
	// a = w / h;
	var n = 12;
	// xpx = w / n;
	// var x = w / n * 100 / w;
	// y = h / n * 100 / h / 2;
	// ypx = w / n / a;
	// y = (ypx / h) * 100;
	// y_count = h / ypx;
	// y = h / n * 100 / h;
	var total = n * 100;
	// hex = getRandomColor();
	hex = "#000";
	// del = false;

	// $("body").append("<style>b{width:"+x+"%;height:30px;}</style>");

	for (i = 1; i <= total; i++) {
		$sqx = $sq.clone();
		$container.append($sqx);
	}

	$body.append($container.clone().addClass("main"));
	$(".grid").append($container.clone());


	// events

	$body.on("mousedown", "i", function(e){
		var $el = $(this);
		// var style = $el.attr("style");
		// $(this).css("background-color", getRandomColor());
		// $(this).css("background-color", hex);
		// $el.attr("style","background:"+hex);
		// var file = "/sq/2.mp3";
		// var snd = new Audio(file);
		// snd.play();
		// return false;
		if (selecting) {
			select_left = $el.offset().left;
			select_top = $el.offset().top;
			(e.shiftKey) ? $el.select_del() : $el.select_add();
			// $body.append($select_box);
			// $select_box.css({
			// 	top: select_top,
			// 	left: select_left,
			// 	width: $el.width(),
			// 	height: $el.height()
			// })
		} else {
			$el.update();
		}
	});

	$body.on("mouseenter", "i", function(e){
		var $el = $(this);
		if (selecting && acting) {
			(e.shiftKey) ? $el.select_del() : $el.select_add();
			// var current_left = $el.offset().left;
			// var current_top = $el.offset().top;
			// $select_box.css({
			// 	top: select_top <= current_top ? select_top : current_top,
			// 	left: select_left <= current_left ? select_left: current_left,
			// 	width: Math.abs(select_left - current_left) +  $el.outerWidth(),
			// 	height: Math.abs(select_top - current_top) + $el.outerHeight()
			// })
		} else if (acting) {
			$el.update();
		}
	});

	$body.on("keydown", function(e){
		var key = e.which;
		console.log(key);
		var $sel = $(".sel");
		if (e.ctrlKey) { // ctrl
			if (key === 90) {
				$.undone("undo"); // z
			}
			if (key === 89) $.undone("redo"); // y
		}
		if (key == 32) $("#options").fadeToggle("fast"); // space
		if (key == 77) selecting = selecting ? false : true; // m
		if (key == 78) { // n
			$sel.removeClass("sel");
			$select_box.remove();
		}
		if (key == 71) { // g
			if ($body.hasClass("show-grid")) {
				$body.removeClass("show-grid");
			} else {
				$body.addClass("show-grid");
			}
		}
		if (key == 46) { // del
			$sel.removeAttr("style");
		}
		if (key == 70) { // f
			$sel.attr("style", "background:" + hex);
		}
	});

	$body.on("keypress", function(e){
		return false;
	});

	$body.on("click", ".color", function(e){
		var target = document.querySelector('input[name="colortarget"]:checked').value;
		var $el = $(this);
		var color = $el.css("background-color");
		switch (target) {
			case "brush":
				$el.addClass("active").siblings().removeClass("active");
				if ($el.hasClass("del")) {
					clearing = true;
				} else {
					clearing = false;
					hex = color;
				}
				break;
			case "body":
				$("body").css("background-color", color);
				break;
			case "container":
				$(".container").css("background-color", color);
				break;
			case "selection":
				var $sel = $(".sel");
				if ($el.hasClass("del")) {
					$sel.removeAttr("style");
				} else {
					$sel.attr("style", "background:" + color);
				}
				break;
		}
		$("#options").fadeOut("fast");
	});

	$body.on("mousedown", function(e){
		acting = true;
		e.preventDefault();
	});

	$body.on("mouseup", function(e){
		acting = false;
		select_left = 0;
		select_top = 0;
	});

	// $(window).on("undone:change", function(e, name, undoLen, redoLen){
		// console.log(name);
		// console.log(undoLen);
		// console.log(redoLen);
	// });
});