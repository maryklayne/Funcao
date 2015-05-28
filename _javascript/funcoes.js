vari="";

function enviarFuncao(valor){
	if (valor=="botaoDominio"){
		
		$("#itr_X").prop('readOnly',false).focus();
		$("#botaoItrX").prop('disabled',false);
		$("#ajuda3").show();
		$("#resp1").show();

	}else if(valor=="botaoItrX"){
		$("#itr_Y").prop('readOnly',false).focus();
		$("#botaoItrY").prop('disabled',false);
		$("#ajuda3").toggle();
		$("#ajuda4").show();
		$("#resp1").toggle();
		$("#resp2").show();
	}else if(valor=="botaoItrY"){
		$("#pontos_criticos").prop('readOnly',false).focus();
		$("#botaoPontoCritico").prop('disabled',false);
		$("#ajuda4").toggle();
		$("#ajuda5").show();
		$("#resp2").toggle();		
		$("#resp3").show();
		
	}else if(valor=="botaoPontoCritico"){
		$("#maximo").prop('readOnly',false).focus();
		$("#botaoMaximo").prop('disabled',false);
		$("#ajuda5").toggle();
		$("#ajuda6").show();
		$("#resp3").toggle();		
		$("#resp4").show();	
		
	}else if(valor=="botaoMaximo"){
		$("#minimo").prop('readOnly',false).focus();
		$("#botaoMinimo").prop('disabled',false);
		$("#ajuda6").toggle();
		$("#ajuda7").show();
		$("#resp4").toggle();		
		$("#resp5").show();
	}else if(valor=="botaoMinimo"){
		$("#pontos_de_inflexao").prop('readOnly',false).focus();
		$("#botaoPtInflexao").prop('disabled',false);
		$("#ajuda7").toggle();
		$("#ajuda8").show();
		$("#resp5").toggle();		
		$("#resp6").show();
	}else if(valor=="botaoPtInflexao"){
		$("#concavidade").prop('readOnly',false).focus();
		$("#botaoConcavidade").prop('disabled',false);
		$("#ajuda8").toggle();
		$("#ajuda9").show();
		$("#resp6").toggle();		
		$("#resp7").show();

	}else if(valor=='botaoConcavidade'){
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
	    
	}

	$('.campoTxt').keypress(function(event) {
		var valor = $(this).next().attr('id');
		if (event.keyCode == '13') {
			event.preventDefault();
			enviarFuncao(valor);
			if(valor != 'label' && valor != "botaoDominio"){
				$(this).next().hide(1000);
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



