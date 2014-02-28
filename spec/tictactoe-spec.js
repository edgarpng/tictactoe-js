describe('The Tic-tac-toe game', function(){

  var game;

  function randomPosition(){
    return Math.floor(Math.random() * 9);
  }

  beforeAll(function(){
    game = new TicTacToe();
  }

  it('starts with an empty board', function(){
    var i, position;
    for(i = 0; i < game.board.length; i++){
      position = game.board[i];
      expect(position).not.toBe('x');
      expect(position).not.toBe('o');
    }
  });

  it('keeps the state between turns', function(){
    var position0 = randomPosition();
    var position1 = randomPosition();
    game.set(position0, 'x');
    expect(game.get(position0)).toBe('x');
    game.set(position1, 'o');
    expect(game.get(position1)).toBe('o');
  });

  it('does not let you play one turn after the other', function(){
    game.set(randomPosition(), 'x');
    var illegalTurn = function(){
      game.set(randomPosition(), 'x');
    };
    expect(illegalTurn).toThrow();
  });

  it('does not let you use the spot twice', function(){
    var position = randomPosition();
    game.set(position, 'x');
    game.set(randomPosition(), 'o');
    var illegalTurn = function(){
      game.set(position, 'x');
    };
    expect(illegalTurn).toThrow();
  });

  it('lets you know when you won', function(){
    var callback = jasmine.createSpy('callback');
    var x = game.getPlayerX();
    var o = game.getPlayerO();
    game.on('x-win', callback);
    x.choose(0);
    o.choose(1);
    x.choose(4);
    o.choose(2);
    x.choose(8);
    expect(callback).toHaveBeenCalledWith(jasmine.any('Array'), jasmine.any('Array'));//Full board and winning move, e.g. [0,4,8]
  });

  it('lets you know when you lost', function(){

  });

  it('lets you know when there is a draw', function(){
    
  });

});
