define(['ctype'], function(ctype){
	return {
		authEngine:function(){
			this.templateParams=function(){
				//params.options refer to this part
				//options is the name to be called (i.e. can be changed, with
				//other sections to be changed accordingly also.)

				return '{"url":["02w9lSii_Hs"]}'
			}
		},
		appEngine:function(params,domReadyCallback){
			// this section affects the user interface
			var optDiv=document.createElement("div");
			var inputDoms;
			var aHeight = 400, 
				aWidth = 400;
			var aMargin = {top : 10, bottom : 10, right : 10, left : 10};
			var videoLength, slider, from, to;
			var frameRate = 29;
			var timing;
			var test = 0.1;
			var startSec = 0;
			var vidH = $('<div/>').attr('id','vid').appendTo(optDiv);
			var temp,vid;


			require([],function(){
				//to initialise the video content
				vid = $('<video/>',{
					id : 'video1',
					width : '100%',
					src : 'retsuko.mp4',
					controls : false,
				});

				vid.appendTo(vidH);
				var slide2 = $('<div/>').attr('id', 'slider').appendTo(vidH);

				//clicking on vid itself allows play/pause
				$(vid).click(function(){
					if($(this).get(0).paused){
						$(this).get(0).play();
					}else{
						$(this).get(0).pause();
					}
					
				});

				//allow video to load to get metadata for video first to
				//allow initialisation of slider
				$(function(){
					setTimeout(function(){
						//this step (temp) is one of the steps to initialise the slider
						temp = $(`<input type='text' id='range' value='' name='range' />`);
						temp.appendTo(slide2);
						videoLength = ($(vid).get(0).duration);
						console.log($(temp));
						$(temp).ionRangeSlider({
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
				});

				var timeHolder = $('<p/>').attr('id','timer').appendTo(vidH);

				$(vid).get(0).onplay = function(){
					//setInterval used for a more detailed timing instead of ontimeupdate
					timing = setInterval(function(){
						document.getElementById('timer').innerHTML = $(vid).get(0).currentTime;
						//looping conditions based on slider's values
						//from -> start of slider
						//to -> end of slider
						if($(vid).get(0).currentTime > to ){
							$(vid).get(0).currentTime = from;
						}
					}, 1000/frameRate);
				};

				$(vid).get(0).onpause = function(){
					clearInterval(timing);
				};

				function startVid(time){
					//whenever the value of the slider changed (either from or to),
					//video will go to the time of from.
					//video state will be same as when slider change occurs,
					//i.e. if video is paused while slider shifts, video will
					//show from's frame while paused.
					$(vid).get(0).currentTime=time;
				}

		        domReadyCallback();
			})

			this.responseDom=function(){
				// console.log("1");
				return optDiv;
			}
			this.getAns=function(){
				if(typeof ansTransfer != "undefined" && ansTransfer != null && ansTransfer.length > 0){
					return ansTransfer;
					console.log(ansTransfer);
				}
				return null;
			};
			this.putAns=function(currAns){
				// console.log("3");
				// inputDoms[currAns].attr("checked","checked").checkboxradio("refresh");
			}

			// in clicker-app/core/question.js
			this.grayOut=function(){
				//to lock the svg screen so no need new data points could
				//be clicked after submitting
				ansSvg.on("click",null);
			}

			
			
		},
		webEngine:function(params,webEngineReadyCallback){
			var url=params.url;
			var pHeight=600, pWidth=600;
			var pMargin = {top : 10, bottom : 10, left : 30, right : 10};
			var respDom=document.createElement("div");

			// var testClick=document.createElement('button');
			// testClick.appendChild(document.createTextNode("testClick"));
			// testClick.onclick=function(){
			// 	alert($(vid).get(0).duration);
			// 	console.log($('#video1').get(0).paused);
			// }
			// respDom.appendChild(testClick);

			require([],function() {
				var videoLength, slider, from, to;
				var frameRate = 29;
				var timing;
				var test = 0.1;
				var startSec = 0;
				var vidH = $('<div/>').attr('id','vid').appendTo(respDom);
				var temp,vid;

				vid = $('<video/>',{
					id : 'video1',
					width : '100%',
					src : 'retsuko.mp4',
					type : 'video/mp4',
					controls : false,
				});

				vid.appendTo(vidH);
				var slide = $('<div/>').attr('id', 'slider').appendTo(vidH);
				temp = $(`<input type='text' id='range' value='' name='range' />`);

				temp.appendTo('#slider');
				console.log(temp);

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
						$('#range').ionRangeSlider({
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


					}, 3500);
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

				function startVid(time){
					$(vid).get(0).currentTime=time;
				}				

				webEngineReadyCallback();

			});

			function update(newData){

			    // d3Obj.selectAll("circle")  // For new circle, go through the update process
				   //  .data(newData)
				   //  .enter()
				   //  .append("circle")
				   //  .attr("cx", function(d,i) {return (d[0].x*(pWidth/300))}) 
				   //  //formula for scaling from axis to svg
				   //  .attr('cy', function(d,i) {return pHeight-(d[0].y*(pHeight/300))})
				   //  .attr('r', 8)
				   //  .attr("fill","red")


			}
			this.responseInput=function(){
				var optDiv=document.createElement("div");
				var inputDoms;
				require([],function(){
					url=params.url;
					inputDoms=[];
					var fsDom=$('<fieldset data-role="controlgroup">');
					for(var o=0;o<url.length;o++){
			            fsDom.append('<label for="x'+o+'"> '+url[o]+' </label>');
			            inputDoms[o]=$('<input type="radio" name="a" id="x'+o+'">');
			            fsDom.append(inputDoms[o]);
					}
			        $(optDiv).append(fsDom);
			        $(optDiv).trigger("create");
			    })
				return optDiv;
			}
			this.responseDom=function(){
				return respDom;
			}
			this.processResponse=function(studentUuid,ans){
				data.push(ans);
				// console.log(data);
				update(data);

			}
		}
	}
})