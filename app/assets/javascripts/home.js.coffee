

$ ->
	tiles = 50 # 10,20,30
	$container = $('#container')

	nums = _.shuffle([1..tiles])

	for i in [0..tiles-1]
		n = nums[i].toString()
		$container.append('<div class="item">' + n + '</div>')

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
		hue = Math.floor(Math.random() * 360)
		$el.css
			position: 'absolute'
			left: $el.attr('data-x') + 'px'
			top: $el.attr('data-y') + 'px'
			background:  "hsl(" + hue + ", 60%, 50%)"
		if eval($el.text()) == $el.index() + 1
			$el.animate
				opacity: 0

	$items.draggable({
		revert: "invalid"
		containment: "parent"
	})

	$items.droppable({
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

			# swap positions
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

				if eval($item1.text()) == $item1.index() + 1
					$item1.animate
						opacity: 0
				if eval($item2.text()) == $item2.index() + 1
					$item2.animate
						opacity: 0
	})