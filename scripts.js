//Creating code mirror instance
var textArea = document.getElementById("outputTextArea");
var CodeMirrorInstance = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});


function addLine(type){
	var nbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine+" .remove-button").remove();
	$("#"+type + nbrLine).clone().insertAfter("#"+type + nbrLine);
	var newNbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine).attr("id",type + newNbrLine)
	$("#"+type + newNbrLine).append('<button onclick="delLastLine(\''+type+'\')" class="button-control remove-button">&times;</button>')
	$( "input" ).change()
}
function delLastLine(type){
	var nbrLine = $("#"+type+" .line").length-1
	if (nbrLine > 2) { //S'il y a plus de 2 ligne on supprime la dernière et on déplace la crois
		$("#"+type + nbrLine).remove();
		var newNbrLine = $("#"+type+" .line").length-1
		$("#"+type + newNbrLine).append('<button onclick="delLastLine(\''+type+'\')" class="button-control remove-button">&times;</button>')
	}
	else if(nbrLine  == 2){ //Si il y en a 2 on supprime juste la dernière
		$("#"+type + nbrLine).remove();
	}
	switch (type){
		case 'var':
			setNewVars()
		case 'input':
			setInput()
		case 'process':
			setValues()
		case 'output':
			setOutput()
	}
}
document["nameList"] = []
function setNewVars() {
	var nbrLine = $("#var .line").length-1
	var tempName
	$("#input .var-list option, #process .var-list option, #output .var-list option").remove()
	document["nameList"] = []
	for(var i=nbrLine;i>=1;i-=1){
		tempName = $("#var"+i+" input").val()
		tempType = $("#var"+i+" select").val()
		document["nameList"].push([tempName,tempType])
		$("#input .var-list, #process .var-list, #output .var-list").append(
			'<option value="'+tempName+'">'+tempName+'</option>')
	}
	setInput()
    setValues()
    setOutput()
}
document['inputList'] = []
function setInput(){
	var nbrLine = $("#input .line").length-1
	var tempIn
	document['inputList'] = []
	for(var i=nbrLine;i>=1;i-=1){
		tempIn = $("#input"+i+" select").val()
		document['inputList'].push(tempIn)
	}
	writeCode()
}
document['processingList'] = []
function setValues(){
	var nbrLine = $("#process .line").length-1
	var tempVal
	document['processingList'] = []
	for (var i=nbrLine;i>=1;i-=1) {
		var tempVal = $("#process"+i+" input").val()
		var tempVar = $("#process"+i+" select").val()
		document['processingList'].push([tempVar,tempVal])
	}
	writeCode()
}
document['outputList'] = []
function setOutput(){
	var nbrLine = $("#output .line").length-1
	var tempVal
	document['outputList'] = []
	for (var i=nbrLine;i>=1;i-=1) {
		var tempVar = $("#output"+i+" select").val()
		document['outputList'].push(tempVar)
	}
	writeCode()
}
function writeCode(){
	var nbrVar = document["nameList"].length
	CodeMirrorInstance.setValue("") //We clean the output
	for(var i=0;i < nbrVar;i+=1){ //For each variable
		if (document['inputList'].includes(document["nameList"][i][0])) {//if element is input list
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + document["nameList"][i][0] + " = "+ document["nameList"][i][1] + "(input('> ')) \n")
		}
		else{
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + document["nameList"][i][0] + " = "+ document["nameList"][i][1] + "() \n")
		}
	}
	for (var i = 0; i < document['processingList'].length; i++) { //Foreach process element
		CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + document['processingList'][i][0] + " = "+ document['processingList'][i][1] + " \n")	
	}
	for (var i = 0; i < document['outputList'].length; i++) { //foreach output element
		CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print("+ document['outputList'][i][0] + ") \n")	
	}
}
$(function() {
    setNewVars()
    setValues()
    setOutput()
});