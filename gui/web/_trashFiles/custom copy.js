setInterval(function () {
  // location.reload();
}, 2000);

// dict = {"Name":"xyz", "3": "39"};
var LR={};
// console.log(dict, copy);
// Object.assign(copy, dict);
// console.log(dict, copy);
// Initalize vaues fromm JSON using fetch api
var no_of_lights = 0;
// var LR = {
//   "LivingRoom": {
//     "AC": {
//       "status": "on",
//       "temperature": 18
//     },
//     "Light": {
//       "L1": {
//         "status": "off",
//         "brightness": 9
//       }
//     },
//     "Fan": {
//       "status": "on",
//       "speed": 3
//     }
//   }
// }
eel.expose(initializeValues);
function initializeValues() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      Object.assign(LR, data);
      // init ac value
      LR.LivingRoom.AC.temperature = data.LivingRoom.AC.temperature
      // document.querySelector("#acDisplay").innerText = data.LivingRoom.AC.temperature

      // AC switch
      if (data.LivingRoom.AC.status == "on") {
        document.querySelector("#acDisplay").innerText = data.LivingRoom.AC.temperature
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
    })

}

//AC controller
function increaseValue() {
  var check = document.getElementById("togBtnAC").checked;
  if (check) {
    var value = parseInt(document.querySelector("#acDisplay").innerText, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    LR.LivingRoom.AC.temperature = value;
    document.querySelector("#acDisplay").innerText = value;
    //eel.recieveJSValues(LR);
  }
  else {
    console.log("AC switched OFF")
  }

}

function decreaseValue() {
  var check = document.getElementById("togBtnAC").checked;

  if (check) {
    var value = parseInt(document.querySelector("#acDisplay").innerText, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    LR.LivingRoom.AC.temperature = value;
    document.querySelector("#acDisplay").innerText = value;
    //eel.recieveJSValues(LR);
  }
  else {
    console.log("AC switched OFF")
  }

}


// toggle AC switch
function toggleCheck() {
  var check = document.getElementById("togBtnAC").checked;
  if (check) {
    document.querySelector("#acDisplay").innerText = LR.LivingRoom.AC.temperature
    document.getElementById("decrease").style.opacity = 1;
    document.getElementById("increase").style.opacity = 1;
  }
  else {
    document.querySelector("#acDisplay").innerText = "Off";
    document.getElementById("decrease").style.opacity = 0.2;
    document.getElementById("increase").style.opacity = 0.2;
  }
}
// End AC controller




// Start Light Controller
function te(value, id) {
  var check = document.getElementById("togBtnLight" + id).checked;
  // console.log(document.getElementById("togBtnLight"+id).checked)
  if (check) {
    document.getElementById(id).style.opacity = 1;
    var sliderDiv = document.getElementById("lightSliderOut" + id);
    sliderDiv.innerHTML = parseInt(value);
  }
  else {
    document.getElementById(id).style.opacity = 0.2;

  }

}
// toggle Light switch
function toggleCheckLight(id, index) {
  var check = document.getElementById(id).checked;
  if (check) {
    document.getElementById(index).style.opacity = 1;
    document.getElementById("lightSliderOut" + index).value = LR.LivingRoom.Light["L" + index].brightness;
    document.getElementById(index).value = LR.LivingRoom.Light["L" + index].brightness;
    var sliderDiv = document.getElementById("lightSliderOut" + index);
    sliderDiv.innerHTML = parseInt(sliderDiv.value);
  }
  else {
    document.getElementById(index).style.opacity = 0.2;
    document.getElementById("lightSliderOut" + index).value = "off";
    document.getElementById(index).value = 0;
    console.log("Light off")
  }
}



// End Light Controller



// adding components

function addCode() {
  no_of_lights+=1;
  document.getElementById("light").innerHTML +=
    "<div class=col-3 id=lightIcon><span class=tile_icon>L " + no_of_lights + "</span><span class=tile_info></span></div>"
    + "<div class=col-5 id=lightRangeSlider" + no_of_lights + "><input id=" + no_of_lights + " type=range value=24 min=1 max=100 oninput=te(this.value,this.id)>&nbsp &nbsp &nbsp<output id=lightSliderOut" + no_of_lights + ">24</output></div>"
    + "<div class=col-4 id=lightSwitch" + no_of_lights + "><label class=switch><input id=togBtnLight" + no_of_lights + " type=checkbox onchange=toggleCheckLight(this.id," + no_of_lights + ") checked><span id=roundSlider" + no_of_lights + " class=slider></span></label></div><br><br><br>";

  // LR.LivingRoom.Light["L" + no_of_lights].brightness = data.LivingRoom.Light["L" + no_of_lights].brightness;
  document.getElementById("roundSlider" + no_of_lights).classList.add("round")
  document.getElementById("lightRangeSlider" + no_of_lights).classList.add("mt-4")
  document.getElementById("lightSwitch" + no_of_lights).classList.add("mt-4")


  // if (data.LivingRoom.Light["L" + no_of_lights].status == "on") {
  //   document.getElementById(no_of_lights).value = data.LivingRoom.Light["L" + no_of_lights].brightness;
  //   document.getElementById("togBtnLight" + no_of_lights).checked = true;
  //   document.getElementById("lightSliderOut" + no_of_lights).innerText = data.LivingRoom.Light["L" + no_of_lights].brightness;
  //   document.getElementById(no_of_lights).style.opacity = 1
  // }
  // else {
  //   document.getElementById(no_of_lights).value = 0;
  //   document.getElementById("togBtnLight" + no_of_lights).checked = false;
  //   document.getElementById("lightSliderOut" + no_of_lights).innerText = "off"
  //   document.getElementById(no_of_lights).style.opacity = 0.2; 
  var temp = {
    "status": "off", 
    "brightness": 47
  }
  LR.LivingRoom.Light['L'+no_of_lights,temp] = temp;
  console.log(LR)
  eel.updateJSON('L'+no_of_lights,temp);
}