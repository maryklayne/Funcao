vari="";

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


function verificaDominio(funcao){

	if (funcao.includes('/')){
		var inicio = funcao.indexOf('/')+1;
		var fim = funcao.length;
		var denominador = funcao.substring(inicio,fim);
		grau(denominador);
	}else{
		alert("não tem /");
	}
}

function grau(denominador){
	if(denominador.includes("x^3") || denominador.includes("x³") || denominador.includes("3*x") ){
		alert("terceiro grau")
	}else if(denominador.includes("x^2") || denominador.includes("x²") || denominador.includes("2*x") ){
			alert("segundo grau");
	}else if(denominador.match(/^[0-9]x/)||denominador.match(/^x[0-9]*/)){
		alert("primeiro grau");
		
		var reg= new RegExp(/(\+|-|\/)/);
        var entradas = denominador.split(reg);
		var totalA=0;
//		alert(entradas);
		
		
		//Calcular totalA
		for(var i = 0 ; i < entradas.length ; i++){
//			alert(typeof entradas[i] + entradas[i]);
			
			if(entradas[i].match(/^[0-9]+(\.[0-9]+)?$/)){				
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
//		alert('total de a '+totalA);

		
		
		
//		Calcular totalB
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
		}
		
		//Calcular domínio
		alert(totalA);
		alert(totalB);
		var num = (totalA/totalB)*-1;
		alert(num);
		
	}	
}


