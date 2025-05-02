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
// New Room Creation
const modalContainer = document.getElementById('modalContainer');
const addRoomBtn = document.getElementById('addRoom');
const closeModalBtn = document.getElementById('closeModal');
const showModalBtn = document.getElementById('modalBtn');


const coolOverlay = `linear-gradient(
    to bottom,
    rgba(141, 158, 247, 0.2),
    rgba(194, 197, 215, 0.1)
  )`;

const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setOverlay = (room) => {
  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};
setOverlay(rooms[0]);

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

// setInitialOverlay();

document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
});
//Event Delegation For Preset Buttons
const defaultSettings = document.querySelector(".default-settings");
defaultSettings.addEventListener("click", function (e) {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  if (!room) return;
  //Temperature Icons(Preset)
  if (e.target.closest("#cool")) {
    const newTemp = room.setCurrTemp(room.coldPreset);
    setIndicatorPoint(newTemp);
    currentTemp.textContent = `${room.currTemp}°`;
    generateRooms();
    setOverlay(room);
    document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
  }

  if (e.target.closest("#warm")) {
    const newTemp = room.setCurrTemp(room.warmPreset);
    setIndicatorPoint(newTemp);
    currentTemp.textContent = `${room.currTemp}°`;
    generateRooms();
    setOverlay(room);
    document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
  }
});

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  changeTemperature("increase");
});

document.getElementById("reduce").addEventListener("click", () => {
  changeTemperature("decrease");
});
const changeTemperature = (action) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);

  if (action === "increase" && room.currTemp < 32) {
    room.increaseTemp();
  } else if (action === "decrease" && room.currTemp > 10) {
    room.decreaseTemp();
  }

  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;
  generateRooms();
  setOverlay(room);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};


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
  const errorSpan = document.querySelector(".error");
  errorSpan.style.display = "none";
  errorSpan.innerText = "";
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
      errorSpan.innerText = "Enter valid cool temperatures (10° - 24°)";
    }

    if (warmInput.value < 25 || warmInput.value > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid warm temperatures (25° - 32°)";
    }
  }
  // Validation passed
  // Set current room's presets
  const currRoom = rooms.find((room) => room.name === selectedRoom);
  let validCoolInput =
    coolInput.value >= 10 && coolInput.value <= 24
      ? coolInput.value
      : currRoom.currTemp;

  let validWarmInput =
    warmInput.value >= 25 && warmInput.value <= 32
      ? warmInput.value
      : currRoom.currTemp;

  currRoom.setColdPreset(validCoolInput);
  currRoom.setWarmPreset(validWarmInput);
  coolInput.value = "";
  warmInput.value = "";
});

// Modal for adding new room
function createNewRoom() {
  const name = document.getElementById('roomName').value.trim();
  const currTemp = parseInt(document.getElementById('currentTemp').value);
  const coldPreset = parseInt(document.getElementById('coldPreset').value);
  const warmPreset = parseInt(document.getElementById('warmPreset').value);
  const image = "./assets/two-queen-ocean-view-03.jpg.jpg"; 
  const startTime = document.getElementById('startTime').value;
const endTime = document.getElementById('endTime').value;

if (!startTime || !endTime) {
  alert('Please enter start and end times.');
  return;
}


  // Basic validation
  if (!name || isNaN(currTemp) || isNaN(coldPreset) || isNaN(warmPreset)) {
    alert('Please enter all fields correctly.');
    return;
  }

  if (coldPreset < 10 || coldPreset > 24) {
    alert('Cold preset must be between 10°C and 24°C');
    return;
  }

  if (warmPreset < 25 || warmPreset > 32) {
    alert('Warm preset must be between 25°C and 32°C');
    return;
  }

  if (currTemp < 10 || currTemp > 32) {
    alert('Current temperature must be between 10°C and 32°C');
    return;
  }

  // Create new room object
  const newRoom = {
    name,
    currTemp,
    coldPreset,
    warmPreset,
    image:"/assets/two-queen-ocean-view-03.jpg",
    airConditionerOn: false,
    startTime,
    endTime,

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
      this.airConditionerOn = !this.airConditionerOn;
    }
  };

  // Push to rooms array 
  rooms.push(newRoom);

  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  roomSelect.appendChild(option);
  roomSelect.value = name;

  // Reset inputs and close modal
  document.getElementById('roomName').value = '';
  document.getElementById('currentTemp').value = '';
  document.getElementById('coldPreset').value = '';
  document.getElementById('warmPreset').value = '';
 

  modalContainer.classList.add('hidden');

  // Set new room as selected
  selectedRoom = name;
  setSelectedRoom(name);
  generateRooms();
}
// AC Schedules
function checkACSchedules() {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  rooms.forEach(room => {
    if (allACsOn || room.manualOverride) return;
    if (!room.startTime || !room.endTime) return;
    
    //start and end times
    const [startHours, startMinutes] = room.startTime.split(':').map(Number);
    const [endHours, endMinutes] = room.endTime.split(':').map(Number);
    const currentTotal = currentHours * 60 + currentMinutes;
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;
    
    if (currentTotal >= startTotal && currentTotal < endTotal) {
      if (!room.airConditionerOn) {
        room.airConditionerOn = true;
        console.log(`AC turned ON for ${room.name}`);
        generateRooms(); 
      }
    } else {
      if (room.airConditionerOn) {
        room.airConditionerOn = false;
        console.log(`AC turned OFF for ${room.name}`);
        generateRooms(); 
      }
    }
  });
}
setInterval(checkACSchedules, 1000);


const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch" >
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          }">${room.currTemp > 25 ? "Warming room to: " : "Cooling room to: "}${
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

// Turn on/off all ACs
let allACsOn = false;
function toggleAllACs() {
  allACsOn = !allACsOn;
  rooms.forEach(room => {
    room.airConditionerOn = allACsOn;
  });
  document.getElementById('toggleAllACsBtn').textContent = 
    allACsOn ? 'Turn OFF All ACs' : 'Turn ON All ACs';
  generateRooms();        
}

document.getElementById('toggleAllACsBtn').addEventListener('click', toggleAllACs);
// Modal Event Listeners
showModalBtn.addEventListener('click', () => {
  modalContainer.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modalContainer.classList.add('hidden');
});

modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.add('hidden');
  }
});

addRoomBtn.addEventListener('click', createNewRoom);



document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.manualOverride = true;
    room.toggleAircon();
    generateRooms();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
    roomSelect.value = roomElement.id;
  }
});
