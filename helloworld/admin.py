from django.contrib import admin
from helloworld.models import Country
from helloworld.models import CountryDataValue
from helloworld.models import CountriesTempMaxValue
from helloworld.models import CountriesTempMinValue
from helloworld.models import CountriesTempMeanValue
from helloworld.models import CountriesSunshineValue
from helloworld.models import CountriesRainfallValue

admin.site.register(Country)
admin.site.register(CountryDataValue)
admin.site.register(CountriesTempMaxValue)
admin.site.register(CountriesTempMinValue)
admin.site.register(CountriesTempMeanValue)
admin.site.register(CountriesSunshineValue)
admin.site.register(CountriesRainfallValue)

# Register your models here.
