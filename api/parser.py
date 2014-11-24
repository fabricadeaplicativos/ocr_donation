#!/usr/bin/python
import sys
#import the regex module
import re

def getCNPJ(string):
	results = re.findall('\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}', string)
	return results

def getCOO(string):
	results = re.findall(' \d{6}$', string)
	return results

def getTotal(string):
	results = re.findall('\$ \d+[\.,]\d{2}', string)
	return results

def getDate(string):
	results = re.findall('\d{2}[^\d]\d{2}[^\d]\d{4}[^\d]\d{2}[^\d]\d{2}', string)
	return results;
	
def appendResults(list1, list2):
	for item in list2:
		list1.append(item.strip())

if __name__ == '__main__':
	cnpj  = []
	coo   = []
	total = []
	date  = []
	try:
		while True:
			string = raw_input()
			# print string
			appendResults(cnpj, getCNPJ(string))
			appendResults(coo, getCOO(string))
			appendResults(total, getTotal(string))
			appendResults(date, getDate(string))
	except EOFError:
		pass
	finally:
		print cnpj
		print coo
		print total
		print date