// ==CURRENCY==
// 0 | Amount
// 1 | Amount/Click
// 2 | Multiplier
// 3 | Cap
var currency = {
  "dolans" : [0,1,1,1000],
  "ambition" : [0,1,1,1000],
  "experience" : [0,0,1,1000]
}

// ==ROCKETS==
// 0 | Amount
// 1 | Cost (Dolans)
// 2 | Cost (Ambition)
// 3 | Cost (Experience)
// 4 | Dolans/Second
// 5 | Ambition/Second
// 6 | Experience/Second
// 7 | Rocket Level Needed
//   |   Rocket level can be increased via upgrades
var rockets = {
  "slingshot" : [0,0,10,0,0,0.1,0,"Slingshot", 0],
  "bottlerocket" : [0,25,0,0,0,0,0.2,"Bottle Rocket", 0],
  "pvcrocket" : [0,100,25,25,1,0,1,"PVC Pipe Rocket", 0],
  "compressedair" : [0,500,100,50,2,3,3,"Compressed Air Rocket", 1],
  "rocketsim1" : [0,1500,125,150,0,10,10,"Rocket Simulator v1", 1]
}

// ==JOBS==
// 0 | Amount
// 1 | Active or Idle job (Active: 0, Idle: 1)
//   |   If it's an active job, it adds to the CPS of a certian thing
//   |   If it's an idle job, you get money just by sitting around.
// 2 | Cost (Dolans)
// 3 | Cost (Ambition)
// 4 | Cost (Experience)
// 5 | Dolans/Click
// 6 | Ambition/Click
// 7 | Experience/Click
// 8 | Job Rank needed
var jobs = {
  "mcdoodles" : [0,0,0,0,15,1,0,0,"McDoodles", 0],
  "stroopbucks" : [0,0,0,25,100,2,0,0,"StroopBucks", 0]
}

// ==UPGRADES==
// 0 | One-time or Multiple-time (One time: 0, Multiple: 1)
//   |   One-time upgrades can be activated only once before dissapearing
//   |   Multiple-time upgrades can be activated as many times as you'd like
// 1 | Amount bought
// 2 | Pre-Requisites
// 3 | Function to call when bought
// 4 | Name
// 5 | Description
// 6 | Cost (Dolans)
// 7 | Cost (Ambition)
// 8 | Cost (Experience)
var upgrades = {
  "algebra" : [0, 0, [], function(){currency["dolans"][2] += .125; currency["experience"][2] += .125;}, "Learn Algebra", "+ x1.125 multiplier to Dolans and Experience", 0, 0, 1000],
  "geometry" : [0, 0, ["algebra"], function(){currency["dolans"][2] += .125; currency["experience"][2] += .125;}, "Learn Geometry", "+ x1.125 multiplier to Dolans and Experience", 1000, 0, 5000],
  "newBed" : [0, 0, ["algebra"], function(){currency["ambition"][2] += .25;}, "A new bed", "x1.25 multiplier to ambition", 1000, 0, 0],
  "moreRockets" : [0, 0, ["algebra"], function(){upgradeLevels['rocket']=1;for(rocket in rockets){writeRocketHTML(rocket);}}, "Better Rockets", "Learn how to build more rockets", 1000, 0, 0],

}

//The upgrades you currently have
var upgradesHave = [];

//Upgrade levels
var upgradeLevels = {
  "rocket" : 0
}

//Create and save cookies
function bake_cookie(name, value){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + 30);
	var cookie = [name, '=', JSON.stringify(value),'; expires=.', exdate.toUTCString(), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
	document.cookie = cookie;
}

//Read cookie
function eat_cookie(name){
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
}

//Save
function save(type){
  var saveData = {
    "currency" : currency,
    "rockets" : rockets,
    "jobs" : jobs,
    "upgrades" : upgrades,
    "upgradesHave" : upgradesHave,
    "upgradeLevels" : upgradeLevels
  }
  var saveData64 = btoa(JSON.stringify(saveData));
  console.log(saveData64);
  if (type == "manual" || type == "auto"){
    bake_cookie('saveData', saveData64);
  }
  else if (type == "export"){
    $('#saveLoadGUI').sideDown(500);
    $('#saveLoadTextarea').val(saveData64);
  }
}

//Creates the HTML for upgrades
function createUpgrade(upgrade){
  var neededUpgrades = 0; //Amount of pre-requisites you have
  for (i = 0; i < upgrades[upgrade][2].length; i++){
    if (upgradesHave.indexOf(upgrades[upgrade][2][i]) > -1){
      neededUpgrades++;
    }
  }

  //If you have the needed amount of pre-requisites
  if (neededUpgrades >= upgrades[upgrade][2].length && !$('#area'+upgrade).length){

    //Check if its a one time upgrade that's not been bought
    if ((upgrades[upgrade][0] == 0 && upgrades[upgrade][1] == 0) || upgrades[upgrade][0] == 1){
      var upgradeText = "";
      upgradeText += '<tr class="spacer"></tr><tr id="area' + upgrade + '"><td id="' + upgrade + 'Button" onclick="getUpgrade(\''+upgrade+'\')" class="button greyed-out">' + upgrades[upgrade][4] + '</td><td>' + upgrades[upgrade][4];
      if (upgrades[upgrade][0] == 1){
        upgradeText += ': </td><td class="amnt" id="amnt' + upgrade + '">' + upgrades[upgrade][1] + '</td>"';
      }
      else { upgradeText += '</td><td></td>"'; }
      upgradeText += '<td>' + upgrades[upgrade][5] + '</td><td class="desc">';
      if (upgrades[upgrade][6]>0){ upgradeText += upgrades[upgrade][6] + ' dolans   '; }
      if (upgrades[upgrade][7]>0){ upgradeText += upgrades[upgrade][7] + ' ambition   '; }
      if (upgrades[upgrade][8]>0){ upgradeText += upgrades[upgrade][8] + ' experience   '; }
      upgradeText += '</td></tr>';
      return upgradeText;
    }
  }
}

//I guess this is an actual fucking issue then (See 'writeRocketHTML()')
function writeUpgradeHTML(upgrade){
  var rock = createUpgrade(upgrade);
  if (rock != null){ $('#upgradesTable').html($('#upgradesTable').html() + rock); }
}

//Creates the HTML for rockets
function createRocket(rocket){
  if (rockets[rocket][8] <= upgradeLevels['rocket'] && !$('#area'+rocket).length){
    var rocketText = "";
    rocketText += '<tr class="spacer"></tr><tr id="area' + rocket + '"><td id="' + rocket + 'Button" onclick="build(\''+rocket+'\')" class="button greyed-out">Build ' + rockets[rocket][7] + '</td>';

    rocketText += '<td id="' + rocket + 'Button10" onclick="build(\''+rocket+'\', 10)" class="smolbutton rocketBuy10 greyed-out">x10</td>';
    rocketText += '<td id="' + rocket + 'Button100" onclick="build(\''+rocket+'\', 100)" class="smolbutton rocketBuy100 greyed-out" style="display:none">x100</td>';
    rocketText += '<td id="' + rocket + 'Button1000" onclick="build(\''+rocket+'\', 1000)" class="smolbutton rocketBuy1000 greyed-out" style="display:none">x1000</td>';

    rocketText += '<td >' + rockets[rocket][7] + 's:</td><td id="amnt' + rocket + '" class="amnt">' + rockets[rocket][0] + '</td><td class="desc">';
    if (rockets[rocket][1]>0){ rocketText += rockets[rocket][1] + ' dolans; '; }

    if (rockets[rocket][2]>0){ rocketText += rockets[rocket][2] + ' ambition; '; }
    if (rockets[rocket][3]>0){ rocketText += rockets[rocket][3] + ' experience; '; }
    rocketText += '<br />';
    if (rockets[rocket][4]>0){ rocketText += rockets[rocket][4] + ' dolans/second; '; }
    if (rockets[rocket][5]>0){ rocketText += rockets[rocket][5] + ' ambition/second; '; }
    if (rockets[rocket][6]>0){ rocketText += rockets[rocket][6] + ' experience/second; '; }
    rocketText += '</td></tr>';
    return rocketText;
  }
}

//Becuse for some FUCKING reason, doing it normally is a no no
function writeRocketHTML(rocket){
  var rock = createRocket(rocket);
  if (rock != null){ $('#rocketsTable > tr:last').after(rock); }
  else { console.log('Rocket returned null: ' + rocket); }
}

//Checks if you can buy a rocket
function checkIfCanBuy(rocket, amount=1){
  if ((rockets[rocket][1] * amount) <= currency["dolans"][0] &&
      (rockets[rocket][2] * amount) <= currency["ambition"][0] &&
      (rockets[rocket][3] * amount) <= currency["experience"][0]
  ){
    return true;
  }
  else {
    return false;
  }
}

//Checks if you can work a job
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

//Check if you can buy an upgrade
function checkIfCanUpgrade(upgrade, bypassMoney = false){
  if ((upgrades[upgrade][6] <= currency["dolans"][0] &&
      upgrades[upgrade][7] <= currency["ambition"][0] &&
      upgrades[upgrade][8] <= currency["experience"][0]) ||
      bypassMoney == true
  ){
    var neededUpgrades = 0;
    for (i = 0; i < upgrades[upgrade][2].length; i++){
      if (upgradesHave.indexOf(upgrades[upgrade][2][i]) > -1){
        neededUpgrades++;
      }
    }
    if (neededUpgrades >= upgrades[upgrade][2].length){
      return true;
    }
  }
  else {
    return false;
  }
}

//Updates GUI
function updateInfo(){
  $("#ambitionCount").text(Math.floor(currency["ambition"][0]));
  $("#dolansCount").text(Math.floor(currency["dolans"][0]));
  $("#experienceCount").text(Math.floor(currency["experience"][0]));
}

//Changes tab
function tab(tabName){
  $('.gameTab').slideUp(0);
  $('.gameTabSelector').removeClass('selectedTab');
  $('#tab'+tabName).addClass('selectedTab');
  $('#'+tabName).slideDown(0);
}

//Adds a rocket to inventory
function build(rocket, amount=1){
  if (checkIfCanBuy(rocket, amount)){
    rockets[rocket][0] += amount;
    currency["dolans"][0] -= rockets[rocket][1] * amount;
    currency["ambition"][0] -= rockets[rocket][2] * amount;
    currency["experience"][0] -= rockets[rocket][3] * amount;
    $("#amnt"+rocket).text(rockets[rocket][0]);
    updateInfo();
    greyOutRocket(rocket);
  }
}

//Greys out rocket
function greyOutRocket(rocket){
  if (checkIfCanBuy(rocket)){$('#'+rocket+"Button").removeClass('greyed-out');}
  else { $('#'+rocket+"Button").addClass('greyed-out'); }
  if (checkIfCanBuy(rocket, 10)){$('#'+rocket+"Button10").removeClass('greyed-out');}
  else { $('#'+rocket+"Button10").addClass('greyed-out'); }
  if (checkIfCanBuy(rocket, 100)){$('#'+rocket+"Button100").removeClass('greyed-out');}
  else { $('#'+rocket+"Button100").addClass('greyed-out'); }
  if (checkIfCanBuy(rocket, 1000)){$('#'+rocket+"Button1000").removeClass('greyed-out');}
  else { $('#'+rocket+"Button1000").addClass('greyed-out'); }
}

//Adds currency when you click the buttons
function work(type){
  currency[type][0] += currency[type][1] * currency[type][2];
  $("#"+type+"Count").text(Math.floor(currency[type][0]));
}

//Work a job
function getJob(job){
  if (checkIfCanWork(job) && jobs[job][0] == 0){
    $("#"+job+"Button").removeClass('greyed-out');
    $("#"+job+"Button").addClass('greyed-out-perm');
    $("#"+job+"Button").text("You already work here");
    jobs[job][0] = 1;
    currency["dolans"][1] += jobs[job][5];
    currency["ambition"][1] += jobs[job][6];
    currency["experience"][1] += jobs[job][7];
  }
}

//Add an upgrade to your inventory
function getUpgrade(upgrade){
  if (checkIfCanUpgrade(upgrade)){
    if (upgrades[upgrade][0] == 1){
      $('#amnt' + upgrade).text(upgrades[upgrade][1]);
    }
    else{
      upgradesHave.push(upgrade);
      addUpgradesToTable();
      $('#area' + upgrade).remove();
      $('#spacer' + upgrade).remove();
      $('#upgradesBought').html($('#upgradesBought').html() + '<strong>' + upgrades[upgrade][4] + ': </strong>' + upgrades[upgrade][5]+ '<br />');
    }
    upgrades[upgrade][1]++;
    currency["dolans"][0] -= upgrades[upgrade][6];
    currency["ambition"][0] -= upgrades[upgrade][7];
    currency["experience"][0] -= upgrades[upgrade][8];
    upgrades[upgrade][3]();
  }
}

//Add more upgrades based on pre-requisites
//  To be run after an upgrade is bought
function addUpgradesToTable(){
  for (upgrade in upgrades){
    if (checkIfCanUpgrade(upgrade, true)){
      writeUpgradeHTML(upgrade);
    }
  }
}

//Used for debug
function ruinGame(){
  for (dolan in currency){
    currency[dolan][0] = 1000000;
  }
}

//Initialize the game
function initGame(){

  //Jobs
  var jobText = "";
  for (job in jobs){
    jobText += '<tr class="spacer"></tr><tr id="area' + job + '"><td id="' + job + 'Button" onclick="getJob(\''+job+'\')" class="button greyed-out">Work at ' + jobs[job][8] + '</td><td >' + jobs[job][8] + ':</td><td class="amnt">'
    if (jobs[job][5]>0){ jobText += '+' + jobs[job][5] + ' dolans/click '; }
    if (jobs[job][6]>0){ jobText += '+' + jobs[job][6] + ' ambition/click '; }
    if (jobs[job][7]>0){ jobText += '+' + jobs[job][7] + ' experience/click '; }
    jobText += '</td><td class="desc">';
    if (jobs[job][2]>0){ jobText += jobs[job][2] + ' dolans '; }
    if (jobs[job][3]>0){ jobText += jobs[job][3] + ' ambition '; }
    if (jobs[job][4]>0){ jobText += jobs[job][4] + ' experience '; }
    jobText += '</td></tr>';
  }
  $('#jobsTable').html(jobText);

  //Rockets
  var rockitboi = "";
  for (rocket in rockets){
    rockitboi += createRocket(rocket);
  }
  $('#rocketsTable').html(rockitboi);

  //  ==Upgrades==
  //The upgrade html
  var upgradeText = "";
  //Iterate through upgrades
  for (upgrade in upgrades){
    //Check if it has all the required Pre-Requisites
    var neededUpgrades = 0;
    for (i = 0; i < upgrades[upgrade][2].length; i++){
      if (upgradesHave.indexOf(upgrades[upgrade][2][i]) > -1){
        neededUpgrades++;
      }
    }
    //If it does
    if (neededUpgrades >= upgrades[upgrade][2].length){
      upgradeText += '<tr class="spacer" id="spacer' + upgrade + '"></tr><tr id="area' + upgrade + '"><td id="' + upgrade + 'Button" onclick="getUpgrade(\''+upgrade+'\')" class="button greyed-out">' + upgrades[upgrade][4] + '</td><td>' + upgrades[upgrade][4];
      if (upgrades[upgrade][0] == 1){
        upgradeText += ': </td><td class="amnt" id="amnt' + upgrade + '">' + upgrades[upgrade][1] + '</td>"';
      }
      else { upgradeText += '</td><td></td>"'; }
      upgradeText += '<td>' + upgrades[upgrade][5] + '</td><td class="desc">';
      if (upgrades[upgrade][6]>0){ upgradeText += upgrades[upgrade][6] + ' dolans   '; }
      if (upgrades[upgrade][7]>0){ upgradeText += upgrades[upgrade][7] + ' ambition   '; }
      if (upgrades[upgrade][8]>0){ upgradeText += upgrades[upgrade][8] + ' experience   '; }
      upgradeText += '</td></tr>';
    }
  }
  $('#upgradesTable').html(upgradeText);
}

//Updates the game, run every second
function updateGame(){
  //Updates the multiplier
  for (dolan in currency){
    if (currency[dolan][2] > 1){
      $('#' + dolan + 'Mult').text('(x' + currency[dolan][2] + ')')
    }
  }

  //Rocket loop
  for (rocket in rockets){
    //Add currency
    currency["dolans"][0] += rockets[rocket][0] * rockets[rocket][4] *  currency["dolans"][2];
    currency["ambition"][0] += rockets[rocket][0] * rockets[rocket][5] *  currency["ambition"][2];
    currency["experience"][0] += rockets[rocket][0] * rockets[rocket][6] *  currency["experience"][2];

    //Update rocket buy buttons
    greyOutRocket(rocket);

    if (rockets[rocket][0] >= 100){ $('.rocketBuy100').slideDown(0); }
    if (rockets[rocket][0] >= 1000){ $('.rocketBuy1000').slideDown(0); }
  }

  //Update job buy buttons
  for (job in jobs){
    if (checkIfCanWork(job)){$('#'+job+"Button").removeClass('greyed-out');}
  }

  //Update upgrade buy buttons
  for (upgrade in upgrades){
    if (checkIfCanUpgrade(upgrade)){$('#'+upgrade+"Button").removeClass('greyed-out');}
  }

  //Update GUI
  updateInfo();
}
