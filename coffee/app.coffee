class Sidebar
	constructor: () ->
		@el = $(".side")
		$section = @el.find '.foods ul'
		for im in ['carrots.png','greens.png','pear.png','pepper.png']
			$section.append Sidebar.imageEl('/images/foods', im)

		@el.hammer().on 'touch', '.foods li', ->
			pig?.say "Yummy! Thank you!"
			$(this).fadeOut('slow').delay(7000).fadeIn()

		$section = @el.find '.play ul'
		for im in ['wheel.jpg']
			$section.append Sidebar.imageEl('/images', im)

	@imageEl: (path, im) ->
		name = im.split('.')[0]
		"""
		<li>
			<img src='#{path}/#{im}' alt='#{name}' />
			<span class="label">#{name}</span>
		</li>
		"""

class Sounds
	@text: (str) ->
		new Audio "http://tts-api.com/tts.mp3?q=#{str.replace ' ', '+'}"

	@yumthankyou: new Audio "https://dl.dropboxusercontent.com/u/2724547/serve/autismhackathon/yummy.wav"

class Guinea
	constructor: ->
		@tasks = []
		$('.main').on 'touchend', =>
			if @tasks.length is 0
				Sounds.text("Do you want to play?").play()
			else
				@tasks.shift()()

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
pig.addSound "Hello! I am a guinea pig."
pig.addSound "Could you feed me, please?"
pig.addSound "I need some exercise. Play time!"