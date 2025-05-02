// Room objects
const rooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
];

// error cleared  ------------->>>> exchanged variable naming to match color codes and make UI/UX more intuitive
// const warmOverlay= `linear-gradient(
//     to bottom,
//     rgba(141, 158, 247, 0.2),
//     rgba(194, 197, 215, 0.1)
//   )`;

// const coolOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const coolOverlay = `linear-gradient(
  to bottom,
  rgba(141, 158, 247, 0.2),
  rgba(194, 197, 215, 0.1)
)`;

const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setInitialOverlay = () => {
  document.querySelector(
    ".room"
  ).style.backgroundImage = `url('${rooms[0].image}')`;

  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
};

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};

// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;

// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

// code refactor
// declare preset states
let coolPresetTrigger = false;
let warmPresetTrigger = false;

setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room;
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoomParam) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoomParam);
  // console.log(room);
  // code refactor ------->>>>>> setIndicatorPoint dynamically
  // setIndicatorPoint(room);

  coolPresetTrigger
    ? setIndicatorPoint(room.coldPreset)
    : warmPresetTrigger
    ? setIndicatorPoint(room.warmPreset)
    : setIndicatorPoint(room.currTemp);

  // set selected room (modular code)
  selectedRoom = selectedRoomParam;
  // console.log(`from setSelectRoom function`, selectedRoom)

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;

  // code refactor ----------->>>>>>>> Add generateRooms() function call here
  generateRooms();
};

roomSelect.addEventListener("change", function (e) {
  // error cleared ------------>>>>>> Incorrect value being accessed.
  // selectedRoom = this.value;

  selectedRoom = e.target.options[e.target.selectedIndex].text;
  setSelectedRoom(selectedRoom);

  // console.log(selectedRoom)
});

// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");
defaultSettings.addEventListener("click", function (e) {});

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  // error cleared --------------->>>>>> wrong invocation.
  // discovered through code inspection
  // const increaseRoomTemperature = room.increaseTemp;

  // code refactored ------->>>> No need for variable declaration for function call
  // use of && operator
  // const increaseRoomTemperature = room.increaseTemp();

  // if (room.currTemp < 32) {

  // error cleared --------------->>>>>> wrong invocation.
  // discovered through code inspection
  // increaseRoomTemperature()

  // increaseRoomTemperature;
  // }

  room.currTemp < 32 && room.increaseTemp();

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  // code refactored ------->>>> No need for variable declaration for function call
  // use of && operator
  // const decreaseRoomTemperature = room.decreaseTemp();

  // if (room.currTemp > 10) {

  // error cleared --------------->>>>>> wrong invocation.
  // discovered through code inspection
  // decreaseRoomTemperature();

  // decreaseRoomTemperature;
  // }

  room.currTemp > 10 && room.decreaseTemp();

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
});

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");

// cool preset button
coolBtn.addEventListener("click", () => {
  // console.log(selectedRoom)
  const room = rooms.find((currRoom) => {
    return currRoom.name === selectedRoom;
  });

  // coolPresetTrigger = !coolPresetTrigger;
  const coldPreset = room.coldPreset;

  // console.log(coldPreset);
  room.setCurrTemp(coldPreset);
  // setIndicatorPoint(coldPreset)

  setSelectedRoom(room.name);
  // currentTemp.innerText = `${room.currTemp}°`;
  generateRooms();
});

// warm preset button
warmBtn.addEventListener("click", () => {
  const room = rooms.find((currRoom) => {
    return currRoom.name === selectedRoom;
  });
  // warmPresetTrigger = !warmPresetTrigger;
  const warmPreset = room.warmPreset;
  room.setCurrTemp(warmPreset);
  setSelectedRoom(room.name);
  generateRooms();
});

const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }
});

// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");

  // error cleared -------------->>>>>>>>> error message shows when input is invalid. However when preset form is closed and reopen, the error message is still set to display
  document.querySelector(".error").style.display = "none";
});

// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");

  if (coolInput.value && warmInput.value) {
    // Validate the data
    if (coolInput.value < 10 || coolInput.value > 24) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid cooling temperatures (10° - 24°)";

      // error cleared ----------->>>>> added a return statement to make logic function as expected. Submission will be stopped when data isn't valid
      return;

      // error cleared --------->>>>>> added else block to set error message to none when there's no error.
    } else {
      errorSpan.style.display = "none";
    }

    if (warmInput.value < 25 || warmInput.value > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid warming temperatures (25° - 32°)";

      // error cleared ----------->>>>> added a return statement to make logic function as expected. Submission will be stopped when data isn't valid
      return;

      // error cleared --------->>>>>> added else block to set error message to none when there's no error.
    } else {
      errorSpan.style.display = "none";
    }

    // Validation passed
    // Set current room's presets
    const currRoom = rooms.find((room) => room.name === selectedRoom);

    currRoom.setColdPreset(coolInput.value);
    currRoom.setWarmPreset(warmInput.value);

    // console.log(currRoom.coldPreset)
    // console.log(currRoom.warmPreset)
  }
  // code refactor ------------>>>>>>>> added else block to handle empty input fields
  else {
    errorSpan.style.display = "block";
    errorSpan.innerText = "Temperatures value required!";
  }

  if (coolInput.value || warmInput.value) {
    if (coolInput.value && (coolInput.value < 10 || coolInput.value > 24)) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid cooling temperatures (10° - 24°)";
      return;
    } else {
      errorSpan.style.display = "none";
    }

    if (warmInput.value && (warmInput.value < 25 || warmInput.value > 32)) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid warming temperatures (25° - 32°)";
      return;
    } else {
      errorSpan.style.display = "none";
    }

    // Validation passed
    // Set current room's presets
    const currRoom = rooms.find((room) => room.name === selectedRoom);

    // set preset value based on input type
    coolInput.value && currRoom.setColdPreset(coolInput.value);
    warmInput.value && currRoom.setWarmPreset(warmInput.value);
  }
  // coolInput.value = "";
  // warmInput.value = "";
});

// Rooms Control
// Generate rooms
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
            // error cleared --------->>>>>> logic for message display is not intuitive. comparison sign should be < with the  below implementation
            // }">${room.currTemp > 25 ? "Cooling room to: " : "Warming room to: "}${
          }">${room.currTemp < 25 ? "Cooling room to: " : "Warming room to: "}${
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};
const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `;
};

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();

    // code refactor -------->>>>>> moved below statement to setSelectedRoom function
    // selectedRoom = e.target.parentNode.parentNode.id;

    setSelectedRoom(room.name);
    // console.log(`from switch`, selectedRoom)
  }

  // error cleared ----------->>>> room-name class isn't present on the switch button for which the feature is created for
  // if (e.target.classList.contains("room-name")) {

  // logging value here returns nothing which confirms error logic.
  // Also setSelectedRoom(e.target.parentNode.parentNode.id); can be added to if block above to avoid redundancy.

  // console.log(e.target.parentNode.parentNode.id)
  // setSelectedRoom(e.target.parentNode.parentNode.id);
  // }
});
