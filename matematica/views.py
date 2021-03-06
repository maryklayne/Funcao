# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http.response import HttpResponse
from matematica.exception import erroFuncaoException
import sympy
import json
import re
from sympy import *
from sympy.logic.algorithms.dpll import find_unit_clause
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


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

	campo1 = request.POST["funcao"]
	campo2 = request.POST["intervalo"]
	campo1 = reoganiza(campo1)

	try:
		grau = identificarGrau(campo1)
		print 'xxxxx ',campo1
		inter = calcularIntervalo(campo2)
	except erroFuncaoException as dados:
		print dados.message
		return HttpResponse(dados.message,status=403)

	if grau == 'segundo grau':
		discriminant = calcDelta(campo1)
		r = calcRaizes(campo1, discriminant)
		v = calcConcavidade(campo1,discriminant)
		print 'raiz ',r,' concavidade ',v,'delta ',discriminant

		retorno = json.dumps({'grau':grau,'delta':str(discriminant),'raizes':r, 'vertice':str(v)})

		print 'enviar2'
		return HttpResponse(retorno, content_type='application/json')


# 	#if (campo1.count('sqrt')==0): #corrigir isso
# 	#campo1 = str(ratsimp(campo1)) #deixa a funcao com um unico denominador, ex: (1/x + 1/y) passa a ser (x + y)/(x*y)
#
# 	tipo = escolheTipo(campo1)
#
# 	#Calcular Dominio
# #	print calcularDominio(campo1, tipo)
#
# 	#Definir intervalo de valores de X
# 	intervalo = calcIntervalo(campo2)
#
# 	#IntersecX
# 	intx = IntersecX(campo1)
#
# 	#IntersecY
# 	inty = IntersecY(campo1)
#
# 	#converter de unicode para sympify
# 	campo1 = sympify(campo1)
# 	funcaoUnicode = sympify(campo1)
#
# 	#Pontos Crítico
# 	raizesDaDerivada = str(pontosCritico(campo1, funcaoUnicode))
#
# 	#Maximo e Minimo
# 	maxAndMin = ptMaxAndMin(campo1,intervalo)
#
# 	#Pont de Inflexao
# 	pontInflx = pontInflexao(campo1)

	# dados = json.dumps({'IntersecX':str(intx), 'IntersecY':str(inty),
	# 'ptnCritico': raizesDaDerivada[1:-1],'min':str(maxAndMin[0][0]),'max':str(maxAndMin[1][0]), 'pontInfl':str(pontInflx[0])})

	# return HttpResponse(dados, content_type='application/json') #retornar lista

def identificarGrau(funcao):
	f = sympify(funcao)
	f = str(f).replace(' ',"")
	campo1 = sympify(f)

	if f.__contains__('**2') and not(f.__contains__('**3')):
		return 'segundo grau'

def verificaIntervalo(valor1,valor2):
	if valor1<valor2:
		return true
	else:
		return false

def reoganiza(funcao):
	return expand(funcao)


def calcularIntervalo(intervalo):
	try:
		lista = str(intervalo).split(',')
		um = float(lista[0][1:])
		dois = float(lista[1][:-1])

		if (lista[0][0])=='(':
			print 'aberto'
			um = um - 0.01
		elif (lista[0][0])=='[':
			print 'fechado'

		if (lista[1][-1])==')':
			print 'aberto'
			dois = dois - 0.01
		elif (lista[1][-1])==']':
			print 'fechado'
		if (verificaIntervalo(um,dois)):
			return '['+str(um)+','+str(dois)+']'
		else:
			return 'intervalo inválido'
	except:
		raise erroFuncaoException('intervalo invalido')

def calcDelta(funcao):
	delta = discriminant(funcao)
	print 'delta ', delta
	return delta

def calcRaizes(funcao,delt):
	if (delt > 0):
		xis = str(poly(funcao).all_roots())
		xis = xis[1:-1].split(',')
		return "x'="+xis[0]+" e x''="+xis[1]
	elif (delt == 0):
		xis = str(poly(funcao).all_roots())
		xis = xis[1:-1].split(',')
		return "x'="+xis[0]
	else:
		return 'a função não admite raízes reais'


def calcB(funcao):
	lista = list(sympify(funcao).args)
	print lista
	b = '0'
	a = '0'
	c = '0'
	try:
		if str(lista[0])=='x' and float(lista[1]):
			lista = ['x**'+str(lista[1])]
	except:
		print 'entrou'

	print lista
	for i in range(len(lista)):
		varia = str(lista[i])
		print 'var ',varia

		if '-x**2/' in varia:
			a = varia.replace('-x**2','')
			a = '-1'+a
		elif 'x**2/' in varia:
			a = varia.replace('x**2','')
			a = '1'+a
		elif '*x**2' in varia:
			a = varia.replace('*x**2','')
		elif '-x**2' in varia:
			a = '-1'
		elif 'x**2' in varia:
			a = '1'
		elif '*x' in varia:
			b = varia.replace('*x','')
		elif '-x' in varia:
			b = '-1'
		elif 'x' in varia:
			b = '1'
		else:
			c=varia
	print 'a ',a
	print 'b ',b
	print 'c ',c
	return [a,b]

def calcConcavidade(funcao, delt):
	print 'delta ',delt
	a = float(calcB(funcao)[0])
	b = float(calcB(funcao)[1])

	primeiro = round((-1*(b)/(2*a)),2)
	segundo = round((-1*delt/(4*a)),2)
	if primeiro == -0.0:
		primeiro = 0.0
	if segundo == -0.0:
		segundo = 0.0
	return (primeiro,segundo)

def IntersecX(funcao):
	res = solve(funcao, x)

	if len(res)==1:
		try:
			res = round(float(res[0]),2)
		except:
			res=res[0]
		res = (res, 0.0)
		print res
	elif len(res)==2:
		try:
			res1 = round(float(res[0]),2)
			res2 = round(float(res[1]),2)
		except:
			res1 = res[0]
			res2 = res[1]
		res = (res1,res2)
	elif len(res)==3:
		try:
			res1 = round(float(res[0]),2)
			res2 = round(float(res[1]),2)
			res3 = round(float(res[2]),2)
		except:
			res1 = res[0]
			res2 = res[1]
			res3 = res[2]
		res = (res1,res2,res3)
	elif len(res)==0:
		return 'impossivel calcular'
	if res == -0.0:
		res = 0.0
	return res

def IntersecY(funcao):
	res = lambdify(x,funcao)
	print res
	res = round(float(res(0)),2)

	if res == -0.0:
		res = 0.0
	return 0.0,res

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


def calcPont(funcao, lista):
	i=0
	pontosY = lista
	while i < len(lista):
		pontosY[i] = funcao.subs(x,lista[i])
		i=i+1
#	print 'pontos ',  pontosY
	return pontosY

def pontosCritico(funcao, funcaoUnicode):
	dx = calcDerivada(funcao) #1ª derivada
#	print 'funcao ', funcao
#	print 'derivada ', dx
	dx = ratsimp(dx)
	print '1ª derivada de f(x) ',dx
	resultado = calcDerivada2(dx) #1ª derivada = 0
#	final = subResultNaFuncao(funcaoUnicode, resultado) #corrigir
	#calcLimitesDaFuncao(final, funcao, inter)#corrigir
	print '1ª derivada == 0 ', resultado
	eixoY = calcPont(funcao,resultado)
	eixoX = calcDerivada2(dx) #1ª derivada = 0
#	print 'eixoX', eixoX
#	print 'eixoY', eixoY
	retorno = eixoX
	i = 0
	while i < len(eixoX):
		retorno[i] = (eixoX[i],eixoY[i])
		i=i+1
	#print 'retorno ', retorno
	return retorno

def ptMaxAndMin(funcao, intervalo):
	minimos = []
	maximos = []
	psCriticos = []
	dx = calcDerivada(funcao)
	dx2 = calcDerivada(dx)
	print 'segudna derivada ', dx2
	raizes = calcDerivada2(dx) #1ª derivada = 0
	resultado = []

	i = 0
	while i < len(raizes):
		# print 'raize ', raizes
		calc = dx2.subs(x,raizes[i])
		# print 'calc ' ,calc
		lista = [raizes[i],calc]
		# print lista
		resultado.append(lista)
		i=i+1
	#print 'lista dos resultados ',resultado

	#Separar Mins de Maxs e Ptn Criticos
	i=0
	while i <len(resultado):
	#	print resultado[i][0]
		if resultado[i][0]>0:
			minimos.append(tuple(resultado[i]))
		elif resultado[i][0]<0:
			maximos.append(tuple(resultado[i]))
		#else:
		#	psCriticos.append(resultado[i][0])
		i=i+1


	print 'pontos minimos ', minimos
	print 'pontos maximos ', maximos
	#print 'pontos critico ', psCriticos

# 	minimosPar = []
# 	maximosPar = []
# #	psCriticos = []
#
#
# 	#calcularCoordenadasYs
# 	for i in range(len(minimos)):
# 		minimosPar.append((minimos[i], funcao.subs(x,minimos[i])))
#
# 	for i in range(len(maximos)):
# 		maximosPar.append((maximos[i], funcao.subs(x,maximos[i])))

	return [minimos, maximos]

def pontInflexao(funcao):
	resultado = []
	dx = calcDerivada(funcao)
	dx2 = calcDerivada(dx)
	res = solve(dx2,x)

	for i in range(len(res)):
		resultado.append((res[i],funcao.subs(x, res[i])))

	return resultado
#def parOuImpar(funcao):

# def asssintotaV(funcao, dominio):
# 	limE = limit(funcao,x,dominio,'-')
# 	limD = limit(funcao,x,dominio,'+')
# 	if ((limE == oo and limD == -oo) or (limE == -oo and limD == oo))
# 		print 'assintota vertical', # resp (dominio, 0)
# 	print 'sem assintota vertical'

#def asssintotaH(funcao):
#	lim1 = limit(funcao,x,oo)
#	lim2 = limit(funcao,x,-oo)
#	if (lim1 == lim2):
#		print lim1
#	print 'nao existe assintota horizontal'


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

def registrar(request):
    print request.POST
    form=UserCreationForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return HttpResponse('OK')

    return render(request,'cadastro.html',{'form':form})