//Creating code mirror instance
var textArea = document.getElementById("outputTextArea");
var CodeMirrorInstance = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});


function addLine(type){
	const lines = {
		var : '<div id="varNO" class="line item"><input onchange="setVariableLists();  writeCode();" type="text" name="variables" class="oneChar form-control" maxlength="1"><span>est un(e)</span><select class="form-control" onchange="writeCode()"><option value="int">Entier</option><option value="float">Flottant</option><option value="str">Chaine de charactère</option></select><button onclick="delLine($(this))" class="button-control remove-button">×</button></div>',
		input : '<div id="inputNO" class="line item"><span>Demander </span><select class="form-control var-list" onchange="writeCode()"></select><button onclick="delLine($(this))" class="button-control remove-button">×</button></div>',
		process : '<div id="processNO" class="line item"><select class="form-control var-list" id="process1Var"  onchange="writeCode()"></select><span>Prend la valeur</span><input type="text" name="calculus" class="form-control short process-element" onchange="writeCode(); checkVariable($(this))"><select class="form-control process-element" onchange="writeCode(); deleteIfNull($(this))"><option value=""></option><option value="+">+</option><option value="-">-</option><option value="*">&times;</option><option value="/">&divide;</option></select><input type="text" name="calculus" class="form-control short process-element" onchange="writeCode(); checkVariable($(this))"><button onclick="addProcessElement($(this).parent()); writeCode();" class="button-control element-adder">+</button><button onclick="delLine($(this))" class="button-control remove-button">×</button></div>',
		output : '<div id="outputNO" class="line item"><span>Afficher </span><input type="text" class="form-control"  onchange="writeCode()"><select class="form-control swicher"  onchange="swichOutputMode($(this).parent())"><option value="text">Texte</option><option value="var">Variable</option></select><button onclick="delLine($(this))" class="button-control remove-button">×</button></div>'
	}
	$("#"+type).append(lines[type]);

	var newId = getNewId(type);
	$("#"+type+"NO").attr("id", newId);

	setVariableLists($("#" + newId));
	writeCode();
}
function getNewId(type){
	var no = -1
	for(var i = 1; i <= getLinesNumber(type); i++){
		if($("#" + type + i).val() == undefined){
			no = i;
		}
	}
	if(no == -1){ //If no is still undefined
		no = getLinesNumber(type)+1;
	}
	return type+no
}
function delLine(line){
	line.parent().fadeOut(100,function(){
		line.parent().remove();
		setVariableLists()
		writeCode()
	});
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
		setVariableLists(undefined) //TODO : mettre en 2ieme argument la variable quil faut supprimer
	}
	writeCode()
}
function getValues(type,formType){
	var arrayReturned = []
	var tempValue
	for (var i = 0; i < getLinesNumber(type) ; i++) {
		tempValue = $("#"+get_line_id(i,type)+" "+formType).val()
		if (tempValue != "") {
			arrayReturned.push(tempValue)
		}
	}
	return arrayReturned
}
function setVariableLists(element, variable){ //TODO : mettre en 2ieme argument la variable quil faut supprimer
	if (element == undefined) {
		$(".var-list option").remove()
		for (var i = 0; i < getValues('var','input').length; i++) {
			$(".var-list").append('<option value="'+getValues('var','input')[i]+'">'+getValues('var','input')[i]+'</option>')
		}
	} else if(element != undefined && variable == undefined){ 
		element.children(".var-list").children("option").remove()
		for (var i = 0; i < getValues('var','input').length; i++) {
			element.children(".var-list").append('<option value="'+getValues('var','input')[i]+'">'+getValues('var','input')[i]+'</option>')
		}
	}
}
function getLinesNumber(type){
	return $("#"+ type + " .line").length
}
function writeCode(){
	CodeMirrorInstance.setValue("") //We clean the output
	//Variables & input
	for(var i = 0; i < getLinesNumber("var") ; i++){ //For each variable
		if ($("#" + get_line_id(i,"var") + " input").val() && $("#" + get_line_id(i,"var") + " input").val()  != '') {
			if (getValues("input","select").includes($("#" + get_line_id(i,"var") + " input").val())) {//if element is input list
				CodeMirrorInstance.setValue(
					CodeMirrorInstance.getValue() + $("#" + get_line_id(i,"var") + " input").val() + " = "+ $("#" + get_line_id(i,"var") + " select").val() + "(input('> ')) \n")
			} else{
				CodeMirrorInstance.setValue(
					CodeMirrorInstance.getValue() + $("#" + get_line_id(i,"var") + " input").val() + " = " + $("#" + get_line_id(i,"var") + " select").val() + "() \n")
			}
		}
	}
	//Process
	for(var i = 0; i < getLinesNumber("process") ; i++){ //Foreach process element
		if($("#" + get_line_id(i,"process") + " select").val() && $("#" + get_line_id(i,"process") + " select").val()  != null){
			CodeMirrorInstance.setValue(
						CodeMirrorInstance.getValue() + $("#" + get_line_id(i,"process") + " select").val() + " = ") // To improve

			for (var j = 0; j < $("#"+ get_line_id(i,"process") + " .process-element").length ; j++) {
				/*$($("#process" + i + " .process-element")[j])*/
				CodeMirrorInstance.setValue(
						CodeMirrorInstance.getValue() + $($("#" + get_line_id(i,"process") + " .process-element")[j]).val())
			}

			CodeMirrorInstance.setValue(
						CodeMirrorInstance.getValue() + "\n")
		}
	}
	//Output
	for(var i = 0; i < getLinesNumber("output") ; i++){ //foreach output element
		if($('#' + get_line_id(i,"output") + ' input').length == 1 //If it's text
			&& $('#' + get_line_id(i,"output") + ' input').val() 
			&& $('#' + get_line_id(i,"output") + ' input').val() != "")
		{ 
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print('"+ $('#' + get_line_id(i,"output") + ' input').val() + "') \n")
		} 
		else if($('#' + get_line_id(i,"output") + ' select').length == 2 //Else if it's a variable
			&& $('#' + get_line_id(i,"output") + ' select').val() != null)
		{ 
			CodeMirrorInstance.setValue(
				CodeMirrorInstance.getValue() + "print("+ $('#' + get_line_id(i,"output") + ' select').val() + ") \n")
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
function addProcessElement(line){
	var lastElement = $(last_of_array($("#" + $(line).attr('id') + " .process-element")))
	if (lastElement.is("select")) {
		$('<input type="text" name="calculus" class="form-control short process-element" onchange="writeCode(); checkVariable($(this))">').insertBefore("#" + $(line).attr('id') + " .element-adder");
	} else{
		$('<select class="form-control process-element" onchange="writeCode(); deleteIfNull($(this))"><option value=""></option><option value="+">+</option><option value="-">-</option><option value="*">&times;</option><option value="/">&divide;</option></select>'
			).insertBefore("#" + $(line).attr('id') + " .element-adder");
	}
}
function swichOutputMode(line){

	if($('#' + $(line).attr('id') + ' input').length == 1){
		$('#' + $(line).attr('id') + ' input').remove()
		$('#' + $(line).attr('id') + ' span').after('<select class="form-control var-list" onchange="writeCode()"></select>')
	} else if($('#' + $(line).attr('id') + ' select').length == 2){
		$('#' + $(line).attr('id') + ' select')[0].remove()
		$('#' + $(line).attr('id') + ' span').after('<input type="text" class="form-control"  onchange="writeCode()" width="">')
	}
	setVariableLists()
	writeCode()
}
$(function() {
	//Making elements tiles sortable
	$('.element').sortable();
	//Making sure everithing is coordinated in the ouput
	$("#output .swicher").val("text")
	$('.CodeMirror').height($('#inputForm').outerHeight()-2)
	setVariableLists();
	writeCode();
});
$( ".element" ).sortable({
  	update: function( event, ui ) {writeCode();}
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

function get_line_id(index, type){return $("#"+type).sortable("toArray")[index]}