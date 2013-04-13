shuffle = (array) ->
  m = array.length
  t = undefined
  i = undefined
  while m
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  array

images =
	"http://farm6.staticflickr.com/5121/5248531098_1e53c97f07_b_d.jpg": "teddy"
	"http://farm3.staticflickr.com/2599/4142743227_5fed46c428_b_d.jpg": "seal"
	"http://i.imgur.com/hlgm1iC.jpg": "puppy"

imagelist = []
imagelist.push key for key of images

$.backstretch shuffle(imagelist),
  	duration: 15000,
  	fade: 2000;

sounds = {}
sounds.feedme = new Audio "//dl.dropboxusercontent.com/u/2724547/serve/autismhackathon/feedmeplease.wav"
sounds.yumthankyou = new Audio "https://dl.dropboxusercontent.com/u/2724547/serve/autismhackathon/yummy.wav"

$(window).on "backstretch.show", (e, instance) ->
  url = instance.images[instance.index]
  sounds.feedme.play()

$("body").click ->
	sounds.yumthankyou.play()
	$('body').data('backstretch').next()