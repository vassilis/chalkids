

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

$(function() {

	window.drawing = false;
	var $options = $("#options");
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
		$color.css("background", colors[i]);
		$colors.append($color);
	}
	$options.append($colors);

	$body = $("body");
	$container = $('<div class="container"></div>');
	$sq = $("<b><i></i><i></i><i></i></b>");
	w = $(window).width();
	h = $(window).height();
	// a = w / h;
	n = 12;
	// xpx = w / n;
	x = w / n * 100 / w;
	// y = h / n * 100 / h / 2;
	// ypx = w / n / a;
	// y = (ypx / h) * 100;
	// y_count = h / ypx;
	y = h / n * 100 / h;
	total = n * n;
	// hex = getRandomColor();
	hex = "#000";

	$("body").append("<style>b{width:"+x+"%;height:"+y+"%;}</style>");

	for (i = 1; i <= total; i++) {
		$sqx = $sq.clone();
		$container.append($sqx);
	}

	$body.append($container.clone().addClass("main"));
	$body.append($container.clone().addClass("grid"));


	// events

	$("i").on("click", function(){
		$el = $(this);
		if (!$el.hasClass("ui-draggable-dragging")) {
			// $(this).css("background", getRandomColor());
			$(this).css("background", hex);
			var file = "/sq/2.mp3";
			var snd = new Audio(file);
			snd.play();
		}
		return false;
	});

	$("i").on("mouseenter", function(){
		$el = $(this);
		if (window.drawing) {
			$(this).css("background", hex);
		}
		return false;
	});

	$body.on("keypress", function(e){
		// console.log(e.which);
		if (e.which == 32) {
			$("#options").toggle();
		}
		if (e.which == 103) {
			if ($("body").hasClass("show-grid")) {
				$("body").removeClass("show-grid");
			} else {
				$("body").addClass("show-grid");
			}
		}
		return false;
	});

	$body.on("click", ".color", function(e){
		$el = $(this);
		$el.addClass("active").siblings().removeClass("active");
		hex = $el.css("background");
		$("#options").hide();
	});

	$body.on("mousedown", function(e){
		window.drawing = true;
		e.preventDefault();
	});

	$body.on("mouseup", function(e){
		window.drawing = false;
		e.preventDefault();
	});
});