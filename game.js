//Enable debug mode?
var debug = true;

//Times per second the game updates
var gameSpeed = 1;

// ==PROPER NAME==
var properName = {
  "dolans" : "Dolans",
  "ambition" : "Ambition",
  "experience" : "Experience",
  "oil" : "Oil",
  "dna" : "DNA Fragments"
}

// ==CURRENCY==
var currency = {
  "dolans" : {
    "amount" : 0,
    "apc" : 1,
    "mult" : 1,
    "max" : 1000
  },
  "ambition" : {
    "amount" : 0,
    "apc" : 1,
    "mult" : 1,
    "max" : 1000
  },
  "experience" : {
    "amount" : 0,
    "apc" : 0,
    "mult" : 1,
    "max" : 1000
  }
}

// ==ROCKETS==
var rockets = {
  "slingshot" : {
    "name" : "Slingshot",
    "amount" : 0,
    "tier" : 0,
    "cost" : {
      "ambition" : 10
    },
    "aps" : {
      "ambition" : 0.1
    }
  },
  "bottlerocket" : {
    "name" : "Bottle Rocket",
    "amount" : 0,
    "tier" : 0,
    "cost" : {
      "dolans" : 25
    },
    "aps" : {
      "experience" : 0.1
    }
  },
  "pvcrocket" : {
    "name" : "PVC Rocket",
    "amount" : 0,
    "tier" : 0,
    "cost" : {
      "dolans" : 100,
      "ambition" : 25,
      "experience" : 25
    },
    "aps" : {
      "dolans" : 1,
      "experience" : 1
    }
  },
  "compressedair" : {
    "name" : "Compressed Air Rocket",
    "amount" : 0,
    "tier" : 1,
    "cost" : {
      "dolans" : 500,
      "ambition" : 100,
      "experience" : 50
    },
    "aps" : {
      "dolans" : 2,
      "ambition" : 3,
      "experience" : 3
    }
  },
  "rocketsim1" : {
    "name" : "Rocket Simulator 1999",
    "amount" : 0,
    "tier" : 1,
    "cost" : {
      "dolans" : 1500,
      "ambition" : 125,
      "experience" : 150
    },
    "aps" : {
      "dolans" : 0,
      "ambition" : 10,
      "experience" : 10
    }
  },
}

// ==JOBS==
var jobs = {
  "mcdoodles" : {
    "name" : "McDoodles",
    "working" : false,
    "active" : true,
    "cost" : {
      "experience" : 25
    },
    "apc" : {
      "dolans" : 1
    }
  },
  "stroopbucks" : {
    "name" : "StoopBucks",
    "working" : false,
    "active" : true,
    "cost" : {
      "experience" : 100,
      "ambition" : 500
    },
    "apc" : {
      "dolans" : 2
    }
  }
}

// ==UPGRADES==
var upgrades = {
  "algebra" : {
    "onetime" : 0,
    "amount" : 0,
    "prerequisites" : [],
    "function" : function(){currency['dolans']['mult'] += .125; currency['experience']['mult'] += .125;},
    "name" : "Learn Algebra",
    "description" : "+ x1.125 multiplier to Dolans and Experience",
    "cost" : {
      "dolans" : 0,
      "ambition" : 0,
      "experience" : 1000
    }
  },
  "geometry" : {
    "onetime" : 0,
    "amount" : 0,
    "prerequisites" : ["algebra"],
    "function" : function(){currency['dolans']['mult'] += .125; currency['experience']['mult'] += .125;},
    "name" : "Learn Geometry",
    "description" : "+ x1.125 multiplier to Dolans and Experience",
    "cost" : {
      "dolans" : 500,
      "ambition" : 0,
      "experience" : 1000
    }
  },
  "newBed" : {
    "onetime" : 0,
    "amount" : 0,
    "prerequisites" : ["algebra"],
    "function" : function(){currency['ambition']['mult'] += .25;},
    "name" : "A new bed",
    "description" : "+ x1.25 multiplier to Ambition",
    "cost" : {
      "dolans" : 1000,
      "ambition" : 0,
      "experience" : 0
    }
  },
  "moreRockets" : {
    "onetime" : 0,
    "amount" : 0,
    "prerequisites" : ["geometry"],
    "function" : function(){upgradeLevels['rocket']=1;for(rocket in rockets){writeRocketHTML(rocket);}},
    "name" : "Better Rockets",
    "description" : "+ x1.25 multiplier to Ambition",
    "cost" : {
      "dolans" : 1500,
      "ambition" : 500,
      "experience" : 1500
    }
  },
}

// ==BUILDINGS==
var buildings = {
  "piggybank" : {
    "name" : "Piggy Bank",
    "description" : "Increase max Dolans by 1000",
    "amount" : 0,
    "tier" : 0,
    "function" : function(){ currency['dolans']['max']+=1000; },
    "cost" : {
      "dolans" : 500
    }
  },
  "capacityForGreatness" : {
    "name" : "Capacity for greatness",
    "description" : "Increase max Ambition by 1000",
    "amount" : 0,
    "tier" : 0,
    "function" : function(){ currency['ambition']['max']+=1000; },
    "cost" : {
      "dolans" : 500
    }
  },
  "notebook" : {
    "name" : "A pen and notebook",
    "description" : "Increase max Experience by 1000",
    "amount" : 0,
    "tier" : 0,
    "function" : function(){ currency['experience']['max']+=1000; },
    "cost" : {
      "dolans" : 500
    }
  }
}

//The upgrades you currently have
var upgradesHave = [];

//Upgrade levels
var upgradeLevels = {
  "rocket" : 0,
  "building" : 0
}

//Defaults
var defaults = {
  "currency" : currency,
  "rockets" : rockets,
  "jobs" : jobs,
  "upgrades" : upgrades,
  "upgradesHave" : upgradesHave,
  "upgradeLevels" : upgradeLevels,
  "buildings" : buildings
}

//Create and save cookies
function bake_cookie(name, value){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + 365);
	var cookie = [name, '=', JSON.stringify(value),'; expires=.', exdate.toUTCString(), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
	document.cookie = cookie;
}

//Read cookie
function eat_cookie(name){
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
}

//Make save data
function makeSaveData(){
  //Create the empty save data
  var saveData = {
    'rockets' : {},
    'upgrades' : {},
    'buildings' : {},
    'jobs' : {},
    'currency' : {},
    'upgradesHave' : {},
    'upgradeLevels' : {}
  };
  //Iterate through each and only save the amount you have
  for (rocket in rockets){ saveData['rockets'][rocket] = {}; saveData['rockets'][rocket]['amount'] = rockets[rocket]['amount']; }
  for (upgrade in upgrades){ saveData['upgrades'][upgrade] = {}; saveData['upgrades'][upgrade]['amount'] = upgrades[upgrade]['amount']; }
  for (building in buildings){ saveData['buildings'][building] = {}; saveData['buildings'][building]['amount'] = buildings[building]['amount']; }
  //Save all data, since all fields can be changed
  saveData['jobs'] = jobs;
  saveData['currency'] = currency;
  saveData['upgradesHave'] = upgradesHave;
  saveData['upgradeLevels'] = upgradeLevels;
  return saveData;
}

//Save
function save(type){
  var saveData = makeSaveData();
  var saveData64 = LZString.compressToBase64(JSON.stringify(saveData));
  if (type == "manual" || type == "auto"){
    bake_cookie('saveData', JSON.stringify(saveData64));
  }
  else if (type == "export"){
    $('#saveLoadTextarea').val(saveData64);
  }
}

//Load
function load(type){
  //Set the save data to empty so no *major* errors occur
  var saveData = [];
  //Manual loading from import
  if (type == "manual"){
    try{
      saveData = JSON.parse(LZString.decompressFromBase64($('#saveLoadTextarea').val()));
    }
    catch(e){
      alert('Invalid save data entered');
    }
  }
  //Auto loading when page is vitited
  if (type == 'auto'){
    try{
      saveData = JSON.parse(LZString.decompressFromBase64(eat_cookie('saveData')));
    }
    catch(e) {
      console.log('Couldn\'t autoload')
    }
  }
  try{
    for (rocket in rockets){ rockets[rocket]['amount'] = saveData['rockets'][rocket]['amount']; }
    for (upgrade in upgrades){ upgrades[upgrade]['amount'] = saveData['upgrades'][upgrade]['amount']; }
    for (building in buildings){ buildings[building]['amount'] = saveData['buildings'][building]['amount']; }
    jobs = saveData['jobs'];
    currency = saveData['currency'];
    upgradesHave = saveData['upgradesHave'];
    upgradeLevels = saveData['upgradeLevels'];
  }
  catch (e) {
    console.log('An error occured while loading. Maybe there was no save file?')
  }
}

//Reset
function reset(){
  var confirmed = window.confirm('Are you sure? This will wipe ALL progress');
  if (confirmed){
    currency = defaults["currency"];
    rockets = defaults["rockets"];
    jobs = defaults["jobs"];
    upgrades = defaults["upgrades"];
    upgradesHave = defaults["upgradesHave"];
    upgradeLevels = defaults["upgradeLevels"];
    buildings = defaults["buildings"];
  }
}

//Creates HTML for buildings
function createBuilding(building){
  if (buildings[building]['tier'] <= upgradeLevels['building'] && !$('#area'+building).length){
    var buildingText = "";
    buildingText += '<tr class="spacer"></tr><tr id="area' + building + '"><td id="' + building + 'Button" onclick="buildBuild(\''+building+'\')" class="button greyed-out">Build ' + buildings[building]['name'] + '</td>';

    buildingText += '<td id="' + building + 'Button10" onclick="buildBuild(\''+building+'\', 10)" class="smolbutton buildingBuy10 greyed-out">x10</td>';
    buildingText += '<td id="' + building + 'Button100" onclick="buildBuild(\''+building+'\', 100)" class="smolbutton buildingBuy100 greyed-out" style="display:none">x100</td>';
    buildingText += '<td id="' + building + 'Button1000" onclick="buildBuild(\''+building+'\', 1000)" class="smolbutton buildingBuy1000 greyed-out" style="display:none">x1000</td>';

    buildingText += '<td >' + buildings[building]['name'] + 's:</td><td id="amnt' + building + '" class="amnt">' + buildings[building]['amount'] + '</td><td class="desc">';
    buildingText += buildings[building]['description'] + '<br />';
    for (i in buildings[building]['cost']){
      if (buildings[building]['cost'][i]>0){ buildingText += buildings[building]['cost'][i] + ' ' + properName[i] + '; '; }
    }
    buildingText += '</td></tr>';
    return buildingText;
  }
}

//Writes HTML for buildings
function writeBuildingHTML(building){
  var rock = createBuilding(building);
  if (rock != null){ $('#buildingTable > tr:last').after(rock); }
}

//Creates the HTML for upgrades
function createUpgrade(upgrade){
  var neededUpgrades = 0; //Amount of pre-requisites you have
  for (i = 0; i < upgrades[upgrade]['prerequisites'].length; i++){
    if (upgradesHave.indexOf(upgrades[upgrade]['prerequisites'][i]) > -1){
      neededUpgrades++;
    }
  }
  //If you have the needed amount of pre-requisites
  if (neededUpgrades >= upgrades[upgrade]['prerequisites'].length && !$('#area'+upgrade).length){
    //Check if its a one time upgrade that's not been bought
    if ((upgrades[upgrade]['onetime'] == 0 && upgrades[upgrade]['amount'] == 0) || upgrades[upgrade]['onetime'] == 1){
      var upgradeText = "";
      upgradeText += '<tr id="spacer' + upgrade + '" class="spacer"></tr><tr id="area' + upgrade + '"><td id="' + upgrade + 'Button" onclick="getUpgrade(\''+upgrade+'\')" class="button greyed-out">' + upgrades[upgrade]['name'] + '</td><td>' + upgrades[upgrade]['name'];
      if (upgrades[upgrade]['onetime'] == 1){
        upgradeText += ': </td><td class="amnt" id="amnt' + upgrade + '">' + upgrades[upgrade]['amount'] + '</td>"';
      }
      else { upgradeText += '</td><td></td>"'; }
      upgradeText += '<td>' + upgrades[upgrade]['description'] + '</td><td class="desc">';
      if (upgrades[upgrade]['cost']['dolans']>0){ upgradeText += upgrades[upgrade]['cost']['dolans'] + ' dolans   '; }
      if (upgrades[upgrade]['cost']['ambition']>0){ upgradeText += upgrades[upgrade]['cost']['ambition'] + ' ambition   '; }
      if (upgrades[upgrade]['cost']['experience']>0){ upgradeText += upgrades[upgrade]['cost']['experience'] + ' experience   '; }
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
  if (rockets[rocket]['tier'] <= upgradeLevels['rocket'] && !$('#area'+rocket).length){
    var rocketText = "";
    rocketText += '<tr class="spacer"></tr><tr id="area' + rocket + '"><td id="' + rocket + 'Button" onclick="build(\''+rocket+'\')" class="button greyed-out">Build ' + rockets[rocket]['name'] + '</td>';

    rocketText += '<td id="' + rocket + 'Button10" onclick="build(\''+rocket+'\', 10)" class="smolbutton rocketBuy10 greyed-out">x10</td>';
    rocketText += '<td id="' + rocket + 'Button100" onclick="build(\''+rocket+'\', 100)" class="smolbutton rocketBuy100 greyed-out" style="display:none">x100</td>';
    rocketText += '<td id="' + rocket + 'Button1000" onclick="build(\''+rocket+'\', 1000)" class="smolbutton rocketBuy1000 greyed-out" style="display:none">x1000</td>';

    rocketText += '<td >' + rockets[rocket]['name'] + 's:</td><td id="amnt' + rocket + '" class="amnt">' + rockets[rocket]['amount'] + '</td><td class="desc">';
    for (dolan in currency){
      if (rockets[rocket]['cost'][dolan] != null){
        if (rockets[rocket]['cost'][dolan]>0){ rocketText += rockets[rocket]['cost'][dolan] + ' ' + properName[dolan] + '; '; }
      }
    }
    rocketText += '<br />';
    for (dolan in currency){
      if (rockets[rocket]['aps'][dolan] != null && rockets[rocket]['aps'][dolan]>0){ rocketText += rockets[rocket]['aps'][dolan] + ' ' + properName[dolan] + '/second; '; }
    }
    rocketText += '</td></tr>';
    return rocketText;
  }
}

//Becuse for some FUCKING reason, doing it normally is a no no
function writeRocketHTML(rocket){
  var rock = createRocket(rocket);
  if (rock != null){ $('#rocketsTable > tr:last').after(rock); }
}

//Checks if you can buy a rocket
function checkIfCanBuy(rocket, amount=1){
  var check = 0;
  for (i in rockets[rocket]['cost']){
    if ((rockets[rocket]['cost'][i] * amount) <= currency[i]['amount']){
      check++;
    }
  }
  if (check == Object.keys(rockets[rocket]['cost']).length){
    return true;
  }
  else {
    return false;
  }
}

//Checks if you can work a job
function checkIfCanWork(job){
  var check = 0;
  for (i in jobs[job]['cost']){
    if (jobs[job]['cost'][i] <= currency[i]['amount']){
      check++;
    }
  }
  if (check == Object.keys(jobs[job]['cost']).length && jobs[job]['working'] == false){
    return true;
  }
  else {
    return false;
  }
}

//Check if you can buy an upgrade
function checkIfCanUpgrade(upgrade, bypassMoney = false){
  var check = 0;
  for (i in upgrades[upgrade]['cost']){
    if (upgrades[upgrade]['cost'][i] <= currency[i]['amount']){
      check++;
    }
  }
  if ((check == Object.keys(upgrades[upgrade]['cost']).length || bypassMoney == true) && ((upgrades[upgrade]['onetime'] == 0 && upgrades[upgrade]['amount'] == 0) || upgrades[upgrade]['onetime'] == 1)){
    var neededUpgrades = 0;
    for (i = 0; i < upgrades[upgrade]['prerequisites'].length; i++){
      if (upgradesHave.indexOf(upgrades[upgrade]['prerequisites'][i]) > -1){
        neededUpgrades++;
      }
    }
    if (neededUpgrades >= upgrades[upgrade]['prerequisites'].length){
      return true;
    }
  }
  else {
    return false;
  }
}

//Check if you can build a building
function checkIfCanBuild(building, amount=1){
  var check = 0;
  for (i in buildings[building]['cost']){
    if ((buildings[building]['cost'][i] * amount) <= currency[i]['amount']){
      check++;
    }
  }
  if (check == Object.keys(buildings[building]['cost']).length){
    return true;
  }
  else {
    return false;
  }
}

//Updates GUI
function updateInfo(){
  $("#ambitionCount").text(Math.floor(currency['ambition']['amount']));
  $("#ambitionMax").text("(Max "+ Math.floor(currency['ambition']['max']) + ")");
  $("#dolansCount").text(Math.floor(currency['dolans']['amount']));
  $("#dolansMax").text("(Max "+ Math.floor(currency['dolans']['max']) + ")");
  $("#experienceCount").text(Math.floor(currency['experience']['amount']));
  $("#experienceMax").text("(Max "+ Math.floor(currency['experience']['max']) + ")");
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
    rockets[rocket]['amount'] += amount;
    for (dolan in rockets[rocket]['cost']){
      currency[dolan]['amount'] -= rockets[rocket]['cost'][dolan] * amount;
    }
    $("#amnt"+rocket).text(rockets[rocket]['amount']);
    updateInfo();
    greyOutRocket(rocket);
  }
}

//Adds a building to inventory
function buildBuild(building, amount=1){
  if (checkIfCanBuild(building, amount)){
    buildings[building]['amount'] += amount;
    for (dolan in buildings[building]['cost']){
      currency[dolan]['amount'] -= buildings[building]['cost'][dolan] * amount;
    }
    $("#amnt"+building).text(buildings[building]['amount']);
    buildings[building]['function']();
    updateInfo();
    greyOutBuilding(building);
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

//Greys out building
function greyOutBuilding(building){
  if (checkIfCanBuild(building)){$('#'+building+"Button").removeClass('greyed-out');}
  else { $('#'+building+"Button").addClass('greyed-out'); }
  if (checkIfCanBuild(building, 10)){$('#'+building+"Button10").removeClass('greyed-out');}
  else { $('#'+building+"Button10").addClass('greyed-out'); }
  if (checkIfCanBuild(building, 100)){$('#'+building+"Button100").removeClass('greyed-out');}
  else { $('#'+building+"Button100").addClass('greyed-out'); }
  if (checkIfCanBuild(building, 1000)){$('#'+building+"Button1000").removeClass('greyed-out');}
  else { $('#'+building+"Button1000").addClass('greyed-out'); }
}

//Adds currency when you click the buttons
function work(type){
  currency[type]['amount'] += currency[type]['apc'] * currency[type]['mult'];
  $("#"+type+"Count").text(Math.floor(currency[type]['amount']));
}

//Work a job
function getJob(job){
  if (checkIfCanWork(job) && jobs[job]['working'] == false){
    $("#"+job+"Button").removeClass('greyed-out');
    $("#"+job+"Button").addClass('greyed-out-perm');
    $("#"+job+"Button").text("You already work here");
    jobs[job]['working'] = true;
    for (dolan in jobs[job]['apc']){
      currency[dolan]['apc'] += jobs[job]['apc'][dolan];
    }
  }
}

//Add an upgrade to your inventory
function getUpgrade(upgrade){
  if (checkIfCanUpgrade(upgrade)){
    if (upgrades[upgrade]['onetime'] == 1){
      $('#amnt' + upgrade).text(upgrades[upgrade]['amount']);
    }
    else{
      upgradesHave.push(upgrade);
      addUpgradesToTable();
      $('#area' + upgrade).remove();
      $('#spacer' + upgrade).remove();
      $('#upgradesBought').html($('#upgradesBought').html() + '<strong>' + upgrades[upgrade]['name'] + ': </strong>' + upgrades[upgrade]['description']+ '<br />');
    }
    upgrades[upgrade]['amount']++;
    currency['dolans']['amount'] -= upgrades[upgrade]['cost']['dolans'];
    currency['ambition']['amount'] -= upgrades[upgrade]['cost']['ambition'];
    currency['experience']['amount'] -= upgrades[upgrade]['cost']['experience'];
    upgrades[upgrade]['function']();
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
    currency[dolan]['amount'] = 100000000;
  }
}

//Initialize the game
function initGame(){

  //Load game
  if (debug == false){ load('auto'); }

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

  //Buildings
  var builditboi = "";
  for (building in buildings){
    builditboi += createBuilding(building);
  }
  $('#buildingTable').html(builditboi);


  //  ==Upgrades==
  //The upgrade html
  var upgradeText = "";
  //Iterate through upgrades
  for (upgrade in upgrades){
    //Check if it has all the required Pre-Requisites
    var neededUpgrades = 0;
    for (i = 0; i < upgrades[upgrade]['prerequisites'].length; i++){
      if (upgradesHave.indexOf(upgrades[upgrade]['prerequisites'][i]) > -1){
        neededUpgrades++;
      }
    }
    //If it does
    if (neededUpgrades >= upgrades[upgrade]['prerequisites'].length){
      upgradeText += '<tr class="spacer" id="spacer' + upgrade + '"></tr><tr id="area' + upgrade + '"><td id="' + upgrade + 'Button" onclick="getUpgrade(\''+upgrade+'\')" class="button greyed-out">' + upgrades[upgrade]['name'] + '</td><td>' + upgrades[upgrade]['name'];
      if (upgrades[upgrade]['onetime'] == 1){
        upgradeText += ': </td><td class="amnt" id="amnt' + upgrade + '">' + upgrades[upgrade]['amount'] + '</td>"';
      }
      else { upgradeText += '</td><td></td>"'; }
      upgradeText += '<td>' + upgrades[upgrade]['description'] + '</td><td class="desc">';
      if (upgrades[upgrade]['cost']['dolans']>0){ upgradeText += upgrades[upgrade]['cost']['dolans'] + ' dolans   '; }
      if (upgrades[upgrade]['cost']['ambition']>0){ upgradeText += upgrades[upgrade]['cost']['ambition'] + ' ambition   '; }
      if (upgrades[upgrade]['cost']['experience']>0){ upgradeText += upgrades[upgrade]['cost']['experience'] + ' experience   '; }
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
    for (dolan in currency){
      if (rockets[rocket]['aps'][dolan] != null){
        currency[dolan]['amount'] += (rockets[rocket]['amount'] * rockets[rocket]['aps'][dolan] *  currency['dolans']['mult']) * gameSpeed;
      }
    }

    //Update rocket buy buttons
    greyOutRocket(rocket);

    if (rockets[rocket]['amount'] >= 100){ $('.rocketBuy100').slideDown(0); }
    if (rockets[rocket]['amount'] >= 1000){ $('.rocketBuy1000').slideDown(0); }
  }

  //Update job buy buttons
  for (job in jobs){
    if (checkIfCanWork(job)){$('#'+job+"Button").removeClass('greyed-out');}
  }

  //Update upgrade buy buttons
  for (upgrade in upgrades){
    if (checkIfCanUpgrade(upgrade)){$('#'+upgrade+"Button").removeClass('greyed-out');}
  }

  for (building in buildings){
    greyOutBuilding(building);
  }

  //Update GUI
  updateInfo();
}
