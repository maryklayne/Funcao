var mensagem = ''


function esconder(){
	//esconder botões
	for (var i = 3; i <= 12; i++) {
	    var variavel = '#ajuda'+ i;
	    $(variavel).toggle();
	    var resp = i-2;
	    $('#resp'+resp).toggle();  
	    $('#botao'+resp).toggle();
	    $('#desistir'+resp).toggle();
		//$('#campo'+resp).prop('readOnly',false);
	}
}	
	

$(document).ready(function(){
	id = ''
	esconder();

    $('#botaoEnviarFuncao').click(function(){

    	var url = $(this).data('url')
    	var token = $(this).data('token')
    	enviarDado('#funcao','#intervalo',url, token);
    	$('#botao1').show();
    	$('#desistir1').show();
    	$("#campo3").prop('disabled',false).focus();
    	$("#ajuda3").show();
    });
    
    //x**3-3*x**2-9*x+7
//	IntersecX (1 + (-1/2 - sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3) + 4/((-1/2 - sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3)), 1 + 4/((-1/2 + sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3)) + (-1/2 + sqrt(3)*I/2)*(2 + 2*sqrt(15)*I)**(1/3), 1 + 4/(2 + 2*sqrt(15)*I)**(1/3) + (2 + 2*sqrt(15)*I)**(1/3))
//IntersecY (0.0, 7.0)
//Pontos criticos (-1, 12), (3, -20)
//Ponto max (-1, -12)
//Ponto min (3, 12)
//Ponto infl (1, -4)



    $('.btn-func').click(function(){
    	id = $(this).attr('id');
    	var valor = $(this).prev().val();

    	if (id == 'botao1'){
			if (valor==$.parseJSON(mensagem).IntersecX) {
				$(this).prev().attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();

				//proximo
				$('#ajuda4').show();
				$('#botao2').next().show();
				$('#botao2').show();
				$('#botao2').prev().attr('disabled',false);
			}
    	}else if (id == 'botao2'){
			if (valor==$.parseJSON(mensagem).IntersecY) {
				$(this).prev().attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();

				//proximo
				$('#ajuda5').show();
				$('#botao3').next().show();
				$('#botao3').show();
				$('#botao3').prev().attr('disabled',false);
			}
    	}else if (id == 'botao3') {
			if (valor == $.parseJSON(mensagem).ptnCritico) {
				$(this).prev().attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();

				//proximo
				$('#ajuda6').show();
				$('#botao4').next().show();
				$('#botao4').show();
				$('#botao4').prev().attr('disabled', false);
			}
		}else if (id == 'botao4') {
			if (valor == $.parseJSON(mensagem).max) {
				$(this).prev().attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();

				//proximo
				$('#ajuda7').show();
				$('#botao5').next().show();
				$('#botao5').show();
				$('#botao5').prev().attr('disabled', false);
			}
		}else if (id == 'botao5') {
			if (valor == $.parseJSON(mensagem).min) {
				$(this).prev().attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();

				//proximo
				$('#ajuda8').show();
				$('#botao6').next().show();
				$('#botao6').show();
				$('#botao6').prev().attr('disabled', false);
			}
		}else if (id == 'botao6') {
			if (valor == $.parseJSON(mensagem).pontInfl) {
				$(this).prev().attr("disabled", true);
				$(this).toggle();
				$(this).next().toggle();
				$(this).prev().prev().toggle();

				//proximo
				$('#ajuda9').show();
				$('#botao7').next().show();
				$('#botao7').show();
				$('#botao7').prev().attr('disabled', false);
			}
		}





    });





    $('.btn-des').click(function(){
    	var resp = '';
    	id = $(this).attr('id');
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

    	}else if (id == 'desistir3') {
			resp = $.parseJSON(mensagem).ptnCritico;
			cProx = '#botao4';
			num = 6;

    	}else if (id == 'desistir4') {
			resp = $.parseJSON(mensagem).max;
			cProx = '#botao5';
			num = 7;

    	}else if (id == 'desistir5'){
    		resp = $.parseJSON(mensagem).min;
    		cProx = '#botao6';
    		num = 8;

    	}else if (id == 'desistir6'){
    		resp = $.parseJSON(mensagem).pontInfl;
    		cProx = '#botao7';
    		num = 9;

    	}else if (id == 'desistir7'){
    		resp = $.parseJSON(mensagem).pontInfl;
    		cProx = '#botao8';
    		num = 10;

    	}else if (id == 'desistir8'){
    		resp = $.parseJSON(mensagem).pontInfl;
    		cProx = '#botao9';
    		num = 11;

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
							       + '\nPonto infl '+$.parseJSON(msg).pontInfl
                        		   );
                         
                        });

            $request.fail(function( jqXHR, textStatus ) {
                            console.log('falha');
        });



 

}