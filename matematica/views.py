# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http.response import HttpResponse
import json
import re
from sympy import *

x = Symbol('x')
y = Symbol('y')
z = Symbol('z')

def home(request):
    return render(request, 'index.html')


#	if (tipo==1){ alert("numerador");}
#	if (tipo==2){ alert("numerador raiz");}
#	if (tipo==3){ alert("numerador e denominador");}
#	if (tipo==4){ alert("numerador raiz e denominador");}
#	if (tipo==5){ alert("numerador raiz e denominador raiz");}
#	if (tipo==6){ alert("numerador e denominador raiz");}


def funcao1(request):
	tipo = 0
	#dados = json.dumps({'limite':'1','derivada':'1'})
	campo1 = request.POST['funcao']
	
	if (campo1.count('sqrt')==0): #corrigir isso
	
		campo1 = str(ratsimp(campo1)) #deixa a funcao com um unico denominador, ex: (1/x + 1/y) passa a ser (x + y)/(x*y)
	tipo = escolheTipo(campo1)
	print 'tipo', tipo
	
	
	print calcularDominio(campo1, tipo)


	return HttpResponse(dados, content_type='application/json') #retornar lista





def escolheTipo(funcao):
	tipo = 1
	print 'fc  ',funcao
	print 'quant ', funcao.count( "sqrt" )
	print 'asasa ', funcao.find( "sqrt" )
	
	
	if(temDenominador(str(funcao))):
		tipo=3
		lista = funcao.split("/")
		num = lista[0]
		deno = lista[1]
		if(temRaizTotal(num) and temRaizTotal(deno)):
			return 5
		elif(temRaizTotal(num)):
			return 4
		elif(temRaizTotal(deno)):
			return 6	
		return 3
	if(temRaizTotal(funcao)):
		return 2
	else:
		return tipo	
	

def temDenominador(funcao): #verificar se tem denominador
	if(funcao.count("/")==0):
		return false
	return true
	
def temRaizTotal(funcao): #verifica se tem raiz em todo denominador
	if(funcao.count( "sqrt" )==1): #corrigir esta funcao
		return true
	return false
	
	
def tipoDaFuncao(tipo):
	if (tipo==1):
		print "numerador"
	if (tipo==2):
		print "numerador raiz"
	if (tipo==3):
		print "numerador e denominador"
	if (tipo==4):
		print "numerador raiz e denominador"
	if (tipo==5):
		print "numerador raiz e denominador raiz"
	if (tipo==6):
		print "numerador e denominador raiz"
	
def calcularDominio(funcao, tipo):
	if (tipo==1):
		return "todos os reais"
	elif (tipo==2):
		funcao = sympify(funcao[5:-1])
		res = reduce_inequalities(S(0) <= funcao, [x])  #calcula a inequação
		return "D(f) = {x ∈ |R /", res, "}"
	elif (tipo==3):
		print 'noemal ',funcao
		funcao = funcao.split("/")
		#funcao = sympify(lista[1])
		print 'lists1 ' ,funcao
		#return reduce_inequalities(S(0) ≠ lista, [x])  #calcula a inequação
		
		
		
		
#	if (tipo==4):
#		print "numerador raiz e denominador"
#	if (tipo==5):
#		print "numerador raiz e denominador raiz"
#	if (tipo==6):
#		print "numerador e denominador raiz"
		
	
	
	
	
	
	
