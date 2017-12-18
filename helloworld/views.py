from django.shortcuts import render
from django.views.generic import ListView
from helloworld.models import Country
from helloworld.models import CountryDataValue
from helloworld.models import CountriesTempMaxValue
from helloworld.models import CountriesTempMinValue
from helloworld.models import CountriesTempMeanValue
from helloworld.models import CountriesSunshineValue
from helloworld.models import CountriesRainfallValue

from django.http import JsonResponse
from django.db import transaction
import urllib.request
from urllib.request import Request, urlopen
import re
#from django.http import HttpResponse

#get countries list
def GetCountries(request):
	lstCountries = []
	lstCountriesIds = []
	
	countries = Country.objects.all()
	for country in countries:
		lstCountries.append(country.name)
		lstCountriesIds.append(country.id)
	
	lstCountDatanames = CountryDataValue.objects.all()
	lstCountDatanames_formatted = []
	for value in lstCountDatanames:
		lstCountDatanames_formatted.append(value.name)
		
	data = {};
	data['lstCountDatanames_formatted'] = lstCountDatanames_formatted;
	data['lstCountries_formatted'] = lstCountries;
	data['lstCountriesIds'] = lstCountriesIds;
	
	return JsonResponse(data)
	
#returns main view	
def TableView(request) :
	return render(request, 'helloworld/home.html', {})

#returns Q2 view
def ChartView(request) :
		return render(request, 'helloworld/chart.html', {})

#function to get country maximum temp values based on ID	
def GetTMaxCountryData(request) :

	countryId= request.GET.get('id', None)
	data = {}
	
	oCountry = Country.objects.get(id = countryId)		
	cName = oCountry.name
	cName = re.sub( '\s{1,}', '_', cName )
	strLinkAddress = "http://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/Tmax/date/" + cName + ".txt"
	print(strLinkAddress)
	data = GetModelData(countryId, CountriesTempMaxValue, strLinkAddress, oCountry)	
	
	return JsonResponse(data)
	
#function to get country sunshine values based on ID		
def GetSunshineCountryData(request) :

	countryId= request.GET.get('id', None)
	data = {}
	
	oCountry = Country.objects.get(id = countryId)		
	cName = oCountry.name
	cName = re.sub( '\s{1,}', '_', cName )
	strLinkAddress = "http://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/Sunshine/date/" + cName + ".txt"
	print(strLinkAddress)
	data = GetModelData(countryId, CountriesSunshineValue, strLinkAddress, oCountry)	
	
	return JsonResponse(data)
	
#function to get country rainfall values based on ID		
def GetRainfallCountryData(request) :

	countryId= request.GET.get('id', None)
	data = {}
	
	oCountry = Country.objects.get(id = countryId)		
	cName = oCountry.name
	cName = re.sub( '\s{1,}', '_', cName )
	strLinkAddress = "http://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/Rainfall/date/" + cName + ".txt"
	print(strLinkAddress)
	data = GetModelData(countryId, CountriesRainfallValue, strLinkAddress, oCountry)	
	
	return JsonResponse(data)

#function to get country minimum temp values based on ID		
def GetTMinCountryData(request) :

	countryId= request.GET.get('id', None)
	oCountry = Country.objects.get(id = countryId)		
	
	cName = oCountry.name
	cName = re.sub( '\s{1,}', '_', cName )
	strLinkAddress = "http://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/Tmin/date/" + cName + ".txt"
	print(strLinkAddress)
	
	data = GetModelData(countryId, CountriesTempMinValue, strLinkAddress, oCountry)	
	return JsonResponse(data)

#function to get country mean temp values based on ID	
def GetTMeanCountryData(request) :

	countryId= request.GET.get('id', None)
	oCountry = Country.objects.get(id = countryId)		
	
	cName = oCountry.name
	cName = re.sub( '\s{1,}', '_', cName )
	strLinkAddress = "http://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/Tmean/date/" + cName + ".txt"
	print(strLinkAddress)
	
	data = GetModelData(countryId, CountriesTempMeanValue, strLinkAddress, oCountry)	
	return JsonResponse(data)

#get data , it parses file and do bulk insert at end
def GetModelData(countryId, model, strLinkAddress, oCountry):
	result = model.objects.filter(uCountryId = countryId)
	lstMonths = []
	lstTemp = []
	for value in result:
		lstMonths.append(value.uMonthId)
		lstTemp.append(value.uValue)
		
	if len(lstMonths) == 0:
		
		lines = GetFileLines(strLinkAddress)
		
		insertData = [];
		dicValues = ParseData(lines)
		lstMonths = dicValues['lstMonths']
		lstTemp = dicValues['lstValue']
				
		for i in range(len(lstMonths)):
			tMaxVal = model(uMonthId=lstMonths[i], uValue=lstTemp[i], uCountryId=oCountry)
			insertData.append(tMaxVal)
			
		model.objects.bulk_create(insertData)
	data = {}
	data['lstMonths'] = lstMonths;	
	data['lstValue'] = lstTemp;	
	return data
	
#read files	
def GetFileLines(strLinkAddress):
	url_request = Request(strLinkAddress, 
                      headers = {"User-Agent": "Mozilla/5.0"})
	file = urlopen(url_request)
	lines = file.readlines()
	file.close()
	
	return lines

#parse file
def ParseData(lines):
	lstMonths = []
	lstValue = []
	bReadLine = False
	bSkip = False
	for line in lines:
		line = line.strip()
		strLine = line.decode('utf-8')
		strList = re.sub( '\s{2,6}', ' ', strLine )
		if bReadLine:
			strList = strList.split(" ")
			month_index = 1;
			nYearVal = 0;
			for i in range(len(strList)):
				if strList[i].lower() == "year":
					bSkip = True;
				if bSkip:
					continue
				if i == 0:
					nYearVal = int(strList[i]);
				elif i < 13:
					nMonthId = nYearVal * 12 + month_index
					month_index += 1
					nMonthVal = 0;
					try :
						nMonthVal = float(strList[i])
					except ValueError:
						print (nMonthId)
					
					lstMonths.append(nMonthId)
					lstValue.append(nMonthVal)
					
			if bSkip:
				bSkip = False
				continue
				
		if strLine == "":
			bReadLine = True
	
	retData = {'lstMonths': lstMonths, 'lstValue':lstValue}
	return retData
	

def ClearDB(request):
	print("clear db called")
	CountriesTempMaxValue.objects.all().delete()
	CountriesTempMinValue.objects.all().delete()
	CountriesTempMeanValue.objects.all().delete()
	CountriesRainfallValue.objects.all().delete()
	CountriesSunshineValue.objects.all().delete()
	data = {}
	data["bSuccessfull"] = True;
	return JsonResponse(data)
