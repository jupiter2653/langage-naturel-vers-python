//Creating code mirror instance
var textArea = document.getElementById("outputTextArea");
var CodeMirrorInstance = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});


function addLine(type){
	var nbrLine = $("#"+type+" .line").length
	$("#"+type +" .remove-button").remove();
	$("#"+type + nbrLine).clone().insertAfter("#"+type + nbrLine);
	var newNbrLine = $("#"+type+" .line").length
	$("#"+type + nbrLine).attr("id",type + newNbrLine)
	if (type == "output") {
		$("#"+type + newNbrLine  + " .swicher").attr("onchange", "swichOutputMode(" + newNbrLine + ")")
	} else if (type == "process") {
		$("#"+type + newNbrLine  + " .element-adder").attr("onclick", "addProcessElement(" + newNbrLine + ")")
	}
	$("#"+type).append('<button onclick="delLastLine(\''+type+'\')" class="button-control remove-button">&times;</button>')
	if (type == 'var') {
		setVariableLists()
	}
	writeCode()
}
function delLastLine(type){
	var nbrLine = $("#"+type+" .line").length
	if (nbrLine > 2) { //S'il y a plus de 2 ligne on supprime la dernière
		$("#"+type + nbrLine).remove();
	}
	else if(nbrLine  == 2){ //Si il y en a 2 on supprime juste la dernière et la croix
		$("#"+type + nbrLine).remove();
		$("#"+type +" .remove-button").remove();
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
	return $("#"+ type + " .line").length
}
function writeCode(){
	CodeMirrorInstance.setValue("") //We clean the output
	//Variables & input
	for(var i = getLinesNumber("var"); i >= 1 ; i--){ //For each variable
		if ($("#var" + i + " input").val() && $("#var" + i + " input").val()  != '') {
			if (getValues("input","select").includes(getValues("var","input")[i-1])) {//if element is input list
				CodeMirrorInstance.setValue(
					CodeMirrorInstance.getValue() + $('#var'+i+' input').val() + " = "+ $('#var'+i+' select').val() + "(input('> ')) \n")
			} else{
				CodeMirrorInstance.setValue(
					CodeMirrorInstance.getValue() + $('#var'+i+' input').val() + " = "+ $('#var'+i+' select').val() + "() \n")
			}
		}
	}
	//Process
	for (var i = getLinesNumber("process"); i >=1 ; i--) { //Foreach process element
		if($("#process" + i + " select").val() && $("#process" + i + " select").val()  != null){
			CodeMirrorInstance.setValue(
						CodeMirrorInstance.getValue() + $('#process'+i+' select').val() + " = ") // To improve
			for (var j = 0; j < $("#process" + i + " .process-element").length ; j++) {
				$($("#process" + i + " .process-element")[j])
				CodeMirrorInstance.setValue(
						CodeMirrorInstance.getValue() + $($("#process" + i + " .process-element")[j]).val())
			}
			CodeMirrorInstance.setValue(
						CodeMirrorInstance.getValue() + "\n")
		}
	}
	//Output
	for (var i = getLinesNumber("output"); i >=1 ; i--) { //foreach output element
		if($('#output' + i + ' input').length == 1 && $('#output' + i + ' input').val() && $('#output' + i + ' input').val() != ""){
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print('"+ $('#output'+i+' input').val() + "') \n")
		} else if($('#output' + i + ' select').length == 2 && $("#output" + i + " select").val() != null){
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print("+ $('#output'+i+' select').val() + ") \n")
		}
	}
}
function toggleMenu(){
	if ($( window ).scrollTop() > $("header").outerHeight()) {
 		$("nav").css({
			top: 0
		})
 	} else{
 		$("nav").css({
			top: $("header").outerHeight()-$( window ).scrollTop() //Makes the menu stick the header
		})
 	}
	$("nav").animate({ 
		left: parseInt($("nav").css('left'),10) == 0 ? -$("nav").outerWidth() : 0 
	});
}
function deleteIfNull(list){
	console.log(list.val())
	if (list.val() == "") {
		if (list.next().is("input")) {
			list.next().remove()
		}
		list.remove()
	}
}
function checkVariable(input){
	if (!(getValues("var","input").includes(input.val())) && isNaN(input.val()) && input.val() != ""){
		input.css({
			color:"red",
			fontWeight: "bold"
		});
		input.attr("title","Cette variable n'a pas été déclarée");
	}
	else{
		input.css({
			color:"black",
			fontWeight: "normal"
		});
		input.attr("title","");
	}
	
}
function addProcessElement(id){
	var lastElement = $(last_of_array($(".process-element")))
	if (lastElement.is("select")) {
		$('<input type="text" name="calculus" class="form-control short process-element" onchange="writeCode(); checkVariable($(this))">').insertBefore("#process" + id + " .element-adder");
	} else{
		$('<select class="form-control process-element" onchange="writeCode(); deleteIfNull($(this))"><option value=""></option><option value="+">+</option><option value="-">-</option><option value="*">&times;</option><option value="/">&divide;</option></select>'
			).insertBefore("#process" + id + " .element-adder");
	}
}
$(function() {
	setVariableLists();
	writeCode();
	$('.element').sortable();
	//Making sure everithing is coordinated in the ouput
	$("#output .swicher").val("text")
	$('.CodeMirror').height($('#inputForm').outerHeight()-2)
});
$( window ).resize(function() {
 	$("nav").css({
		top: $("header").outerHeight()
	})
	$('.CodeMirror').height($('#inputForm').outerHeight()-2)
});
$( window ).scroll(function() {
 	if ($( window ).scrollTop() > $("header").outerHeight()) {
 		$("nav").css({
			top: 0
		})
 	} else{
 		$("nav").css({
			top: $("header").outerHeight()-$( window ).scrollTop() //Makes the menu stick the header
		})
 	}
});

function last_of_array(array){return array[array.length-1]}