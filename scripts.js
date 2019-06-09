//Creating code mirror instance
var textArea = document.getElementById("outputTextArea");
var myCodeMirror = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});


function addLine(type){
	nbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine+" .remove-button").remove();
	$("#"+type + nbrLine).clone().insertAfter("#"+type + nbrLine);
	newNbrLine = $("#"+type+" .line").length-1
	$("#"+type + nbrLine).attr("id",type + newNbrLine)
	$("#"+type + newNbrLine).append('<button onclick="delLastLine(\''+type+'\')" class="button-control remove-button">&times;</button>')
	
}
function delLastLine(type){
	nbrLine = $("#"+type+" .line").length-1
	if (nbrLine > 2) { //S'il y a plus de 2 ligne on supprime la dernière et on déplace la crois
		$("#"+type + nbrLine).remove();
		newNbrLine = $("#"+type+" .line").length-1
		$("#"+type + newNbrLine).append('<button onclick="delLastLine(\''+type+'\')" class="button-control remove-button">&times;</button>')
	}
	else if(nbrLine  == 2){ //Si il y en a 2 on supprime juste la dernière
		$("#"+type + nbrLine).remove();
	}
}