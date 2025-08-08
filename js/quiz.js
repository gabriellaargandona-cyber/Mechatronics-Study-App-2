fetch("data/quizzes.json")
  .then(res => res.json())
  .then(questions => {
    const container = document.getElementById("quiz-container");
    questions.forEach((q, idx) => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${idx+1}. ${q.q}</p>` +
        q.choices.map((c, i) => `<label><input type="radio" name="q${idx}" value="${i}">${c}</label>`).join("<br>");
      container.appendChild(div);
    });

    document.getElementById("submit-quiz").onclick = () => {
      let score = 0;
      questions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name=q${idx}]:checked`);
        if (selected && parseInt(selected.value) === q.a) score++;
      });
      document.getElementById("quiz-result").textContent = `Score: ${score}/${questions.length}`;
    };
  });
