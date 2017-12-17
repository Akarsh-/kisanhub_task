//this class renders view for q1

function MainView(parentDiv, lstCountries, lstContValues)
{
	var H1 = document.createElement("H1");
	H1.innerHTML = "Question 1";
	H1.style.paddingLeft = "24px";
	parentDiv.appendChild(H1);
	
	var Innerdiv = document.createElement("div");
	parentDiv.appendChild(Innerdiv);
	
	var strInfo = "The following table shows list of region and weather information available to download." +
				  "<br/> Whenever download is pressed, I first check if that information is alredy present or not, " +
				  "if so nothing is done, else I check my database data for that info. " +
			      "If not found then, I get file from the link given and parse it and store data." 
	var descDiv = document.createElement("div");
	descDiv.innerHTML = strInfo;
	descDiv.style.padding = "24px";
	Innerdiv.appendChild(descDiv);
	
	//div for table
	var tableDiv = document.createElement("div");
	tableDiv.style.paddingLeft = "24px";
	tableDiv.style.paddingRight = "24px";
	parentDiv.appendChild(tableDiv);
	
	//main table element styles are used using bootstrap
	var table = document.createElement("table");
	tableDiv.appendChild(table);
	table.setAttribute("class", "table");
	
	var thead = document.createElement("thead");
	table.appendChild(thead);
	
	var tr1 = document.createElement("tr");
	thead.appendChild(tr1);
	
	var thRegion = document.createElement("th");
	thRegion.setAttribute("scope", "col");
	thRegion.innerHTML = "Region";
	tr1.appendChild(thRegion);
	
	
	//for data values make header rows
	for(var i = 0; i< lstContValues.length; i++)
	{
		var th = document.createElement("th");
		th.setAttribute("scope", "col");
		tr1.appendChild(th);
		th.innerHTML = lstContValues[i];
	}
	
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	
	//fill using countries list
	for(var i =0; i< lstCountries.length; i++)
	{
		var tr = document.createElement("tr");
		tbody.appendChild(tr);
		
		var td1 = document.createElement("td");
		td1.innerHTML = lstCountries[i].name;
		tr.appendChild(td1);		
		
		for(var j =0; j< lstContValues.length; j++)
		{
			var td2 = document.createElement("td");
			tr.appendChild(td2);
			td2.appendChild(lstCountries[i].lstButtons[j]);
		}
		
	}
	
	//button to clear database to start again
	var button1 = document.createElement("button");
	button1.style.marginLeft = "24px";
	button1.setAttribute("type", "button");
	button1.setAttribute("class", "btn btn-info");
	button1.innerHTML = "Clear All";
	parentDiv.appendChild(button1);
	button1.onclick = function () {
		appMainView.ResetAllData();
	}
	
	var btnDesc = document.createElement("div");
	btnDesc.setAttribute("class", "desc_btn");
	btnDesc.innerHTML = "This will clear all data from models and database";
	parentDiv.appendChild(btnDesc);
	
	var adiv = document.createElement('div');
	var aTag = document.createElement('a');
	adiv.style.paddingLeft = "24px";
	adiv.style.paddingTop = "24px";
	aTag.setAttribute('href',"/Q2");
	aTag.innerHTML = "Go To Question2";
	adiv.appendChild(aTag);
	parentDiv.appendChild(adiv);
}