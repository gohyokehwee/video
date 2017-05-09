var videoLength, slider, from, to;
var frameRate = 29;
var timing;
var test = 0.1;
var startSec = 0;
var vidH = $('<div/>').attr('id','vid').appendTo('body');

//replace src with other mp4 or ogg files.
vid = $('<video/>',{
	id : 'video1',
	width : '100%',
	src : 'retsuko.mp4',
	controls : false,
});

vid.appendTo(vidH);
var slide = $('<div/>').attr('id', 'slider').appendTo(vidH);
$(`<input type='text' id='range' value='' name='range' />`).appendTo('#slider');

$(vid).click(function(){
	if($(this).get(0).paused){
		$(this).get(0).play();
	}else{
		$(this).get(0).pause();
	}
	
});

$(function(){
	setTimeout(function(){
		videoLength = ($(vid).get(0).duration);
		$("#range").ionRangeSlider({
			hide_min_max: true,
			keyboard: true,
			min: startSec,
			max: videoLength,
			from: videoLength*0.3,
			to: videoLength*0.7,
			type: 'double',
			step: 0.1,
			postfix: "s",
			onChange : function(data) {
				from = data.from;
				to = data.to;
				endSec = data.to;
				startVid(from);
			},
		});
		slider = $('#range').data("ionRangeSlider");


	}, 300);
})

var timeHolder = $('<p/>').attr('id','timer').appendTo(vidH);

$(vid).get(0).onplay = function(){
	timing = setInterval(function(){
		document.getElementById('timer').innerHTML = $(vid).get(0).currentTime;
		if($(vid).get(0).currentTime > to ){
			$(vid).get(0).currentTime = from;
		}
	}, 1000/frameRate);
}

$(vid).get(0).onpause = function(){
	clearInterval(timing);
}

function playPause(){
	$(vid).get(0).currentTime = test;
	test += 0.1;
}


function startVid(time){
	$(vid).get(0).currentTime=time;
}
