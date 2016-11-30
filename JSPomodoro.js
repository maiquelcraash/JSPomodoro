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
			time: 1500000,
			timeleft: 10000,
			running: false,

			init: function () {
				ctx.beginPath();
				ctx.strokeStyle = '#99CC33';
				ctx.lineCap = 'square';											//set the end of the path to square style
				ctx.closePath();
				ctx.fill();
				ctx.lineWidth = 10;
				core.render();
				core.start();
			},

			render: function () {
				var current = (core.timeleft / core.time) || 0;
				ctx.putImageData(imd, 0, 0);
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, 70, -(quart), (circ - (circ * current) - 0.14) - quart, false);
				ctx.stroke();

				var time = new Date(core.timeleft);
				var minutes = time.getMinutes();
				var seconds = ((core.timeleft - (minutes * 60000)) / 1000);
				seconds = "0" + Math.floor(seconds);
				minutes = "0" + minutes;

				countdown.textContent =
					minutes.charAt(minutes.length - 2) + minutes.charAt(minutes.length - 1)
					+ ":"
					+ seconds.charAt(seconds.length - 2) + seconds.charAt(seconds.length - 1);
			},

			start: function () {
				if (!core.running) {
					core.running = true;
					var run = setInterval(function () {
						if (core.running && core.timeleft > 0) {
							core.timeleft -= 1000;
							core.render();
							var rerun = run;
						}
						else {
							core.render();
							core.finnish();
						}
					}, 1000);
				}
			},

			stop: function () {
			},

			finnish: function () {
				core.running = false;
				core.timeleft = 1500000;
			}
		};
		core.init();
	};

	JSPomodoro();


}());