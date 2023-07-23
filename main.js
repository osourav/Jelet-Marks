const GroupAns = {
   A: ["D", "D", "C", "A", "A", "C", "A", "D", "D", "C", "B", "B", "D", "C", "A", "B", "D", "C", "A", "A", "B", "C", "D", "A", "D", "C", "D", "A", "B", "A", "A,C", "B,D", "A", "D", "B", "A,C", "B,C", "B,D", "B,C", "A,C,D", "A", "D", "B", "C", "B", "B", "B", "B", "B", "A", "B", "D", "B", "D", "B", "C", "D", "A", "B", "A", "D", "A", "A", "D", "A", "A,C,D", "B,D", "A,C,D", "A,C", "A,C,D", "A", "C", "B", "C", "D", "C", "D", "C", "A", "C", "C", "A", "C", "A", "D", "A,C", "B,C", "A", "C,D", "A,B,C", "B", "B", "A", "C", "A", "A", "A", "C", "B", "B"],
   B: ["A", "D", "D", "C", "B", "C", "D", "C", "A", "B", "D", "B", "A", "A", "B", "C", "D", "A", "C", "C", "D", "A", "B", "A", "D", "D", "C", "A", "A", "D", "A", "D", "B", "A,C", "B,C", "B,D", "B,C", "A,C,D", "A,C", "B,D", "B", "B", "B", "B", "B", "D", "B", "A", "B", "C", "D", "D", "B", "A", "A", "A", "A", "D", "A", "D", "D", "B", "C", "B", "A", "B,D", "A,C,D", "A,C", "A,C,D", "A,C,D", "D", "C", "D", "C", "A", "C", "C", "A", "C", "A", "D", "A", "C", "B", "C", "B,C", "A", "C,D", "A,B,C", "A,C", "A", "C", "A", "A", "A", "C", "B", "B", "B", "B"],
   C: ["A", "B", "C", "D", "A", "C", "A", "D", "A", "B", "A", "D", "C", "C", "A", "A", "D", "D", "D", "D", "C", "B", "C", "A", "C", "A", "B", "D", "B", "D", "A,C", "B,C", "B,D", "B,C", "A,C,D", "A,C", "B,D", "A", "D", "B", "C", "D", "D", "B", "A", "A", "B", "A", "D", "A", "D", "A", "B", "C", "B", "A", "D", "B", "B", "B", "B", "D", "B", "A", "B", "A,C,D", "A,C", "A,C,D", "A,C,D", "B,D", "D", "C", "A", "C", "C", "A", "C", "A", "D", "A", "C", "B", "C", "D", "C", "A", "C,D", "A,B,C", "A,C", "B,C", "A", "A", "A", "C", "B", "B", "B", "B", "A", "C"],
   D: ["A", "B", "A", "D", "C", "D", "A", "A", "D", "D", "C", "D", "C", "B", "C", "A", "D", "A", "B", "D", "B", "D", "C", "B", "C", "D", "A", "C", "A", "A", "B,D", "B,C", "A,C,D", "A,C", "B,D", "A", "D", "B", "A,C", "B,C", "D", "A", "D", "A", "A", "C", "B", "A", "D", "B", "B", "B", "B", "B", "B", "A", "B", "D", "D", "D", "B", "C", "A", "B", "A", "A,C", "A,C,D", "A,C,D", "B,D", "A,C,D", "C", "A", "C", "A", "D", "A", "C", "B", "C", "D", "C", "D", "C", "A", "C", "C,D", "A,B,C", "A,C", "B,C", "A", "C", "B", "B", "B", "B", "A", "C", "A", "A", "A"]
}
let answers = [];
let currentGroupSelection = "A"
let marksCount = 0;
let nagative = 0;
let q2Count = 0;
let qCount = {
   q1: 0,
   q2: 0,
   rong: 0
};
let answerElementsString = "";

groupSelection.addEventListener("change", () => {
   currentGroupSelection = groupSelection.value;
});

// get Answers from string
function getAnswersFromStr(str) {
   answers = [];
   for (var i = 1; i <= 100; i++) {
      const s = `Q${i}`;
      let findIndex = str.findIndex(ele => ele == s);
      if (findIndex != -1) {
         answers.push(str[findIndex + 1]);
      } else {
         alert("Your Input Answer is Rong!");
         return false;
      }
   }
   return true;
}

// create answers element
function createAnswerElement(className, qNo, inDe, correct, answer) {
   return `
      <div class="show-answer ${className}">
         <span>${qNo} <p class="value">${inDe}</p></span>
         <span>Correct Answer <p class="coAns">${correct}</p></span>
         <span>Your Answer <p class="coAns">${answer}</p></span>
      </div>
   `;
}

// get total marks
function getMarks() {
   marksCount = 0;
   nagative = 0;
   answerElementsString = "";
   q2Count = 0;
   qCount.q1 = 0;
   qCount.q2 = 0;
   qCount.rong = 0;

   for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const correctAnswer = GroupAns[currentGroupSelection][i];

      if (answerFilter(answer)) {
         answerElementsString += createAnswerElement("false", `Q${i + 1}`, ` 0.00`, correctAnswer, answer);
      } else if ((i >= 30 && i < 40) || (i >= 65 && i < 70) || (i >= 85 && i < 90)) {
         if (sameAndEqual(answer, correctAnswer)) {
            marksCount += 2;
            qCount.q2++;
            q2Count += 2;
            answerElementsString += createAnswerElement("true", `Q${i + 1}`, " +2.00", correctAnswer, answer);
         } else if (equal(answer, correctAnswer)) {
            const inDe = (answer.split(",").join("").length / correctAnswer.split(",").join("").length) * 2;
            marksCount += inDe;
            answerElementsString += createAnswerElement("true", `Q${i + 1}`, ` +${inDe.toFixed(2)}`, correctAnswer, answer);
            qCount.q2++;
            q2Count += inDe;
         } else {
            answerElementsString += createAnswerElement("false", `Q${i + 1}`, ` 0.00`, correctAnswer, answer);
         }
      } else if (answer === correctAnswer) {
         marksCount += 1;
         qCount.q1++;
         answerElementsString += createAnswerElement("true", `Q${i + 1}`, ` +1.00`, correctAnswer, answer);
      } else {
         nagative -= 0.25;
         answerElementsString += createAnswerElement("", `Q${i + 1}`, ` -0.25`, correctAnswer, answer);
         qCount.rong++;
      }

   }
   marksCount += nagative;
}

function answerFilter(ans) {
   return !ans.split("").some(e => e == "A" || e == "B" || e == "C" || e == "D");
}

// check equality and same values
function sameAndEqual(a1, a2) {
   return a1.length === a2.length &&
      a1.split(",").some(ans => a2.split(",").some(cAns => cAns == ans));
}

// check equal values
function equal(a1, a2) {
   return a1.split(",").every(ans => a2.split(",").some(cAns => cAns == ans));
}

submit.addEventListener("click", () => {
   let ans = (`${answerInput.value}  -`).toUpperCase().replace(/\s/g, " ").split(" ");
   if (!getAnswersFromStr(ans)) return;
   getMarks();
   marksVal.innerText = marksCount.toFixed(2);
   resultSection.innerHTML = answerElementsString;

   console.log(qCount);
   td1.innerText = qCount.q1;
   td2.innerText = qCount.q2;
   td3.innerText = qCount.rong;

   td4.innerText = qCount.q1;
   td5.innerText = q2Count.toFixed(2);
   td6.innerText = (qCount.rong / 4).toFixed(2);

   resultSection.classList.add("active");
   table.classList.add("active");
   ansOutput.classList.add("active");
})



// console.log(answers); 