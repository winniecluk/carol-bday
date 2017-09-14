// var activityOrder = 0;
var activityOrder = new Map();
var activities = [
  {
    activity: 'Dinner',
    hour: 1,
    minute: 0,
    numbered: 0
  },
  {
    activity: 'Drinks',
    hour: 0,
    minute: 30,
    numbered: 0
  },
  {
    activity: 'Laser tag',
    hour: 1,
    minute: 0,
    numbered: 0
  },
  {
    activity: 'Board games',
    hour: 2,
    minute: 0,
    numbered: 0
  },
  {
    activity: 'Dancing',
    hour: 1,
    minute: 30,
    numbered: 0
  },
  {
    activity: 'Escape Room',
    hour: 1,
    minute: 0,
    numbered: 0
  },
  {
    activity: 'Arcade',
    hour: 1,
    minute: 0,
    numbered: 0
  },
  {
    activity: 'Video games at home',
    hour: 1,
    minute: 0,
    numbered: 0
  },
  {
    activity: 'Bowling',
    hour: 1,
    minute: 30,
    numbered: 0
  }
];

var rowDivs = [];

function initialRender(){
  for (let i = 0; i < activities.length; i++){
    // activityOrder[i] = 'available';
    activityOrder.set(i + 1, 'available');
  }

  for (let i = 0; i < activities.length; i++){
  rowDivs.push(createRow(activities[i].activity));

    if (i === activities.length - 1){
      var activityTable = document.querySelector('#activity-table');
      for (let i = 0; i < rowDivs.length; i++){
        activityTable.appendChild(rowDivs[i]);
      }
    }
  }
}

function createRow(str){
  let newRow = document.createElement('div');
  newRow.classList.add('row-container');

  let newLeft = document.createElement('div');
  newLeft.setAttribute('data-state', 'neutral');
  newLeft.setAttribute('data-activity', str);
  newLeft.className = 'left-option border numbered-left';
  newRow.appendChild(newLeft);

  let newRight = document.createElement('div');
  newRight.classList.add('right-option');
  newRight.textContent = str;
  newRow.appendChild(newRight);
  return newRow;
}

function renderNewRow(str){
  var activityTable = document.querySelector('#activity-table');
  activityTable.appendChild(createRow(str));
}

initialRender();

document.addEventListener('click', function(e){
  if (e.target.classList.contains('numbered-left')){
    console.log('checking the box');
    if (e.target.getAttribute('data-state') == 'neutral'){
      e.target.innerHTML = '';
      let found = false;
      let value = '';

      activityOrder.forEach(function(el, idx){
        if (el === 'available' && !found){
          found = true;
          value = idx;
          activityOrder.set(idx, 'taken');
        }
      });
      e.target.innerHTML = '(' + value + ')';
      e.target.setAttribute('data-state', 'numbered');
      console.log(activityOrder);
    } else if (e.target.getAttribute('data-state') == 'numbered'){
      var currentNumber = e.target.innerHTML.replace(/[()]/g, '');
      e.target.innerHTML = '';
      console.log('this is currentNumber: ' + currentNumber);
      activityOrder.set(parseInt(currentNumber), 'available');
      console.log(activityOrder);
      e.target.setAttribute('data-state', 'neutral');
    }
  } // closes check if numbered-left
});

document.querySelector('#submit-activity').addEventListener('click', function(e){
  saveActivities(e);
});
document.querySelector('#activity-text').addEventListener('keypress', function(e){
  if (e.charCode === 13){
    console.log(e);
    saveActivities(e);
  }
});

function saveActivities(e){
  let textBox = document.querySelector('#activity-text');
  let input = textBox.value;
  textBox.value = '';
  activities.push({
    activity: input,
    numbered: 0
  });
  activityOrder.set(activities.length, 'available');
  renderNewRow(input);
  console.log(activityOrder);
}

var sections = document.querySelectorAll('div.section');

document.querySelectorAll('.navigation-down').forEach(function(el, idx){
  el.addEventListener('click', function(e){
    console.log(sections.length -1);
    console.log(idx);
    if (sections.length - 1 >= idx + 1){
      sections[idx + 1].scrollIntoView({behavior: 'smooth'});
    }
  });
});
