/**
 * Created by maiquel on 18/11/16.
 */

(function () {
	"use strict";

	var JSPomodoro = function () {

		const settings = {
			totalTime: 15000,
			inicialTime: 15000
		};

		const pomodoro_canvas = document.querySelector("#pomodoro .progress"),
			ctx = pomodoro_canvas.getContext('2d'),						//contexto 2D
			circ = Math.PI * 2,											//360º
			quart = Math.PI / 2,										//90º
			width = pomodoro_canvas.width,
			height = pomodoro_canvas.height,
			radius = 90;

		var controller = {
			countdown: document.querySelector("#pomodoro .countdown"),
			play: document.getElementById("play"),
			add: document.getElementById("add"),

			playHandler: function () {
				if (core.running) {
					core.finnish();
					document.styleSheets[0].addRule("#pomodoro .cockpit #play:before", "content:'\\e800'");
				}
				else {
					core.start();
					document.styleSheets[0].addRule("#pomodoro .cockpit #play:before", "content:'\\e801'");
				}
			},

			addHandler: function () {

			},

			addListeners: function () {
				this.play.onclick = this.playHandler;
				this.add.onclick = this.addHandler;
			}
		};

		var core = {
			time: settings.totalTime,
			timeleft: settings.inicialTime,
			running: false,

			init: function () {
				controller.addListeners();

				/* Outer Circle */
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, radius + 5, 0, circ, false);
				ctx.fillStyle = 'white';
				ctx.strokeStyle = 'black';
				ctx.fill();
				ctx.stroke();
				ctx.closePath();

				/* Inner Circle */
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, radius - 5, 0, circ, false);
				ctx.fillStyle = '#CC4A49';
				ctx.fill();
				ctx.closePath();

				/* Progress stroke params */
				ctx.beginPath();
				ctx.strokeStyle = '#A71414';
				ctx.lineCap = 'square';											//set the end of the path to square style
				ctx.lineWidth = 10;
				core.updateCanvas();
			},

			updateCanvas: function () {
				var current = (core.timeleft / core.time) || 0;
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, radius, -(quart), (circ - (circ * current)) - quart, false);
				ctx.stroke();

				var time = new Date(core.timeleft);
				var minutes = time.getMinutes();
				var seconds = ((core.timeleft - (minutes * 60000)) / 1000);
				seconds = "0" + Math.floor(seconds);
				minutes = "0" + minutes;

				controller.countdown.textContent =
					minutes.charAt(minutes.length - 2) + minutes.charAt(minutes.length - 1)
					+ ":"
					+ seconds.charAt(seconds.length - 2) + seconds.charAt(seconds.length - 1);
			},

			start: function () {
				if (!core.running) {
					core.running = true;
					var run = function () {
						setTimeout(function () {
							if (core.running && core.timeleft > 0) {
								core.timeleft -= 1000;
								core.updateCanvas();
								run();
							}
							else {
								core.updateCanvas();
								core.finnish();
							}
						}, 1000);
					};
				}
			},

			finnish: function () {
				core.running = false;
				core.timeleft = settings.inicialTime;
			}
		};
		core.init();
	};

	JSPomodoro();


}());