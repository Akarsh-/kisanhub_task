//this is starting class, main view is created here, also ajax function requre to send ajax is here

var lstCountryDataOptions = ["Max Temp", "MinTemp", "Mean Temp", "Sunshine", "Rainfall"];
var DATA_FECTHING_SUCCESSFUL = "data_fectching_successful";
var strMainUrl = "";
function OnLoad()
{
	appMainView.start(appMainView.OnCountriesLoaded.bind(appMainView));
}

function app()
{
	this.lstCountries = [];
}

var appMainView = new app();

app.prototype.start = function(callback)
{
	this.lstCountries = appMainView.lstCountries;
	
	if(this.lstCountries.length == 0)
	{
		SendAjax("/ajax/getcountry", null, callback);
	}
}

app.prototype.OnCountriesLoaded = function(data)
{
	appMainView.LoadCountries(data["lstCountries_formatted"], lstCountryDataOptions, data["lstCountriesIds"]);
	this.MainDiv = new MainView(this.parentDiv, this.lstCountries, lstCountryDataOptions);
}

app.prototype.LoadCountries = function(lstCountries, lstContValues, lstCountryIds)
{
	this.parentDiv = document.getElementById("maindiv");
	
	this.lstContValues = lstContValues;
	
	for(var i =0; i< lstCountries.length; i++)
	{
		var country = new Country(parseInt(lstCountryIds[i]), lstCountries[i]);
		this.lstCountries[i] = country;
	}
}

app.prototype.GetCountryForId = function(id)
{
	var index = -1
	for(var i =0; i< this.lstCountries.length; i++)
	{
		if(id == this.lstCountries[i].id)
		{
			index = i;
			break;
		}
	}
	return index;
}

app.prototype.ResetAllData = function()
{
	dialog.ShowDialog("Clearing all values...");
	for(var i =0; i< this.lstCountries.length; i++)
	{
		var country = this.lstCountries[i];
		country.ResetAllData();
	}
	
	this.ClearDatabase();
}

app.prototype.ClearDatabase = function()
{
	SendAjax('/ajax/cleardb/', null, this.OnClearDatabaseResponse.bind(this));
}

app.prototype.OnClearDatabaseResponse = function()
{
	dialog.ShowDialogWithFooter("Data Cleared", "Ok");
}

function SendAjax(url, data, callback)
{
	$.ajax({
			url: strMainUrl + url,
			data: data,
			dataType: 'json',
			success: callback,
			error: OnAjaxFailed
		});
}

function OnAjaxFailed(e)
{
	console.log("error");
	dialog.ShowDialogWithFooter("Action Failed", "Ok");
}