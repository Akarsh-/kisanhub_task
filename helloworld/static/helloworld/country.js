//this is country model. It has id, name and different values.
function Country(id, name)
{
	this.id = id;
	this.name = name;
	this.tempMaxValues = new TempMaxValues();
	this.tempMinValues = new TempMinValues();
	this.tempMeanValues = new TempMeanValues();
	this.sunshineValues = new SunshineValues();
	this.rainfallValues = new RainfallValues();
	
	this.lstButtons = [];
	for(var i =0; i< lstCountryDataOptions.length; i++)
	{
		var btn = this.CreateButton(lstCountryDataOptions[i]);
		this.lstButtons.push(btn);
	}
}

Country.prototype.GetCountryDataValue = function(id)
{
	switch(id)
	{
		case 0:
			return this.tempMaxValues;
		break;
		case 1:
			return this.tempMinValues;
		break;
		case 2:
			return this.tempMeanValues;
		break;
		case 3:
			return this.sunshineValues;
		break;
		case 4:
			return this.rainfallValues;
		break;
	}
}

Country.prototype.CreateButton = function(id)
{
	var me = this;
	var btn = document.createElement("button");
	btn.innerHTML = "Download";
	btn.id = id;
	btn.onclick = this.OnButtonClicked.bind(this, btn.id);
	return btn;
}

Country.prototype.OnButtonClicked = function(id)
{
	switch(id)
	{
		case lstCountryDataOptions[0]:
			this.OnMaxTempClicked();
			break;
		case lstCountryDataOptions[1]:
			this.OnMinTempClicked();
			break;
		case lstCountryDataOptions[2]:
			this.OnMeanTempClicked();
			break;
		case lstCountryDataOptions[3]:
			this.OnSunshineClicked();
			break;
		case lstCountryDataOptions[4]:
			this.OnRainfallClicked();
		break;
	}
}

Country.prototype.IsDataLoaded = function()
{
	if( this.tempMaxValues.bLoaded &&
		this.tempMinValues.bLoaded &&
		this.tempMeanValues.bLoaded &&
		this.sunshineValues.bLoaded &&
		this.rainfallValues.bLoaded )
			return true;
	
	return false;
}

Country.prototype.LoadAllValues = function()
{
	if(!this.tempMaxValues.bLoaded)
	{	
		this.OnMaxTempClicked();	
	}
	
	if(!this.tempMinValues.bLoaded)
	{	
		this.OnMinTempClicked();	
	}
	
	if(!this.tempMeanValues.bLoaded)
	{	
		this.OnMeanTempClicked();	
	}
	if(!this.rainfallValues.bLoaded)
	{	
		this.OnRainfallClicked();	
	}
	if(!this.sunshineValues.bLoaded)
	{	
		this.OnSunshineClicked();	
	}
}

Country.prototype.OnRainfallClicked = function()
{
	var me = this;
	console.log("hello rainfall");
	if(!this.rainfallValues.bLoaded && !this.rainfallValues.bLoading)
	{
		this.rainfallValues.bLoading = true;
		dialog.ShowDialog("Loading data...");
		var data = {'id': me.id}
		
		SendAjax('/ajax/getrainfallcountrydata/', data, me.OnRainfallValueResponse.bind(me));
	}
	else
	{
		dialog.HideDialog();
		if(this.rainfallValues.bLoading)
			dialog.ShowDialog("Loading data...");
		else
			dialog.ShowDialogWithFooter("Data alredy present", "Ok");
	}
}

Country.prototype.OnRainfallValueResponse = function(data)
{
	this.rainfallValues.SetValues(data["lstMonths"], data["lstValue"]);
	dialog.HideDialog();
	try 
	{
		if(drawChart1 != null)
		{
			drawChart1.Draw();
		}
		if(drawChart2 != null)
		{
			drawChart2.Draw();
		}
	}
	catch (e) {dialog.ShowDialogWithFooter("Data downloaded", "Ok");}
}

Country.prototype.OnSunshineClicked = function()
{
	var me = this;
	console.log("hello sunshine");
	if(!this.sunshineValues.bLoaded && !this.sunshineValues.bLoading)
	{
		this.sunshineValues.bLoading = true;
		dialog.ShowDialog("Loading data...");
		var data = {'id': me.id}
		
		SendAjax('/ajax/getsunshinecountrydata/', data, me.OnSunshineValueResponse.bind(me));
	}
	else
	{
		dialog.HideDialog();
		if(this.sunshineValues.bLoading)
			dialog.ShowDialog("Loading data...");
		else
			dialog.ShowDialogWithFooter("Data alredy present", "Ok");
	}
}

Country.prototype.OnSunshineValueResponse = function(data)
{
	this.sunshineValues.SetValues(data["lstMonths"], data["lstValue"]);
	dialog.HideDialog();
	try 
	{
		if(drawChart1 != null)
		{
			drawChart1.Draw();
		}
		if(drawChart2 != null)
		{
			drawChart2.Draw();
		}
	}
	catch (e) {dialog.ShowDialogWithFooter("Data downloaded", "Ok");}
}

Country.prototype.OnMaxTempClicked = function()
{
	var me = this;
	console.log("hello world max");
	if(!this.tempMaxValues.bLoaded && !this.tempMaxValues.bLoading)
	{
		dialog.ShowDialog("Loading data...");
		this.tempMaxValues.bLoading = true;
		var data = {'id': me.id}
		
		SendAjax('/ajax/gettmaxcountrydata/', data, me.OnTMaxValueResponse.bind(me));
	}
	else
	{
		dialog.HideDialog();
		if(this.tempMaxValues.bLoading)
			dialog.ShowDialog("Loading data...");
		else
			dialog.ShowDialogWithFooter("Data alredy present", "Ok");
	}
}

Country.prototype.OnTMaxValueResponse = function(data)
{
	this.tempMaxValues.SetValues(data["lstMonths"], data["lstValue"]);
	dialog.HideDialog();
	try 
	{
		if(drawChart1 != null)
		{
			drawChart1.Draw();
		}
		if(drawChart2 != null)
		{
			drawChart2.Draw();
		}
	}
	catch (e) {
		dialog.ShowDialogWithFooter("Data downloaded", "Ok");
	}
}

Country.prototype.OnMinTempClicked = function()
{
	console.log("hello worldTemp min");
	var me = this;
	if(!this.tempMinValues.bLoaded && !this.tempMinValues.bLoading)
	{
		this.tempMinValues.bLoading = true;
		dialog.ShowDialog("Loading data...");
		var data = {'id': me.id}
		
		SendAjax('/ajax/gettmincountrydata/', data, me.OnTMinValueResponse.bind(me));
	}
	else
	{
		dialog.HideDialog();
		if(this.tempMinValues.bLoading)
			dialog.ShowDialog("Loading data...");
		else
			dialog.ShowDialogWithFooter("Data alredy present", "Ok");
	}
}

Country.prototype.OnTMinValueResponse = function(data)
{
	this.tempMinValues.SetValues(data["lstMonths"], data["lstValue"]);
	dialog.HideDialog();
	try
	{
		if(drawChart1 != null)
		{
			drawChart1.Draw();
		}
		if(drawChart2 != null)
		{
			drawChart2.Draw();
		}
	}
	catch (e) 
	{
		dialog.ShowDialogWithFooter("Data downloaded", "Ok");
	}
}

Country.prototype.OnMeanTempClicked = function()
{
	console.log("hello worldTemp mean");
	var me = this;
	if(!this.tempMeanValues.bLoaded && !this.tempMeanValues.bLoading)
	{
		this.tempMeanValues.bLoading = true;
		dialog.ShowDialog("Loading data...");
		var data = {'id': me.id}
		
		SendAjax('/ajax/gettmeancountrydata/', data, me.OnTMeanValueResponse.bind(me));
	}
	else
	{
		dialog.HideDialog();
		if(this.tempMeanValues.bLoading)
			dialog.ShowDialog("Loading data...");
		else
			dialog.ShowDialogWithFooter("Data alredy present", "Ok");
	}
}

Country.prototype.OnTMeanValueResponse = function(data)
{
	this.tempMeanValues.SetValues(data["lstMonths"], data["lstValue"]);
	dialog.HideDialog();
	try 
	{
		if(drawChart1 != null)
		{
			drawChart1.Draw();
		}
		if(drawChart2 != null)
		{
			drawChart2.Draw();
		}
	}
	catch (e){
		dialog.ShowDialogWithFooter("Data downloaded", "Ok");
	}
}

Country.prototype.ResetAllData = function()
{
	this.tempMaxValues.bLoaded  = false;
    this.tempMinValues.bLoaded  = false;
    this.tempMeanValues.bLoaded = false;
    this.sunshineValues.bLoaded = false;
    this.rainfallValues.bLoaded = false;
}