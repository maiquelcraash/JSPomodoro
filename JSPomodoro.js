/**
 * Created by maiquel on 18/11/16.
 */

(function () {
	"use strict";

	var JSPomodoro = function () {

		const settings = {
			totalTime: 1500000,
			inicialTime: 1500000
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
				}
				else {
					core.start();
					document.styleSheets[0].addRule("#container #pomodoro .cockpit #play:before", "content:'\\e801'");
				}
			},

			addHandler: function () {
				if (core.running) {
					settings.inicialTime += 5 * 60 * 1000;
					core.timeleft += 5 * 60 * 1000;
					core.init();
				}
				else {
					settings.inicialTime += 5 * 60 * 1000;
					core.timeleft += 5 * 60 * 1000;
					core.init();
				}
			},

			addListeners: function () {
				this.play.onclick = this.playHandler;
				this.add.onclick = this.addHandler;
			}
		};

		var core = {
			timeleft: settings.inicialTime,
			running: false,

			init: function () {
				controller.addListeners();
				ctx.clearRect(0, 0, width, height);

				/* Outer Circle */
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, radius + 5, 0, circ, false);
				ctx.fillStyle = 'white';
				ctx.strokeStyle = '#A71414';
				ctx.lineWidth = 1;
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
				var current = (core.timeleft / settings.inicialTime) || 0;
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
							else if(core.running && core.timeleft <= 0){
								core.timeleft = 0;
								clearTimeout(run);
								core.updateCanvas();
								core.finnish();
							}
						}, 1000);
					};
					run();
				}
			},

			finnish: function () {
				if (core.timeleft <= 0) {
					core.alarm();
				}
				document.styleSheets[0].addRule("#container #pomodoro .cockpit #play:before", "content:'\\e800'");
				core.running = false;
				core.timeleft = settings.inicialTime;
				core.init();
			},

			alarm: function () {
				var beep = new Audio();
				beep.src = 'https://docs.google.com/uc?' + 'authuser=0&id=0B6qaLpzeH1VoTHZCNW5tUEQxbG8&export=download';
				beep.play();
			}
		};
		core.init();
	};

	JSPomodoro();


}());