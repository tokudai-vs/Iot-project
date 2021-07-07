var jsonData = {}


//Below function is used to generate the scene data
function sceneImplement1() {
    fetch("scene.json")
        .then(response => response.json())
        .then(data => {
            var n = Object.keys(data).length;
            for (var i = 1; i <= n; i++) {
                var sceneHead = "<div id=sceneRow" + i + " class=row>" +
                                    "<div id=row2" + i + " class=col-md-8 offset-md-1 w-100>" +
                                        "<div id=card" + i + "  class=card my-2 style=border-radius: 25px;>" +
                                            "<h5 style=text-align:center;> scene " + i +
                                            "</h5>" +
                                            "<div id=scene" + i + ">" +
                                            "</div>" +
                                        "</div>" +   
                                        "<div class=row>" +
                                            "<label id=switchId" + i + " class=switch ml-4>" +
                                                "<input type=checkbox id=sceneImplement" + i + " onchange=scene("+i+") checked>" +
                                                "<span id=span" + i + " class=slider round>" +
                                                "</span>" +
                                            "</label>" +
                                            "<div class=text-white ml-3 mt-1 id=sceneText" + i + " style=text-align:center;>" +
                                            "</div>" +
                                        "</div>"+
                                    "</div>"+
                                "</div>"    

                document.getElementById("scenes").innerHTML += sceneHead;
                document.getElementById("sceneRow" + i).classList.add("mt-5");
                document.getElementById("row2" + i).classList.add("offset-md-1");
                document.getElementById("row2" + i).classList.add("w-100");
                document.getElementById("row2" + i).style.backgroundColor = "#a6b7c7";
                document.getElementById("row2" + i).style.borderRadius = "25px";
                document.getElementById("card" + i).classList.add("my-2");
                document.getElementById("card" + i).style.borderRadius = "25px";
                document.getElementById("scene" + i).style.backgroundColor = "gray";
                document.getElementById("scene" + i).style.borderRadius = "25px";
                document.getElementById("scene" + i).style.textAlign = "center";
                document.getElementById("switchId" + i).classList.add("ml-4");
                document.getElementById("span" + i).classList.add("round");
                document.getElementById("sceneText" + i).classList.add("ml-3");
                document.getElementById("sceneText" + i).classList.add("mt-1");

            }
            for (var i = 1; i <= Object.keys(data).length; i++) {
                for (var j in data["Scene" + i]) {
                    document.getElementById("scene" + i).innerHTML += "<b style=color:yellow>"+j+"</b>" + " :: <br>";
                    for (var k in data["Scene" + i][j]) {
                        for (var l in data["Scene" + i][j][k]) {
                            document.getElementById("scene" + i).innerHTML += l + " =<br>";

                            for (var m in data["Scene" + i][j][k][l]) {
                                document.getElementById("scene" + i).innerHTML += m + " : " + data["Scene" + i][j][k][l][m] + "  <br>";
                            }
                        }
                    }
                }
                jsonData = data;
                document.getElementById('sceneImplement'+i).checked = false;
                // scene(i);
            }


        })


}

//Below function is used to activate or deactivate the scenes
function scene(id) {
    var check = document.getElementById('sceneImplement'+id).checked;
    if (check) {
        document.getElementById('sceneText'+id).innerHTML = "Activated";
        activateScene(id);
    }
    else {
        document.getElementById('sceneText'+id).innerHTML = "Deactivated";
        deactivateScene(id);

    }
}

//Below function is used to cal the python backend to send the message
function activateScene(id) {
    eel.activateScene('Scene '+id+' activated');
}

function deactivateScene(id) {
    eel.activateScene('Scene '+id+' deactivated')
}
