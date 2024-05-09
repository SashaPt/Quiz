const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.querySelector('#question');

const numberOfQestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
  indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestions2 = document.getElementById(
  'number-of-all-questions-2'
);
const btnTryAgain = document.getElementById('btn-try-again');

const questions = [
  {
    question:
      'Какого цвета была таблетка, которую принимает Нео в фильме “Матрица”?',
    options: ['Красный', 'Синий', 'Зеленый', 'Желтый'],
    rightAnswer: 0,
  },
  {
    question: 'Какие животные воспитывали Маугли в “Книге джунглей”?',
    options: ['Лисы', 'Приматы', 'Волки', 'Медведи'],
    rightAnswer: 2,
  },
  {
    question: 'Какой автор написал книги “Игра престолов”?',
    options: [
      'К. С. Льюис',
      'Джордж Р. Р. Мартин',
      'Дж. Р. Р. Толкиен',
      'Дж. К. Роулинг',
    ],
    rightAnswer: 1,
  },
  {
    question: 'В какой вид спорта играют на метлах в Гарри Поттере?',
    options: [
      'Взрывающийся щелчок',
      'Скачки на крылатых лошадях',
      'КвадПод',
      'Квиддич',
    ],
    rightAnswer: 3,
  },
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
};

let completedAnswers = [];

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

const randomQuestion = () => {
  let randomNumber = Math.trunc(Math.random() * questions.length);
  let hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }

  completedAnswers.push(indexOfQuestion);
};

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add('disabled');
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const checkAnswer = (e) => {
  if (e.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    e.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    e.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disabledOptions();
};

for (let option of optionElements) {
  option.addEventListener('click', (e) => checkAnswer(e));
}

const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove('disabled', 'correct', 'wrong');
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  });
};

const validate = () => {
  if (!optionElements[0].classList.contains('disabled')) {
    alert('Выберите вариант ответа');
  } else {
    randomQuestion();
    enableOptions();
  }
};

btnNext.addEventListener('click', validate);

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
});
