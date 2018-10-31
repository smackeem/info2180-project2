
window.onload = main;

//Maze piece Initialization function and returns initial maze state
function start_state() {
    var puzzle_area = document.getElementById("puzzlearea").childNodes;
    var initial_state = [];

    var x = 0,
        y = 0,
        top = 0,
        left = 0,
        piece_counter = 1;

    for (let i = 0; i < puzzle_area.length; i++) {
        if (puzzle_area[i].nodeName == "DIV") {
            initial_state.push([top.toString() + "px", left.toString() + "px"]);
            puzzle_area[i].className += "puzzlepiece";
            puzzle_area[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (piece_counter % 4 == 0) {
                y -= 100;
                top += 100;
                left = 0
            }
            piece_counter += 1;

        }
    }

    return initial_state
}

//Checks if puzzle piece is movable
function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}

//Checks if the current state of the maze board is the winning state
function check_for_win(winning_state, pieces) {
    if (start) {
        for (var i = 0; i < pieces.length; i++) {
            if ((winning_state[i][0] !== pieces[i].style.top) | (winning_state[i][1] !== pieces[i].style.left)) {
                return false;
            }
        }
        clearInterval(timer);
        return true;
    }
    return false;
}

//switches piece with blank space
function move_piece(piece, animate) {
    blank_top = piece.style.top;
    blank_left = piece.style.left;

    if (animate) {
        var winning_state = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "slow", "linear", function() {
            if (check_for_win(winning_state, pieces)) {
                if (best_time < total_time) {
                    best_time = total_time;
                }
                if (best_moves < moves) {
                    best_moves = moves
                }
                var win_string = `You Win\nTotal Time: ${seconds_to_time(total_time)} Number of moves: ${moves}\nBest Time: ${seconds_to_time(best_time)} Best Number of Moves: ${best_moves}`;
                $(".explanation")[0].innerText = win_string;
                $(".explanation")[0].style.textAlign = "Center";
            }
        });

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [blank_top, blank_left];
}

//Shuffle the maze board
function random_shuffle(pieces) {
    var pieceLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pieceLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        move_piece(piece[0], false);
    }
}

//Returns all maze pieces
function get_pieces() {
    return $(".puzzlepiece");
}

function change_bg(value) {
    var pieces = get_pieces();
    
    for (var i = 0; i < pieces.length; i++){
        pieces[i].style.backgroundImage = `url('background${value}.jpg')`;
    }
}

function shuffle_image(){
    var value = Math.floor(Math.random()*4)
    if(value === 0){
        value = "";
    }
    change_bg(value);
}