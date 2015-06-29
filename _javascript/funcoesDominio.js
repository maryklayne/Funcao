
function enviarFuncao(valor){
	if (valor=="botaoDominio"){
		$("#itr_X").prop('readOnly',false).focus();
		$("#botao1").show();
		$("#ajuda3").show();
		$("#resp1").show();
		verificaDominio(document.getElementById("funcao").value);
	}else if(valor=="botao1"){
		$("#itr_Y").prop('readOnly',false).focus();
		$("#botao2").show();
		$("#ajuda3").toggle();
		$("#ajuda4").show();
		$("#resp1").toggle();
		$("#resp2").show();
	}else if(valor=="botao2"){
		$("#pontos_criticos").prop('readOnly',false).focus();
		$("#botao3").show();
		$("#ajuda4").toggle();
		$("#ajuda5").show();
		$("#resp2").toggle();		
		$("#resp3").show();
		
	}else if(valor=="botao3"){
		$("#maximo").prop('readOnly',false).focus();
		$("#botao4").show();
		$("#ajuda5").toggle();
		$("#ajuda6").show();
		$("#resp3").toggle();		
		$("#resp4").show();	
		
	}else if(valor=="botao4"){
		$("#minimo").prop('readOnly',false).focus();
		$("#botao5").show();
		$("#ajuda6").toggle();
		$("#ajuda7").show();
		$("#resp4").toggle();		
		$("#resp5").show();
	}else if(valor=="botao5"){
		$("#pontos_de_inflexao").prop('readOnly',false).focus();
		$("#botao6").show();
		$("#ajuda7").toggle();
		$("#ajuda8").show();
		$("#resp5").toggle();		
		$("#resp6").show();
	}else if(valor=="botao6"){
		$("#concavidade").prop('readOnly',false).focus();
		$("#botao7").show();
		$("#ajuda8").toggle();
		$("#ajuda9").show();
		$("#resp6").toggle();		
		$("#resp7").show();
	}else if(valor=='botao7'){
		$("#ajuda9").toggle();
		$("#resp7").toggle();	
	}
}


$(document).ready(function(){
	//esconder botões de ajuda
	for (var i = 3; i <= 9; i++) {
	    var variavel = '#ajuda'+ i;
	    $(variavel).toggle();
	    var resp = i-2;
	    $('#resp'+resp).toggle();  
	    $('#botao'+resp).toggle();
	}
	
	$('.campoTxt').keypress(function(event) {
		var valor = $(this).next().attr('id');
		if (event.keyCode == '13') {
			event.preventDefault();
			enviarFuncao(valor);
			if(valor != 'label' && valor != "botaoDominio"){
				$(this).next().show();
			}
		}
	});
    $('.btn-func').click(function(){
        enviarFuncao($(this).attr('id'));
        if ($(this).attr('id')!="botaoDominio"){
        	$(this).hide(1000);
    	}
    });
});


function verificaDominio(funcao){ //ax³+bx²+xc+d
	var condicao = funcao.includes('/');
	var raiz = funcao.includes("raiz");
	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	var grauNumerador = "sem grau";
	var tipo;
	//tipo 1: numerador
	//tipo 2: numerador raiz
	//tipo 3: numerador e denominador
	//tipo 4: numerador raiz e denominador
	//tipo 5: numerador raiz e denominador raiz
	//tipo 6: numerador e denominador raiz

	//calcular o tipo
	if(condicao==false){ //só tem numerador
		tipo = 1;
		if(raiz){ //só tem numerador e raiz
			tipo = 2;
		}
	}else{//tem numerador e denominador
		tipo = 3;
		if (raiz){
			if(funcao.substring(0,funcao.indexOf('/')).includes("raiz") &&
					funcao.substring(funcao.indexOf('/')+1,funcao.lenth).includes("raiz")){
				tipo = 5;//num raiz e denom raiz 
			}else if(funcao.substring(funcao.indexOf('/')+1,funcao.lenth).includes("raiz")){
				tipo = 6;
			}else{//só denominador tem raiz
				tipo = 4;
			}
		}
	}
	
//	if (tipo==1){ alert("numerador");}
//	if (tipo==2){ alert("numerador raiz");}
//	if (tipo==3){ alert("numerador e denominador");}
//	if (tipo==4){ alert("numerador raiz e denominador");}
//	if (tipo==5){ alert("numerador raiz e denominador raiz");}
//	if (tipo==6){ alert("numerador e denominador raiz");}

	var reg= new RegExp(/(\+|-|\/)/);
	
	
	if(tipo == 1){
		alert( "D(f) = {x ∈ |R}" );
		if (verificaNum(funcao)=='primeiro'){ //funcao do primeiro grau
			var entradas = funcao.split(reg);
			b = calcularValorA(entradas);
			a = calcularValorB(entradas);		

			
//			alert('a '+a);
//			alert('b '+b);
			
			var pontX = calcIntersecX1(a,b);
			alert('ponto eixo X '+pontX);
			var pontY = calcIntersecY1(b);
			alert('ponto eixo Y '+pontY);
			
		}else if(verificaNum(funcao)=='segundo'){
			alert("cdfdfgdgfdg");
			var entradas = funcao.split(reg);
			alert(entradas);
			c = calcularValorA(entradas);
			b = calcularValorB(entradas);
			a = calcularValorC(entradas);
		
			alert("a "+a);
			alert("b "+b);
			alert("c "+c);
			
			var pontX = calcIntersecX2(a,b,c);//ax² bx c
			alert('ponto eixo X '+pontX);
			
			
		}

		
	}else if(tipo == 2){
		var num = funcao.substring(5,funcao.length-1);
//		numerador nao pode ser negativo
		var entradas = num.split(reg);
		if (verificaNum(funcao)=='primeiro'){ //funcao do primeiro grau
			a = calcularValorA(entradas);
			b = calcularValorB(entradas);
			calcDominioTipo2(a,b);
		}

	}else if(tipo == 3){
		var denom = funcao.substring(funcao.indexOf('/')+1,funcao.length);
//		denominador nao pode ser 0
		var entradas = denom.split(reg);
		if (verificaNum(denom)=='primeiro'){ //funcao do primeiro grau
			a = calcularValorA(entradas);
			b = calcularValorB(entradas);
			calcDominioTipo3(a,b);
			
		}
		
	}else if(tipo == 4){
		var num = funcao.substring(0,funcao.indexOf('/'));
		num = funcao.substring(5,num.length-1);
		var denom = funcao.substring(funcao.indexOf('/')+1,funcao.length);
		var entradas1 = num.split(reg);
		var entradas2 = denom.split(reg);
		
		//calcular denominador
		if (verificaNum(denom)=='primeiro'){ //denom do primeiro grau
			a = calcularValorA(entradas1); //sem x numerador
			b = calcularValorB(entradas1); //com x numerador
			c = calcularValorA(entradas2); //sem x denom
			d = calcularValorB(entradas2); //com x denom		
			calcDominioTipo4(a,b,c,d);
		}
		
	}else if(tipo == 5){
		
	}else{
		
	}
		
		
		
			
			
			
			
}	
	
	
	
function calcularValorA(entradas) {
	var totalA=0;
	for(var i = 0 ; i < entradas.length ; i++){			
		if(entradas[i].match(/^[0-9]+$/)){				
			var valor = parseFloat(entradas[i]);
			var operador='';
			if(i==0){
				operador="+";
			}else{
                operador=entradas[i-1];
			}
			if(operador=="+"){
            	totalA+=valor;
            }else{
            	totalA-=valor;
            }
		}
	}
	return totalA;
}	
	
function calcularValorB(entradas) {  //4x
	var totalB=0;
	for(var i = 0 ; i < entradas.length ; i++){
		
		if(entradas[i].match(/^[0-9]*x$/)){
			alert("entrou no b "+entradas[i]);
			var valor = 0;
			var operador='';
			if(entradas[i].match(/^x$/)){
				valor=1;	
			}else{
				if(entradas[i].match(/^x/)){
					valor = parseFloat(entradas[i].split('x')[1]);
				}else{
					valor = parseFloat(entradas[i].split('x')[0]);
				}
			}
			if(i==0){
				operador="+";
			}else{
                operador=entradas[i-1];
			}
			if(operador=="+"){
            	totalB+=valor;
            }else{
            	totalB-=valor;
            }
		}
	}return totalB;
}
	
function calcularValorC(entradas) {  //x² ou x^2
	var totalC=0;
	for(var i = 0 ; i < entradas.length ; i++){
		if(entradas[i].match(/^x\^2|[0-9]x\^2$/)){
			alert("x² zzzz "+entradas[i]);
			var valor = 0;
			var operador='';
			if(entradas[i].match(/^x\^2$/)){   //5x\^2
				valor=1;	
			}else{//2x²
				if(entradas[i].match(/^x\^2/)){
					valor = parseFloat(entradas[i].split('x')[1]);
				}else{
					valor = parseFloat(entradas[i].split('x')[0]);
				}
			}
			if(i==0){
				operador="+";
			}else{
                operador=entradas[i-1];
			}
			if(operador=="+"){
				totalC+=valor;
            }else{
            	totalC-=valor;
            }
		}
	}return totalC;
}
	
////	calcula munerador
//		if(!raiz){
//			alert("numerador sem raiz");
//
//		}else{
//			alert("numerador com raiz");
//			funcaoCima = funcao.substring(0,funcao.indexOf('/'));
////			verifica(funcaoCima);
//			alert(funcaoCima);
//			if(funcaoCima.match(/^raiz\(.*\)$/)){ //raiz total
//				//calcular valor, se for negativo, nao tem dominio
//				num = funcaoCima.substring(5,funcaoCima.length-1);
//			
//				if (verificaNum(num)=="primeiro"){
//					var reg= new RegExp(/(\+|-|\/)/);
//					
//					
//					calculaA(num.split(reg));
//			//nao ta entrando akiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
//					
//				
//				
//				}
//				
//				
//				
//
//			}else{
//				//raiz nao total rai()+raiz()
//			}
//		}
//		
//		alert("calculou numerador");
//		
		
		
//		
//	if(condicao){
//		//tem denominador
//		var inicio = funcao.indexOf('/')+1;
//		var fim = funcao.length;
//		var denominador = funcao.substring(inicio,fim);
//		verifica(denominador);
//	}
//	
//	calcX(funcao);
	
	



function verificaNum(numerador){
	if(numerador.includes("x^2") || numerador.includes("x²") || numerador.includes("2*x")){
		return "segundo";
	}else if(numerador.match(/^\ *(\+|\-)?\ *[0-9]*\ *x*[0-9]*\ */)){
		return "primeiro";
	}
	
	
}

function calcDominioTipo2(a,b){
	var num = (a/b)*-1;
	alert( "D(f) = {x ∈ |R / x ≥ "+num+"}" );
}

function calcDominioTipo3(a,b){
	var num = (a/b)*-1;
	alert( "D(f) = {x ∈ |R / x ≠ "+num+"}" );
}

function calcDominioTipo4(a,b,c,d){
	var denom = (c/d)*-1;
	var num = (a/b)*-1;
	alert( "D(f) = {x ∈ |R / x ≥ "+num+" e x ≠ "+denom+"}" );
}






function verifica(denominador){
	if(denominador.includes("x^3") || denominador.includes("x³") || denominador.includes("3*x") ){
		alert("terceiro grau")
	}else if(denominador.includes("x^2") || denominador.includes("x²") || denominador.includes("2*x") ){
			alert("segundo grau");
	}else if(denominador.match(/^\ *(\+|\-)?\ *[0-9]*\ *x*[0-9]*\ */)){
		alert("primeiro grau");
		//aceitar x+4, +x+4, -x+4, 4+x, +4+x, -4+x, 1x+4, +1x+4, -1x+4, 4+1x, -4+1x, 4+x1, -4+x1
		//aceitar raíz o radicando nao pode ser negativo
		grau1(denominador);
}

function calculaA(entradas){
	//Calcular totalA 1º grau
	alert("lalalalalal?");
	alert(entradas);
	var totalA=0;
	for(var i = 0 ; i < entradas.length ; i++){			
		if(entradas[i].match(/^[0-9]+$/)){				
			var valor = parseFloat(entradas[i]);
			var operador='';
			if(i==0){
				operador="+";
			}else{
                operador=entradas[i-1];
			}
			if(operador=="+"){
            	totalA+=valor;
            }else{
            	totalA-=valor;
            }
		}
	}
	return totalA;
}	
	
function calculaB(entradas){
//	Calcular totalB 1º grau
	alert("lalalal");

	var totalB=0;
	for(var i = 0 ; i < entradas.length ; i++){
		if(entradas[i].match(/^x[0-9]*|[0-9]+x$/)){
			var valor = 0;
			var operador='';
			if(entradas[i].match(/^x$/)){
				valor=1;	
			}else{
				if(entradas[i].match(/^x/)){
					valor = parseFloat(entradas[i].split('x')[1]);
				}else{
					valor = parseFloat(entradas[i].split('x')[0]);
				}
			}
			if(i==0){
				operador="+";
			}else{
                operador=entradas[i-1];
			}
			if(operador=="+"){
            	totalB+=valor;
            }else{
            	totalB-=valor;
            }
		}
	}return totalB;
}




function calcDominio(a,b){
	//Calcular domínio
	var num = (a/b)*-1;
	alert( "D(f) = {x ∈ |R / x ≠ "+num+"}" );
}

function calcDominioRaiz(a,b){
	//Calcular domínio
	var num = (a/b)*-1;
	
	alert( "D(f) = {x ∈ |R / x ≥ "+num+"}" );
}

function grau1(denominador){
		var reg= new RegExp(/(\+|-|\/)/);
		var raiz = denominador.includes("raiz");
		
		if(raiz==true){
			denominador = calculoRaizTotalDenominador(denominador);
		}
		
		var a = calculaA(denominador.split(reg));
		var b = calculaB(denominador.split(reg));
		
		if(raiz){
			calcDominioRaiz(a,b);
		}else{
			calcDominio(a,b);
		}
		
		
	}	
}

function calculoRaizTotalDenominador(denominador){
	var entradas = denominador.replace('raiz(', "");
	return entradas.replace(')',"");
}


















