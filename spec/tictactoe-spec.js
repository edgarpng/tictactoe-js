describe('The Tic-tac-toe game', function(){

  var game, playerX, playerO;

  beforeEach(function(){
    game = new TicTacToe();
    playerX = game.getPlayerX();
    playerO = game.getPlayerO();
  });

  it('starts with the X player', function(){
    var xTurn = function(){
      playerX.choose(0);
    };
    var yTurn = function(){
      playerO.choose(1);
    };
    expect(yTurn).toThrow();
    expect(xTurn).not.toThrow();
  });

  it('does not let the same player play twice in a row', function(){
    var xTurn = function(){
      playerX.choose(0);
    };
    xTurn();
    expect(xTurn).toThrow();
  });

  it('does not let a player use the spot twice', function(){
    var xTurn = function(){
      playerX.choose(0);
    };
    var yTurn = function(){
      playerO.choose(1);
    };
    xTurn();
    yTurn();
    expect(xTurn).toThrow();
  });

  it('lets you know when you win', function(){
    var callback = jasmine.createSpy('callback');
    playerX.on('win', callback);
    playerX.choose(0);
    playerO.choose(1);
    playerX.choose(4);
    playerO.choose(2);
    playerX.choose(8);
    expect(callback).toHaveBeenCalledWith(jasmine.any('Array'));//winning move, e.g. [0,4,8]
  });

  it('lets you know when you lose', function(){
    var callback = jasmine.createSpy('callback');
    playerX.on('lose', callback);
    playerX.choose(0);
    playerO.choose(1);
    playerX.choose(2);
    playerO.choose(4);
    playerX.choose(3);
    playerO.choose(7);
    expect(callback).toHaveBeenCalledWith(jasmine.any('Array'));//losing move
  });

  it('lets you know when there is a draw', function(){
    var callback = jasmine.createSpy('callback');
    playerX.on('draw', callback);
    playerX.choose(0);
    playerO.choose(2);
    playerX.choose(1);
    playerO.choose(3);
    playerX.choose(5);
    playerO.choose(4);
    playerX.choose(6);
    playerO.choose(7);
    playerX.choose(8);
    expect(callback).toHaveBeenCalled();
  });
});
