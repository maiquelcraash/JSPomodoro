/**
 * Created by maiquel on 18/11/16.
 */

(function () {
	"use strict";

	var JSPomodoro = function () {

		const pomodoro_canvas = document.querySelector("#pomodoro .progress"),
			ctx = pomodoro_canvas.getContext('2d'),						//contexto 2D
			circ = Math.PI * 2,											//360º
			quart = Math.PI / 2,										//90º
			width = pomodoro_canvas.width,
			height = pomodoro_canvas.height;

		var countdown = document.querySelector("#pomodoro .countdown");

		var imd = null;													//image of the canvas variable

		imd = ctx.getImageData(0, 0, width, height);					//get an image of the canvas starting on 0,0 point and get the full canvas size

		var core = {
			time: 150000,
			timeleft: 150000,
			running: false,

			init: function () {
				ctx.beginPath();
				ctx.strokeStyle = '#99CC33';
				ctx.lineCap = 'square';											//set the end of the path to square style
				ctx.closePath();
				ctx.fill();
				ctx.lineWidth = 10;

				core.render(1);
			},

			render: function () {
				var current = (core.timeleft / core.time) || 0;
				ctx.putImageData(imd, 0, 0);
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, 70, -(quart), (circ - (circ * current)) - quart, false);
				ctx.stroke();
			},
			start: function () {
				if (!core.running) {
					core.running = true;
					var run = setInterval(function () {
						core.timeleft -= 1000;
						if (core.running && core.timeleft > 0) {
							render();
							run();
						}
						else {
							core.finnish();
						}
					}, 1000);
				}
			},

			stop: function () {

			},

			finnish: function () {
				core.running = false;
				core.timeleft = 150000;
			}
		};
		core.init();
	};

	JSPomodoro();


}());