const lessons = [
  {
    title: "Lekcja 1 — Zmienne",
    theory:
      "Zmienne służą do przechowywania danych. W Pythonie przypisujemy wartość do zmiennej za pomocą znaku =.",
    example: 'imie = "Anna"\nwiek = 16',
    task: 'Utwórz zmienną o nazwie imie i przypisz do niej dowolny tekst.',
    hint: 'Przykład: imie = "Kasia"',
    validate: (code) => /^\s*imie\s*=\s*["\'].+["\']\s*$/m.test(code)
  },
  {
    title: "Lekcja 2 — Wyświetlanie tekstu",
    theory:
      "Funkcja print() pozwala wyświetlić tekst lub wartość zmiennej na ekranie.",
    example: 'print("Cześć!")\nimie = "Anna"\nprint(imie)',
    task: 'Wyświetl na ekranie tekst: Witaj w BARTOS!',
    hint: 'Użyj funkcji print() i umieść tekst w cudzysłowie.',
    validate: (code) =>
      /print\s*\(\s*["\']Witaj w BARTOS!["\']\s*\)/i.test(code)
  },
  {
    title: "Lekcja 3 — Proste obliczenia",
    theory:
      "Python potrafi wykonywać działania matematyczne. Możesz dodawać liczby za pomocą operatora +.",
    example: "wynik = 2 + 3\nprint(wynik)",
    task: "Utwórz zmienną wynik, która będzie sumą liczb 7 i 5.",
    hint: "Potrzebujesz zapisu podobnego do: wynik = 2 + 3",
    validate: (code) => /wynik\s*=\s*(7\s*\+\s*5|5\s*\+\s*7)/.test(code)
  }
];

let currentLesson =
  Number(localStorage.getItem("bartosCurrentLesson")) || 0;

let completedLessons = JSON.parse(
  localStorage.getItem("bartosCompletedLessons") || "[]"
);

const lessonTitle = document.getElementById("lessonTitle");
const lessonTheory = document.getElementById("lessonTheory");
const lessonExample = document.getElementById("lessonExample");
const lessonTask = document.getElementById("lessonTask");
const lessonNumber = document.getElementById("lessonNumber");

const codeInput = document.getElementById("codeInput");

const checkBtn = document.getElementById("checkBtn");
const hintBtn = document.getElementById("hintBtn");

const hint = document.getElementById("hint");
const message = document.getElementById("message");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressText = document.getElementById("progressText");

const lessonCard = document.getElementById("lessonCard");
const completedCard = document.getElementById("completedCard");

const restartBtn = document.getElementById("restartBtn");


function saveProgress() {
  localStorage.setItem(
    "bartosCurrentLesson",
    currentLesson
  );

  localStorage.setItem(
    "bartosCompletedLessons",
    JSON.stringify(completedLessons)
  );
}


function updateProgress() {
  progressText.textContent =
    `${completedLessons.length} / ${lessons.length}`;
}


function renderLesson() {
  const lesson = lessons[currentLesson];

  lessonTitle.textContent = lesson.title;

  lessonTheory.textContent = lesson.theory;

  lessonExample.textContent = lesson.example;

  lessonTask.textContent = lesson.task;

  lessonNumber.textContent =
    `${currentLesson + 1} / ${lessons.length}`;

  codeInput.value = "";

  message.className = "message hidden";

  hint.className = "hint hidden";

  hint.textContent = "";

  prevBtn.disabled =
    currentLesson === 0;

  nextBtn.textContent =
    currentLesson === lessons.length - 1
      ? "Zakończ kurs →"
      : "Następna →";

  updateProgress();

  saveProgress();
}


checkBtn.addEventListener("click", () => {

  const code = codeInput.value.trim();

  if (!code) {

    message.textContent =
      "Najpierw wpisz rozwiązanie.";

    message.className =
      "message error";

    return;
  }


  if (lessons[currentLesson].validate(code)) {

    message.textContent =
      "Świetnie! Odpowiedź jest poprawna.";

    message.className =
      "message success";


    if (!completedLessons.includes(currentLesson)) {

      completedLessons.push(currentLesson);

      completedLessons.sort(
        (a, b) => a - b
      );

      updateProgress();

      saveProgress();
    }

  } else {

    message.textContent =
      "Jeszcze nie. Sprawdź zapis albo skorzystaj z podpowiedzi.";

    message.className =
      "message error";
  }

});


hintBtn.addEventListener("click", () => {

  hint.textContent =
    lessons[currentLesson].hint;

  hint.className =
    "hint";

});


prevBtn.addEventListener("click", () => {

  if (currentLesson > 0) {

    currentLesson--;

    renderLesson();
  }

});


nextBtn.addEventListener("click", () => {

  if (currentLesson < lessons.length - 1) {

    currentLesson++;

    renderLesson();

  } else {

    lessonCard.classList.add("hidden");

    completedCard.classList.remove("hidden");
  }

});


restartBtn.addEventListener("click", () => {

  currentLesson = 0;

  completedLessons = [];

  localStorage.removeItem(
    "bartosCurrentLesson"
  );

  localStorage.removeItem(
    "bartosCompletedLessons"
  );


  completedCard.classList.add("hidden");

  lessonCard.classList.remove("hidden");

  renderLesson();

});


renderLesson();