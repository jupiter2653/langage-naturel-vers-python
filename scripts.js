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
	}
}
document["nameList"] = []
function setNewVars() {
	var nbrLine = $("#var .line").length-1
	var tempName
	$("#input .var-list option, #process .var-list option, #output .var-list option").remove()
	document["nameList"] = []
	CodeMirrorInstance.setValue("")
	for(i=nbrLine;i>=1;i-=1){
		tempName = $("#var"+i+" input").val()
		tempType = $("#var"+i+" select").val()
		document["nameList"].push([tempName,tempType])
		CodeMirrorInstance.setValue(CodeMirrorInstance.getValue() + tempName + " = "+ tempType + "() \n")
		$("#input .var-list, #process .var-list, #output .var-list").append('<option value="'+tempName+'">'+tempName+'</option>')
	}

}