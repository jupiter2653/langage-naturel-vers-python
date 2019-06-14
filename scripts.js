//Creating code mirror instance
var textArea = document.getElementById("outputTextArea");
var CodeMirrorInstance = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});


function addLine(type){
	var nbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine+" .remove-button").remove();
	$("#"+type + nbrLine).clone().insertAfter("#"+type + nbrLine);
	var newNbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine).attr("id",type + newNbrLine)
	if (type == "output") {
		$("#"+type + newNbrLine  + " .swicher").attr("onchange", "swichOutputMode(" + newNbrLine + ")")
	}
	$("#"+type + newNbrLine).append('<button onclick="delLastLine(\''+type+'\')" class="button-control remove-button">&times;</button>')
	if (type == 'var') {
		setVariableLists()
	}
	writeCode()
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
	if (type == 'var') {
		setVariableLists()
	}
	writeCode()
}
function swichOutputMode(id){
	if($('#output' + id + ' input').length == 1){
		$('#output' + id + ' input').remove()
		$('#output' + id + ' span').after('<select class="form-control var-list" onchange="writeCode()"></select>')
		 setVariableLists()
	} else if($('#output' + id + ' select').length == 2){
		$('#output' + id + ' select')[0].remove()
		$('#output' + id + ' span').after('<input type="text" class="form-control"  onchange="writeCode()" width="">')
		 setVariableLists()
	}
	writeCode()
}
function getValues(type,formType){
	arrayReturned = []
	length = $("#"+type+" "+formType).length
	var tempValue
	for (var i=1;i<=length;i++) {
		tempValue = $("#"+type+i+" "+formType).val()
		if (tempValue != "") {
			arrayReturned.push(tempValue)
		}
	}
	return arrayReturned
}
function setVariableLists(){
	$(".var-list option").remove()
	for (var i = getValues('var','input').length - 1; i >= 0; i--) {
		$(".var-list").append('<option value="'+getValues('var','input')[i]+'">'+getValues('var','input')[i]+'</option>')
	}
}
function getLinesNumber(type){
	return $("#"+ type + " .line").length-1
}
function writeCode(){
	CodeMirrorInstance.setValue("") //We clean the output
	//Variables & output
	for(var i = getLinesNumber("var"); i >= 1 ; i--){ //For each variable
		console.log(i)
		if (getValues("input","select").includes(getValues("var","input")[i-1])) {//if element is input list
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + $('#var'+i+' input').val() + " = "+ $('#var'+i+' select').val() + "(input('> ')) \n")
		} else{
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + $('#var'+i+' input').val() + " = "+ $('#var'+i+' select').val() + "() \n")
		}
	}
	//Process
	for (var i = getLinesNumber("process"); i >=1 ; i--) { //Foreach process element
		CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + $('#process'+i+' select').val() + " = "+ $('#process'+i+' input').val() + " \n") // To improve
	}
	//Output
	for (var i = getLinesNumber("output"); i >=1 ; i--) { //foreach output element
		if($('#output' + i + ' input').length == 1){
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print('"+ $('#output'+i+' input').val() + "') \n")
		} else if($('#output' + i + ' select').length == 2){
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print("+ $('#output'+i+' select').val() + ") \n")
		}
	}
}
$(function() {
	setVariableLists();
	writeCode();
	//Making sure everithing is coordinated in the ouput
	$("#output .swicher").val("text")
});