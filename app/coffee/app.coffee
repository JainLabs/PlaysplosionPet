$('.main').backstretch('/images/guinea.jpg')

$foodSection = $('.side .accordion .foods ul')
for im in ['carrots.png','greens.png','pear.png','pepper.png']
	el = "<li><img src='images/foods/#{im}' alt='#{im.split('.')[0]}' /></li>"
	$foodSection.append(el)