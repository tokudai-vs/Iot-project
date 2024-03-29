setInterval(function () {
  // location.reload();
}, 2000);

var LR = {};
// Initalize vaues fromm JSON using fetch api
var no_of_lights = 0;
var no_of_fans = 0;


/*

This function initialise the values from the json files
*/
function initializeValues() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      Object.assign(LR, data);
      // init ac value
      LR.LivingRoom.AC.AC1.temperature = data.LivingRoom.AC.AC1.temperature

      // AC switch
      if (data.LivingRoom.AC.AC1.status == "on") {
        document.querySelector("#acDisplay").innerHTML = data.LivingRoom.AC.AC1.temperature + '<sup>&deg;C</sup>'
        document.getElementById("togBtnAC").checked = true;
        document.getElementById("decrease").style.opacity = 1;
        document.getElementById("increase").style.opacity = 1;
      }
      else {
        document.querySelector("#acDisplay").innerText = "Off";
        document.getElementById("togBtnAC").checked = false;
        document.getElementById("decrease").style.opacity = 0.2;
        document.getElementById("increase").style.opacity = 0.2;
      }


      // Start Light Controller
      // init light values

      no_of_lights = Object.keys(data.LivingRoom.Light).length;
      var s = "";

      /* generating the dynamic html for lights and fans*/

      for (var i = 1; i <= no_of_lights; i++) {
        document.getElementById("light").innerHTML +=
          "<div class=col-3 id=lightIcon><span class=tile_icon>L " + i + "</span><span class=tile_info></span></div>"
          + "<div class=col-5 id=lightRangeSlider" + i + "><input id=" + i + " type=range value=24 min=1 max=100 oninput=te(this.value,this.id)>&nbsp &nbsp &nbsp<output id=lightSliderOut" + i + ">24</output></div>"
          + "<div class=col-4 id=lightSwitch" + i + "><label class=switch><input id=togBtnLight" + i + " type=checkbox onchange=toggleCheckLight(this.id," + i + ") checked><span id=roundSlider" + i + " class=slider></span></label></div><br><br><br>";

      }
      for (var i = 1; i <= no_of_lights; i++) {
        LR.LivingRoom.Light["L" + i].brightness = data.LivingRoom.Light["L" + i].brightness;
        document.getElementById("roundSlider" + i).classList.add("round")
        document.getElementById("lightRangeSlider" + i).classList.add("mt-4")
        document.getElementById("lightSwitch" + i).classList.add("mt-4")


        if (data.LivingRoom.Light["L" + i].status == "on") {
          document.getElementById(i).value = data.LivingRoom.Light["L" + i].brightness;
          document.getElementById("togBtnLight" + i).checked = true;
          document.getElementById("lightSliderOut" + i).innerText = data.LivingRoom.Light["L" + i].brightness;
          document.getElementById(i).style.opacity = 1
        }
        else {
          document.getElementById(i).value = 0;
          document.getElementById("togBtnLight" + i).checked = false;
          document.getElementById("lightSliderOut" + i).innerText = "off"
          document.getElementById(i).style.opacity = 0.2;

        }
      }

      // End Light Controller


      //start Fan controller
      no_of_fans = Object.keys(data.LivingRoom.Fan).length;
      // console.log(no_of_fans)

      for (var i = 1; i <= no_of_fans; i++) {
        document.getElementById("fan").innerHTML +=
          "<div class=col-3 id=fanIcon><span class=tile_icon>F " + i + "</span><span class=tile_info></span></div>"

          + "<div class=col-5 id=fanRangeSlider" + i + "><div id=myDIV" + i + "> " +
          "<button id=F" + i + "btn1 class=btn onclick=fanSpeedController(this.id," + i + ");>1</button>" +
          "<button id=F" + i + "btn2 class=btn onclick=fanSpeedController(this.id," + i + ");>2</button>" +
          "<button id=F" + i + "btn3 class=btn onclick=fanSpeedController(this.id," + i + ");>3</button>" +
          "<button id=F" + i + "btn4 class=btn onclick=fanSpeedController(this.id," + i + ");>4</button>" +
          "<button id=F" + i + "btn5 class=btn onclick=fanSpeedController(this.id," + i + ");>5</button>" +
          "</div></div></div>"

        + "<div class=col-4 id=fanSwitch" + i + "><label class=switch><input id=togBtnFan" + i + " type=checkbox onchange=toggleCheckFan(this.id," + i + ") checked><span id=roundSliderFan" + i + " class=slider></span></label></div><br><br><br>";

      }
      //init fan values
      // document.querySelector("#FanSpeed").innerText = data.LivingRoom.Fan.F1.speed
      for (var i = 1; i <= no_of_fans; i++) {
        document.getElementById("roundSliderFan" + i).classList.add("round")

        if (data.LivingRoom.Fan["F"+i].speed == 1) {
          document.getElementById("F" + i +'btn1').classList.add("active")
        }
        else if (data.LivingRoom.Fan["F"+i].speed == 2) {
          document.getElementById("F" + i +'btn2').classList.add("active")
        }
        else if (data.LivingRoom.Fan["F"+i].speed == 3) {
          document.getElementById("F" + i +'btn3').classList.add("active")
        }
        else if (data.LivingRoom.Fan["F"+i].speed == 4) {
          document.getElementById("F" + i +'btn4').classList.add("active")
        }
        else {
          document.getElementById("F" + i +'btn5').classList.add("active")
        }

        if(data.LivingRoom.Fan["F"+i].status == "on"){
          document.getElementById("togBtnFan" + i).checked = true;
          document.getElementById("myDIV"+i).style.opacity = 1;
        }
        else{
          document.getElementById("togBtnFan" + i).checked = false;
          document.getElementById("myDIV"+i).style.opacity = 0.2;

        }
      }
      //end fan controller
    })

}

//AC controller
function increaseValue() {
  var check = document.getElementById("togBtnAC").checked;
  // check whether switch is on or off
  if (check) {
    var value = parseInt(document.querySelector("#acDisplay").innerText, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.querySelector("#acDisplay").innerHTML = value + '<sup>&deg;C</sup>';
    eel.valueFromJS("LivingRoom", "AC", "AC1", "temperature", value)
  }
  else {
    console.log("AC switched OFF")
  }

}

function decreaseValue() {
  var check = document.getElementById("togBtnAC").checked;
  // check whether switch is on or off
  if (check) {
    var value = parseInt(document.querySelector("#acDisplay").innerText, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.querySelector("#acDisplay").innerHTML = value + '<sup>&deg;C</sup>';
    eel.valueFromJS("LivingRoom", "AC", "AC1", "temperature", value)

  }
  else {
    console.log("AC switched OFF")
  }

}


// toggle AC switch
function toggleCheck() {
  var check = document.getElementById("togBtnAC").checked;
  /// check whether switch is on or off
  if (check) {
    document.querySelector("#acDisplay").innerHTML = LR.LivingRoom.AC.AC1.temperature + '<sup>&deg;C</sup>'
    document.getElementById("decrease").style.opacity = 1;
    document.getElementById("increase").style.opacity = 1;
    eel.valueFromJS("LivingRoom", "AC", "AC1", "status", "on")

  }
  else {
    document.querySelector("#acDisplay").innerText = "Off";
    document.getElementById("decrease").style.opacity = 0.2;
    document.getElementById("increase").style.opacity = 0.2;
    eel.valueFromJS("LivingRoom", "AC", "AC1", "status", "off")

  }
}
// End AC controller




// Start Light Controller
function te(value, id) {
  var check = document.getElementById("togBtnLight" + id).checked;
  /// check whether switch is on or off
  if (check) {
    document.getElementById(id).style.opacity = 1;
    var sliderDiv = document.getElementById("lightSliderOut" + id);
    sliderDiv.innerHTML = parseInt(value);
    console.log(parseInt(value))
    eel.valueFromJS("LivingRoom", "Light", "L" + id, "brightness", parseInt(value))

  }
  else {
    document.getElementById(id).style.opacity = 0.2;

  }

}
// toggle Light switch
function toggleCheckLight(id, index) {
  var check = document.getElementById(id).checked;
  // check whether switch is on or off
  if (check) {
    document.getElementById(index).style.opacity = 1;
    document.getElementById("lightSliderOut" + index).value = LR.LivingRoom.Light["L" + index].brightness;
    document.getElementById(index).value = LR.LivingRoom.Light["L" + index].brightness;
    var sliderDiv = document.getElementById("lightSliderOut" + index);
    sliderDiv.innerHTML = parseInt(sliderDiv.value);
    eel.valueFromJS("LivingRoom", "Light", "L" + index, "status", "on");

  }
  else {
    document.getElementById(index).style.opacity = 0.2;
    document.getElementById("lightSliderOut" + index).value = "off";
    document.getElementById(index).value = 0;
    console.log("Light off")
    eel.valueFromJS("LivingRoom", "Light", "L" + index, "status", "off");

  }
}



// End Light Controller
// Fan Speed Controller
function fanSpeedController(id, index) {
  var fan_number = "F" + index;
  var bt = document.getElementById(id)
  for(var i=1; i<=5;i++){
    var but_click = document.getElementById(fan_number +"btn"+i) 
    but_click.classList.remove('active');
  }
  bt.classList.add('active');
  LR.LivingRoom.Fan["F" + index].speed = parseInt(document.getElementById(id).innerText);
  eel.valueFromJS("LivingRoom", "Fan", "F" + index, "speed", LR.LivingRoom.Fan["F" + index].speed);
}

//Toggle Fan Switch

// toggle fan switch
function toggleCheckFan(id, index) {
  var checkFan = document.getElementById(id).checked;
  if(checkFan){
    // console.log(checkFan)
    // document.getElementById("togBtnFan" + i).checked = true;
    document.getElementById("myDIV"+index).style.opacity = 1;
    eel.valueFromJS("LivingRoom", "Fan", "F" + index, "status", "on");

  }
  else{
    // console.log(checkFan,"else")
    // document.getElementById("togBtnFan" + i).checked = false;
    document.getElementById("myDIV"+index).style.opacity = 0.2;
    //This function is used to update the values in the json files
    eel.valueFromJS("LivingRoom", "Fan", "F" + index, "status", "off");



  }
}

// adding components
//This function is used to add the lights in HTML
function addCode() {
  no_of_lights += 1;
  document.getElementById("light").innerHTML +=
    "<div class=col-3 id=lightIcon><span class=tile_icon>L " + no_of_lights + "</span><span class=tile_info></span></div>"
    + "<div class=col-5 id=lightRangeSlider" + no_of_lights + "><input id=" + no_of_lights + " type=range value=24 min=1 max=100 oninput=te(this.value,this.id)>&nbsp &nbsp &nbsp<output id=lightSliderOut" + no_of_lights + ">24</output></div>"
    + "<div class=col-4 id=lightSwitch" + no_of_lights + "><label class=switch><input id=togBtnLight" + no_of_lights + " type=checkbox onchange=toggleCheckLight(this.id," + no_of_lights + ") checked><span id=roundSlider" + no_of_lights + " class=slider></span></label></div><br><br><br>";

  document.getElementById("roundSlider" + no_of_lights).classList.add("round")
  document.getElementById("lightRangeSlider" + no_of_lights).classList.add("mt-4")
  document.getElementById("lightSwitch" + no_of_lights).classList.add("mt-4")

  var temp = {
    "status": "off",
    "brightness": 47
  }
  LR.LivingRoom.Light['L' + no_of_lights] = temp;
  console.log(LR)
  eel.updateJSON('LivingRoom','Light', 'L' + no_of_lights, temp); // used to update the new components in the JSON files
  location.reload();
}

//This function is used to add fan in the UI
function addCodeFan() {
  no_of_fans += 1;
  document.getElementById("fan").innerHTML +=
          "<div class=col-3 id=fanIcon><span class=tile_icon>F " +no_of_fans + "</span><span class=tile_info></span></div>"

          + "<div class=col-5 id=fanRangeSlider" +no_of_fans + "><div id=myDIV" +no_of_fans + "> " +
          "<button id=F" +no_of_fans + "btn1 class=btn onclick=fanSpeedController(this.id," +no_of_fans + ");>1</button>" +
          "<button id=F" +no_of_fans + "btn2 class=btn onclick=fanSpeedController(this.id," +no_of_fans + ");>2</button>" +
          "<button id=F" +no_of_fans + "btn3 class=btn onclick=fanSpeedController(this.id," +no_of_fans + ");>3</button>" +
          "<button id=F" +no_of_fans + "btn4 class=btn onclick=fanSpeedController(this.id," +no_of_fans + ");>4</button>" +
          "<button id=F" +no_of_fans + "btn5 class=btn onclick=fanSpeedController(this.id," +no_of_fans + ");>5</button>" +
          "</div></div></div>"

        + "<div class=col-4 id=fanSwitch" +no_of_fans + "><label class=switch><input id=togBtnFan" +no_of_fans + " type=checkbox onchange=toggleCheckFan(this.id," +no_of_fans + ") checked><span id=roundSliderFan" +no_of_fans + " class=slider></span></label></div><br><br><br>";

  document.getElementById("roundSliderFan" + no_of_fans).classList.add("round")


  var temp = {
    "status": "off",
    "speed": 3
  }
  LR.LivingRoom.Fan['F' + no_of_fans] = temp;
  console.log(LR)
  eel.updateJSON('LivingRoom','Fan', 'F' + no_of_fans, temp); //Used to update the new components in the JSON files
  location.reload();
}


//This function is used to rfresh the page
eel.expose(updatePage);
function updatePage() {
  console.log("from update page functio")
  location.reload();
}


