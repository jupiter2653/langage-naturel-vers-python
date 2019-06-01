//Creating code mirror instance
var textArea = document.getElementById("outputTextArea");
var myCodeMirror = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});


function addLine(type){
	nbrLine = $("#"+type+" .line").length-1
	console.log(nbrLine)
	$("#"+type + nbrLine).clone().insertAfter("#"+type + nbrLine);
	newNbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine).attr("id",type + newNbrLine)
}