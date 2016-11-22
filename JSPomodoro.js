/**
 * Created by maiquel on 18/11/16.
 */

(function () {
	"use strict";

	const pomodoro_canvas = document.getElementById("counter"),
		ctx = pomodoro_canvas.getContext('2d'),						//contexto 2D
		circ = Math.PI * 2,											//360º
		quart = Math.PI / 2,										//90º
		width = pomodoro_canvas.width,
		height = pomodoro_canvas.height;

	var imd = null;													//image of the canvas variable

	ctx.beginPath();
	ctx.strokeStyle = '#99CC33';
	ctx.lineCap = 'square';											//set the end of the path to square style
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = 10;

	imd = ctx.getImageData(0, 0, width, height);					//get an image of the canvas starting on 0,0 point and get the full canvas size

	var draw = function(current) {
		ctx.putImageData(imd, 0, 0);
		ctx.beginPath();
		ctx.arc(width/2, height/2, 70, -(quart), ((circ) * current) - quart, false);
		ctx.stroke();
	};

	draw(0.9);

}());