$(document).ready(function(){
	/*
	 * following block finds the itemID based upon the GET value in the URL
	 */
	
	var searchStr = window.location.search.replace( "?", "" );
	var index = searchStr.indexOf("=");
	var itemID;
	if (searchStr.substring(0,index) == "itemID") {
		itemID = searchStr.substring(index+1, searchStr.length);
	}
	
	//Item ID now found
	
	/*
	 * following block uses the itemID to search the stockList.xml file for the element item_id that contains itemID, and then 
	 * prints out the information for the element that contains it. 
	 */	
	$.ajax({
		type: "GET",
		url: "stockList.xml",
		datatype: "xml",
		success: function(xml) {
			$("#itemInfoTable").append(
					'<tr><th>Field</th><th>Value</th></tr>'
			);
			$(xml).find('item_id').filter(function() {
				return (this.textContent || this.innerText).indexOf(itemID) === 0 &&
				(this.textContent.length == itemID.length);
			}).parent().children().each(function() {
				//console.log(this.tagName);
				if (this.tagName == "item_id") {
					$("#itemInfoTable").append(
							'<tr><td>' + this.tagName + '</td><td>' + $(this).text() + '</td></tr>'
					);
				} else {
					$("#itemInfoTable").append(
							'<tr><td>' + this.tagName + '</td><td class="editable">' + $(this).text() + '</td></tr>'
					);
				}
				
			});
			
			$(".editable").dblclick(function() {
				var count = 0;
				console.log("under dblclick: " + count); count++;
				$(this).attr("contenteditable", true);
				//$(this).focus();
				//get the text to compare and see if it's edited (save an unnecessary ajax call)
				var originalText = $(this).text();
				
				//when the user leaves the field
				$(this).focusout(function() {
					console.log("under focusout: " + count); count++;
					
					//compare the text now to what it was on dblclick
					var newText = $(this).text();
					var field = $(this).prev().text();
					//console.log(position);
					if (originalText != newText) { //if different, save it.
						$.ajax({
							type: "POST",
							url: "itemView/itemViewHandler.php",
							data: {
								submit: "true",
								newText: newText,
								item_id: itemID,
								field: field
							},
							datatype: "text",
							success: function(returnText) {
								$("#itemInfoTable").after(returnText);
								console.log("under success: " + count); count++;
							}
						});
					}
					
					//turn off content edit
					$(this).attr("contentEditable", false);
				});
			});
		}
	});
});