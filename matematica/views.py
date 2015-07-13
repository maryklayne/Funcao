# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http.response import HttpResponse
import sympy
import json
import re
from sympy import *


x = Symbol('x')
y = Symbol('y')
z = Symbol('z')
n = Symbol('n')
c = Symbol('c')

def home(request):
    return render(request, 'index.html')


def funcao1(request):  #num/sqrt(deno)+gfdgf
	tipo = 0
	dados = json.dumps({'limite':'1','derivada':'1'})
	campo1 = request.POST["funcao"]
	campo2 = request.POST["intervalo"]
	
#	#if (campo1.count('sqrt')==0): #corrigir isso
#		campo1 = str(ratsimp(campo1)) #deixa a funcao com um unico denominador, ex: (1/x + 1/y) passa a ser (x + y)/(x*y)
#	tipo = escolheTipo(campo1)
#	print calcularDominio(campo1, tipo)


	

	#Definir intervalo de valores de X
	intervalo = calcIntervalo(campo2)


	#IntersecX
	IntersecX(campo1)

	#IntersecY
	IntersecY(campo1)

	#converter de unicode para sympify
	campo1 = sympify(campo1) 
	funcaoUnicode = sympify(campo1) 
	

	#Ponto Crítico
	pontosCritico(campo1, funcaoUnicode, intervalo)


	return HttpResponse(dados, content_type='application/json') #retornar lista



		
		
def IntersecX(funcao):
	res = solve(funcao, x)
	#print res
	#print float(res[0]), 0.0 	
	return res
	
def IntersecY(funcao):
	res = lambdify(x,funcao)
	res = res(0)
	#print res
	# '(', 0.0 ,', float(res[0]) )'		
	return res
	
def calcIntervalo(valor):
	valor = valor.replace('(','')
	valor = valor.replace(')','')
	valor = valor.split(',')
	#print 'Valores para x assumir ', valor[0], ' e ', valor[1]
	return [valor[0],valor[1]]

def calcDerivada(funcao): #Calcula a derivada de uma função 
	return funcao.diff(x)
	
def calcDerivada2(dx): #Calcular as raízes da derivada ou seja, igualar a derivada a 0, exemplo: dy=0
	return sympy.solve(dx, x)	
	
def subResultNaFuncao(funcaoUnicode, resultado):
	funcaoUnicode = str(funcaoUnicode)
	i = 0
	temp = ''
	while i < len(funcaoUnicode):
		temp += funcaoUnicode[i].replace('x','c')
		i+=1

	return temp
	
def calcLimitesDaFuncao(resultadoDafuncao, funcaoUnicode, valor):
	funcaoUnicode = str(funcaoUnicode)
	i = 0
	
	print 'fdsfds',(resultadoDafuncao)
	
	temp = ''
	while i < len(funcaoUnicode): #values.append(y.subs(x, range[0]))
		temp += funcaoUnicode[i].replace('x',str(valor[0]))
		i+=1

	return temp


	
def pontosCritico(funcao, funcaoUnicode, inter):
	dx = calcDerivada(funcao)
	resultado = calcDerivada2(dx)
	final = subResultNaFuncao(funcaoUnicode, resultado) #corrigir
	calcLimitesDaFuncao(final, funcao, inter)#corrigir

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

#def escolheTipo(funcao):
#	tipo = 1
#	print 'fc  ',funcao
#	print 'quant ', funcao.count( "sqrt" )
#	print 'asasa ', funcao.find( "sqrt" )
	
	
#	if(temDenominador(str(funcao))):
#		tipo=3
#		lista = funcao.split("/")
#		num = lista[0]
#		deno = lista[1]
#		if(temRaizTotal(num) and temRaizTotal(deno)):
#			return 5
#		elif(temRaizTotal(num)):
#			return 4
#		elif(temRaizTotal(deno)):
#			return 6	 
#		return 3
#	if(temRaizTotal(funcao)):
#		return 2
#	else:
#		return tipo	
	

#def temDenominador(funcao): #verificar se tem denominador
#	if(funcao.count("/")==0):
#		return false
#	return true
	
#def temRaizTotal(funcao): #verifica se tem raiz em todo denominador
#	if(funcao.count( "sqrt" )==1): #corrigir esta funcao   #re.compile e findAll
#		return true
#	return false
	
	
#def tipoDaFuncao(tipo):
#	if (tipo==1):
#		print "numerador"
#	if (tipo==2):
#		print "numerador raiz"
#	if (tipo==3):
#		print "numerador e denominador"
#	if (tipo==4):
#		print "numerador raiz e denominador"
#	if (tipo==5):
#		print "numerador raiz e denominador raiz"
#	if (tipo==6):
#		print "numerador e denominador raiz"
	
#def calcularDominio(funcao, tipo):
#	if (tipo==1):
#		return "todos os reais"
#	elif (tipo==2):
#		funcao = sympify(funcao[5:-1])
#		res = reduce_inequalities(S(0) <= funcao, [x])  #calcula a inequação
#		return "D(f) = {x ∈ |R /", res, "}"
#	elif (tipo==3):
		#print 'noemal ',funcao
		#funcao = funcao.split("/")
		#funcao = sympify(lista[1])
		#print 'lists1 ' ,funcao
		#return reduce_inequalities(S(0) ≠ lista, [x])  #calcula a inequação
			
#	if (tipo==4):
#		print "numerador raiz e denominador"
#	if (tipo==5):
#		print "numerador raiz e denominador raiz"
#	if (tipo==6):
#		print "numerador e denominador raiz"	
	