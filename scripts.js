function readFile(){
    var fileToLoad = document.getElementById("runFile").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        document.getElementById("statistics").innerHTML = "";
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var jsonObj = JSON.parse(textFromFileLoaded);

        var char = jsonObj.character_chosen;
        if(char == "IRONCLAD"){
            var textnode = document.createTextNode("You have started your journey as the Ironclad");
            var imgNode = document.createElement("img");
            imgNode.src = 'images/ironclad.png';
            document.getElementById("statistics").appendChild(textnode);
            document.getElementById("statistics").innerHTML += "<br>";
            document.getElementById("statistics").appendChild(imgNode);
            document.getElementById("statistics").innerHTML += "<br>";
        }else{
            var textnode = document.createTextNode("You have started your journey as the Silent");
            var imgNode = document.createElement("img");
            imgNode.src = 'images/silent.png';
            document.getElementById("statistics").appendChild(textnode);
            document.getElementById("statistics").innerHTML += "<br>";
            document.getElementById("statistics").appendChild(imgNode);
            document.getElementById("statistics").innerHTML += "<br>";
        }

        if(jsonObj.victory == true){
            var textnode = document.createTextNode("Congratulations on Slaying the Spire!!!");
            document.getElementById("statistics").appendChild(textnode);
            document.getElementById("statistics").innerHTML += "<br>";
        }else{
            var textnode = document.createTextNode("Sorry that you died to " + jsonObj.killed_by + " on the " + jsonObj.floor_reached + " th floor. Better luck next time.");
            document.getElementById("statistics").appendChild(textnode);
            document.getElementById("statistics").innerHTML += "<br>";
        }

        var textnode = document.createTextNode("The run took you " + fancyTimeFormat(jsonObj.playtime));
        document.getElementById("statistics").appendChild(textnode);
        document.getElementById("statistics").innerHTML += "<br>";

        var campfires = jsonObj.campfire_rested + jsonObj.campfire_upgraded;
        var textnode = document.createTextNode("In that time you have visited " + campfires + " campfires. Rested " + jsonObj.campfire_rested + " times. Upgraded " + jsonObj.campfire_upgraded + " cards.");
        document.getElementById("statistics").appendChild(textnode);
        document.getElementById("statistics").innerHTML += "<br>";

        var textnode = document.createTextNode("You have purchased " + Object.keys(jsonObj.items_purchased).length + " items. Used card removal service " + jsonObj.purchased_purges + " times. And ended up with " + jsonObj.gold + " gold.");
        document.getElementById("statistics").appendChild(textnode);
        document.getElementById("statistics").innerHTML += "<br>";

        var textnode = document.createTextNode("You have accumulated " + Object.keys(jsonObj.relics).length + " relics:");
        document.getElementById("statistics").appendChild(textnode);
        document.getElementById("statistics").innerHTML += "<br>";

        for (var i = 0, len = Object.keys(jsonObj.relics).length; i < len; i++) {
            var relic = jsonObj.relics[i];
            var relic2 = relic.toLocaleLowerCase();
            relic2 = relic2.replace(/\s+/g, '');
            relic2 = relic2.replace('\'','');
            var imgNode = document.createElement("img");
            imgNode.src = 'images/relics/' + relic2 + ".png";
            imgNode.width = 70;
            imgNode.height = 70;
            imgNode.title = relic;
            document.getElementById("statistics").appendChild(imgNode);
        }

        document.getElementById("statistics").innerHTML += "<br>";

        var textnode = document.createTextNode("Your final deck contains " + Object.keys(jsonObj.master_deck).length + " cards:");
        document.getElementById("statistics").appendChild(textnode);
        document.getElementById("statistics").innerHTML += "<br>";

        var rowCounter = 0;
        for (var i = 0, len = Object.keys(jsonObj.master_deck).length; i < len; i++) {
            var card = jsonObj.master_deck[i];
            var card2 = card.toLocaleLowerCase();
            card2 = card2.replace(/\s+/g, '');
            card2 = card2.replace('\'','');
            card2 = card2.replace('_','');
            var imgNode = document.createElement("img");
            imgNode.src = 'images/cards/' + card2 + ".png";
            imgNode.width = 280;
            imgNode.height = 289;
            imgNode.title = card;
            document.getElementById("statistics").appendChild(imgNode);
            if(rowCounter == 4){document.getElementById("statistics").innerHTML += "<br>"; rowCounter = 0;}
            else{rowCounter += 1;}
        }
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
  }


// Function converting seconds to hours minutes seconds, https://stackoverflow.com/a/11486026
function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}