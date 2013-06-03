/*
*	Programmed By: Codin Pangell, InternetCowboy.org
*/


$(document).ready(function() {
	
	
	$('#loadingContainer').fadeOut(500, function(){
		$('#mainWrapper').fadeIn(1000);
	});
	
	
	$("#lens").flare({
		'assets': "assets/lens/",
		'startImg': "start.png",
		'startZIndex': "20",
		'numberOfItems': 10,
		'imagesWidth': 382,
		'imagesHeight': 352,
		'contentWrapper': "mainWrapper",
		'xFlareMovement': 15
	});
});


(function( $ ) {
/**
 * jquery.flare - jQuery Plugin to make a lens flare.
 * @version: 1.0
 * @requires jQuery v1.2.2 or later AND jQueryRotate.2.1.js http://code.google.com/p/jqueryrotate/wiki/
 * @author Codin Pangell - 2011
 * All Rights Reserved
**/
	$.fn.flare = function( options ) {
		var settings = $.extend( {
			'assets': "assets/lens/",
			'startImg': "start.png",
			'startZIndex': "20",
			'numberOfItems': 10,
			'imagesWidth': 382,
			'imagesHeight': 352,
			'contentWrapper': "mainWrapper",
			'xFlareMovement': 15
		}, options);
		
		var pageX=0;
		var pageY=0;
		
		var opt = settings;   
		var obj = $(this);
		
		//init
		initFlare();
		
		//track mouse
		$(document).mousemove(function(e){
			pageX=e.pageX;
			pageY=e.pageY;
			updatePos();
		});
		
		function initFlare(){
			//first set the sun image where the position of the object exists
			obj.css({
				backgroundImage: 'url('+opt.assets+'/'+opt.startImg+')',
				width: opt.imagesWidth+"px",
				height: opt.imagesHeight+"px",
				zIndex: opt.startZIndex
			});	
			//now loop through the assets and set them a zIndex
			var lastZ=parseInt(opt.startZIndex);
			for (i=1;i<=parseInt(opt.numberOfItems);i++){
				$('<div/>', {
					html: i,
					className: 'lens'+i,
					html: '<img src="'+opt.assets+(i)+'.png" class="lens'+i+' lenses" width="'+opt.imagesWidth+'"px" height="352px" style="z-index:'+(lastZ+1)+';position:absolute;top:'+obj.css('top')+';left:'+obj.css('left')+';" />'	
				}).appendTo('#'+opt.contentWrapper);
				lastZ++;
			}
		}
		function updatePos(){
			//determine X position
			var distanceFromMouseX = (obj.position().left-pageX);
			var flareOffsetX=(distanceFromMouseX/2); //2 would be sensativity.
			
			//determineYposition
			var halfW=(parseInt(opt.imagesWidth)/2);
			var distanceFromMouseY = ((obj.position().top+halfW)-pageY)-halfW;
			var flareOffsetY=(distanceFromMouseY/opt.xFlareMovement); //amount of movement of x. Larger the var = less movement
			
			//set the size of items
			if (distanceFromMouseX<(obj.position().left-halfW)){ //moving closer
				var gapBetweenMouseAndSun=pageX/obj.position().left;
				gapBetweenMouseAndSun=gapBetweenMouseAndSun-1;
				var perc=(gapBetweenMouseAndSun/(obj.position().left-halfW))*500;
				if (perc>0){ //it flare is on the right on the sun also make smaller the further away from it.
					perc=(perc*-1);
				}
				var addlPX=(perc*parseInt(opt.imagesWidth))*1.1; //Multiplier is the amount of flare
				for (i=1;i<=parseInt(opt.numberOfItems);i++){
					$('.lens'+i).width((addlPX+parseInt(opt.imagesWidth))+"px");
					$('.lens'+i).height(addlPX+parseInt(opt.imagesHeight)+"px");
				}
			}
			
			//set new positions
			var _newposX, _newposY;
			for (i=1;i<=parseInt(opt.numberOfItems);i++){
				_newposX = obj.position().left+((parseInt(opt.numberOfItems)-i)*flareOffsetX)*-1;
				_newposY = obj.position().top+((parseInt(opt.numberOfItems)-i)*flareOffsetY)*-1;
				$('.lens'+i).css('left',_newposX-(addlPX));
				$('.lens'+i).css('top',_newposY-(addlPX)/2);
			}
		}
	};
})( jQuery );

