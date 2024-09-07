const quizData = [
  {
    question:
      "Bir araba saatte 60 km hızla 2 saat boyunca yol alıyor. Toplamda kaç kilometre yol alır?",
    a: "120 km",
    b: "100 km",
    c: "180 km",
    d: "90 km",
    correct: "a",
  },
  {
    question:
      "Bir sınıfta 24 öğrenci var. Eğer 8 öğrenci sınıftan çıkarsa, sınıfta kaç öğrenci kalır?",
    a: "12",
    b: "16",
    c: "18",
    d: "20",
    correct: "b",
  },
  {
    question: "Bir sayıdan 15 çıkarıldığında sonuç 25 oluyor. Bu sayı nedir?",
    a: "30",
    b: "35",
    c: "40",
    d: "45",
    correct: "c",
  },
  {
    question: "Bir kenarı 5 cm olan bir karenin çevresi kaç cm'dir?",
    a: "15 cm",
    b: "20 cm",
    c: "25 cm",
    d: "30 cm",
    correct: "b",
  },
  {
    question:
      "Bir dikdörtgenin kısa kenarı 6 cm, uzun kenarı ise 8 cm. Bu dikdörtgenin alanı kaç cm²'dir?",
    a: "24 cm²",
    b: "36 cm²",
    c: "48 cm²",
    d: "56 cm²",
    correct: "c",
  },
  {
    question: "8 x 7 işleminin sonucu nedir?",
    a: "42",
    b: "48",
    c: "54",
    d: "56",
    correct: "d",
  },
  {
    question: "Bir sayı 7 ile çarpıldığında 63 oluyor. Bu sayı nedir?",
    a: "7",
    b: "8",
    c: "9",
    d: "10",
    correct: "c",
  },
  {
    question:
      "Eğer bir kitap 12 sayfa ise ve her sayfada 5 cümle varsa, toplamda kaç cümle vardır?",
    a: "50",
    b: "55",
    c: "60",
    d: "65",
    correct: "c",
  },
  {
    question:
      "Bir kasada 100 TL var. Eğer 35 TL harcanırsa, kasada kaç TL kalır?",
    a: "55 TL",
    b: "60 TL",
    c: "65 TL",
    d: "70 TL",
    correct: "c",
  },
  {
    question: "Bir sayı 4 ile bölündüğünde 12 kalanı veriyor. Bu sayı nedir?",
    a: "16",
    b: "20",
    c: "24",
    d: "28",
    correct: "d",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

let currentQuiz = 0;
let score = 0;

const submitBtn = document.getElementById("submit");

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}
submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        let resultMessage;
        if (score*10 > 85) {
          resultMessage = `<h2> Quiz Bitti, ${score * 10} puan aldınız </h2>
                          <button class="submit" onClick="location.reload()">TEBRİKLER SINAVI GEÇTİNİZ!</button>`;
        } else {
          resultMessage = `<h2> Quiz Bitti, ${score * 10} puan aldınız </h2>
                           <button class="submit" onClick="location.reload()">SINAVDAN KALDINIZ</button>`;
        }
        quiz.innerHTML = resultMessage;
      }
    }
  });
  