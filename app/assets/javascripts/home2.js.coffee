

$ ->
	tiles = 20 # 10,20,30
	nums = _.shuffle([1..tiles])
	$container = $('#container')

	$('#logo-text').lettering()

	for i in [0..tiles-1]
		n = nums[i].toString()
		$container.append('<div class="item" data-n="' + n + '"></div>')

	$container.css
		height: $container.height()

	$items = $( ".item" )

	$items.each ->
		$el = $(this)
		$el
		.attr('data-x', $el.position().left)
		.attr('data-y', $el.position().top)

	$items.each ->
		$el = $(this)
		$target = $items.eq(eval($el.attr("data-n")) - 1)
		# hue = Math.floor(Math.random() * 360)
		$el.css
			position: 'absolute'
			left: $el.attr('data-x') + 'px'
			top: $el.attr('data-y') + 'px'
			# 'background-color':  "hsl(" + hue + ", 60%, 50%)"
			'background-position': '-' + $target.attr('data-x') + 'px -' + $target.attr('data-y') + 'px'
		if eval($el.attr("data-n")) == $el.index() + 1
			$el.text('').addClass('checked').css('opacity', 1)


	$items.not('.checked').draggable({
		revert: "invalid"
		containment: "parent"
	})

	$items.not('.checked').droppable({
		hoverClass: "drop-hover"
		activate: ( event, ui ) ->
			$item1 = $(ui.draggable)
			$item1.css
				'z-index': 10000
		drop: ( event, ui ) ->
			$item1 = $(ui.draggable)
			$item2 = $(this)
			$next1 = $item1.next()
			$next2 = $item2.next()

			# swap positions (use CSS animations)
			$item1.animate
				top: $item2.attr('data-y')
				left: $item2.attr('data-x')
				'z-index': 1
			$item2.animate
				top: $item1.attr('data-y')
				left: $item1.attr('data-x')
			, ->
				# reset data values
				$item1.attr('data-x', $item1.position().left)
				$item1.attr('data-y', $item1.position().top)
				$item2.attr('data-x', $item2.position().left)
				$item2.attr('data-y', $item2.position().top)

				if $next2.length
					$item1.insertBefore $next2
				else
					$item1.appendTo $item1.parent()

				if $next1.length
					$item2.insertBefore $next1
				else
					$item2.appendTo $item2.parent()

				if eval($item1.attr("data-n")) == $item1.index() + 1
					$item1.text('').addClass('checked').css('opacity', 1)
					.droppable( "destroy" )
					.draggable( "destroy" )
				if eval($item2.attr("data-n")) == $item2.index() + 1
					$item2.text('').addClass('checked').css('opacity', 1)
					.droppable( "destroy" )
					.draggable( "destroy" )

				if $('.checked').length == tiles
					setTimeout ->
						$container.addClass 'completed'
						playSound "/assets/super-orpheus.mp3"
					, 500
	})


playSound = (soundfile) ->
	$('body').append "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />"
