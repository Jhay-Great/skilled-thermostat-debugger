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
*IDENTICPFIACTION METHOD:* Manual review of the Javascript file and comparison of both functions.
*SOLUTION:* Created a single reusable function changeTemperature(action) that handles both increasing and decreasing temperature depending on the action passed. Cleaned up event listeners
*STATUS:* ✅Temperature Successfully refactored and fixed.
