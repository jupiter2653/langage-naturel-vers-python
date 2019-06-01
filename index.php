<!DOCTYPE html>
<html>
<head>
	<title>Traducteur de langage naturel vers Python</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap74.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<!--Code mirror syntax highlighter-->
	<link rel="stylesheet" href="codemirror-5.47.0/lib/codemirror.css">
</head>
<body class="container">
	<header>
		<h1>Traducteur de langage naturel vers Python</h1>
	</header>
	<section class="row">
		<div id="input">
			<h2>Langage Naturel</h2>
			<div id="inputForm" class="form-control">
				<div class="element">
					<h3>Variables :</h3>
					<div id="var1" class="line">
						<input type="text" name="variables" class="oneChar form-control ">
						<span>est un(e)</span>
						<select class="form-control" id="var1Type">
							<option value="int">Entier</option>
							<option value="float">Flottant</option>
							<option value="string">Chaine de charactère</option>
						</select>
					</div>
				</div>
				<div class="element">
					<h3>Entrée :</h3>
					<div id="input1" class="line">
						<span>Demander </span>
						<select class="form-control">
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
						</select>
					</div>
				</div>
				<div class="element">
					<h3>Traitement :</h3>
					<div id="process1" class="line">
						<select class="form-control" id="process1Var">
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
						</select>
						<span>Prend la valeur</span>
						<input type="text" name="calculus" class="form-control">
					</div>
				</div>
				<div class="element lastElement">
					<h3>Sortie :</h3>
					<div id="output1" class="line">
						<span>Afficher </span>
						<select class="form-control">
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div id="output">
			<h2>Python</h2>
			<textarea class="form-control" readonly id="outputArea">def coucou(lel):
	return True
</textarea>
		</div>
	</section>
<!--Code mirror syntax highlighter-->
<script src="codemirror-5.47.0/lib/codemirror.js"></script>
<script src="codemirror-5.47.0/mode/python/python.js"></script>
<script src="scripts.js"></script>
</body>
</html>