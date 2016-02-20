// Tic Tac Toe

var Agent = function () {
	this.myCells = [];
	this.otherCells = [];
	this.freeCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

Agent.prototype.selectMove = function(board) {
    for (var i = 0; i < this.freeCells.length; i++) {
        if (!board.cellFree(this.freeCells[i])) {
			this.otherCells.push(this.freeCells[i]);
			this.freeCells.splice(i, 1)
		}
    }
	
	console.log(this.myCells, this.otherCells, this.freeCells);
	
	for (var i = 0; i < this.myCells.length; i++) {
		for (var j = i + 1; j < this.myCells.length; j++) {
			var cellNeeded = 15 - this.myCells[i] - this.myCells[j];
			if (this.freeCells.indexOf(cellNeeded) >= 0) {
				this.myCells.push(cellNeeded);
				this.freeCells.splice(this.freeCells.indexOf(cellNeeded), 1);
	console.log("a");
	console.log(this.myCells, this.otherCells, this.freeCells);
				return cellNeeded;
			}
		}
	}
	
	for (var i = 0; i < this.otherCells.length; i++) {
		for (var j = i + 1; j < this.otherCells.length; j++) {
			var cellNeeded = 15 - this.otherCells[i] - this.otherCells[j];
			if (this.freeCells.indexOf(cellNeeded) >= 0) {
				this.myCells.push(cellNeeded);
				this.freeCells.splice(this.freeCells.indexOf(cellNeeded), 1);
	console.log("b");
	console.log(this.myCells, this.otherCells, this.freeCells);
				return cellNeeded;
			}
		}
	}
	
	for (var i = 0; i < this.freeCells.length; i++) {
		var forkCount = 0;
		for (var j = 0; j < this.myCells.length; j++) {
			for (var k = j + 1; k < this.myCells.length; k++) {
				if (this.freeCells[i] + this.myCells[j] + this.myCells[k] == 15)
					forkCount++;
				if (forkCount >= 2) {
					var cellNeeded = this.freeCells[i];
					this.freeCells.splice(i, 1)
					this.myCells.push(cellNeeded);
	console.log("c");
	console.log(this.myCells, this.otherCells, this.freeCells);
					return cellNeeded;
				}
			}
		}
	}
	
	for (var i = 0; i < this.freeCells.length; i++) {
		var forkCount = 0;
		for (var t = 0; t < this.freeCells.length; t++){
			for (var j = 0; j < this.otherCells.length; j++) {
				for (var k = j + 1; k < this.otherCells.length; k++) {
					var allAdd = this.freeCells[t] + this.freeCells[i] + this.otherCells[j] + this.otherCells[k];
					if (allAdd - this.freeCells[t] == 15 || allAdd - this.freeCells[i] == 15
					 || allAdd - this.otherCells[j] == 15 || allAdd - this.otherCells[k] == 15) {
						forkCount++;
					
						console.log(forkCount);
					}
					if (forkCount >= 2) {
						if ((this.otherCells.indexOf(2) >= 0 && this.otherCells.indexOf(8) >= 0)
						 || (this.otherCells.indexOf(4) >= 0 && this.otherCells.indexOf(6) >= 0)) {
							for (var s = 1; s <= 9; s += 2) {
								if (board.cellFree(s)) {
									this.myCells.push(s);
									this.freeCells.splice(this.freeCells.indexOf(s), 1);
		console.log("d");
		console.log(this.myCells, this.otherCells, this.freeCells);
									return s;
								}
							}
						} else {
							/*var cellNeeded = this.freeCells[i];
							this.freeCells.splice(i, 1)
							this.myCells.push(cellNeeded);
		console.log("e");
		console.log(this.myCells, this.otherCells, this.freeCells);
							return cellNeeded;*/
							for (var s = 2; s <= 8; s += 2) {
								if (board.cellFree(s)) {
									this.myCells.push(s);
									this.freeCells.splice(this.freeCells.indexOf(s), 1);
		console.log("d");
		console.log(this.myCells, this.otherCells, this.freeCells);
									return s;
							}}
						}
				}
			}
			}
		}
	}
	
	if (board.cellFree(5)) {
		this.myCells.push(5);
		this.freeCells.splice(this.freeCells.indexOf(5), 1);
	console.log("f");
	console.log(this.myCells, this.otherCells, this.freeCells);
		return 5;
	}
	
	for (var i = 2; i <= 8; i += 2) {
		if (this.otherCells.indexOf(i) >= 0 && this.freeCells.indexOf(10 - i) >= 0) {
			this.freeCells.splice(this.freeCells.indexOf(10 - i), 1);
			this.myCells.push(10 - i);
	console.log("g");
	console.log(this.myCells, this.otherCells, this.freeCells);
			return 10 - i;
		}
	}
	
	for (var i = 2; i <= 8; i += 2) {
		if (board.cellFree(i)) {
			this.myCells.push(i);
			this.freeCells.splice(this.freeCells.indexOf(i), 1);
	console.log("h");
	console.log(this.myCells, this.otherCells, this.freeCells);
			return i;
		}
	}
	
	for (var i = 1; i <= 9; i += 2) {
		if (board.cellFree(i)) {
			this.myCells.push(i);
			this.freeCells.splice(this.freeCells.indexOf(i), 1);
	console.log("i");
	console.log(this.myCells, this.otherCells, this.freeCells);
			return i;
		}
	}
}

