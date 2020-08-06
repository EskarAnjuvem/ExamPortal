/************Obtaining some DOM objects: Input Name, Start Exam Button, Score Page at end , CountDown Timer *********************/
const submit = document.querySelector(".submitData");
const showName= document.querySelector(".showName");
const showScore= document.querySelector(".showScore");
const countDown = document.getElementById('countdown');

/**************Timer Variables, Student Data stored within Array: Name as Object,Score,Number of Correct and Wrong Answered questions*******/
const startminutes = 45;
let time = startminutes*60;
var studentData = [];
var totScore = 0,wrongAttempt = 0, correctAttempt = 0;
/********************Variable for Question Number used to pick Questions from Array questionObjArr : Array of Question Objects*********/
var qNum = 0; 
var q1 = new Question("Q1.jpg", "C", "Not Answered", false, 0);
var q2 = new Question("Q2.jpg", "B", "Not Answered", false, 0);
var q3 = new Question("Q3.jpg", "A", "Not Answered", false, 0);
var q4 = new Question("Q4.jpg", "D", "Not Answered", false, 0);
var q5 = new Question("Q5.jpg", "A", "Not Answered", false, 0);
var q6 = new Question("Q6.jpg", "B", "Not Answered", false, 0);
var q7 = new Question("Q7.jpg", "B", "Not Answered", false, 0);
var q8 = new Question("Q8.jpg", "D", "Not Answered", false, 0);
var q9 = new Question("Q9.jpg", "A", "Not Answered", false, 0);
var q10 = new Question("Q10.jpg", "B", "Not Answered", false, 0);
var q11 = new Question("Q11.jpg", "C", "Not Answered", false, 0);
var q12 = new Question("Q12.jpg", "A", "Not Answered", false, 0);
var q13 = new Question("Q13.jpg", "B", "Not Answered", false, 0);
var q14 = new Question("Q14.jpg", "A", "Not Answered", false, 0);
var q15 = new Question("Q15.jpg", "D", "Not Answered", false, 0);
var questionObjArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15];
/***********************Each Question is an Object: Question Object Constructor Function ***************************/
function Question(qPic, crOption, ansOption, markState, score) {
    this.qPic = qPic;
    this.crOption = crOption;
    this.ansOption = ansOption;
    this.markState = markState;
    this.score = score;
}
/************************Setting Event Listener on Start Exam Button: Enters the input Name in the studentData Array first element**********/
/************If either the First or Last Name is not Input, issues a warning. Only if both is input, then goes on to add a class in CSS*******/
/**********The new Class in CSS changes z-index to bring the Question Page forward, and calls the setInterval function for Timer******************/
submit.addEventListener('click' , ()=> {
    if ((document.querySelector(".fName").value == '') || (document.querySelector(".lName").value == '')){
        alert("Enter Your Full Name!!");
    }
    else{
    studentData.push({ 
        studentFirstName : document.querySelector(".fName").value ,
        studentLastName : document.querySelector(".lName").value
    });
    // console.log(studentData); // No need to console log
    document.body.classList.toggle('questionDisplay');
    setInterval(updateCount,1000);
    }
});
/**************The Countdown timer function: Need a more accurate method other than setInterval***********************/
/**************This Locks / Disables all the buttons in the Question Page if time runs out, except for the Submit Paper Button************/
function updateCount(){
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    countDown.innerHTML = `${minutes} min : ${seconds} sec`;
    time !== 0? time-- : time;
    if(time == 0){
      document.getElementById("load-prev").disabled = true;
      document.getElementById("load-next").disabled = true;
      document.getElementById("saveAnswer").disabled = true;
      document.getElementById("clear").disabled = true;
    }
}
/*************Disabling the Prebious Question Button when Paper Starts*************************/
document.getElementById("load-prev").disabled = true;
/**************Setting a Bunch of Event Listeners*******************************************/
document.getElementById("saveAnswer").addEventListener("click", () => {
  var saveButton = document.getElementById("saveAnswer");
  var messageChoice = document.getElementById("choice");
  var choices = document.getElementsByName("option");  
  for (i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      questionObjArr[qNum].ansOption = choices[i].value;
      messageChoice.innerHTML = questionObjArr[qNum].ansOption;
      saveButton.disabled = true;
      questionObjArr[qNum].markState = true;
      if (choices[i].value == questionObjArr[qNum].crOption) {
        questionObjArr[qNum].score = 4;
      }
      else{
        questionObjArr[qNum].score = -1;
      }
      //console.log(questionObjArr[qNum].score);
    }
  }
});

document.getElementById("clear").addEventListener("click", () => {
  var saveButton = document.getElementById("saveAnswer");
  saveButton.disabled = false;
  document.getElementById("unchck1").checked = false;
  document.getElementById("unchck2").checked = false;
  document.getElementById("unchck3").checked = false;
  document.getElementById("unchck4").checked = false;
  questionObjArr[qNum].markState = false;
  questionObjArr[qNum].ansOption = "Not Answered";
  document.getElementById("choice").innerHTML = questionObjArr[qNum].ansOption;
  questionObjArr[qNum].score = 0;
});

document.getElementById("load-next").addEventListener("click", () => {
  qNum = qNum + 1;
  document.getElementById("saveAnswer").style.borderColor = "#000";
  document.getElementById("load-prev").disabled = false;
  document.getElementById("choice").innerHTML = questionObjArr[qNum].ansOption;
  if(questionObjArr[qNum].markState == false){
    document.getElementById("saveAnswer").disabled = false;
    document.getElementById("unchck1").checked = false;
    document.getElementById("unchck2").checked = false;
    document.getElementById("unchck3").checked = false;
    document.getElementById("unchck4").checked = false;
  }
  else{
    document.getElementById("saveAnswer").disabled = true;
    var choices = document.getElementsByName("option");
    for (i = 0; i < choices.length; i++) {
        if (choices[i].value == questionObjArr[qNum].ansOption)
            choices[i].checked = true;
        else
            choices[i].checked = false;
        } 
    }  
  document.getElementById("qImage").src = `./Basic-Capacitor,Current/${questionObjArr[qNum].qPic}`;
  if (qNum == questionObjArr.length - 1)
  document.getElementById("load-next").disabled = true;
});

document.getElementById("load-prev").addEventListener("click", () => {
  qNum = qNum - 1;  
  if(questionObjArr[qNum].markState == true){
  document.getElementById("saveAnswer").disabled = true;
  document.getElementById("choice").innerHTML = questionObjArr[qNum].ansOption;
  document.getElementById("saveAnswer").style.borderColor = "#000";
  var choices = document.getElementsByName("option");
    for (i = 0; i < choices.length; i++) {
        if (choices[i].value == questionObjArr[qNum].ansOption)
            choices[i].checked = true;
        else
            choices[i].checked = false;
        } 
    }
  else{
    document.getElementById("choice").innerHTML = questionObjArr[qNum].ansOption;
    document.getElementById("saveAnswer").disabled = false;
    document.getElementById("saveAnswer").style.borderColor = "#000";
    document.getElementById("unchck1").checked = false;
    document.getElementById("unchck2").checked = false;
    document.getElementById("unchck3").checked = false;
    document.getElementById("unchck4").checked = false;
  }
  document.getElementById("qImage").src = `./Basic-Capacitor,Current/${questionObjArr[qNum].qPic}`;
  if (qNum == 0)
    document.getElementById("load-prev").disabled = true;
  document.getElementById("load-next").disabled = false;
});

document.getElementById("submit").addEventListener("click", () => {
  if (time != 0){
    if (confirm("Are you sure? Do you want to Submit while you have time?")) {
      for (i = 0; i < questionObjArr.length; i++) {
        totScore = totScore + questionObjArr[i].score;
        if(questionObjArr[i].score == 4)
        correctAttempt = correctAttempt + 1;
        else if(questionObjArr[i].score == -1)
        wrongAttempt = wrongAttempt + 1;
      }
      studentData.push(totScore);
      studentData.push(correctAttempt);
      studentData.push(wrongAttempt);
      document.querySelector('.reportName').innerHTML = " " + studentData[0].studentFirstName+ " " + studentData[0].studentLastName;
      document.querySelector('.reportMarks').innerHTML = studentData[1];
      document.querySelector('.reportCorrect').innerHTML = studentData[2];
      document.querySelector('.reportIncorrect').innerHTML = studentData[3];
      document.body.classList.toggle('finalDisplay');
      window.location.href = "#";
    }
  }
  else{
    for (i = 0; i < questionObjArr.length; i++) {
        totScore = totScore + questionObjArr[i].score;
        if(questionObjArr[i].score == 4)
        correctAttempt = correctAttempt + 1;
        else if(questionObjArr[i].score == -1)
        wrongAttempt = wrongAttempt + 1;
    }
    studentData.push(totScore);
    studentData.push(correctAttempt);
    studentData.push(wrongAttempt);
    document.querySelector('.reportName').innerHTML = " " + studentData[0].studentFirstName+ " " + studentData[0].studentLastName;
    document.querySelector('.reportMarks').innerHTML = studentData[1];
    document.querySelector('.reportCorrect').innerHTML = studentData[2];
    document.querySelector('.reportIncorrect').innerHTML = studentData[3];
    document.body.classList.toggle('finalDisplay');
    window.location.href = "#"; 
  }
});

document.querySelector('.redirectPage').addEventListener('click', ()=>{
  window.location = "index.html";
});
