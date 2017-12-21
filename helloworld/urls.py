from django.conf.urls import url, include
from django.views.generic import ListView, DetailView
from . import views

urlpatterns = [
	url(r'^$', views.TableView, name='TableView'),
	url(r'^[A-Za-z0-9/]*/Q2$', views.ChartView, name = 'ChartView'),
	url(r'^[A-Za-z0-9/]*ajax/gettmaxcountrydata/$', views.GetTMaxCountryData, name='GetTMaxCountryData'),
	url(r'^[A-Za-z0-9/]*ajax/gettmincountrydata/$', views.GetTMinCountryData, name='GetTMinCountryData'),
	url(r'^[A-Za-z0-9/]*ajax/gettmeancountrydata/$', views.GetTMeanCountryData, name='GetTMeanCountryData'),
	url(r'^[A-Za-z0-9/]*ajax/getsunshinecountrydata/$', views.GetSunshineCountryData, name='GetSunshineCountryData'),
	url(r'^[A-Za-z0-9/]*ajax/getrainfallcountrydata/$', views.GetRainfallCountryData, name='GetRainfallCountryData'),
	url(r'^[A-Za-z0-9/]*ajax/cleardb/$', views.ClearDB, name='ClearDB'),
	url(r'^[A-Za-z0-9/]*ajax/getcountry/$', views.GetCountries, name='GetCountries'),
			  ]