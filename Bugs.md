_#BUGS DOCUMENTARY._
Bugs identified within the _Smart Thermostat App_

_BUG 1:_ _DROPDOWN MENU_:
*PROBLEM:*Selecting a room from the dropdown menu does not update or display the correct room selected.
When a room is selected, the selected room and its data like its current temperature should be displayed, but its not.
_IDENTIFICATION METHOD:_ I identified this bug using the console.log() method to to confirm if the event is triggered properly.
*SOLUTION:*To fix this, i changed the element option.value set to "room" to "room.name" on _line 208_ to properly capture the room selected and display its correct data.
_STATUS:_ ✅Dropdown Menu bug, Succesfully _FIXED_

_BUG 2:_ _SETTING TEMPERATURE_
_PROBLEM:_ The + and - buttons to either increase or decrease the room tempearture doesn't work when its triggered. The + button when clicked on, should increase the room temperature, and - buttton when clicked on should decrease it but there was no action when either were clicked.
_IDENTIFICATION METHOD:_ Manually clicked the buttons during testing and added console logs inside the button event handlers.
_SOLUTION:_ To fix this bug, i added () to the method called "room.increaseTemp" and "room.decreaseTemp" on _line 244_ and _line 256_ respectively.This enables it to be executed and stored in their respective variables.
_STATUS:_ ✅Increase and Decrease temperature functionality succesfully _FIXED_.

_BUG 3:_ _VISUAL COMMUNICATION/BACKGROUND FOR ROOM TEMPERATURE (WARM/COLD):_
_PROBLEM:_ They are two very similar functions, "setInitialOverlay" and "setOverlay", both responsible for setting the background image based on the room temperature. This creates code duplication.
_IDENTIFICATION METHOD:_ Manual review of the Javascript file and comparison of both functions.
_SOLUTION:_ I removed/cleared the "setInitialOverlay" function and modified the "setOverlay(room)"function to handle both the warm and cold representation of the room.
_STATUS:_ ✅Background for room temperature sucessfuly fixed.

*BUG 4:* *DUPLICATE INCREASE AND DECREASE TEMPERATURE FUNCTION*
*PROBLEM:* Repetition of code for increasing and decreasing temperature.
*IDENTIFIACTION METHOD:* Manual review of the Javascript file and comparison of both functions.
*SOLUTION:* Created a single reusable function changeTemperature(action) that handles both increasing and decreasing temperature depending on the action passed. Cleaned up event listeners
*STATUS:* ✅Temperature function successfully refactored and fixed.

*BUG 5:* *PRESET CONFIGURATION*
*PROBELEM:* In the HTML file the max and min limit for the cool and warm preset was set to 22 respectively, thereby making it impossible to go to 23-25.
*IDENTIFICATION METHOD:* I manually input the values into the preset fucntion and they gave error messages even though they were valid and un the range.
*SOLUTION:* I changed the max value of the cool inpout to 24, and the min value of the warm input to 25. And on *line 287* and *line 292*, i changed the error messages to match the limit of the exact temperature limit being set. So it displays an error message based on the input entered for each temperature so the user knows which exact temperature is above the set limit.
*STATUS:* ✅Preset Configuration fixed.


*BUG 6:* *AC COMMUNICATION FEEDBACK*
*PROBLEM:* When AC is turned on text description should communicate reasonable
feedback (e.g. 'Cooling room to <temperature number>' when
temperature is between 10 - 24 and 'Warming room to <temperature
number>' when the room is between 25 - 32) but its not.
*IDENTIFICATION METHOD:* I manually set the temperature to 24 and switched on the AC to check if that event works correctly when triggered but instead of giving the feedback "cooling room to 24" it gave the feedback "warming room to 24". 
*SOLUTION:* I interchanged the condition on *line 328* so when the temperature is greater than 25, It warms the room and when less than 25, it cools the room.
*STATUS:* ✅AC Feedback Fixed.

*BUG 7* *ERROR MESSAGE NOT CLOSING*
*PROBLEM:* The error message wasn't disapearing after the close button is triggered, thereby making it imposibble to enter new valid values.
*IDENTIFICATION METHOD:* Manual testing by entering wrong values, the error message displaying and trying to close it.
*SOLUTION:* Declared the error message in the event listener and set the display to none.
*STATUS:* ✅Error Message Fixed.
