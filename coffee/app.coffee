class Sidebar
	constructor: () ->
		@el = $(".side")
		@addItems()
			# $(this).animate 'margin-left': '100%', 1000
		@el.hammer().on 'swiperight doubletap', '.foods li', ->
			pig.setImage "/images/eating.gif", 3000
			pig.say "Yummy! Thank you!"
			$(this).fadeOut('slow').delay(7000).fadeIn()
			pig.addSound "My tummy hurts! Could you rub it?"

		@el.hammer().on 'swiperight doubletap', '.play li', ->
			pig.setImage "/images/run.gif", 3000
			pig.say "This is fun!"

	addItems: ->
		$section = @el.find '.foods ul'
		for im in ['carrots.png','greens.png','pear.png','pepper.png']
			$section.append Sidebar.imageEl('/images/foods', im)

		$section = @el.find '.play ul'
		for im in ['wheel.jpg']
			$section.append Sidebar.imageEl('/images', im)

	@imageEl: (path, im) ->	
		name = im.split('.')[0]
		"""
		<li>
			<img src='#{path}/#{im}' alt='#{name}' />
			<h5 class="subheader">#{name}</h5>
		</li>
		"""


class Sounds
	@text: (str) -> new Audio "http://tts-api.com/tts.mp3?q=#{str.replace ' ', '+'}"
	@feed: new Audio "/audio/feed.wav"
	@fun: new Audio "/audio/fun.wav"
	@gentle: new Audio "/audio/gentle.wav"
	@tummyfeelsbetter: new Audio "/audio/tummyfeelsbetter.wav"
	@tumrub: new Audio "/audio/tumrub.wav"
	@yummy: new Audio "/audio/yummy.wav"

class Guinea
	constructor: ->
		@tasks = []
		@stage = $('.main').hammer()
		@stage.on 'touchend', =>
			if @tasks.length is 0
				Sounds.text("Do you want to play?").play()
			else
				@tasks.shift()()
		@stage.on 'pinchout', =>
			@say "My tummy feels much better!"
		@stage.on 'pinchout', =>
			@say "Could you be more gentle?"


	setImage: (url, revert) ->
		last = $('.main').css "background-image"
		next = "url(#{url})"
		$('.main').css("background-image", next)
		setTimeout (=>
			$('.main').css("background-image", last)
		), +revert

	setHungerInterval: (msec) ->
		setInterval (=>
			@addSound "Could you feed me, please?"
		), msec

	addTask: (fn) ->
		@tasks.push fn

	addSound: (snd) ->
		if not snd.play? then snd = Sounds.text(snd)
		@addTask =>
			snd.play()

	say: (snd) ->
		if not snd.play? then snd = Sounds.text(snd)
		snd.play()

side = new Sidebar
pig = new Guinea
pig.setHungerInterval 30000
pig.addSound "Hello! I am a guinea pig."
pig.addSound "I need some exercise. Can we have play time?"
pig.addSound "Could you feed me, please?"