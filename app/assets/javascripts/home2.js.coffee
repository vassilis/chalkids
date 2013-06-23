

$ ->
	tiles = 20 # 10,20,30
	nums = _.shuffle([1..tiles])
	$container = $('#container')

	$('#logo-text').lettering()

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
		$target = $items.eq(eval($el.text()) - 1)
		hue = Math.floor(Math.random() * 360)
		$el.css
			position: 'absolute'
			left: $el.attr('data-x') + 'px'
			top: $el.attr('data-y') + 'px'
			'background-color':  "hsl(" + hue + ", 60%, 50%)"
			'background-position': '-' + $target.attr('data-x') + 'px -' + $target.attr('data-y') + 'px'
		if eval($el.text()) == $el.index() + 1
			$el.addClass('checked').animate
				opacity: 1
				color: 'transparent'

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
					$item1.addClass('checked').animate
						opacity: 1
						color: 'transparent'
					$item1.droppable( "destroy" )
					$item1.draggable( "destroy" )
				if eval($item2.text()) == $item2.index() + 1
					$item2.addClass('checked').animate
						opacity: 1
						color: 'transparent'
					$item2.droppable( "destroy" )
					$item2.draggable( "destroy" )

				if $('.checked').length == tiles
					$container.addClass 'completed'
	})