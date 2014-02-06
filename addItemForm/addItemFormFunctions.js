$(document).ready(function() {
	/*
	 * appends the itemTypes to the select menu, each one as an option
	 * uses an ajax call to find the item types specified in settings.xml
	 */
	$.ajax({
		type: "GET",
		url: "settings.xml",
		datatype: "xml",
		success: function(xml) {
			$(xml).find('itemType').each(function() {
				var name = $(this).attr('name');
				var display = $(this).attr('display');
				$("#item_type").append(
					'<option value="'+ name +'">' + display + '</option>'
				);
			});
		}
	});
	
	
	/*
	 * upon changing the select menu (narrowing down to an itemType), all of the fields are appended to the 'changeable' div for the user to fill out
	 * Firstly, an ajax call is made in order to have the XML settings document which we can search for a given itemType,
	 * namely, the one the user has selected from the drop down menu.
	 * 
	 */
	$("#item_type").change(function() {
		var typeSelected = $(this).val();
		$.ajax({
			type: "GET",
			url: "settings.xml",
			datatype: "xml",
			success: function(xml) {
				//clear the form before appending the fields
				$(".addItemFormChangeable").empty();
				//find the itemType based on selection
				$(xml).find('itemType[name="'+ typeSelected +'"]').find('field').each(function(){
					//if the field is "item_id", we don't want it to be editable, and instead use another ajax call to determine
					//what the item_id should be.
					if ($(this).attr('name') == "item_id") {
						$(".addItemFormChangeable").append(
						'<span>' + 
							'<label for="'+ $(this).attr('name') +'">'+ $(this).attr('display') +': </label>' + 
							'<input form="addItemForm" type="text" readonly="readonly" id="'+ $(this).attr('name') +'" name="'+ $(this).attr('name') +'">' +
						'</span>'
						);
						
						$.ajax({
							type: "GET",
							url: "stockList.xml",
							datatype: "xml",
							success: function(xml) {
								var nextID = -1;
								var loopID = 0;
								var currentIDs = $(xml).find("stockList").children();
								
								while (loopID > nextID) {
									nextID = loopID;
									currentIDs.each(function() {
										if (nextID == +($(this).find("item_id").text())) {
											loopID++;
										}
									});
								}
								console.log(nextID);
								$("#item_id").val(nextID);
							}
						});
					}
				//for all other fields, just present an empty, editable field.
					else {
						$(".addItemFormChangeable").append(
							'<span>' + 
								'<label for="'+ $(this).attr('name') +'">'+ $(this).attr('display') +': </label>' + 
								'<input form="addItemForm" type="text" id="'+ $(this).attr('name') +'" name="'+ $(this).attr('name') +'">' +
							'</span>'
						);
					}
				});
				//append the submit button.
				$(".addItemFormChangeable").append(
					'<span>' +
						'<input form="addItemForm" name="addItemSubmit" id="addItemSubmit" type="submit" value="Add New Item">' +
					'</span>'
				);
			}
		});
	});
});