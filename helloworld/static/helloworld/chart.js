var chartMain ;
var drawChart1;
var drawChart2;

var lstOfMonthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var lstOfSeasonNames = ["WIN", "SPR", "SUM", "AUT"];

//helper public functions to create drop down values
function CreateContValuesList(id)
{
	var lstCountries = lstCountryDataOptions;
	var create = "";
	for(var i =0; i< lstCountryDataOptions.length; i++)
	{
		create += '<option value="'+i+'">'+lstCountryDataOptions[i]+'</option>';
	}
	create += '<option value="'+i+'">'+"Rainfall and Sunshine"+'</option>';
	
	jQuery('#' + id).append(create);
	$('#' + id).on('change', function() {
		OnContValueDropDownValueChange(this.value, this.id);
	})
	
}

//helper public function to create year list
function CreateYearList(id)
{
	var lstCountries = appMainView.lstCountries;
	var create = "";
	for(var i =0; i< lstCountries.length; i++)
	{
		create += '<option value="'+lstCountries[i].id+'">'+lstCountries[i].name+'</option>';
	}
	
	jQuery('#' + id).append(create);
	$('#' + id).on('change', function() {
		OnDropDownValueChange(this.value, this.id);
	})
	
}

//helper function to listen drop down value change
function OnDropDownValueChange(value, id)
{
	if(id.indexOf("_1") > 0)
	{
		drawChart1.bRedraw = true;
		drawChart1.BeginDrawing();
	}
	else if(id.indexOf("_2") > 0)
	{
		drawChart2.bRedraw = true;
		drawChart2.BeginDrawing();
	}
}

function OnInputChange(ele)
{
	if(ele.id.indexOf("_1") > 0)
	{
		drawChart1.bRedraw = true;
		drawChart1.BeginDrawing();
	}
	if(ele.id.indexOf("_2") > 0)
	{
		drawChart2.bRedraw = true;
		drawChart2.BeginDrawing();
	}
}

function OnContValueDropDownValueChange(value, id)
{
	drawChart2.bRedraw = true;
	drawChart2.BeginDrawing();
}

function OnLoad()
{
	chartMain = new ChartMain();
	chartMain.start();
	drawChart1 = new DrawChart1();
	drawChart2 = new DrawChart2();
}

//main class of chart, it loads data using appMainView countries list
function ChartMain()
{
}

//get countries list
ChartMain.prototype.start = function()
{
	appMainView.start(this.OnCountriesLoaded.bind(this));
}

//start after loading countries
ChartMain.prototype.OnCountriesLoaded = function(data)
{
	appMainView.LoadCountries(data["lstCountries_formatted"], data["lstCountDatanames_formatted"], data["lstCountriesIds"]);
	CreateYearList("select_1");
	drawChart1.BeginDrawing();
	
	CreateContValuesList("select_2a");
	CreateYearList("select_2");
	drawChart2.BeginDrawing();
}

//main class for drawing chart section 2
function DrawChart2()
{
	//whenever its inputs are changed this is only to be redrawn
	this.bRedraw = true;
}

//begin drawing, get all variables required , get if not available
DrawChart2.prototype.BeginDrawing = function()
{	
	this.nCId = jQuery('#select_2').val();
	this.nCDataVal = parseInt(jQuery('#select_2a').val());
	this.nStartYear = parseInt(jQuery('#input_2a').val());
	this.nEndYear = parseInt(jQuery('#input_2b').val());
	
	if(this.nStartYear >= 2017 || this.nEndYear >= 2017)
		jQuery('#error_2')[0].style.display = "initial";
	else
		jQuery('#error_2')[0].style.display = "none";
	
	var index = appMainView.GetCountryForId(this.nCId);
	if(index == -1)
	{
		console.log("country not found");
		return;
	}
	this.country = appMainView.lstCountries[index];
	this.objCountryValue = this.country.GetCountryDataValue(this.nCDataVal);
	if(this.country.IsDataLoaded())
		this.Draw();
	else
		this.country.LoadAllValues();
}

//called when all data is gathered
DrawChart2.prototype.Draw = function()
{
	if(! this.country.IsDataLoaded())
		return;
	
	if(this.nStartYear >=  this.nEndYear)
		return;
	
	//return if no redraw require
	if(!this.bRedraw)
		return;
	
	this.bRedraw = false;
	
	var lstValues = [];
	var lstSunshineValue = [];
	if(this.objCountryValue != null)
		lstValues = this.objCountryValue.GetValuesBetweenYear(this.nStartYear, this.nEndYear);
	else
		lstSunshineValue = this.country.sunshineValues.GetValuesBetweenYear(this.nStartYear, this.nEndYear);
		lstValues = this.country.rainfallValues.GetValuesBetweenYear(this.nStartYear, this.nEndYear);
	
	//remove last zeros, just dont draw chart
	for(var i =lstValues.length - 1; i >= 0; i--)
	{
		if(lstValues[i] == 0)
			lstValues.splice(i, 1);
	}
	
	//remove last zeros, just dont draw chart
	for(var i =lstSunshineValue.length - 1; i >= 0; i--)
	{
		if(lstSunshineValue[i] == 0)
			lstSunshineValue.splice(i, 1);
	}
	
	var lstYears = [];
	var datasets = [];
	
	for(var i = this.nStartYear; i<= this.nEndYear; i++)
	{
		lstYears.push(i);
	}
	
	var strLabel = $( "#select_2a option:selected" ).text();
	
	if(this.objCountryValue == null)
		strLabel = "Rainfall";
	
	var obj1 = {
			label : strLabel,
			backgroundColor: "rgba(255,99,132,0.2)",
			borderColor: "rgba(255,99,132,1)",
			borderWidth: 2,
			hoverBackgroundColor: "rgba(255,99,132,0.4)",
			hoverBorderColor: "rgba(255,99,132,1)",
			data: lstValues,
			fill: false
		};
	datasets.push(obj1);
	
	if(lstSunshineValue.length > 0)
	{
		var obj2 = {
				label : "Sunshine",
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 2,
				hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
				hoverBorderColor: "rgba(54, 162, 235, 1)",
				data: lstSunshineValue,
				fill: false
			};
		datasets.push(obj2);
		lstSunshineValue = [];
	}
		
	var data = {
		labels: lstYears,
		datasets: datasets
	};
	
	var options = {
		maintainAspectRatio: false,
		legend: {
            labels: {
                fontColor: "white",
                fontSize: 14
            }
		}
	};
	
	var canvas = document.getElementById("chart_2");
    var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//create line chart using chart.js
	if(this.lineChart != null)
	{
		this.lineChart.destroy();
	}
	this.lineChart = new Chart(context, {type: "line" , "data": data, "options":options});
	
}	

//main class for drawing chart section 1
//it renders 3 charts
function DrawChart1()
{
	//whenever its inputs are changed this is only to be redrawn
	this.bRedraw = true;
}

DrawChart1.prototype.BeginDrawing = function()
{
	this.nCId = jQuery('#select_1').val();
	this.nYear = parseInt(jQuery('#input_1').val());
	
	//to show error message
	if(this.nYear >= 2017)
		jQuery('#error_1')[0].style.display = "initial";
	else
		jQuery('#error_1')[0].style.display = "none";
	
	var index = appMainView.GetCountryForId(this.nCId);
	if(index == -1)
	{
		console.log("country not found");
		return;
	}
	this.country = appMainView.lstCountries[index];
	
	if(this.country.IsDataLoaded())
		this.Draw();
	else
		this.country.LoadAllValues();
}

//called when all info required to load data for section is completed
DrawChart1.prototype.Draw = function()
{
	if(! this.country.IsDataLoaded())
		return;
	
	//return if no redraw require
	if(!this.bRedraw)
		return;
	
	this.bRedraw = false;
	
	//rendring for chart 1
	
	var datasets = [];
	var lstData = this.country.tempMaxValues.GetValueForYear(this.nYear);
	if(lstData.length > 0)
	{
		var obj1 = {
			label: "Maximum Temp",
			backgroundColor: "rgba(255,99,132,0.2)",
			borderColor: "rgba(255,99,132,1)",
			borderWidth: 2,
			hoverBackgroundColor: "rgba(255,99,132,0.4)",
			hoverBorderColor: "rgba(255,99,132,1)",
			data: lstData,
		}
		datasets.push(obj1);
	}
	
	lstData = this.country.tempMinValues.GetValueForYear(this.nYear);
	if(lstData.length > 0)
	{
		var obj2 = {
			label: "Minimum Temp",
			backgroundColor: "rgba(54, 162, 235, 0.2)",
			borderColor: "rgba(54, 162, 235, 1)",
			borderWidth: 2,
			hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
			hoverBorderColor: "rgba(54, 162, 235, 1)",
			data: lstData,
			type: 'bar',
		}
		datasets.push(obj2);
	}
	
	lstData = this.country.tempMeanValues.GetValueForYear(this.nYear);
	if(lstData.length > 0)
	{
		var obj3 = {
			label: "Mean Temp",
			backgroundColor: "rgba(255, 206, 86, 0.2)",
			borderColor: "rgba(255, 206, 86, 1)",
			borderWidth: 2,
			hoverBackgroundColor: "rgba(255, 206, 86, 0.4)",
			hoverBorderColor: "rgba(255, 206, 86, 1)",
			data: lstData,
			type: 'line',
			fill: 'false',
		}
		datasets.push(obj3);
	}
	
	var data = {
		labels: lstOfMonthsName,
		datasets: datasets
	};
	
	var options = {
		maintainAspectRatio: false,
		barValueSpacing: 20,
		legend: {
            labels: {
                fontColor: "white",
                fontSize: 14
            }
		},
		scales: {
			yAxes: [{
			gridLines: {
				display: true,
				color: "rgba(255,99,132,0.2)"
			}
			}],
			xAxes: [{
			gridLines: {
				display: false
			}
			}]
		}
	};
	
	var canvas = document.getElementById("chart_1");
    var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	if(this.barChart != null)
	{
		this.barChart.destroy();
	}
	//draw chart 1
	this.barChart = new Chart(context, {type: "bar" , "data": data, "options":options});
	
	//rendering for chart 2
	lstData = this.country.sunshineValues.GetSeasonValueForYear(this.nYear);
	var nTotalValue = 0;
	for(var i =0; i< lstData.length; i++)
	{
		nTotalValue += parseFloat(lstData[i]);
	}
	nTotalValue = nTotalValue.toFixed(2);
	
	jQuery('#p_c_1')[0].innerHTML = nTotalValue;
	
	datasets = [];
	var obj1 = {
			label: "Total Sunshine in hours",
			backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
			borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
			borderWidth: 2,
			hoverBackgroundColor: [
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)'
            ],
			data: lstData,
		}
		datasets.push(obj1);

	options = {
		maintainAspectRatio: false,
		legend: {
            labels: {
                fontColor: "white",
                fontSize: 14
            }
		}
	};
	
	data = {
		labels: lstOfSeasonNames,
		datasets: datasets
	};
		
	canvas = document.getElementById("chart_1a");
    context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//draw chart 2
	if(this.pieChart != null)
	{
		this.pieChart.destroy();
	}
	this.pieChart = new Chart(context, {type: "pie" , "data": data, "options":options});
	
	
	//rendering for chart 3
	lstData = this.country.rainfallValues.GetSeasonValueForYear(this.nYear);
	nTotalValue = 0;
	for(var i =0; i< lstData.length; i++)
	{
		nTotalValue += parseFloat(lstData[i]);
	}
	
	nTotalValue = nTotalValue.toFixed(2);
	
	jQuery('#p_c_2')[0].innerHTML = "" + nTotalValue;
	datasets = [];
	var obj1 = {
			label: "Total Sunshine in hours",
			backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
			borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
			borderWidth: 2,
			hoverBackgroundColor: [
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)'
            ],
			data: lstData,
		}
		datasets.push(obj1);

	options = {
		maintainAspectRatio: false,
		legend: {
            labels: {
                fontColor: "white",
                fontSize: 14
            }
		}
	};
	
	data = {
		labels: lstOfSeasonNames,
		datasets: datasets
	};
		
	canvas = document.getElementById("chart_1b");
    context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//draw chart 3
	if(this.pieChart1 != null)
	{
		this.pieChart1.destroy();
	}
	this.pieChart1 = new Chart(context, {type: "pie" , "data": data, "options":options});
}