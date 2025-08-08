const terms = [
  {term: "PLC", def: "Programmable Logic Controller"},
  {term: "PWM", def: "Pulse Width Modulation"},
  {term: "PID", def: "Proportional Integral Derivative"}
];
const container = document.getElementById("game-container");
function startGame() {
  container.innerHTML = "";
  terms.sort(() => 0.5 - Math.random());
  terms.forEach(t => {
    const btn = document.createElement("button");
    btn.textContent = t.term;
    btn.onclick = () => alert(t.def);
    container.appendChild(btn);
  });
}
document.getElementById("restart-game").onclick = startGame;
startGame();
