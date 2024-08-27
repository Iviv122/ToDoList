var list = [];
var currentId = 1;

function loadFromStorage() {
	var storedList = localStorage.getItem("list");
	var storedId = localStorage.getItem("currentId");

	if (storedList) {
	list = JSON.parse(storedList);
	}

	if (storedId) {
	currentId = parseInt(storedId, 10);
	}
}

function saveToStorage() {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("currentId", currentId.toString());
}

function createNode(){

	var inputValue =document.getElementById("input").value;
	if(!inputValue){ 
	Warning("No text");
	return 1;
	}
	Warning("");
	var newNode = {
		id: currentId,
		text: inputValue
	};

	list.push(newNode); 
	currentId++;
	document.getElementById("input").value = '';
	saveToStorage();
	drawList();
}

function drawList(){

	var oldList = document.querySelectorAll("div.list-item");
	oldList.forEach(function(item){item.remove();});
	list.forEach(drawNode);

}

function drawNode(item){

	if(item.id){
	
	var div = document.createElement('div');
	
	div.className = "list-item";
	div.id = item.id;

	div.onclick = function() {
	list[item.id-1] = "";
	saveToStorage();
	drawList();
	};

	div.innerHTML = `<p>${item.text}</p>`;

	document.body.appendChild(div);
}}

function Warning(err){

document.getElementById("warnings").innerHTML = err;

}
loadFromStorage();
drawList();
