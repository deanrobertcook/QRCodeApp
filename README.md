QRCodeApp
=========

An inventory-tracking app based on QRCodes and XML

The ultimate goal of this app was generate a QRCode and an associated web-page for each item added to the inventory.
When the QRCode is printed, it can be stuck onto the item in question. When the code is scanned, it brings the user
to the item specific web-page and displays information regarding the item (whatever information the user desires).

This app is intended to be stored on a nearby server. The user can, using the left hand panel, add new items to the
current inventory list. The types of items, at the moment, must be added manually to the settings.xml file. As new
items are added, the app checks to see if there is a QRCode associated to that item number, and if not, creates a new
one (this allows it to recycle the same QRCodes and avoid having to generate new ones if an item is deleted)

The right hand panel of the home screen is a quick overview of the items in the inventory. The fields become editable
upon a double-click, and will be saved once the user focueses elswhere on the screen. The B button (B stood just for 
button here) takes the user to the mobile-view of the item, where fields can again be edited. The D button deletes the 
item from the inventory, so that the item number (and therefore QRCode) can be reused. 
