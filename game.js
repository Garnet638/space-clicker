//Enable debug mode?
var debug = false;

//Times per second the game updates
var gameSpeed = 1;

//Game log
var log = [];

// ==PROPER NAME==
var properName = {
  'dolans' : 'Dolans',
  'ambition' : 'Ambition',
  'experience' : 'Experience',
  'oil' : 'Oil',
  'dna' : 'DNA Fragments',
  'metal' : 'Metal',
  'data' : 'Data'
};

// ==CURRENCY==
var currency = {
  'dolans' : {
    'amount' : 0,
    'apc' : 1,
    'aps' : 0,
    'mult' : 1,
    'max' : 1000
  },
  'ambition' : {
    'amount' : 0,
    'apc' : 1,
    'aps' : 0,
    'mult' : 1,
    'max' : 1000
  },
  'experience' : {
    'amount' : 0,
    'apc' : 0,
    'aps' : 0,
    'mult' : 1,
    'max' : 1000
  },
  'metal' : {
    'amount' : 0,
    'apc' : 0,
    'aps' : 0,
    'mult' : 1,
    'max' : 1000
  },
  'oil' : {
    'amount' : 0,
    'apc' : 0,
    'aps' : 0,
    'mult' : 1,
    'max' : 1000
  },
  'data' : {
    'amount' : 0,
    'apc' : 0,
    'aps' : 0,
    'mult' : 1,
    'max' : 1000
  }
};

// ==ROCKETS==
var rockets = {
  'slingshot' : {
    'name' : 'Slingshot',
    'amount' : 0,
    'tier' : 0,
    'cost' : {
      'ambition' : 10
    },
    'aps' : {
      'ambition' : 0.1
    }
  },
  'bottlerocket' : {
    'name' : 'Bottle Rocket',
    'amount' : 0,
    'tier' : 0,
    'cost' : {
      'dolans' : 25
    },
    'aps' : {
      'experience' : 0.1
    }
  },
  'pvcrocket' : {
    'name' : 'PVC Rocket',
    'amount' : 0,
    'tier' : 0,
    'cost' : {
      'dolans' : 100,
      'ambition' : 25,
      'experience' : 25
    },
    'aps' : {
      'dolans' : 1,
      'experience' : 1
    }
  },
  'compressedair' : {
    'name' : 'Compressed Air Rocket',
    'amount' : 0,
    'tier' : 1,
    'cost' : {
      'dolans' : 500,
      'ambition' : 250,
      'experience' : 150
    },
    'aps' : {
      'dolans' : 2,
      'ambition' : 3,
      'experience' : 3
    }
  },
  'rocketsim1' : {
    'name' : 'Rocket Simulator 1999',
    'amount' : 0,
    'tier' : 1,
    'cost' : {
      'dolans' : 1500,
      'ambition' : 750,
      'experience' : 1000
    },
    'aps' : {
      'dolans' : 0,
      'ambition' : 10,
      'experience' : 10
    }
  },
  'rocketsim2' : {
    'name' : 'Rocket Simulator 2000',
    'amount' : 0,
    'tier' : 2,
    'cost' : {
      'dolans' : 3000,
      'ambition' : 1500,
      'experience' : 2000
    },
    'aps' : {
      'dolans' : 5,
      'ambition' : 25,
      'experience' : 25
    }
  },
  'spupnik1' : {
    'name' : 'Спупник-1',
    'amount' : 0,
    'tier' : 2,
    'cost' : {
      'dolans' : 3500,
      'ambition' : 2500,
      'metal' : 250
    },
    'aps' : {
      'data' : 1,
      'ambition' : 10,
      'experience' : 35
    }
  },
  'luysin' : {
    'name' : 'Լուսին-4',
    'amount' : 0,
    'tier' : 2,
    'cost' : {
      'dolans' : 5000,
      'ambition' : 2500,
      'metal' : 250,
      'oil' : 500
    },
    'aps' : {
      'dolans' : 35,
      'data' : 3
    }
  },
  'apaulo' : {
    'name' : 'A Paul-O',
    'amount' : 0,
    'tier' : 2,
    'cost' : {
      'dolans' : 10000,
      'data' : 500,
      'metal' : 1000,
      'oil' : 2500
    },
    'aps' : {
      'dolans' : 100,
      'data' : 30
    }
  },
};

// ==JOBS==
var jobs = {
  'mcdoodles' : {
    'name' : 'McDoodles',
    'working' : false,
    'active' : true,
    'cost' : {
      'experience' : 25
    },
    'apc' : {
      'dolans' : 1
    }
  },
  'stroopbucks' : {
    'name' : 'StoopBucks',
    'working' : false,
    'active' : true,
    'cost' : {
      'experience' : 100,
      'ambition' : 500
    },
    'apc' : {
      'dolans' : 2
    }
  },
  'itintern': {
    'name': 'Macrohard Internship',
    'working': false,
    'active': true,
    'cost': {
      'experience': 5000,
      'ambition': 1000
    },
    'apc': {
      'dolans': 10
    }
  },
  'engineeringintern': {
    'name': 'Engineering Intern',
    'working': false,
    'active': true,
    'cost': {
      'experience': 25000,
      'ambition': 5000
    },
    'apc': {
      'dolans': 50
    }
  }
};

// ==UPGRADES==
var upgrades = {
  'algebra' : {
    'onetime' : 0,
    'amount' : 0,
    'prerequisites' : [],
    'function' : function(){currency['dolans']['mult'] += .125; currency['experience']['mult'] += .125;},
    'name' : 'Learn Algebra',
    'description' : '+ x1.125 multiplier to Dolans and Experience',
    'cost' : {
      'experience' : 1000
    }
  },
  'geometry' : {
    'onetime' : 0,
    'amount' : 0,
    'prerequisites' : ['algebra'],
    'function' : function(){currency['dolans']['mult'] += .125; currency['experience']['mult'] += .125;},
    'name' : 'Learn Geometry',
    'description' : '+ x1.125 multiplier to Dolans and Experience',
    'cost' : {
      'dolans' : 500,
      'experience' : 1000
    }
  },
  'newBed' : {
    'onetime' : 0,
    'amount' : 0,
    'prerequisites' : ['algebra'],
    'function' : function(){currency['ambition']['mult'] += .25;},
    'name' : 'A new bed',
    'description' : '+ x1.25 multiplier to Ambition',
    'cost' : {
      'dolans' : 1000
    }
  },
  'moreRockets' : {
    'onetime' : 0,
    'amount' : 0,
    'prerequisites' : ['geometry'],
    'function' : function(){
      upgradeLevels['rocket']=1;
      for(rocket in rockets){
        writeRocketHTML(rocket);
      }
    },
    'name' : 'Better Rockets',
    'description' : 'Learn how to build more rockets',
    'cost' : {
      'dolans' : 1500,
      'ambition' : 500,
      'experience' : 1500
    }
  },
  'calculus' : {
    'onetime' : 0,
    'amount' : 0,
    'prerequisites' : ['geometry'],
    'function' : function(){currency['dolans']['mult'] += .25; currency['experience']['mult'] += .25;},
    'name' : 'Learn Calculus',
    'description' : '+ x1.25 multiplier to Dolans and Experience',
    'cost' : {
      'dolans' : 5000,
      'experience' : 1000
    }
  },
  'moreRockets2' : {
    'onetime' : 0,
    'amount' : 0,
    'prerequisites' : ['moreRockets', 'calculus'],
    'function' : function(){
      upgradeLevels['rocket']=2;
      for(r in rockets){
        writeRocketHTML(r);
      }
      upgradeLevels['building']=1;
      for(b in buildings){
        writeBuildingHTML(b);
      }
    },
    'name' : 'Even Better Rockets',
    'description' : 'Learn how to build more rockets',
    'cost' : {
      'dolans' : 7500,
      'ambition' : 2500,
      'experience' : 4500
    }
  },
  'interplanetaryTravel': {
    'onetime': 0,
    'amount': 0,
    'prerequisites': ['moreRockets2'],
    'function': function () {
      upgradeLevels['rocket'] = 3;
      for (r in rockets) {
        writeRocketHTML(r);
      }
      upgradeLevels['building'] = 2;
      for (b in buildings) {
        writeBuildingHTML(b);
      }
    },
    'name': 'Interplanetary Travel',
    'description': 'Travel to other planets',
    'cost': {
      'dolans': 30000,
      'ambition': 10000,
      'experience': 5000,
      'data' : 5000
    }
  },
};

// ==BUILDINGS==
var buildings = {
  'piggybank' : {
    'name' : 'Piggy Bank',
    'description' : 'Increase max Dolans by 1000',
    'type' : 'storage',
    'amount' : 0,
    'tier' : 0,
    'function' : function(){ currency['dolans']['max']+=1000; },
    'cost' : {
      'dolans' : 500
    }
  },
  'capacityForGreatness' : {
    'name' : 'Capacity for greatness',
    'description' : 'Increase max Ambition by 1000',
    'type' : 'storage',
    'amount' : 0,
    'tier' : 0,
    'function' : function(){ currency['ambition']['max']+=1000; },
    'cost' : {
      'ambition' : 500
    }
  },
  'notebook' : {
    'name' : 'A pen and notebook',
    'description' : 'Increase max Experience by 1000',
    'type' : 'storage',
    'amount' : 0,
    'tier' : 0,
    'function' : function(){ currency['experience']['max']+=1000; },
    'cost' : {
      'experience' : 500
    }
  },
  'metalstorage' : {
    'name' : 'Sheet Metal Storage',
    'description' : 'Increase max Metal by 1000',
    'type' : 'storage',
    'amount' : 0,
    'tier' : 1,
    'function' : function(){ currency['metal']['max']+=1000; },
    'cost' : {
      'metal' : 500
    }
  },
  'oiltank' : {
    'name' : 'Oil Tank',
    'description' : 'Increase max Oil by 1000',
    'type' : 'storage',
    'amount' : 0,
    'tier' : 1,
    'function' : function(){ currency['oil']['max']+=1000; },
    'cost' : {
      'oil' : 500
    }
  },
  'datasf': {
    'name': 'Data Storage Facility',
    'description': 'Increase max Data by 1000',
    'type': 'storage',
    'amount': 0,
    'tier': 1,
    'function': function () {
      currency['data']['max'] += 1000;
    },
    'cost': {
      'data': 500
    }
  },
  'mineMetal' : {
    'name' : 'Iron Mine',
    'description' : 'Increase Metal/second by 1',
    'type' : 'mine',
    'amount' : 0,
    'tier' : 1,
    'function' : function(){ currency['metal']['aps']+=1; },
    'cost' : {
      'dolans' : 500
    }
  },
  'mineOil' : {
    'name' : 'Oil Well',
    'description' : 'Increase Oil/second by 1',
    'type' : 'mine',
    'amount' : 0,
    'tier' : 1,
    'function' : function(){ currency['oil']['aps']+=1; },
    'cost' : {
      'dolans' : 500
    }
  },
};

//The upgrades you currently have
var upgradesHave = [];

//Upgrade levels
var upgradeLevels = {
  'rocket' : 0,
  'building' : 0
};

//Worksafe?
var worksafe = false;

//Defaults
var defaults = 'N4IgTg9gxg1gpgFwM4gFyiQGwJYDsDmSAFhAmqAIYC2EArrmagAwC+ANCAEakKZySxE5ENToM0rDgAcAblAHxGlGvUaSQUCFSlg4SJHAAmFbGGGjVE9uGiKk2KgEZzK8c2sLE9qgCYXYtWskKVopXGwYZ3QRV0COTFoAT3tcf0t3DioAWgoKIjS3VmtQ/DAKQz1zTHw4TjKCuJAarUQwRIarDlw4AHcAISMOjJAaXQAlWy8h9SgKTChaBJRoi0LrUbgJwWQ/FdjOkDwEfilMCm6ECjaAFTKZOExplmtOWmxMQzxCYSlsfHxEpxzjAnhxZlIKFBsAhEgAxCBgADiugoCG6+lBIFwpFqEAgIL2AQOVEQcyQCARFBqmIg70uuAJyiJw2MlyQADNMVQ8HAALKkx6E9LqbndADy7ye1gAVhBOMtQFQoIY8YY+AqQD0ETAvmh2WS4EEEJAIFJXrANVqwDqCHqDdZoUd+Klolabfg7ZgDNY4AQefwvk6wC7QG7dah9V7DdYFmBdLgoO1oiqzrgNas1BwKFIoGhHFmpMsmJlFox8yMKAAPPNMWvWaicR0QEMxZnFkQ5vMFoslzBlzJVmt1jhwStSAO+qBwaYF3PMbsSXv9ivV1COWsigUzjtz9vZnsjUtdldD9S0wVM4Wzxcdg9UI9rger9fDkCsijb7O7hfzw9949UIOa4bs8HAlGUFRIAAEhQ9xoAA2gAumBUilOUcAADJwPcXrCJ4mZcG8HzhkUQAAA==';

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
  for (job in jobs) { saveData['jobs'][job] = {}; saveData['jobs'][job]['working'] = jobs[job]['working']; }
  for (dolan in currency) { saveData['currency'][dolan] = currency[dolan]; }
  //Save all data, since all fields can be changed
  saveData['upgradesHave'] = upgradesHave;
  saveData['upgradeLevels'] = upgradeLevels;
  return saveData;
}

//Save
function save(type){
  var saveData = makeSaveData();
  var saveData64 = LZString.compressToBase64(JSON.stringify(saveData));
  if (type == 'manual' || type == 'auto'){
    console.log('Saved game');
    bake_cookie('saveData', JSON.stringify(saveData64));
  }
  else if (type == 'export'){
    $('#saveLoadTextarea').val(saveData64);
  }
}

//Load
function load(type){
  //Set the save data to empty so no *major* errors occur
  var saveData = [];
  //Reset
  if (type == 'default'){
    try{
      saveData = JSON.parse(LZString.decompressFromBase64(defaults));
    }
    catch(e){
      alert('Huston, we have a problem. We couldnt reset');
    }
  }
  //Manual loading from import
  if (type == 'manual'){
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
      console.log('Couldn\'t autoload');
    }
  }
  try{ for (rocket in rockets){ rockets[rocket]['amount'] = saveData['rockets'][rocket]['amount']; } } catch (e) { console.log('Couldn\'t load ' + rocket); }
  try{ for (upgrade in upgrades){ upgrades[upgrade]['amount'] = saveData['upgrades'][upgrade]['amount']; } } catch (e) { console.log('Couldn\'t load ' + upgrade); }
  try{ for (building in buildings){ buildings[building]['amount'] = saveData['buildings'][building]['amount']; } } catch (e) { console.log('Couldn\'t load ' + building); }
  try{ for (job in jobs) { jobs[job]['working'] = saveData ['jobs'][job]['working']; } } catch (e) { console.log('Couldn\'t load ' + job); }
  try{ for (dolan in currency) { currency[dolan] = saveData['currency'][dolan]; } } catch (e) { console.log('Couldn\'t load ' + dolan); }
  if (saveData['upgradesHave'] != null) { try{ upgradesHave = saveData['upgradesHave']; } catch (e) { console.log('Couldn\'t load upgradesHave'); } }
  if (saveData['upgradeLevels'] != null) { try{ upgradeLevels = saveData['upgradeLevels']; } catch (e) { console.log('Couldn\'t load upgradeLevels'); } }
}

//Logging
function gameLog(toLog){

}

function createJob(job){
  var jobText = '';
  if (jobs[job]['working'] == false){
    jobText += '<tr class="spacer"></tr><tr id="area' + job + '"><td id="' + job + 'Button" onclick="getJob(\''+job+'\')" class="button greyed-out">Work at ' + jobs[job]['name'] + '</td><td >' + jobs[job]['name'] + ':</td><td><span class="amnt">';
  }
  else {
    jobText += '<tr class="spacer"></tr><tr id="area' + job + '"><td id="' + job + 'Button" class="button greyed-out">You already work here</td><td >' + jobs[job]['name'] + ':</td><td><span class="amnt">';
  }
  for (dolan in jobs[job]['apc']){
    jobText += '+' + jobs[job]['apc'][dolan] + ' ' + properName[dolan] + '/click; ';
  }
  jobText += '</span><br /><span class="cost">';
  for (dolan in jobs[job]['cost']){
    jobText += jobs[job]['cost'][dolan] + ' ' + properName[dolan] + '; ';
  }
  jobText += '</span></td></tr>';
  return jobText;
}

function writeJobHTML(job){
  var rock = createJob(job);
  if (rock != null){ $('#jobTable > tr:last').after(rock); }
}

//Creates HTML for buildings
function createBuilding(building){
  if (buildings[building]['tier'] <= upgradeLevels['building'] && !$('#area'+building).length){
    var buildingText = '';
    buildingText += '<tr class="spacer"></tr><tr id="area' + building + '"><td id="' + building + 'Button" onclick="buildBuild(\''+building+'\')" class="button greyed-out">Build ' + buildings[building]['name'] + '</td>';

    buildingText += '<td id="' + building + 'Button10" onclick="buildBuild(\''+building+'\', 10)" class="smolbutton buildingBuy10 greyed-out">x10</td>';
    buildingText += '<td id="' + building + 'Button100" onclick="buildBuild(\''+building+'\', 100)" class="smolbutton buildingBuy100 greyed-out" style="display:none">x100</td>';
    buildingText += '<td id="' + building + 'Button1000" onclick="buildBuild(\''+building+'\', 1000)" class="smolbutton buildingBuy1000 greyed-out" style="display:none">x1000</td>';

    buildingText += '<td >' + buildings[building]['name'] + 's:</td><td id="amnt' + building + '" class="amnt">' + buildings[building]['amount'] + '</td><td><span class="amnt">';
    buildingText += buildings[building]['description'] + '</span><br /><span class="cost">';
    for (i in buildings[building]['cost']){
      if (buildings[building]['cost'][i]>0){ buildingText += buildings[building]['cost'][i] + ' ' + properName[i] + '; '; }
    }
    buildingText += '</span></td></tr>';
    return buildingText;
  }
  else{
    return '';
  }
}

//Writes HTML for buildings
function writeBuildingHTML(building){
  var rock = createBuilding(building);
  if (rock != null) {
    $('#buildingTable' + buildings[building]['type']).html($('#buildingTable' + buildings[building]['type']).html() + rock);
  }
  else {console.log('Building ' + building + ' is null');}
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
      var upgradeText = '';
      upgradeText += '<tr id="spacer' + upgrade + '" class="spacer"></tr><tr id="area' + upgrade + '"><td id="' + upgrade + 'Button" onclick="getUpgrade(\''+upgrade+'\')" class="button greyed-out">' + upgrades[upgrade]['name'] + '</td><td>' + upgrades[upgrade]['name'];
      if (upgrades[upgrade]['onetime'] == 1){
        upgradeText += ': </td><td class="amnt" id="amnt' + upgrade + '">' + upgrades[upgrade]['amount'] + '</td>"';
      }
      else { upgradeText += '</td><td></td>"'; }
      upgradeText += '<td><span class="amnt">' + upgrades[upgrade]['description'] + '</span><br /><span class="cost">';
      for (dolan in upgrades[upgrade]['cost']){
        upgradeText += upgrades[upgrade]['cost'][dolan] + ' ' + properName[dolan] + '; ';
      }
      upgradeText += '</span></td></tr>';
      return upgradeText;
    }
  }
  return '';
}

//I guess this is an actual fucking issue then (See 'writeRocketHTML()')
function writeUpgradeHTML(upgrade){
  var rock = createUpgrade(upgrade);
  if (rock != null){ $('#upgradesTable').html($('#upgradesTable').html() + rock); }
}

//Creates the HTML for rockets
function createRocket(rocket){
  if (rockets[rocket]['tier'] <= upgradeLevels['rocket'] && !$('#area'+rocket).length){
    var rocketText = '';
    rocketText += '<tr class="spacer"></tr><tr id="area' + rocket + '"><td id="' + rocket + 'Button" onclick="build(\''+rocket+'\')" class="button greyed-out">Build ' + rockets[rocket]['name'] + '</td>';

    rocketText += '<td id="' + rocket + 'Button10" onclick="build(\''+rocket+'\', 10)" class="smolbutton rocketBuy10 greyed-out">x10</td>';
    rocketText += '<td id="' + rocket + 'Button100" onclick="build(\''+rocket+'\', 100)" class="smolbutton rocketBuy100 greyed-out" style="display:none">x100</td>';
    rocketText += '<td id="' + rocket + 'Button1000" onclick="build(\''+rocket+'\', 1000)" class="smolbutton rocketBuy1000 greyed-out" style="display:none">x1000</td>';

    rocketText += '<td >' + rockets[rocket]['name'] + 's:</td><td id="amnt' + rocket + '" class="amnt">' + rockets[rocket]['amount'] + '</td><td><span class="amnt">';
    for (dolan in currency) {
      if (rockets[rocket]['aps'][dolan] != null && rockets[rocket]['aps'][dolan] > 0) {
        rocketText += rockets[rocket]['aps'][dolan] + ' ' + properName[dolan] + '/second; ';
      }
    }
    rocketText += '</span><br /><span class="cost">';
    for (dolan in currency) {
      if (rockets[rocket]['cost'][dolan] != null) {
        if (rockets[rocket]['cost'][dolan] > 0) {
          rocketText += rockets[rocket]['cost'][dolan] + ' ' + properName[dolan] + '; ';
        }
      }
    }
    
    rocketText += '</span></td></tr>';
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
  for (dolan in currency){
    $('#' + dolan + 'Count').text(Math.floor(currency[dolan]['amount']));
    $('#' + dolan + 'Max').text('(Max '+ Math.floor(currency[dolan]['max']) + ')');
  }
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
    for (dolan in rockets[rocket]['aps']){
      currency[dolan]['aps'] += rockets[rocket]['aps'][dolan] * amount;
    }
    $('#amnt'+rocket).text(rockets[rocket]['amount']);
    gameLog('Bought x' + amount + ' ' + rocket + 's');
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
    $('#amnt'+building).text(buildings[building]['amount']);
    for (i = 0; i < amount; i++) { buildings[building]['function'](); }
    updateInfo();
    greyOutBuilding(building);
  }
}

//Greys out rocket
function greyOutRocket(rocket){
  if (checkIfCanBuy(rocket)){$('#'+rocket+'Button').removeClass('greyed-out');}
  else { $('#'+rocket+'Button').addClass('greyed-out'); }
  if (checkIfCanBuy(rocket, 10)){$('#'+rocket+'Button10').removeClass('greyed-out');}
  else { $('#'+rocket+'Button10').addClass('greyed-out'); }
  if (checkIfCanBuy(rocket, 100)){$('#'+rocket+'Button100').removeClass('greyed-out');}
  else { $('#'+rocket+'Button100').addClass('greyed-out'); }
  if (checkIfCanBuy(rocket, 1000)){$('#'+rocket+'Button1000').removeClass('greyed-out');}
  else { $('#'+rocket+'Button1000').addClass('greyed-out'); }
}

//Greys out building
function greyOutBuilding(building){
  if (checkIfCanBuild(building)){$('#'+building+'Button').removeClass('greyed-out');}
  else { $('#'+building+'Button').addClass('greyed-out'); }
  if (checkIfCanBuild(building, 10)){$('#'+building+'Button10').removeClass('greyed-out');}
  else { $('#'+building+'Button10').addClass('greyed-out'); }
  if (checkIfCanBuild(building, 100)){$('#'+building+'Button100').removeClass('greyed-out');}
  else { $('#'+building+'Button100').addClass('greyed-out'); }
  if (checkIfCanBuild(building, 1000)){$('#'+building+'Button1000').removeClass('greyed-out');}
  else { $('#'+building+'Button1000').addClass('greyed-out'); }
}

//Adds currency when you click the buttons
function work(type){
  currency[type]['amount'] += currency[type]['apc'] * currency[type]['mult'];
  $('#'+type+'Count').text(Math.floor(currency[type]['amount']));
}

//Work a job
function getJob(job){
  if (checkIfCanWork(job) && jobs[job]['working'] == false){
    $('#'+job+'Button').removeClass('greyed-out');
    $('#'+job+'Button').addClass('greyed-out-perm');
    $('#'+job+'Button').text('You already work here');
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
    for (dolan in upgrades[upgrade]['cost']){
      currency[dolan]['amount'] -= upgrades[upgrade]['cost'][dolan];
    }
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

//Reset
function reset(){
  var confirmed = window.confirm('Are you sure? This will wipe ALL progress');
  if (confirmed){
    load('default');
    save('auto');
    for (dolan in currency){
      $('#' + dolan + 'Mult').text('');
    }
    location.reload();
  }
}

//Used for debug
function ruinGame(){
  for (dolan in currency){
    currency[dolan]['max'] = 100000000000;
    currency[dolan]['amount'] = 100000000;
  }
}

//Initialize the game
function initGame(){

  //Load game
  if (debug == false){ load('auto'); }

  //Jobs
  var jobText = '';
  for (job in jobs){
    jobText += createJob(job);
  }
  $('#jobsTable').html(jobText);

  //Rockets
  var rockitboi = '';
  for (rocket in rockets){
    rockitboi += createRocket(rocket);
  }
  $('#rocketsTable').html(rockitboi);

  //Buildings
  var builditboi1 = '<h4>Capacity</h4>';
  var builditboi2 = '<h4>Mines</h4><tr></tr>';
  for (building in buildings){
    if (buildings[building]['type'] == 'storage')   { builditboi1 += createBuilding(building); }
    if (buildings[building]['type'] == 'mine')      { builditboi2 += createBuilding(building); }
    // builditboi += createBuilding(building);
  }
  $('#buildingTablestorage').html(builditboi1);
  $('#buildingTablemine').html(builditboi2);


  //Upgrades
  var upgradeText = '';
  for (upgrade in upgrades){
    upgradeText += createUpgrade(upgrade);
  }
  $('#upgradesTable').html(upgradeText);

  for (i = 0; i < upgradesHave.length; i++){
    $('#upgradesBought').html($('#upgradesBought').html() + '<strong>' + upgrades[upgradesHave[i]]['name'] + ': </strong>' + upgrades[upgradesHave[i]]['description']+ '<br />');
  }

  //Set intervals
  window.setInterval(updateGame, 1000 * gameSpeed);
  window.setInterval(save, 'auto', 15000);
}

//Updates the game, run every second
function updateGame(){
  //Updates the multiplier
  for (dolan in currency){
    currency[dolan]['amount'] += currency[dolan]['aps'] * currency[dolan]['mult'];
    // if (currency[dolan]['mult'] > 1){
    //   $('#' + dolan + 'Mult').text('(x' + currency[dolan]['mult'] + ')');
    if (currency[dolan]['aps'] > 0){
      $('#' + dolan + 'Mult').text(Math.max(Math.ceil(currency[dolan]['aps'] * currency[dolan]['mult'] * 10) / 10) + '/sec');
    }
  }

  //Rocket loop
  for (rocket in rockets){
    //Update rocket buy buttons
    greyOutRocket(rocket);

    if (rockets[rocket]['amount'] >= 100){ $('.rocketBuy100').slideDown(0); }
    if (rockets[rocket]['amount'] >= 1000){ $('.rocketBuy1000').slideDown(0); }
  }

  //Update job buy buttons
  for (job in jobs){
    if (checkIfCanWork(job)){$('#'+job+'Button').removeClass('greyed-out');}
    else {$('#'+job+'Button').addClass('greyed-out');}
  }

  //Update upgrade buy buttons
  for (upgrade in upgrades){
    if (checkIfCanUpgrade(upgrade)){$('#'+upgrade+'Button').removeClass('greyed-out');}
    else {$('#'+upgrade+'Button').addClass('greyed-out');}
  }

  for (building in buildings){
    greyOutBuilding(building);

    if (buildings[building]['amount'] >= 100){ $('.buildingBuy100').slideDown(0); }
    if (buildings[building]['amount'] >= 1000){ $('.buildingBuy1000').slideDown(0); }
  }

  for (dolan in currency){
    if (currency[dolan]['amount'] > currency[dolan]['max']){
      currency[dolan]['amount'] = currency[dolan]['max'];
    }
  }

  //Update GUI
  updateInfo();
}
