var noOfVidOuts = 0;

function CreateVideoOutputWidgetObj ()
{
	// TODO Should have Canvas for consistancy
	
	newWidget = new WidgetObj ()
	
	//unique vars on this object
	newWidget.vidwinDom = {}

	
	//constructor
	noOfVidOuts++;
	newWidget.data.label = "Video Output #" + noOfVidOuts;
	newWidget.data.type = 'videoOutput'
	
	//methods
	newWidget.buildDomElement = function (widget) {
		controlsDiv = widget.controlsDivDom
	
		newLabel = document.createElement('label');
		newLabel.innerHTML = 'Source Widget: ';
		controlsDiv.appendChild(newLabel);
		
		newSelect = document.createElement('select');
		controlsDiv.appendChild(newSelect);
		newSelect.value = widget.data.selectedDeviceId;
		widget.widgetSelectors.push(newSelect);
		widget.widgetSelectors.forEach (function(newSelect) {
			newSelect.addEventListener("change", vidOutInputChange.bind(event, widget));
		})
		
		newVid = document.createElement('video');
		newVid.autoplay = 'true';
		newVid.className = 'videoWindow';
		newVid.controls = true;
		widget.panelDom.appendChild(newVid);
		widget.vidwinDom = newVid;
	}
	
	newWidget.changeMethod = function (widget) {

		widget.sourceWidget = getWidgetById (widget.data.selectedDeviceId)
		
		widget.canvasDom = widget.sourceWidget.canvasDom;
		var stream = widget.canvasDom.captureStream();
		widget.vidwinDom.srcObject = stream;
	}
	return newWidget;
}

function vidOutInputChange(widget, event)
{
	var newSrcStr = event.target.value;
	widget.data.selectedDeviceId = newSrcStr;
	widget.changeMethod(widget)
}