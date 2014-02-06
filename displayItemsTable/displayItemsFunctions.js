$(document).ready(function() {
	//begin an ajax request to return each itemType in settings
	$.ajax({
		type: "GET",
		url: "settings.xml",
		datatype: "xml",
		success: function(settingsXML) {
			
			//Call the second ajax request to get the list of stock
			//might as well do straight away, no use wihthout stockList.xml
			//also keeps order
			$.ajax({
				type: "GET",
				url: "stockList.xml",
				datatype: "xml",
				success: function(stockListXML) {
					
					
					$(settingsXML).find('itemType').each(function() {
						
						var numOfFields = $(this).children().length;
						//for each itemType, find its name (eg PC)
						//create a new table for each itemType, and a column for each attribute.
						var name = $(this).attr('name');
						var display = $(this).attr('display');
						
						//begin a string appendString which will acumulate the html to be appended to the table at the end
						var appendString = '<tr><th class="itemHeader" colspan="' + numOfFields + '">' + display + 's</th></tr><tr>';
						$(this).children().each(function() {
							appendString = appendString + '<th class="columnHeader">' + $(this).attr("display"); + '</th>';
						});
						appendString = appendString + '</tr>';
						
						//the number of items for given itemType
						var len = $(stockListXML).find(name).length - 1;
						
						//for each item of a given itemType, fetch data and display in table
						$(stockListXML).find(name).each(function(index) {
							//if the last item for given itemType, change the class to allow for more flexible editing.
							if (len == index) {
								appendString = appendString + '<tr class="lastRow">';
							} else {
								appendString = appendString + '<tr>';
							}
							
							$(this).children().each(function() {
								//make sure that item_id remains non-editable
								if ($(this).prop("tagName") == "item_id") {
									appendString = appendString + '<td class="columnInfo">';
								} else {
									appendString = appendString + '<td class="columnInfo editable">';
								}
								appendString = appendString + $(this).text();
								appendString = appendString + '</td>';
							});
							appendString = appendString + '<td class="itemViewButtonCell">' +
								'<button class="itemViewButton">B</button>' +
								'<button class="deleteButton">D</button>' +
								'</td>';
							appendString = appendString + '</tr>';
						});
						
						$("#displayItemsTable").append(appendString);
						
					});
					
					$('.itemViewButton').click(function() {
						var item_id = $(this).parent().siblings().first().text();
						window.location = "?itemID=" + item_id;
					});
					
					$('.deleteButton').click(function() {
						var item_id = $(this).parent().siblings().first().text();
						$.ajax({
							type: "POST",
							url: "displayItemsTable/displayItemsHandler.php",
							datatype: "text",
							data: {
								submit: 'delete',
								itemID: item_id
							},
							success: function(msg) {
								location.reload();
							}
						});
						
					});
					
					/*
					 * There is an issue in here. When an item is edited for the second time on one instance of the page (i.e., without
					 * refreshing in between) then it sends off 2 messages, on top of the 1 it send the first time. Edit it a third time,
					 * and it sends of another 3 etc. 
					 */
					
					//dblclick edit function should come in the ajax call to make sure that everything is loaded first
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
							var position = $(this).prevAll().length;
							//console.log(position);
							if (originalText != newText) { //if different, save it.
								//get item_id of edited item (first element of the siblings)
								var item_id = $(this).siblings().first().text();
								$.ajax({
									type: "POST",
									url: "displayItemsTable/displayItemsHandler.php",
									data: {
										submit: "edit",
										newText: newText,
										item_id: item_id,
										position: position
									},
									datatype: "text",
									success: function(returnText) {
										$("#displayItemsTable").after(returnText);
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
		}
	})
});