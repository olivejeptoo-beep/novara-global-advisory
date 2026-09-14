document.addEventListener('DOMContentLoaded', function(){
  var questions = [
    {
      title: "What best describes what you export or plan to export?",
      options: [
        { text: "Processed / manufactured goods with existing documentation", score: 3 },
        { text: "Agricultural or food products", score: 2 },
        { text: "Raw materials or unprocessed goods", score: 1 },
        { text: "Not yet decided", score: 0 }
      ]
    },
    {
      title: "Where do you currently sell your products or services?",
      options: [
        { text: "Already exporting to one or more international markets", score: 3 },
        { text: "Selling regionally within East Africa or the continent", score: 2 },
        { text: "Domestic market only", score: 1 },
        { text: "Pre-revenue / not yet selling", score: 0 }
      ]
    },
    {
      title: "Where would you like to export to next?",
      options: [
        { text: "A specific market, with research already underway", score: 3 },
        { text: "A general region in mind, but no formal research yet", score: 2 },
        { text: "Open to any viable market", score: 1 },
        { text: "Haven't considered this yet", score: 0 }
      ]
    },
    {
      title: "Do you hold the certifications required for your target market?",
      options: [
        { text: "Yes, current and verified", score: 3 },
        { text: "Some, but not all required certifications", score: 2 },
        { text: "In progress", score: 1 },
        { text: "No / not sure what's required", score: 0 }
      ]
    },
    {
      title: "Do you have a traceability system for your product?",
      options: [
        { text: "Yes, fully documented from source to shipment", score: 3 },
        { text: "Partially — some stages are tracked", score: 2 },
        { text: "Being developed", score: 1 },
        { text: "No traceability system in place", score: 0 }
      ]
    },
    {
      title: "How established are your export documentation procedures?",
      options: [
        { text: "Fully established and used consistently", score: 3 },
        { text: "Basic procedures, used inconsistently", score: 2 },
        { text: "Aware of what's needed, not yet documented", score: 1 },
        { text: "Not familiar with export documentation requirements", score: 0 }
      ]
    }
  ];

  var current = 0;
  var answers = new Array(questions.length).fill(null);

  var qTitle = document.getElementById('qTitle');
  var qOptions = document.getElementById('qOptions');
  var progressBar = document.getElementById('progressBar');
  var stepLabel = document.getElementById('stepLabel');
  var backBtn = document.getElementById('backBtn');
  var nextBtn = document.getElementById('nextBtn');
  var quizView = document.getElementById('quizView');
  var resultView = document.getElementById('resultView');

  if(!qTitle) return;

  function renderQuestion(){
    var q = questions[current];
    qTitle.textContent = q.title;
    qOptions.innerHTML = '';
    q.options.forEach(function(opt, i){
      var label = document.createElement('label');
      label.className = 'q-option' + (answers[current] === i ? ' selected' : '');
      label.innerHTML = '<input type="radio" name="q' + current + '" ' + (answers[current] === i ? 'checked' : '') + '> <span>' + opt.text + '</span>';
      label.addEventListener('click', function(){
        answers[current] = i;
        renderQuestion();
      });
      qOptions.appendChild(label);
    });
    progressBar.style.width = (((current) / questions.length) * 100) + '%';
    stepLabel.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
    backBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
    nextBtn.disabled = answers[current] === null;
    nextBtn.textContent = current === questions.length - 1 ? 'See my result' : 'Next';
  }

  backBtn.addEventListener('click', function(){
    if(current > 0){ current--; renderQuestion(); }
  });

  nextBtn.addEventListener('click', function(){
    if(answers[current] === null) return;
    if(current < questions.length - 1){
      current++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  function showResult(){
    var total = answers.reduce(function(sum, ans, i){
      return sum + (ans !== null ? questions[i].options[ans].score : 0);
    }, 0);
    var max = questions.length * 3;
    var pct = Math.round((total / max) * 100);

    var band, text;
    if(pct >= 75){
      band = 'Export ready';
      text = "You're in a strong position to enter or expand into international markets. Novara can help you validate market fit and move quickly on the remaining details.";
    } else if(pct >= 45){
      band = 'Building readiness';
      text = "You have real foundations in place, with clear gaps to close before you can export with confidence. Novara can help you sequence what to prioritize first.";
    } else {
      band = 'Early stage';
      text = "You're at the start of the export journey. That's a normal place to begin — Novara can help you build the compliance and documentation foundations you'll need.";
    }

    document.getElementById('resultScore').textContent = total + ' / ' + max;
    document.getElementById('resultBand').textContent = band;
    document.getElementById('resultText').textContent = text;
    document.getElementById('resultBar').style.width = pct + '%';

    quizView.style.display = 'none';
    resultView.style.display = 'block';
  }

  var retakeBtn = document.getElementById('retakeBtn');
  if(retakeBtn){
    retakeBtn.addEventListener('click', function(){
      current = 0;
      answers = new Array(questions.length).fill(null);
      resultView.style.display = 'none';
      quizView.style.display = 'block';
      renderQuestion();
    });
  }

  renderQuestion();
});
