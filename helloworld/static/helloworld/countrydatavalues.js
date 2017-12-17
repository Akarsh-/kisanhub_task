//this is pure js model
// country value is main class for all types of values, example tempmax, tempmin etc
//every country has these
function CountryValues()
{
	this.lstMonths = [];
	this.lstValues = [];
	this.bLoaded = false;
	this.bLoading = false;
}
CountryValues.prototype.SetValues = function(lstMonths, lstValues)
{
	this.lstMonths = lstMonths;
	this.lstValues = lstValues;
	this.bLoaded = true;
	this.bLoading = false;
}

CountryValues.prototype.GetValueForYear = function(year)
{
	var nMonthId = (year * 12) + 1;
	lstValue = [];
	
	for(var i = nMonthId; i< nMonthId + 12;i++)
	{
		var index = this.lstMonths.indexOf(i);		
		if(index == -1)
			return [];
		lstValue.push(parseFloat(this.lstValues[index]));
	}
	
	return lstValue;
}

CountryValues.prototype.GetValuesBetweenYear = function(startYear, endYear)
{
	var nStartMonthId = (startYear * 12) + 1;
	var nEndMonthId = (endYear * 12) + 1 + 12;
	
	var lstValue = [];
	for(var i = nStartMonthId; i< nEndMonthId; i+= 12)
	{
		var index = this.lstMonths.indexOf(i);
		if(index == -1)
		{
			lstValue.push(0);
		}
		else
		{
			var nValue = 0;
			for(var j =index; j<index + 12;j++)
			{
				nValue += parseFloat(this.lstValues[j]);
			}
			lstValue.push(nValue);
		}
	}
	return lstValue;
}

CountryValues.prototype.GetSeasonValueForYear = function(year)
{
	var nMonthId = (year * 12) + 1 - 1;
	lstValue = [];
	
	for(var i = nMonthId ; i< nMonthId + 12;i+=3)
	{
		var index = this.lstMonths.indexOf(i);		
		if(index == -1)
			return [];
		var seaon = parseFloat(this.lstValues[index]) + 
			parseFloat(this.lstValues[index + 1]) + parseFloat(this.lstValues[index + 2]);
			
		lstValue.push(parseFloat(seaon).toFixed(2));
	}
	
	return lstValue;
}


//this is class for sunshine values, it is extended from countryvalues
//this i sused to store sunshine data for country
function SunshineValues()
{
	CountryValues.call(this);
}

SunshineValues.prototype.GetValueForYear = function(year)
{
	return CountryValues.prototype.GetValueForYear.call(this, year);
}

SunshineValues.prototype.SetValues = function(lstMonths, lstValues)
{
	CountryValues.prototype.SetValues.call(this, lstMonths, lstValues);
}

SunshineValues.prototype.GetSeasonValueForYear = function(year)
{
	return CountryValues.prototype.GetSeasonValueForYear.call(this, year)
}

SunshineValues.prototype.GetValuesBetweenYear = function(startYear, endYear)
{
	return CountryValues.prototype.GetValuesBetweenYear.call(this, startYear, endYear);
}

//this is class for sunshine values, it is extended from countryvalues
//this is used to store rainfall data for country
function RainfallValues()
{
	CountryValues.call(this);
}

RainfallValues.prototype.GetValueForYear = function(year)
{
	return CountryValues.prototype.GetValueForYear.call(this, year);
}

RainfallValues.prototype.SetValues = function(lstMonths, lstValues)
{
	CountryValues.prototype.SetValues.call(this, lstMonths, lstValues);
}

RainfallValues.prototype.GetSeasonValueForYear = function(year)
{
	return CountryValues.prototype.GetSeasonValueForYear.call(this, year)
}

RainfallValues.prototype.GetValuesBetweenYear = function(startYear, endYear)
{
	return CountryValues.prototype.GetValuesBetweenYear.call(this, startYear, endYear);
}


//this is class for sunshine values, it is extended from countryvalues
//this i sused to store maximum temprature data for country
function TempMaxValues()
{
	CountryValues.call(this);
}

TempMaxValues.prototype.SetValues = function(lstMonths, lstValues)
{
	CountryValues.prototype.SetValues.call(this, lstMonths, lstValues);
}

TempMaxValues.prototype.GetValueForYear = function(year)
{
	return CountryValues.prototype.GetValueForYear.call(this, year);
}

TempMaxValues.prototype.GetValuesBetweenYear = function(startYear, endYear)
{
	var lstValue = CountryValues.prototype.GetValuesBetweenYear.call(this, startYear, endYear);
	
	for(var i =0; i< lstValue.length; i++)
	{
		lstValue[i] = (lstValue[i]/12).toFixed(2);
	}
	
	return lstValue;
}

//this is class for sunshine values, it is extended from countryvalues
//this is used to store minimum temprature data for country
function TempMinValues()
{
	CountryValues.call(this);
}

TempMinValues.prototype.SetValues = function(lstMonths, lstValues)
{
	CountryValues.prototype.SetValues.call(this, lstMonths, lstValues);
}

TempMinValues.prototype.GetValueForYear = function(year)
{
	return CountryValues.prototype.GetValueForYear.call(this, year);
}

TempMinValues.prototype.GetValuesBetweenYear = function(startYear, endYear)
{
	var lstValue = CountryValues.prototype.GetValuesBetweenYear.call(this, startYear, endYear);
	
	
	for(var i =0; i< lstValue.length; i++)
	{
		lstValue[i] = (lstValue[i]/12).toFixed(2);
	}
	
	return lstValue;
}

//this is class for sunshine values, it is extended from countryvalues
//this is used to store mean temprature data for country
function TempMeanValues()
{
	CountryValues.call(this);
}

TempMeanValues.prototype.SetValues = function(lstMonths, lstValues)
{
	CountryValues.prototype.SetValues.call(this, lstMonths, lstValues);
}

TempMeanValues.prototype.GetValueForYear = function(year)
{
	return CountryValues.prototype.GetValueForYear.call(this, year);
}

TempMeanValues.prototype.GetValuesBetweenYear = function(startYear, endYear)
{
	var lstValue = CountryValues.prototype.GetValuesBetweenYear.call(this, startYear, endYear);
	
	
	for(var i =0; i< lstValue.length; i++)
	{
		lstValue[i] = (lstValue[i]/12).toFixed(2);
	}
	
	return lstValue;
}
