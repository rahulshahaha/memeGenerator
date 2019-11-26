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

//document.body.appendChild(newSelect);
    
  optionChange();
  

// var e = document.getElementById("mySelect");
// var strUser = e.options[e.selectedIndex].value;

// console.log(strUser);

// document.getElementById("preview").src = data.data.memes[parseInt(strUser)].url;
// changeFavicon(data.data.memes[parseInt(strUser)].url);

    })

function createBoxes(number){
  var container = document.getElementById("textholder");

var child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild; 
        } 




  for (i=0; i<number;i++){
    // Append a node with a random text
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "text";
    input.id = i;
    container.appendChild(input);
    input.placeholder = "Text " + (i + 1);
    // Append a line break 
    //container.appendChild(document.createElement("br"));


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
  params.append('boxes['+i+'][text]',document.getElementById(i.toString()).value);
}


method = {method:'POST',body:params};
fetch('https://api.imgflip.com/caption_image',method).then(res => res.json()).then(function(data) {
    // Here you get the data to modify as you please
    console.log(data);



document.getElementById("preview").src = data.data.url;

        



    })
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