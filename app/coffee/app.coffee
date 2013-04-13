imageEl = (path, im) -> "<li><img src='#{path}/#{im}' alt='#{im.split('.')[0]}' /></li>"

pig = undefined
side = undefined

class Sidebar
	constructor: () ->
		@$el = $(".side")
		$accordion = @$el.find '.accordion'

		$section = $accordion.find '.foods ul'
		for im in ['carrots.png','greens.png','pear.png','pepper.png']
			$section.append imageEl('/images/foods', im)

		$accordion.find(".foods img").click ->
			pig?.say "Yummy! Thank you!"
			$(this).fadeOut('slow').delay(7000).fadeIn()

		$section = $accordion.find '.play ul'
		for im in ['wheel.jpg']
			$section.append imageEl('/images', im)

class Sounds
	@text: (str) ->
		new Audio "http://tts-api.com/tts.mp3?q=#{str.replace ' ', '+'}"

	@yumthankyou: new Audio "https://dl.dropboxusercontent.com/u/2724547/serve/autismhackathon/yummy.wav"

class Guinea
	constructor: ->
		@tasks = []
		$('.main').click =>
			if @tasks.length is 0
				Sounds.text("Do you want to play?").play()
			else
				@tasks.shift()()

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


# setTimeout((->
#   Sounds.text("Hello! I am a guinea pig").play()

#   $(".side .foods img").click ->
#     Sounds.text("Yummy! Thank you!").play()
#     $(this).unbind 'click'
#     $(this).fadeOut('slow')

#     setTimeout((->
			
# 		), 1500)    	

# ), 1000)



$('.main').backstretch('/images/guinea.jpg')