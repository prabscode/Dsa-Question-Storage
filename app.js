document.getElementById('questionForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get values
    const title = document.getElementById('title').value;
    const code = document.getElementById('code').value;
  
    // Save to LocalStorage
    saveQuestion(title, code);
  
    // Display question
    addQuestionToDOM(title, code);
  
    // Clear form
    document.getElementById('title').value = '';
    document.getElementById('code').value = '';
  });
  
  // Function to save question
  function saveQuestion(title, code) {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.push({ title, code });
    localStorage.setItem('questions', JSON.stringify(questions));
  }
  
  // Function to delete question
  function deleteQuestion(index) {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.splice(index, 1);
    localStorage.setItem('questions', JSON.stringify(questions));
    loadQuestions(); // Refresh the list
  }
  
  // Function to add question to DOM
  function addQuestionToDOM(title, code, index = null) {
    const questionList = document.getElementById('questionList');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
      <strong>${title}</strong>
      <pre>${code}</pre>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
  
    // Add separator if there are existing questions
    if (index > 0) {
      const separator = document.createElement('div');
      separator.className = 'separator';
      questionList.appendChild(separator);
    }
  
    questionList.appendChild(questionDiv);
  
    // Add event listener for delete button
    if (index !== null) {
      questionDiv.querySelector('.delete-btn').addEventListener('click', function () {
        deleteQuestion(index);
      });
    }
  }
  
  // Function to load questions from LocalStorage and display them
  function loadQuestions() {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = ''; // Clear existing questions
  
    questions.forEach((q, index) => {
      addQuestionToDOM(q.title, q.code, index);
    });
  }
  
  // Load questions on page load
  loadQuestions();
   