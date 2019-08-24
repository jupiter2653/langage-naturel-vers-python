<?php $payload = $_POST["payload"]; 
$payload = json_decode($payload,True); 
var_dump($payload["repository"]["git_url"] );
 
?>
