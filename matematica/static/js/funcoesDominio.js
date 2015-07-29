var mensagem = ''
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

	
function esconder(){
	//esconder botões
	for (var i = 3; i <= 9; i++) {
	    var variavel = '#ajuda'+ i;
	    $(variavel).toggle();
	    var resp = i-2;
	    $('#resp'+resp).toggle();  
	    $('#botao'+resp).toggle();
	    $('#desistir'+resp).toggle();
	}
}	
	

$(document).ready(function(){

	esconder();

    $('#botaoEnviarFuncao').click(function(){
    	
    	var url = $(this).data('url')
    	var token = $(this).data('token')
    	enviarDado('#funcao','#intervalo',url, token);
    	$('#botao1').show();
    	$('#desistir1').show();
    	$("#itr_X").prop('readOnly',false).focus();
    	$("#ajuda3").show();
    });
    
    
    $('.btn-func').click(function(){
    	var id = $(this).attr('id');
    	var valor = $(this).prev().val();

    	if (id != 'botaoEnviarFuncao'){
    		alert(valor)	
    	}	
    });
    
    
    $('.btn-des').click(function(){
    	var resp = '';
    	var id = $(this).attr('id');
    	var anterior = $(this).prev().prev().val();
    	var cAnterior = $(this).prev().prev();
    	var cProx = '';
    	var num = 0;
    	
    	if (id == 'desistir1'){
    		resp = $.parseJSON(mensagem).IntersecX;
    		cProx = '#botao2';
    		num = 4;
    			
    	}else if (id == 'desistir2'){
    		resp = $.parseJSON(mensagem).IntersecY;
    		cProx = '#botao3';
    		num = 5;	
    			
    	}else if (id == 'desistir3'){
    		resp = $.parseJSON(mensagem).ptnCritico;
    		cProx = '#botao4';
    		num = 6;	
    		
    	}else if (id == 'desistir4'){
    		resp = $.parseJSON(mensagem).max;
    		cProx = '#botao5';
    		num = 7;	
    		
    	}else if (id == 'desistir5'){
    		resp = $.parseJSON(mensagem).min;
    		cProx = '#botao6';
    		num = 8;
    		
    	}
    	ant = num-1;
    	$('#ajuda'+ant).toggle();
    	$('#ajuda'+num).show();
    	$(cAnterior).val(resp);
    	$(cAnterior).attr("disabled", true);
    	$(this).toggle();	
		$(this).prev().toggle();

		$(cProx).show();
		$(cProx).next().show();

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
            				mensagem = msg
                           alert('IntersecX '+ $.parseJSON(msg).IntersecX + '\nIntersecY '+ $.parseJSON(msg).IntersecY
                        		   + '\nPontos criticos '+$.parseJSON(msg).ptnCritico
                        		   + '\nPonto max '+$.parseJSON(msg).max
                        		   + '\nPonto min '+$.parseJSON(msg).min
                        		   );
                         
                        });

            $request.fail(function( jqXHR, textStatus ) {
                            console.log('falha');
        });



 

}