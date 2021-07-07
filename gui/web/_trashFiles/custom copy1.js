setInterval(function () {
    //location.reload();
}, 2000);





function addCode() {
    var s = "L";
    // for(var i =0;i<1;i++){
        document.getElementById("addcomp").innerHTML +=
        "<li class=off ><span><i onclick=reply_click(this.id) class=x id="+s+(parseInt(n)+1)+"></i></span></li>";
        document.getElementById(s+(n+1)).classList.add("fa")
        document.getElementById(s+(n+1)).classList.add("fa-lightbulb-o")
        n = parseInt(n) + 1;

    // }
    
}
function te(val){
    console.log(val)
}

function reply_click(clicked_id)
  {
    //   alert(clicked_id);
    console.log(LR.LivingRoom.Light[clicked_id].brightness)
    document.querySelector("#sliderAmount").innerText = LR.LivingRoom.Light[clicked_id].brightness
    document.getElementById("myinput1").defaultValue = LR.LivingRoom.Light[clicked_id].brightness
    var br = LR.LivingRoom.Light[clicked_id].brightness;
    document.getElementById("myinput1").style.background = 'linear-gradient(to right, #939599 0%, #939599 ' + br + '%, #fff ' + br + '%, white 100%)'
    

  }

// Initalize vaues fromm JSON using fetch api
var n = 0;
var LR = {
    "LivingRoom": {
        "AC": {
            "status": "on",
            "temperature": 18
        },
        "Light": {
            "L1": {
                "status": "off",
                "brightness": 9
            },
            "L2": {
                "status": "off",
                "brightness": 19
            },
            "L3": {
                "status": "off",
                "brightness": 29
            }
        },
        "Fan": {
            "status": "on",
            "speed": 3
        }
    }
  }
  function initializeValues() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
  
        // init ac value
        document.querySelector("#number").innerText = data.LivingRoom.AC.temperature
  
        //init light brightness
        document.querySelector("#sliderAmount").innerText = data.LivingRoom.Light.L1.brightness
        document.getElementById("myinput1").defaultValue = data.LivingRoom.Light.L1.brightness
        var br = data.LivingRoom.Light.L1.brightness;
        document.getElementById("myinput1").style.background = 'linear-gradient(to right, #939599 0%, #939599 ' + br + '%, #fff ' + br + '%, white 100%)'
        

        n = data.no_lights
        var s = "L";
        for(var i =1;i<=data.no_lights;i++){
            document.getElementById("addcomp").innerHTML +=
            "<li class=off ><span><i onclick=reply_click(this.id) class=x id="+s+i+"></i></span></li>";
            document.getElementById(s+i).classList.add("fa")
            document.getElementById(s+i).classList.add("fa-lightbulb-o")


        }

        /*
        //init fan values
        document.querySelector("#FanSpeed").innerText = data.LivingRoom.Fan.speed
  
        if (data.LivingRoom.Fan.speed == 1) {
          document.getElementById('btn1').classList.add("active")
        }
        else if (data.LivingRoom.Fan.speed == 2) {
          document.getElementById('btn2').classList.add("active")
        }
        else if (data.LivingRoom.Fan.speed == 3) {
          document.getElementById('btn3').classList.add("active")
        }
        else if (data.LivingRoom.Fan.speed == 4) {
          document.getElementById('btn4').classList.add("active")
        }
        else {
          document.getElementById('btn5').classList.add("active")
        }
  
        // Light switch
        if (data.LivingRoom.Light.L1.status == "on") {
          // document.getElementById('fanSwitch').classList.remove("off");
          // document.getElementById('fanSwitch').classList.add("on")
          document.getElementById("togBtnLight").checked = true;
          // document.getElementById("fanSwitch").innerText = "ON"
        }
        else {
          // document.getElementById('fanSwitch').classList.remove("on");
          // document.getElementById('fanSwitch').classList.add("off")
          // document.getElementById("fanSwitch").innerText = "OFF"
          document.getElementById("togBtnLight").checked = false;
  
  
        }
        // AC switch
        if (data.LivingRoom.AC.status == "on") {
          // document.getElementById('fanSwitch').classList.remove("off");
          // document.getElementById('fanSwitch').classList.add("on")
          document.getElementById("togBtnAC").checked = true;
          // document.getElementById("fanSwitch").innerText = "ON"
        }
        else {
          // document.getElementById('fanSwitch').classList.remove("on");
          // document.getElementById('fanSwitch').classList.add("off")
          // document.getElementById("fanSwitch").innerText = "OFF"
          document.getElementById("togBtnAC").checked = false;
  
  
        }
        // fan switch
        if (data.LivingRoom.Fan.status == "on") {
          // document.getElementById('fanSwitch').classList.remove("off");
          // document.getElementById('fanSwitch').classList.add("on")
          document.getElementById("togBtnFan").checked = true;
          // document.getElementById("fanSwitch").innerText = "ON"
        }
        else {
          // document.getElementById('fanSwitch').classList.remove("on");
          // document.getElementById('fanSwitch').classList.add("off")
          // document.getElementById("fanSwitch").innerText = "OFF"
          document.getElementById("togBtnFan").checked = false;
  
  
        }*/
  
      })
      //eel.recieveJSValues(LR);
     
  }
  
  
  
  
  
  //AC controller
  function increaseValue() {
    var check = document.getElementById("togBtnAC").checked;
    // console.log("check  ", check)
    if (check) {
      var value = parseInt(document.querySelector("#number").innerText, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      LR.LivingRoom.AC.temperature = value;
      document.querySelector("#number").innerText = value;
      //eel.recieveJSValues(LR);
    }
    // else{
    //   document.getElementById("decrease").style.opacity = 0.5;
    // }
  
  }
  
  function decreaseValue() {
    var check = document.getElementById("togBtnAC").checked;
  
    if (check) {
      var value = parseInt(document.querySelector("#number").innerText, 10);
      value = isNaN(value) ? 0 : value;
      value < 1 ? value = 1 : '';
      value--;
      LR.LivingRoom.AC.temperature = value;
      document.querySelector("#number").innerText = value;
      //eel.recieveJSValues(LR);
    }
  
  }
  // End AC controller
  
  
  
  // Range slider
  document.getElementById("myinput1").oninput = function () {
    var checkLight = document.getElementById("togBtnLight").checked;
    // if (checkLight) {
      var value = (this.value - this.min) / (this.max - this.min) * 100
      this.style.background = 'linear-gradient(to right, #939599 0%, #939599 ' + value + '%, #fff ' + value + '%, white 100%)'
      updateSlider(value);
    // }
  
  };
  
  
  function updateSlider(slideAmount) {
    var sliderDiv = document.getElementById("sliderAmount");
  
    LR.LivingRoom.Light.brightness = parseInt(slideAmount);
    sliderDiv.innerHTML = parseInt(slideAmount);
    //eel.recieveJSValues(LR);
  }
  
  // End range Slider
  
  /*
  
  // Add active class to the current button (highlight it)
  function fanSpeedController() {
    var checkFan = document.getElementById("togBtnFan").checked;
    if (checkFan) {
      var header = document.getElementById("myDIV");
      var btns = header.getElementsByClassName("btn");
      for (var i = 0; i < btns.length; i++) {
        // console.log(i)
        btns[i].addEventListener("click", function () {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
          // console.log(document.getElementById(this.id).innerText)
          LR.LivingRoom.Fan.speed = document.getElementById(this.id).innerText;
          document.querySelector("#FanSpeed").innerText = document.getElementById(this.id).innerText;
          // postValuesToPython();
          //eel.recieveJSValues(LR);
        });
      }
    }
  }
  // End FanSpeedController
  
  
  
  // Toggle buton controller
  
  //AC
  var header_ac = document.getElementById("ac");
  // var btns = header.getElementsByClassName("btn");
  document.addEventListener('DOMContentLoaded', function () {
    var checkbox = header_ac.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        document.getElementById("decrease").style.opacity = 1;
        document.getElementById("increase").style.opacity = 1;
        acColor = document.getElementById("acColor");
        acColor.classList.add('activeColor');
        LR.LivingRoom.AC.status = "on";
        //eel.recieveJSValues(LR);
        // console.log('ac ON', "ggvhbhvh",LR.LivingRoom.AC.status);
      } else {
        // do that
        document.getElementById("decrease").style.opacity = 0.2;
        document.getElementById("increase").style.opacity = 0.2;
        acColor.classList.remove('activeColor');
        LR.LivingRoom.AC.status = "off";
        console.log('ac OFF');
        //eel.recieveJSValues(LR);
      }
    });
  });
  
  // Light
  var header_light = document.getElementById("light");
  // var btns = header.getElementsByClassName("btn");
  document.addEventListener('DOMContentLoaded', function () {
    var checkbox = header_light.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        document.getElementById("myinput1").style.opacity = 1;
        lightColor = document.getElementById("lightColor");
        lightColor.classList.add('activeColor');
        LR.LivingRoom.Light.status = "on"
        console.log('light ON');
        //eel.recieveJSValues(LR);
      } else {
        // do that
        document.getElementById("myinput1").style.opacity = 0.2;
  
        lightColor.classList.remove('activeColor');
        LR.LivingRoom.Light.status = "off"
        console.log('light OFF');
        //eel.recieveJSValues(LR);
      }
    });
  });
  
  var header_fan = document.getElementById("fan");
  // var btns = header.getElementsByClassName("btn");
  document.addEventListener('DOMContentLoaded', function () {
    var checkbox = header_fan.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        var temp = document.getElementById("myDIV")
        temp.style.opacity = 1;
        fanColor = document.getElementById("fanColor");
        fanColor.classList.add('activeColor');
        LR.LivingRoom.Fan.status = "on"
        //eel.recieveJSValues(LR);
  
        console.log('Fan ON');
        // this.styl
      } else {
        // do that
        var temp = document.getElementById("myDIV")
        temp.style.opacity = 0.2;
        fanColor.classList.remove('activeColor');
        LR.LivingRoom.Fan.status = "off"
        console.log('Fan OFF');
        //eel.recieveJSValues(LR);
      }
    });
  });
  
  // //eel.expose(postValuesToPython);
  // function postValuesToPython() {
  //   console.log(LR)
  // }
  
  // //eel.recieveJSValues(LR);
  
  
  //chnage background color of display circle on switch on-off
  // function changeColor(color) {
  //   document.body.style.background = color;
  // }
  
  // console.log(LR.LivingRoom.AC.temperature)


  */
