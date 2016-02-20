/*
Tic-Tac-Toe AI
TCSS 435
Manvir Singh
Todd Robbins
Sean Robbins
*/

"use strict";

var Agent = function () {
    //empty
};

//contains method for arrays
Array.prototype.contains = function(el) { return this.indexOf(el) >= 0; }

Agent.prototype.selectMove = function(board) {
    //get free cells
    var agent = {};
    agent.freeCells = [];
    for (var i = 1; i < 10; i++)
        if (board.cellFree(i))
            agent.freeCells.push(i);
	
    //determine which cells are mine and the other player's 
    if (board.playerOne) {
        agent.myCells = board.X;
        agent.otherCells = board.O;
    } else {
        agent.myCells = board.O;
        agent.otherCells = board.X;
    }
    
    //go through the following functions to determine which cell to choose
    var functions = [chooseWin, preventWin, chooseFork, preventFork, chooseCenter, chooseOpposite, chooseEven, chooseOdd];
    for (var i = 0; i < functions.length; i++) {
        var result = functions[i](agent, board);
        if (result)
            return result;
    }
}

//if a cell can be chosen that will result in us winning, choose it
function chooseWin(agent, board) {
    for (var i = 0; i < agent.myCells.length; i++) {
        for (var j = i + 1; j < agent.myCells.length; j++) {
            var cellNeeded = 15 - agent.myCells[i] - agent.myCells[j];
            if (agent.freeCells.contains(cellNeeded)) {
                return cellNeeded;
            }
        }
    }
}

//if a cell can be chosen that will result in the opponent winning, choose it
function preventWin(agent, board) {
    for (var i = 0; i < agent.otherCells.length; i++) {
        for (var j = i + 1; j < agent.otherCells.length; j++) {
            var cellNeeded = 15 - agent.otherCells[i] - agent.otherCells[j];
            if (agent.freeCells.contains(cellNeeded)) {
                return cellNeeded;
            }
        }
    }
}

//if you can create a fork by choosing a cell, choose it
function chooseFork(agent, board) {
    for (var i = 0; i < agent.freeCells.length; i++) {
        var forkCount = 0;
        for (var j = 0; j < agent.myCells.length; j++) {
            for (var k = j + 1; k < agent.myCells.length; k++) {
                if (agent.freeCells[i] + agent.myCells[j] + agent.myCells[k] == 15)
                    forkCount++;
                if (forkCount >= 2)
                    return agent.freeCell[i];
            }
        }
    }
}

//if you can prevent your opponent from making a fork by choosing a cell, choose it
function preventFork(agent, board) {
    for (var i = 0; i < agent.freeCells.length; i++) {
        var forkCount = 0;
        for (var j = 0; j < agent.freeCells.length; j++){
            for (var k = 0; k < agent.otherCells.length; k++) {
                for (var s = k + 1; s < agent.otherCells.length; s++) {
                    if (hasWin(agent, i, j, k, s))
                        forkCount++;
                    if (forkCount >= 2) {
                        if (hasOppositeCorners(agent)) {
                            return chooseOdd(agent, board);
                        } else {
                            return chooseEven(agent, board);
                        }
                    }
                }
            }
        }
    }
}

//returns true if any combination of the 4 cells will result in a win
function hasWin(agent, i, j, k, s){
    var allAdd = agent.freeCells[j] + agent.freeCells[i]
               + agent.otherCells[k] + agent.otherCells[s];
    return allAdd - agent.freeCells[j] == 15 || allAdd - agent.freeCells[i] == 15
        || allAdd - agent.otherCells[k] == 15 || allAdd - agent.otherCells[s] == 15;
}

//returns true if the opponent has opposite corners
function hasOppositeCorners(agent) {
    return (agent.otherCells.contains(2) && agent.otherCells.contains(8))
        || (agent.otherCells.contains(4) && agent.otherCells.contains(6));
}

//if center is available, choose it
function chooseCenter(agent, board) {
    if (board.cellFree(5)) {
        return 5;
    }
}

//if a corner opposite to your opponent's corner is available, choose it
function chooseOpposite(agent, board) {
    for (var i = 2; i <= 8; i += 2) {
        if (agent.otherCells.contains(i) && agent.freeCells.contains(10 - i)) {
            return 10 - i;
        }
    }
}

//if a corner (even) is available, choose it
function chooseEven(agent, board) {
    for (var i = 2; i <= 8; i += 2) {
        if (board.cellFree(i)) {
            return i;
        }
    }
}


//if a side (odd) is available, choose it
function chooseOdd(agent, board) {
    for (var i = 1; i <= 9; i += 2) {
        if (board.cellFree(i)) {
            return i;
        }
    }
}

