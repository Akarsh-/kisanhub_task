from django.conf.urls import url, include
from django.views.generic import ListView, DetailView
from . import views

urlpatterns = [
	url(r'^$', views.TableView, name='TableView'),
	url(r'^Q2$', views.ChartView, name = 'ChartView'),
	url(r'ajax/gettmaxcountrydata/', views.GetTMaxCountryData, name='GetTMaxCountryData'),
	url(r'ajax/gettmincountrydata/', views.GetTMinCountryData, name='GetTMinCountryData'),
	url(r'ajax/gettmeancountrydata/', views.GetTMeanCountryData, name='GetTMeanCountryData'),
	url(r'ajax/getsunshinecountrydata/', views.GetSunshineCountryData, name='GetSunshineCountryData'),
	url(r'ajax/getrainfallcountrydata/', views.GetRainfallCountryData, name='GetRainfallCountryData'),
	url(r'ajax/cleardb/', views.ClearDB, name='ClearDB'),
	url(r'ajax/getcountry/', views.GetCountries, name='GetCountries'),
			  ]