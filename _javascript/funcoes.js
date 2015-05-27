vari="";

function enviarFuncao(valor){
	if (valor=="botaoDominio"){
		$("#itr_X").prop('readOnly',false);
		$("#botaoItrX").prop('disabled',false);
		$("#ajuda3").show();


		
	}else if(valor=="botaoItrX"){
		$("#itr_Y").prop('readOnly',false);
		$("#botaoItrY").prop('disabled',false);
		$("#ajuda3").toggle();
		$("#ajuda4").show();
	}else if(valor=="botaoItrY"){
		$("#pontos_criticos").prop('readOnly',false);
		$("#botaoPontoCritico").prop('disabled',false);
		$("#ajuda4").toggle();
		$("#ajuda5").show();
	}else if(valor=="botaoPontoCritico"){
		$("#maximo").prop('readOnly',false);
		$("#botaoMaximo").prop('disabled',false);
		$("#ajuda5").toggle();
		$("#ajuda6").show();
	}else if(valor=="botaoMaximo"){
		$("#minimo").prop('readOnly',false);
		$("#botaoMinimo").prop('disabled',false);
		$("#ajuda6").toggle();
		$("#ajuda7").show();
	}else if(valor=="botaoMinimo"){
		$("#pontos_de_inflexao").prop('readOnly',false);
		$("#botaoPtInflexao").prop('disabled',false);
		$("#ajuda7").toggle();
		$("#ajuda8").show();
	}else if(valor=="botaoPtInflexao"){
		$("#concavidade").prop('readOnly',false);
		$("#botaoConcavidade").prop('disabled',false);
		$("#ajuda8").toggle();
		$("#ajuda9").show();
	}
}


$(document).ready(function(){
	//esconder botões de ajuda
	for (var i = 3; i <= 9; i++) {
	    var variavel = '#ajuda'+ i;
	    $(variavel).toggle();
	}

	$('.campoTxt').keypress(function(event) {

		if (event.keyCode == '13') {
			event.preventDefault();  
			alert("eventoEnter");
		}
	});
	
	
	
    $('.btn-func').click(function(){
        enviarFuncao($(this).attr('id'));
        if ($(this).attr('id')!="botaoDominio"){
        	$(this).hide(1000);
    	}
    });

});



