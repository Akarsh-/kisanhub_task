from django.db import models

class Country(models.Model):
	name = models.CharField(max_length=200)
	
	def __str__(self):
		return self.name
		
class CountryDataValue(models.Model):
	name = models.CharField(max_length=140)
	
	def __str__(self):
		return self.name
		
class CountriesTempMaxValue(models.Model) :
	uMonthId = models.IntegerField()
	uValue = models.DecimalField(max_digits=6, decimal_places=2)
	uCountryId = models.ForeignKey(Country, on_delete=models.CASCADE)
	
	def __int__(self):
		return self.uValue
		
class CountriesTempMinValue(models.Model) :
	uMonthId = models.IntegerField()
	uValue = models.DecimalField(max_digits=6, decimal_places=2)
	uCountryId = models.ForeignKey(Country, on_delete=models.CASCADE)
	
	def __int__(self):
		return self.uValue
		
class CountriesTempMeanValue(models.Model) :
	uMonthId = models.IntegerField()
	uValue = models.DecimalField(max_digits=6, decimal_places=2)
	uCountryId = models.ForeignKey(Country, on_delete=models.CASCADE)
	
	def __int__(self):
		return self.uValue
		
class CountriesSunshineValue(models.Model) :
	uMonthId = models.IntegerField()
	uValue = models.DecimalField(max_digits=6, decimal_places=2)
	uCountryId = models.ForeignKey(Country, on_delete=models.CASCADE)
	
	def __int__(self):
		return self.uValue
		
class CountriesRainfallValue(models.Model) :
	uMonthId = models.IntegerField()
	uValue = models.DecimalField(max_digits=6, decimal_places=2)
	uCountryId = models.ForeignKey(Country, on_delete=models.CASCADE)
	
	def __int__(self):
		return self.uValue
	
	
		