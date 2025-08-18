function openGame(game) {
  let frame = document.getElementById("gameFrame");

  switch (game) {
    case "ticTacToe":
      frame.src = "games/ticTacToe.html";
      break;
    case "snake":
      frame.src = "games/snake.html";
      break;
    case "rps":
      frame.src = "games/rps.html";
      break;
    case "memory":
      frame.src = "games/memory.html";
      break;
    case "flappy":
      frame.src = "games/flappy.html";
      break;
    case "guess":
      frame.src = "games/guess.html";
      break;
  }

  frame.style.display = "block";
}
