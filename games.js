function openGame(game) {
  let frame = document.getElementById("gameFrame");

  switch (game) {
    case "ticTacToe":
      frame.src = "ticTacToe.html";
      break;
    case "snake":
      frame.src = "snake.html";
      break;
    case "rps":
      frame.src = "rps.html";
      break;
    case "memory":
      frame.src = "memory.html";
      break;
    case "flappy":
      frame.src = "flappy.html";
      break;
    case "guess":
      frame.src = "guess.html";
      break;
  }

  frame.style.display = "block";
}


