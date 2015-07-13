//function enviarFuncao(valor){
//	if (valor=="botaoDominio"){
//		$("#itr_X").prop('readOnly',false).focus();
//		$("#botao1").show();
//		$("#ajuda3").show();
//		$("#resp1").show();
//		verificaDominio(document.getElementById("funcao").value);
//	}else if(valor=="botao1"){
//		$("#itr_Y").prop('readOnly',false).focus();
//		$("#botao2").show();
//		$("#ajuda3").toggle();
//		$("#ajuda4").show();
//		$("#resp1").toggle();
//		$("#resp2").show();
//	}else if(valor=="botao2"){
//		$("#pontos_criticos").prop('readOnly',false).focus();
//		$("#botao3").show();
//		$("#ajuda4").toggle();
//		$("#ajuda5").show();
//		$("#resp2").toggle();		
//		$("#resp3").show();
//		
//	}else if(valor=="botao3"){
//		$("#maximo").prop('readOnly',false).focus();
//		$("#botao4").show();
//		$("#ajuda5").toggle();
//		$("#ajuda6").show();
//		$("#resp3").toggle();		
//		$("#resp4").show();	
//		
//	}else if(valor=="botao4"){
//		$("#minimo").prop('readOnly',false).focus();
//		$("#botao5").show();
//		$("#ajuda6").toggle();
//		$("#ajuda7").show();
//		$("#resp4").toggle();		
//		$("#resp5").show();
//	}else if(valor=="botao5"){
//		$("#pontos_de_inflexao").prop('readOnly',false).focus();
//		$("#botao6").show();
//		$("#ajuda7").toggle();
//		$("#ajuda8").show();
//		$("#resp5").toggle();		
//		$("#resp6").show();
//	}else if(valor=="botao6"){
//		$("#concavidade").prop('readOnly',false).focus();
//		$("#botao7").show();
//		$("#ajuda8").toggle();
//		$("#ajuda9").show();
//		$("#resp6").toggle();		
//		$("#resp7").show();
//	}else if(valor=='botao7'){
//		$("#ajuda9").toggle();
//		$("#resp7").toggle();	
//	}
//}


$(document).ready(function(){
	//esconder botões de ajuda
//	for (var i = 3; i <= 9; i++) {
//	    var variavel = '#ajuda'+ i;
//	    $(variavel).toggle();
//	    var resp = i-2;
//	    $('#resp'+resp).toggle();  
//	    $('#botao'+resp).toggle();
//	}
//	
//	$('.campoTxt').keypress(function(event) {
//		var valor = $(this).next().attr('id');
//		if (event.keyCode == '13') {
//			event.preventDefault();
//			enviarFuncao(valor);
//			if(valor != 'label' && valor != "botaoDominio"){
//				$(this).next().show();
//			}
//		}
//	});
	
	
	
    $('#botaoEnviarFuncao').click(function(){
    	var url = $(this).data('url')
    	var token = $(this).data('token')
    	enviarDado('#funcao','#intervalo',url, token);
    	
    });
});


function enviarDado(id_txt, id_txt2, url, token){
      
            var texto = $(id_txt).val();
            var texto2 = $(id_txt2).val();


            var $request=$.ajax({
				    method: "POST",
				    url: url,
				    data: {csrfmiddlewaretoken:token,funcao:texto, intervalo:texto2},
                    mimeType:"JSON"
			});

            $request.success(function (msg) {
            				
                           alert($.parseJSON(msg).limite);
                        });

            $request.fail(function( jqXHR, textStatus ) {
                            console.log('falha');
        });



 

}