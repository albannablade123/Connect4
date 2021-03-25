var player1 = prompt("Player One: Enter Your Name, You will be blue");
var player_one_Col = 'rgb(86, 151, 255)';

var player2 = prompt("Player One: Enter Your Name, You will be blue");
var player_two_Col = 'rgb(86, 151, 255)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
  console.log("you won starting at this row and column");
  console.log(rowNum);
  console.log(colNum);
}
console.log('connected!');

function changeCol(rowIndex,colIndex,color){
  console.log("changing color" + color);
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnCol(rowIndex,colIndex){
  console.log(rowIndex + " " + colIndex);
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colReport = returnCol(5,colIndex);
  for (var row = 5; row >= -1; row--) {
    colReport = returnCol(row,colIndex);
    if(colReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return( one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if(colorMatchCheck(returnCol(row,col),returnCol(row,col+1),returnCol(row,col+2),returnCol(row,col+3))){
        console.log('horiz');
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if(colorMatchCheck(returnCol(row,col),returnCol(row+1,col),returnCol(row+2,col),returnCol(row+3,col))){
        console.log('vert');
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if(colorMatchCheck(returnCol(row,col),returnCol(row+1,col+1),returnCol(row+2,col+2),returnCol(row+3,col+3))){
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if(colorMatchCheck(returnCol(row,col),returnCol(row-1,col+1),returnCol(row-2,col+2),returnCol(row-3,col+3))){
        console.log('diag');
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

//Start With Player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player_one_Col;

$('h3').text(player1+" it is your turn");


$('.board button').on('click',function(){
  console.log('reached here');
  var col = $(this).closest('td').index();

  var bottomAvail = checkBottom(col);

  changeCol(bottomAvail,col,currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName+" You Have Won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * - 1;

  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+" Its your turn");
    currentColor = player_one_Col;
  }else{
    currentName = player2;
    $('h3').text(currentName+" Its your turn");
    currentColor = player_two_Col;
  }
});
