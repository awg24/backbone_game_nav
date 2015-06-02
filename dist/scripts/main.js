$(document).ready(function(){
	var routerConfig = {
		routes:{
			"": "theWait",
			"menu": "showMenu",
			"back": "showMenu",
			"play": "playGame",
			"leaderboard": "showLeaderboard",
			"settings": "showSettings",
			},
			theWait: function(){
				$(".page").hide();
				$("#loading").show();
				setTimeout(function(){
					$(".page").hide();
					$("#menu").show();
				}, 3000);
			},
			showMenu: function(){
				$(".page").hide();
				$("#menu").show();
			},

			playGame: function(){
				$(".page").hide();
				$("#game").show();
				playGame();
			},

			showLeaderboard: function(){
				$(".page").hide();
				$("#board").show();
			},

			showSettings: function(){
				$(".page").hide();
				$("#settings").show();
			},
		}

	var app = Backbone.Router.extend(routerConfig);
	var myRouter = new app();
	Backbone.history.start();

	$("#leaderboard").click(function(){
		myRouter.navigate("leaderboard", {trigger:true});
	});
	$("#play").click(function(){
		myRouter.navigate("play", {trigger:true});
	});
	$("#setting-button").click(function(){
		myRouter.navigate("settings", {trigger:true});
	});
	$("#go-back").click(function(){
		myRouter.navigate("back", {trigger:true});
	});
	$("#go-back-from-board").click(function(){
		myRouter.navigate("back", {trigger:true});
	});
	$("#go-back-from-settings").click(function(){
		myRouter.navigate("back", {trigger:true});
	});

	function playGame(){

		var gameBoard = [NaN,NaN,NaN,
						 NaN,NaN,NaN,
						 NaN,NaN,NaN];
		var hasWinner = false;
		var playerOne = true;
		$("#status").html("player 1 turn!");

		var $pressed = $(".player-space");
		for(var i = 0; i < $pressed.length; i++){
			$($pressed[i]).css("background-image","none");
			$($pressed[i]).css("opacity","0");
			$($pressed[i]).prop("disabled", false);
			gameBoard[i] = NaN;
		}

		$pressed.off("click");
		$pressed.on("click",function(){
			var item = parseInt($(this).attr("id"));
			item--;
			if(playerOne){
					gameBoard[item] = 1;
					$(this).css("opacity","1");
					$(this).css("background-repeat","no-repeat");
					$(this).css("background-image","url(css/images/x.png)");
				} else {
					gameBoard[item] = 0;
					$(this).css("opacity","1");
					$(this).css("background-repeat","no-repeat");
					$(this).css("background-image","url(css/images/o.png)");
				}
				$(this).prop('disabled', true);

				checkWinner();
		});

		function checkWinner() {
			console.log('checkWinner', gameBoard);
			if(gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] || 
			   gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] ||
			   gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8] ||
			   gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] ||
			   gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] ||
			   gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] ||
			   gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] ||
			   gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]){

			   	if(playerOne){
					$("#status").html("player 1 wins!");
				} else {
					$("#status").html("player 2 wins!");
				}

				$(".disable").prop("disabled", true);

				setTimeout(function(){
					var html = "Play again?";
					html += "<form><div id='yes'class=play-again><button>Yes</button></div>";
					html += "<div id='no'class=play-again><button>No</button></div></form>";
					$("#status").html(html);
					$(".play-again").on("click", function (){
						var check = $(this).attr("id");

						if(check === "yes") {
							playGame();
						} else {
							myRouter.navigate("", {trigger:true});
						}
					});

				}, 1000);
			} else {
				nextTurn();
			}
		}

		function nextTurn(){
			if(playerOne){
				playerOne = false;
				$("#status").html("player 2 turn!");
			} else {
				playerOne = true;
				$("#status").html("player 1 turn!");
			}
		}		
	}
});