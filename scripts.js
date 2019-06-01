//Creating code mirror instance
var textArea = document.getElementById("outputArea");
var myCodeMirror = CodeMirror.fromTextArea(textArea,{mode : "text/x-python",readOnly : true});