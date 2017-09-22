//Amount, Amount/Click, Multiplier
var currency = {
  "dolans" : [0,1,1],
  "ambition" : [0,1,1],
  "experience" : [0,0,1]
}

//Amount, Dolans, Ambition, Experience, Dolans, Ambition, Experience
//   0       1        2          3         4       5           6
var rockets = {
  "slingshot" : [0,0,10,0,0,0.1,0],
  "bottlerocket" : [0,5,0,0,0,0,0.2]
}

//Amount, Idle Job, Dolans, Ambition, Experience, Dolans/Click, Ambition/Click, Experience/Click
//   0       1        2        3           4           5               6               7
var jobs = {
  "mcdoodles" : [0,0,0,0,15,1,0,0]
}


function updateGame(){
  for (rocket in rockets){
    currency["dolans"][0] += rockets[rocket][0] * rockets[rocket][4] *  currency["dolans"][2];
    currency["ambition"][0] += rockets[rocket][0] * rockets[rocket][5] *  currency["ambition"][2];
    currency["experience"][0] += rockets[rocket][0] * rockets[rocket][6] *  currency["experience"][2];
  }

  //Update Goo Wee
  updateInfo();

  //Update buy buttons
  for (rocket in rockets){
    if (checkIfCanBuy(rocket)){$('#'+rocket+"Button").removeClass('greyed-out');}
    else {$('#'+rocket+"Button").addClass('greyed-out');}
  }

  for (job in jobs){
    if (checkIfCanWork(job)){$('#'+job+"Button").removeClass('greyed-out');}
  }
}

function checkIfCanBuy(rocket){
  if (rockets[rocket][1] <= currency["dolans"][0] &&
      rockets[rocket][2] <= currency["ambition"][0] &&
      rockets[rocket][3] <= currency["experience"][0]
  ){
    return true;
  }
  else {
    return false;
  }
}

function checkIfCanWork(job){
  if (jobs[job][2] <= currency["dolans"][0] &&
      jobs[job][3] <= currency["ambition"][0] &&
      jobs[job][4] <= currency["experience"][0]
  ){
    return true;
  }
  else {
    return false;
  }
}

function updateInfo(){
  $("#ambitionCount").text(Math.floor(currency["ambition"][0]));
  $("#dolansCount").text(Math.floor(currency["dolans"][0]));
  $("#experienceCount").text(Math.floor(currency["experience"][0]));
}

function tab(tabName){
  $('.gameTab').slideUp(0);
  $('.gameTabSelector').removeClass('selectedTab');
  $('#tab'+tabName).addClass('selectedTab');
  $('#'+tabName).slideDown(0);
}

function build(rocket){
  if (checkIfCanBuy(rocket)){
    rockets[rocket][0]++;
    currency["dolans"][0] -= rockets[rocket][1];
    currency["ambition"][0] -= rockets[rocket][2];
    currency["experience"][0] -= rockets[rocket][3];
    $("#amnt"+rocket).text(rockets[rocket][0]);
    updateInfo();
    if (checkIfCanBuy(rocket)){$('#'+rocket+"Button").removeClass('greyed-out');}
    else {$('#'+rocket+"Button").addClass('greyed-out');}
  }
}

function work(type){
  currency[type][0] += currency[type][1] * currency[type][2];
  $("#"+type+"Count").text(Math.floor(currency[type][0]));
}

function getJob(job){
  if (checkIfCanWork(job) && jobs[job][0] == 0){
    $("#"+job+"Button").removeClass('greyed-out');
    $("#"+job+"Button").text("You work here now!");
    jobs[job][0] = 1;
    currency["dolans"][1] += jobs[job][5];
    currency["ambition"][1] += jobs[job][6];
    currency["experience"][1] += jobs[job][7];
  }
}
