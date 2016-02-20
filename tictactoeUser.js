var User = function () {
	
}

User.prototype.selectMove = function(board) {
	/*var chosen = 0;
	
	for (var i = 0; i < board.cells.length; i++) {
		board.cells[i].onclick = function(){
			chosen = parseInt(this.id);
			console.log(chosen);
		};
	}
	
	while (chosen == 0) {
		sleep(1000);
	}
	
	return chosen;*/
	return parseInt(window.prompt("move", "0"));
}
/*
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}*/