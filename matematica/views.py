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
k = Symbol('k')
i = Symbol('i')

def home(request):
    return render(request, 'index.html')


def funcao1(request):  #num/sqrt(deno)+gfdgf
	tipo = 0
	dados = json.dumps({'limite':'1','derivada':'1'})
	campo1 = request.POST["funcao"]
	campo2 = request.POST["intervalo"]
	print 'função ',campo1
		
	#if (campo1.count('sqrt')==0): #corrigir isso
	#campo1 = str(ratsimp(campo1)) #deixa a funcao com um unico denominador, ex: (1/x + 1/y) passa a ser (x + y)/(x*y)
	
	tipo = escolheTipo(campo1)
	
	#Calcular Dominio
	#print calcularDominio(campo1, tipo)	

	#Definir intervalo de valores de X
	intervalo = calcIntervalo(campo2)
	print 'intervalo ', intervalo
	
	#IntersecX
	print 'IntersecX ',IntersecX(campo1)

	#IntersecY
	print 'IntersecY ',IntersecY(campo1)

	#converter de unicode para sympify
	campo1 = sympify(campo1) 
	funcaoUnicode = sympify(campo1) 

	#Pontos Crítico
	raizesDaDerivada = pontosCritico(campo1, funcaoUnicode)

	#Maximo e Minimo
	maxAndMin = ptMaxAndMin(campo1, raizesDaDerivada, intervalo)
	print maxAndMin

	return HttpResponse(dados, content_type='application/json') #retornar lista



		
		
def IntersecX(funcao):
	res = solve(funcao, x)
	if len(res)==1:
		res = round(float(res[0]),2)
		res = (res, 0.0)
	elif len(res)==2:
		res1 = round(float(res[0]),2)
		res2 = round(float(res[1]),2)
		res = (res1,res2)
	else:
		print (res)
		res1 = round(float(res[0]),2)
		res2 = round(float(res[1]),2)
		res3 = round(float(res[2]),2)
		res = (res1,res2,res3)	
	return res
	
def IntersecY(funcao):
	res = lambdify(x,funcao)
	res = round(float(res(0)),2)
	return 0.0 , res
	
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
	respostas = [funcaoUnicode.subs(x, c) for c in resultado]
	print 'raízfdfdes ',respostas
	
	return respostas
	
def calcLimitesDaFuncao(resultadoDafuncao, funcaoUnicode, valor):
	funcaoUnicode = str(funcaoUnicode)
	i = 0
	print 'fdsfds',resultadoDafuDncao
	
	temp = ''
	while i < len(funcaoUnicode): #values.append(y.subs(x, range[0]))
		temp += funcaoUnicode[i].replace('x',str(valor[0]))
		i+=1

	return temp

#def parOuImpar(funcao):

#def asssintotaV(funcao, dominio):
#	limE = limit(funcao,x,dominio,'-')
#	limD = limit(funcao,x,dominio,'+')
#	if ((limE == oo and limD == -oo) or (limE == -oo and limD == oo))
#		print 'assintota vertical', # resp (dominio, 0)
#	print 'sem assintota vertical'

#def asssintotaH(funcao):
#	lim1 = limit(funcao,x,oo)
#	lim2 = limit(funcao,x,-oo)
#	if (lim1 == lim2):
#		print lim1
#	print 'nao existe assintota horizontal'
	
def pontosCritico(funcao, funcaoUnicode):
	dx = calcDerivada(funcao) #1ª derivada
	print '1ª derivada de f(x) ',dx
	resultado = calcDerivada2(dx) #1ª derivada = 0 
#	final = subResultNaFuncao(funcaoUnicode, resultado) #corrigir
	#calcLimitesDaFuncao(final, funcao, inter)#corrigir
	print '1ª derivada == 0 ', resultado
	return resultado

def ptMaxAndMin(funcao, resultDa1aDerivada, intervalo):
	resp = []
	i = 0
	while i < len(resultDa1aDerivada):
		funcao = funcao.subs(x, c)
		i+=1
		
	print 'substituir c por valor da derivada == 0 ',funcao
	resp.append(funcao.subs(c, intervalo[0]))
	resp.append(funcao.subs(c, intervalo[1]))
	
	mini = min(resp)
	maxi = max(resp)

	return [mini, maxi] 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
def raiz(funcao):

	funcao = sympify(funcao[5:-1])
	res = reduce_inequalities(S(0) <= funcao, [x])  #calcula a inequação
	print 'res ', res
	#print "D(f) = {x ∈ |R /", res, "}"		
	
		
def calcularDominio(funcao, tipo):
	if (tipo==1):
		return "todos os reais"
	elif (tipo==2):
		return raiz(funcao)
	elif (tipo==3):
		lista = funcao.split("/")
		funcao = sympify(lista[1])
		result = str(reduce_inequalities(S(0) <= funcao, [x]))  #calcula a inequação
		res = result.replace('<=','≠')
		return res		
	elif (tipo==4):
		lista = funcao.split("/")
		funcao1 = sympify(lista[1])
		funcao2 = sympify(lista[2])
		
		#calc numerador
		print raiz(funcao1)
		
#		print "numerador raiz e denominador"
#	if (tipo==5):
#		print "numerador raiz e denominador raiz"
#	if (tipo==6):
#		print "numerador e denominador raiz"
	
	
	
	
	
	
	
	
def temDenominador(funcao): #verificar se tem denominador
	if(funcao.count("/")==0):
		return false
	return true	

def escolheTipo(funcao):
	tipo = 1
	if(temDenominador(str(funcao))):
		tipo=3
		lista = funcao.split("/")
		num = lista[0]
		deno = lista[1]
	#	if(temRaizTotal(num) and temRaizTotal(deno)):
	#		return 5
	#	elif(temRaizTotal(num)):
	#		return 4
	#	elif(temRaizTotal(deno)):
	#		return 6	 
		return 3
	if(temRaizTotal(funcao)):
		return 2
#	else:
#		return tipo	
#	print 'tipo'

	return tipo

	
def temRaizTotal(funcao): #verifica se tem raiz em todo denominador
	if(funcao.count( "sqrt" )==1): #corrigir esta funcao   #re.compile e findAll
		return true
	return false
	
	
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
	
	