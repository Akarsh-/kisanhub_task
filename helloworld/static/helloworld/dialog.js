function Dialog()
{
	this.nRefCount = 0;
	this.bgDiv = document.createElement("div");
	this.bgDiv.setAttribute("class", "d_bg_div");
	
	this.mainDiv = document.createElement("div");
	this.mainDiv.setAttribute("class", "d_div");
	
	this.contentDiv = document.createElement("div");
	this.contentDiv.setAttribute("class", "modal-content");
	this.mainDiv.appendChild(this.contentDiv);
	
	this.dialogBody = document.createElement("div");
	this.dialogBody.setAttribute("class", "modal-body");
	this.contentDiv.appendChild(this.dialogBody);
	
	this.textPara = document.createElement("p");
	this.textPara.setAttribute("id","dia_text");
	this.dialogBody.appendChild(this.textPara);
	
	this.dialogFooter = document.createElement("div");
	this.dialogFooter.setAttribute("id","dia_footer");
	this.dialogFooter.setAttribute("class","modal-footer");
	this.contentDiv.appendChild(this.dialogFooter);
	
	this.dialogFooterBtn = document.createElement("button");
	this.dialogFooterBtn.onclick = this.HideAllDialog.bind(this);
	this.dialogFooterBtn.setAttribute("class","btn btn-default");
	this.dialogFooterBtn.setAttribute("id","dia_footer_btn");
	this.dialogFooterBtn.innerHTML = "Close";
	this.dialogFooter.appendChild(this.dialogFooterBtn);
}

Dialog.prototype.ShowDialog = function(strText)
{
	this.SetDialogPosition();
	
	document.body.appendChild(this.bgDiv);
	document.body.appendChild(this.mainDiv);
	this.textPara.innerHTML = strText;
	this.dialogFooter.style.display = "none";
}

Dialog.prototype.ShowDialogWithFooter = function(strText, strButtonText)
{
	this.SetDialogPosition();
	
	this.dialogFooter.style.display = "inherit";
	document.body.appendChild(this.bgDiv);
	document.body.appendChild(this.mainDiv);
	this.textPara.innerHTML = strText;
	this.dialogFooterBtn.innerHTML = strButtonText;
}

Dialog.prototype.SetDialogPosition = function()
{
	this.nRefCount++;
	var sTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
	var sHeight = Math.max(window.innerHeight, document.body.scrollHeight);
	this.bgDiv.style.width = document.body.scrollWidth + "px";
	this.bgDiv.style.height = sHeight + "px";
	var sT = sTop + 50;
	this.mainDiv.style.top = sT + "px";
	this.mainDiv.style.width = 300 + "px";
	this.mainDiv.style.left = (document.body.offsetWidth - 300) / 2 + "px";
}

Dialog.prototype.HideDialog = function()
{
	this.nRefCount--;
	
	if(this.nRefCount == 0)
	{
		this.nRefCount = 0;
		document.body.removeChild(this.bgDiv);
		document.body.removeChild(this.mainDiv);
	}
}

Dialog.prototype.HideAllDialog = function()
{
	this.nRefCount = 0;
	document.body.removeChild(this.bgDiv);
	document.body.removeChild(this.mainDiv);
}
var dialog = new Dialog();