const screen = document.getElementById("screen");

let mode = "pre";
let currentQuestion = 0;
let currentLesson = 0;
let currentScenario = 0;
let preScore = 0;
let postScore = 0;

const testQuestions = [
  {
    question: "Which stain is most likely oil-based?",
    options: ["Coffee", "Grease", "Juice", "Water"],
    answer: "Grease",
    lo: "LO1"
  },
  {
    question: "Milk is usually classified as which stain type?",
    options: ["Protein-based", "Oil-based", "Rust-based", "Dye-based"],
    answer: "Protein-based",
    lo: "LO2"
  },
  {
    question: "Which pair belongs to the same stain category?",
    options: ["Grease and butter", "Coffee and motor oil", "Milk and ink", "Rust and juice"],
    answer: "Grease and butter",
    lo: "LO2"
  },
  {
    question: "Why should silk be treated carefully?",
    options: [
      "It is more delicate than cotton",
      "It removes stains by itself",
      "It cannot get stained",
      "It is always waterproof"
    ],
    answer: "It is more delicate than cotton",
    lo: "LO3"
  },
  {
    question: "Before choosing a treatment, what should you consider?",
    options: [
      "Only the color of the shirt",
      "The stain type and fabric type",
      "The price of the shirt",
      "The weather"
    ],
    answer: "The stain type and fabric type",
    lo: "LO4"
  },
  {
    question: "Which method is most effective?",
    options: [
      "The strongest chemical every time",
      "The fastest method only",
      "The method that removes the stain without damaging fabric",
      "The cheapest method"
    ],
    answer: "The method that removes the stain without damaging fabric",
    lo: "LO5"
  }
];

const lessons = [
  {
    title: "Lesson 1: What is Pre-spotting?",
    time: "About 2 minutes",
    visual: `
      <div class="process-flow">
        <div class="process-step">
          <img src="images/prespotting-process.jpg" class="lesson-image"> 
          Stained Garment
        </div>
        <div class="arrow">↓</div>
        <div class="process-step">Pre-spotting Treatment</div>
        <div class="arrow">↓</div>
        <div class="process-step">Main Cleaning</div>
        <div class="arrow">↓</div>
        <div class="process-step">Cleaner Result</div>
      </div>
    `,
    caption: "Pre-spotting happens before the main cleaning process.",
    body: `
      <p>Pre-spotting means treating a stain before the main cleaning process. It improves stain removal and helps reduce fabric damage.</p>
      <div class="signal-box"><strong>Key Point:</strong> Pre-spotting is done before cleaning, not after.</div>
    `,
    keys: ["Treat the stain before cleaning", "Improve stain removal", "Reduce fabric damage"],
    check: {
      question: "Why is pre-spotting used?",
      options: ["To shrink clothes", "To treat stains before cleaning", "To color fabrics"],
      answer: "To treat stains before cleaning",
      explanation: "Pre-spotting prepares the stain before the main cleaning process."
    }
  },
  {
    title: "Lesson 2: Oil-Based Stains",
    time: "About 3 minutes",
    visual: `
      <div class="example-grid">
        <div class="example-card"><div class="emoji">🍟</div><strong>Grease</strong><span>Oil-based</span></div>
        <div class="example-card"><div class="emoji">🧈</div><strong>Butter</strong><span>Oil-based</span></div>
        <div class="example-card"><div class="emoji">🛢️</div><strong>Cooking Oil</strong><span>Oil-based</span></div>
        <div class="example-card"><div class="emoji">💄</div><strong>Lipstick</strong><span>Often oily/waxy</span></div>
      </div>
    `,
    caption: "Oil-based stains usually feel slick or leave darker marks.",
    body: `
      <p>Oil-based stains contain oily substances that do not mix easily with water. Examples include grease, butter, cooking oil, makeup, and lipstick.</p>
      <div class="signal-box"><strong>Key Point:</strong> Greasy or waxy stains are often oil-based.</div>
    `,
    keys: ["Often greasy or slick", "May leave dark marks", "Usually needs special treatment"],
    check: {
      question: "Which example is oil-based?",
      options: ["Juice", "Milk", "Grease"],
      answer: "Grease",
      explanation: "Grease is oil-based because it contains oily material."
    }
  },
  {
    title: "Lesson 3: Protein-Based Stains",
    time: "About 3 minutes",
    visual: `
      <div class="example-grid">
        <div class="example-card"><div class="emoji">🥛</div><strong>Milk</strong><span>Protein-based</span></div>
        <div class="example-card"><div class="emoji">🥚</div><strong>Egg</strong><span>Protein-based</span></div>
        <div class="example-card"><div class="emoji">🩸</div><strong>Blood</strong><span>Protein-based</span></div>
        <div class="example-card"><div class="emoji">💦</div><strong>Sweat</strong><span>Organic stain</span></div>
      </div>
    `,
    caption: "Protein-based stains often come from organic materials.",
    body: `
      <p>Protein-based stains include milk, egg, blood, sweat, and some food stains. Heat can make these stains harder to remove.</p>
      <div class="signal-box"><strong>Key Point:</strong> Avoid thinking “stronger is always better.” Protein stains need careful treatment.</div>
    `,
    keys: ["Often organic", "Can be sensitive to heat", "Needs careful treatment"],
    check: {
      question: "Milk is usually what type of stain?",
      options: ["Oil-based", "Protein-based", "Rust-based"],
      answer: "Protein-based",
      explanation: "Milk is protein-based, so it should be treated carefully."
    }
  },
  {
    title: "Lesson 4: Water-Based Stains",
    time: "About 3 minutes",
    visual: `
      <div class="example-grid">
        <div class="example-card"><div class="emoji">☕</div><strong>Coffee</strong><span>Water-based</span></div>
        <div class="example-card"><div class="emoji">🍵</div><strong>Tea</strong><span>Water-based</span></div>
        <div class="example-card"><div class="emoji">🧃</div><strong>Juice</strong><span>Water-based</span></div>
        <div class="example-card"><div class="emoji">🥤</div><strong>Soda</strong><span>Water-based</span></div>
      </div>
    `,
    caption: "Water-based stains are common everyday stains.",
    body: `
      <p>Water-based stains are common in daily life. They may spread easily through fabric, so fabric type still matters.</p>
      <div class="signal-box"><strong>Key Point:</strong> Even common stains still require fabric-safe decisions.</div>
    `,
    keys: ["Common everyday stains", "May spread easily", "Treatment depends on fabric type"],
    check: {
      question: "Coffee is generally classified as:",
      options: ["Protein-based", "Water-based", "Oil-based"],
      answer: "Water-based",
      explanation: "Coffee is generally treated as a water-based stain."
    }
  },
  {
    title: "Lesson 5: Fabric Behavior",
    time: "About 3 minutes",
    visual: `
      <div class="compare-grid">
        <div class="compare-card">
          <div class="emoji">👕</div>
          <h2>Cotton</h2>
          <p>More durable</p>
          <p>Can usually handle stronger treatment</p>
        </div>
        <div class="compare-card">
          <div class="emoji">👚</div>
          <h2>Silk</h2>
          <p>More delicate</p>
          <p>Needs gentler treatment</p>
        </div>
      </div>
    `,
    caption: "The same stain may need different treatment depending on fabric.",
    body: `
      <p>Fabric type affects treatment choice. Cotton is usually more durable, while silk and delicate fabrics may be damaged by harsh treatment.</p>
      <div class="signal-box"><strong>Key Point:</strong> The same stain may need a different technique on a different fabric.</div>
    `,
    keys: ["Cotton = more durable", "Silk = more delicate", "Fabric affects treatment choice"],
    check: {
      question: "Why should silk be treated differently?",
      options: ["It is more delicate", "It is waterproof", "It cannot stain"],
      answer: "It is more delicate",
      explanation: "Silk is delicate and may be damaged by harsh treatment."
    }
  }
];

const scenarios = [
  {
    title: "Scenario 1",
    image: "👕🛢️",
    text: "A grease stain is found on a cotton shirt.",
    question: "What should you consider first?",
    options: ["Only the fabric color", "Both stain type and fabric type", "Only the size of the stain"],
    answer: "Both stain type and fabric type",
    explanation: "A correct treatment decision depends on both the stain and the fabric."
  },
  {
    title: "Scenario 2",
    image: "🥛👚",
    text: "Milk spills on a delicate blouse.",
    question: "What type of stain is milk?",
    options: ["Oil-based", "Protein-based", "Rust-based"],
    answer: "Protein-based",
    explanation: "Milk is a protein-based stain."
  },
  {
    title: "Scenario 3",
    image: "💄🧥",
    text: "Lipstick is found on a jacket collar.",
    question: "Which stain category is most likely?",
    options: ["Oil-based", "Water-based", "Protein-based"],
    answer: "Oil-based",
    explanation: "Lipstick usually contains oils or waxes."
  },
  {
    title: "Scenario 4",
    image: "☕👔",
    text: "Coffee spills on a cotton shirt.",
    question: "What kind of stain is coffee most likely?",
    options: ["Water-based", "Oil-based", "Protein-based"],
    answer: "Water-based",
    explanation: "Coffee is generally treated as a water-based stain."
  },
  {
    title: "Scenario 5",
    image: "🩸👖",
    text: "Blood is found on fabric.",
    question: "What is the safest classification?",
    options: ["Protein-based", "Oil-based", "Dye-based"],
    answer: "Protein-based",
    explanation: "Blood is a protein-based stain."
  }
];

function header(title) {
  return `<div class="header"><h1>${title}</h1></div>`;
}

function progressBar(percent) {
  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>
  `;
}

function safeText(text) {
  return text.replace(/'/g, "\\'");
}

function showWelcome() {
  screen.innerHTML = `
    ${header("Learn Pre-spotting")}
    <div class="visual-panel">
      <div class="visual-main">🧺👕✨</div>
      <div class="visual-caption">Identify stains. Understand fabric. Choose treatment.</div>
    </div>
    <p>This interactive lesson teaches stain identification, fabric behavior, and treatment decision-making.</p>
    <div class="signal-box">
      <strong>How this lesson works:</strong> The system uses guided steps instead of full learner control because beginners need basic terms before making treatment decisions.
    </div>
    <p class="small">Flow: Pre-test → Pretraining → Image lessons → Worked example → Practice scenarios → Post-test → Results</p>
    <button onclick="startPreTest()">Start Pre-Test</button>
  `;
}

function startPreTest() {
  mode = "pre";
  currentQuestion = 0;
  preScore = 0;
  showQuestion();
}

function startPostTest() {
  mode = "post";
  currentQuestion = 0;
  postScore = 0;
  showQuestion();
}

function showQuestion() {
  const q = testQuestions[currentQuestion];
  const percent = ((currentQuestion + 1) / testQuestions.length) * 100;

  screen.innerHTML = `
    ${header(mode === "pre" ? "Pre-Test" : "Post-Test")}
    <div class="progress">Question ${currentQuestion + 1} of ${testQuestions.length}</div>
    ${progressBar(percent)}
    <h2>${q.question}</h2>
    <p class="small">Assesses: ${q.lo}</p>
    ${q.options.map(option => `
      <button class="option" onclick="checkAnswer('${safeText(option)}')">${option}</button>
    `).join("")}
  `;
}

function checkAnswer(selected) {
  const q = testQuestions[currentQuestion];
  const correct = selected === q.answer;

  if (correct && mode === "pre") preScore++;
  if (correct && mode === "post") postScore++;

  // PRE-TEST
  if (mode === "pre") {
    screen.innerHTML = `
      <div class="feedback ${correct ? "correct" : "incorrect"}">
        <h2>${correct ? "✓ Correct!" : "✗ Incorrect"}</h2>
        <p>
          ${correct
            ? "Good job."
            : "You will learn more about this topic in the lesson."}
        </p>
      </div>

      <button onclick="nextQuestion()">Next Question</button>
    `;
    return;
  }

  // POST-TEST
  screen.innerHTML = `
    <div class="feedback ${correct ? "correct" : "incorrect"}">
      <h2>${correct ? "✓ Correct!" : "✗ Incorrect"}</h2>

      ${
        !correct
          ? `<p><strong>Correct Answer:</strong> ${q.answer}</p>`
          : ""
      }
    </div>

    <button onclick="nextQuestion()">Next Question</button>
  `;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < testQuestions.length) {
    showQuestion();
  } else {
    if (mode === "pre") {
      showPretraining();
    } else {
      showResults();
    }
  }
}

function showPretraining() {
  screen.innerHTML = `
    ${header("Pretraining: Important Terms")}
    <p>Before starting, learn these basic terms. This helps reduce confusion during the lesson.</p>

    <div class="term-card">
      <strong>Stain Type</strong>
      <p>The category of stain, such as oil-based, protein-based, or water-based.</p>
    </div>

    <div class="term-card">
      <strong>Fabric Type</strong>
      <p>The material being cleaned, such as cotton or silk.</p>
    </div>

    <div class="term-card">
      <strong>Pre-spotting Technique</strong>
      <p>The treatment selected before the main cleaning process.</p>
    </div>

    <div class="signal-box">
      <strong>Key Point:</strong> Always identify both the stain type and fabric type before selecting treatment.
    </div>

    <button onclick="startLessons()">Start Lessons</button>
  `;
}

function startLessons() {
  currentLesson = 0;
  showLesson();
}

function showLesson() {
  const lesson = lessons[currentLesson];
  const percent = ((currentLesson + 1) / lessons.length) * 100;

  screen.innerHTML = `
    ${header(lesson.title)}
    <div class="progress">${lesson.time}</div>
    ${progressBar(percent)}
    <div class="visual-panel">
      ${lesson.visual}
      <div class="visual-caption">${lesson.caption}</div>
    </div>
    <div class="lesson-box">${lesson.body}</div>
    <div class="key-box">
      <strong>Key Takeaways:</strong>
      <ul>${lesson.keys.map(key => `<li>${key}</li>`).join("")}</ul>
    </div>
    <button onclick="showLessonCheck()">Quick Check</button>
  `;
}

function showLessonCheck() {
  const check = lessons[currentLesson].check;

  screen.innerHTML = `
    ${header("Quick Check")}
    <h2>${check.question}</h2>
    ${check.options.map(option => `
      <button class="option" onclick="checkLessonAnswer('${safeText(option)}')">${option}</button>
    `).join("")}
  `;
}

function checkLessonAnswer(selected) {
  const check = lessons[currentLesson].check;
  const correct = selected === check.answer;

  screen.innerHTML = `
    ${header("Lesson Feedback")}
    <div class="feedback ${correct ? "correct" : "incorrect"}">
      <strong>${correct ? "Correct!" : "Not quite."}</strong>
      <p>${correct ? check.explanation : "Better answer: " + check.answer + ". " + check.explanation}</p>
    </div>
    <button onclick="nextLesson()">Continue</button>
  `;
}

function nextLesson() {
  currentLesson++;

  if (currentLesson < lessons.length) {
    showLesson();
  } else {
    showWorkedExample();
  }
}

function showWorkedExample() {
  screen.innerHTML = `
    ${header("Worked Example")}
    <p><strong>Situation:</strong> A grease stain is found on a cotton shirt.</p>

    <div class="worked-step">
      <strong>Step 1: Identify the stain</strong>
      <p>The stain is grease.</p>
    </div>

    <div class="worked-step">
      <strong>Step 2: Classify the stain</strong>
      <p>Grease is an oil-based stain.</p>
    </div>

    <div class="worked-step">
      <strong>Step 3: Identify the fabric</strong>
      <p>The fabric is cotton, which is usually more durable.</p>
    </div>

    <div class="worked-step">
      <strong>Step 4: Choose a treatment</strong>
      <p>Select a treatment appropriate for oil-based stains while still protecting the cotton fabric.</p>
    </div>

    <div class="signal-box">
      <strong>Why this example is shown:</strong> Beginners benefit from seeing a complete example before solving scenarios independently.
    </div>

    <button onclick="startScenarios()">Start Practice Scenarios</button>
  `;
}

function startScenarios() {
  currentScenario = 0;
  showScenario();
}

function showScenario() {
  const s = scenarios[currentScenario];
  const percent = ((currentScenario + 1) / scenarios.length) * 100;

  screen.innerHTML = `
    ${header(s.title)}
    <div class="progress">Practice ${currentScenario + 1} of ${scenarios.length}</div>
    ${progressBar(percent)}
    <div class="visual-panel">
      <div class="visual-main">${s.image}</div>
      <div class="visual-caption">Scenario practice</div>
    </div>
    <p><strong>${s.text}</strong></p>
    <h2>${s.question}</h2>
    ${s.options.map(option => `
      <button class="option" onclick="checkScenario('${safeText(option)}')">${option}</button>
    `).join("")}
  `;
}

function checkScenario(selected) {
  const s = scenarios[currentScenario];
  const correct = selected === s.answer;

  screen.innerHTML = `
    ${header("Scenario Feedback")}
    <div class="feedback ${correct ? "correct" : "incorrect"}">
      <strong>${correct ? "Correct!" : "Not quite."}</strong>
      <p>${correct ? s.explanation : "Better answer: " + s.answer + ". " + s.explanation}</p>
    </div>
    <button onclick="nextScenario()">
      ${currentScenario < scenarios.length - 1 ? "Next Scenario" : "Start Post-Test"}
    </button>
  `;
}

function nextScenario() {
  currentScenario++;

  if (currentScenario < scenarios.length) {
    showScenario();
  } else {
    startPostTest();
  }
}

function showResults() {
  const improvement = postScore - preScore;

  screen.innerHTML = `
    ${header("Learning Results")}
    <div class="results-box">
      <p class="score">Pre-Test: ${preScore} / ${testQuestions.length}</p>
      <p class="score">Post-Test: ${postScore} / ${testQuestions.length}</p>
      <p class="score">Improvement: ${improvement >= 0 ? "+" : ""}${improvement}</p>
    </div>
    <p>${improvement > 0 ? "Great job! Your score improved after completing the lesson." : "You completed the lesson. You can retry to improve your score."}</p>
    <button onclick="restart()">Restart Lesson</button>
  `;
}

function restart() {
  mode = "pre";
  currentQuestion = 0;
  currentLesson = 0;
  currentScenario = 0;
  preScore = 0;
  postScore = 0;
  showWelcome();
}

showWelcome();
