var globalData;
var numberOfBoxes = 0;

method = {method:'GET'};
fetch('https://api.imgflip.com/get_memes',method).then(res => res.json()).then(function(data) {
    // Here you get the data to modify as you please
    console.log(data);

globalData = data;

var newSelect=document.getElementById("mySelect");



for(i = 0; i < 100; i++)
{
   var opt = document.createElement("option");

   var name = data.data.memes[i].name;
   var id = i;


   opt.value= id;
   opt.innerHTML = name; // whatever property it has

   // then append it to the select element
   newSelect.appendChild(opt);


}

    
  optionChange();

    })

function createBoxes(number){
  var container = document.getElementById("textholder");


//Textboxes
var child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild; 
        } 


  for (i=0; i<number;i++){

    var input = document.createElement("input");
    input.type = "text";
    input.id = i;
    container.appendChild(input);
    input.placeholder = "Text " + (i + 1);

  }


//x positions

container = document.getElementById("xPosition");

child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild; 
        } 

  for (i=0; i<number;i++){

    var input = document.createElement("input");
    input.type = "text";
    input.id = "x" + i;
    container.appendChild(input);
    input.placeholder = "(optional) X-Pos";

  }



  //y positions

container = document.getElementById("yPosition");

child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild; 
        } 

  for (i=0; i<number;i++){

    var input = document.createElement("input");
    input.type = "text";
    input.id = "y" + i;
    container.appendChild(input);
    input.placeholder = "(optional) Y-Pos";

  }


//width

container = document.getElementById("width");

child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild; 
        } 

  for (i=0; i<number;i++){

    var input = document.createElement("input");
    input.type = "text";
    input.id = "w" + i;
    container.appendChild(input);
    input.placeholder = "(optional) Width";

  }


  //height

container = document.getElementById("height");

child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild; 
        } 

  for (i=0; i<number;i++){

    var input = document.createElement("input");
    input.type = "text";
    input.id = "h" + i;
    container.appendChild(input);
    input.placeholder = "(optional) Height";

  }


}

function optionChange(){

	console.log("change");

	var e = document.getElementById("mySelect");
	var strUser = e.options[e.selectedIndex].value;

	console.log(strUser);

document.getElementById("preview").src = globalData.data.memes[parseInt(strUser)].url;
changeFavicon(globalData.data.memes[parseInt(strUser)].url);
numberOfBoxes = globalData.data.memes[parseInt(strUser)].box_count;
createBoxes(globalData.data.memes[parseInt(strUser)].box_count);


}

function copyURL(){
  Clipboard.write("texst");
}

function callAPI(){


//var t1 = document.getElementById("t1").value;
//var t2 = document.getElementById("t2").value;

var e = document.getElementById("mySelect");
var strUser = e.options[e.selectedIndex].value;



templateID = parseInt(globalData.data.memes[parseInt(strUser)].id);

console.log(templateID);

params = new URLSearchParams();
params.append('template_id',templateID);
params.append('username',"getrshah");
params.append('password',"lrahul786");
params.append('text0',"g");
params.append('text1',"g");
//params.append('boxes[0][text]',"test1");
//params.append('boxes[1][text]',"test2");

for(i = 0; i < numberOfBoxes; i++){
  //text boxes
  params.append('boxes['+i+'][text]',document.getElementById(i.toString()).value);


  //x positions
  params.append('boxes['+i+'][x]',parseInt(document.getElementById("x" + i).value));
  //y positions
  params.append('boxes['+i+'][y]',parseInt(document.getElementById("y" + i).value));
  //width
  params.append('boxes['+i+'][width]',parseInt(document.getElementById("w" + i).value));
  //height
  params.append('boxes['+i+'][height]',parseInt(document.getElementById("h" + i).value));

}



method = {method:'POST',body:params};
fetch('https://api.imgflip.com/caption_image',method).then(res => res.json()).then(function(data) {
    // Here you get the data to modify as you please
    console.log(data);



document.getElementById("preview").src = data.data.url;

        



    })
}

function addTextbox(){

  if(numberOfBoxes == 5){
    return;
  }

//Text
var container = document.getElementById("textholder");
var input = document.createElement("input");
input.type = "text";
input.id = numberOfBoxes;
container.appendChild(input);
input.placeholder = "Text " + (numberOfBoxes + 1);


//X position
container = document.getElementById("xPosition");
input = document.createElement("input");
input.type = "text";
input.id = "x" + numberOfBoxes;
container.appendChild(input);
input.placeholder = "(optional) X-Pos"


//Y position
container = document.getElementById("yPosition");
input = document.createElement("input");
input.type = "text";
input.id = "y" + numberOfBoxes;
container.appendChild(input);
input.placeholder = "(optional) y-Pos"


//Width
container = document.getElementById("width");
input = document.createElement("input");
input.type = "text";
input.id = "w" + numberOfBoxes;
container.appendChild(input);
input.placeholder = "(optional) Width"


//Hieght
container = document.getElementById("height");
input = document.createElement("input");
input.type = "text";
input.id = "h" + numberOfBoxes;
container.appendChild(input);
input.placeholder = "(optional) Height"



numberOfBoxes += 1;


}

function changeFavicon(src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
}