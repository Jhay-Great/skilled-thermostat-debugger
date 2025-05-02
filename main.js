// Room objects
const initializeRooms = () => {
  // Try to load from localStorage first
  const savedRooms = localStorage.getItem('smartHomeRooms');
  if (savedRooms) {
    const parsedRooms = JSON.parse(savedRooms);
    // Reattach methods to loaded rooms
    return parsedRooms.map(room => {
      return {
        ...room,
        setCurrTemp(temp) { this.currTemp = temp; },
        setColdPreset(newCold) { this.coldPreset = newCold; },
        setWarmPreset(newWarm) { this.warmPreset = newWarm; },
        decreaseTemp() { this.currTemp--; },
        increaseTemp() { this.currTemp++; },
        toggleAircon() {
          this.airConditionerOn = !this.airConditionerOn;
          if (this.airConditionerOn) {
            const action = this.currTemp <= 24 ? "Cooling" : "Warming";
            speak(`${action} ${this.name} to ${this.currTemp}°`, "high");
          } else {
            speak(`${this.name} air conditioning turned off`, "low");
          }
          generateRooms();
          saveRoomsToStorage();
        }
      };
    });
  }
  const { currentTime, laterTime } = getCurrentTimes();
  return [
    {
      name: "Living Room",
      currTemp: 32,
      coldPreset: 20,
      warmPreset: 32,
      image: "./assets/living-room.jpg",
      airConditionerOn: false,
      startTime: '16:30',
      endTime: '20:00',

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
      if (this.airConditionerOn) {
        const action = this.currTemp <= 24 ? "Cooling" : "Warming";
        speak(`${action} ${this.name} to ${this.currTemp}°`);
      } else {
        speak(`${this.name} air conditioning turned off`);
      }
      generateRooms(); // Force UI update
    },
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

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
  if (this.airConditionerOn) {
    const action = this.currTemp <= 24 ? "Cooling" : "Warming";
    speak(`${action} ${this.name} to ${this.currTemp}°`);
  } else {
    speak(`${this.name} air conditioning turned off`);
  }
  generateRooms(); // Force UI update
}
  },
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

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
  if (this.airConditionerOn) {
    const action = this.currTemp <= 24 ? "Cooling" : "Warming";
    speak(`${action} ${this.name} to ${this.currTemp}°`);
  } else {
    speak(`${this.name} air conditioning turned off`);
  }
  generateRooms(); // Force UI update
}
  },
  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

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
  if (this.airConditionerOn) {
    const action = this.currTemp <= 24 ? "Cooling" : "Warming";
    speak(`${action} ${this.name} to ${this.currTemp}°`);
  } else {
    speak(`${this.name} air conditioning turned off`);
  }
  generateRooms(); // Force UI update
}
  },
];
};
const rooms = initializeRooms();
function saveRoomsToStorage() {
  // Create a clean object without methods for storage
  // 
  const roomsToSave = rooms.map(room => {
    return {
      name: room.name,
      currTemp: room.currTemp,
      coldPreset: room.coldPreset,
      warmPreset: room.warmPreset,
      image: room.image,
      airConditionerOn: room.airConditionerOn,
      startTime: room.startTime,
      endTime: room.endTime
      // Only include properties, not methods
    };
  });
  localStorage.setItem('smartHomeRooms', JSON.stringify(roomsToSave));
}


const warmOverlay =`linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;




const coolOverlay =`linear-gradient(
    to bottom,
    rgba(141, 158, 247, 0.2),
    rgba(194, 197, 215, 0.1)
  )`;
// Initialize the application



const setInitialOverlay = () => {
  const roomElement = document.querySelector(".room");
  roomElement.style.backgroundImage = `url('${rooms[0].image}')`;
  updateRoomOverlay(rooms[0]);
};

const updateRoomOverlay = (room) => {
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

  return {
    translateX: radius * Math.cos(radians),
    translateY: radius * Math.sin(radians)
  };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Room selection
const populateRoomSelect = () => {
  const roomSelect = document.getElementById("rooms");
  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = room.name;
    roomSelect.appendChild(option);
  });
};

let selectedRoom = rooms[0].name;

const setSelectedRoom = (roomName) => {
  selectedRoom = roomName;
  const room = rooms.find((r) => r.name === roomName);
  
  setIndicatorPoint(room.currTemp);
  document.getElementById("temp").textContent = `${room.currTemp}°`;
  updateRoomOverlay(room);
  document.querySelector(".room-name").textContent = roomName;
  document.querySelector(".currentTemp").textContent = `${room.currTemp}°`;
  
  // Update preset button states
  updatePresetButtonStates(room);
};

// Temperature controls
// Update temperature change handlers
const handleTemperatureChange = (changeType) => {
  const room = rooms.find((r) => r.name === selectedRoom);
  
  if (changeType === 'increase' && room.currTemp < 32) {
    room.increaseTemp();
   speak(`Temperature increased to ${room.currTemp}°`);
  } else if (changeType === 'decrease' && room.currTemp > 10) {
    room.decreaseTemp();
   speak(`Temperature decreased to ${room.currTemp}°`);
  }
  
  updateRoomUI(room);
  saveRoomsToStorage(); // Add this line
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Updates the room UI to reflect the current temperature of the given room.
 *
 * @param {Object} room The room object to update the UI for.
 */
/*******  97a0b6b7-fc67-4517-8e50-1085dd523b23  *******/
const updateRoomUI = (room) => {
  setIndicatorPoint(room.currTemp);
  document.getElementById("temp").textContent = `${room.currTemp}°`;
  document.querySelector(".currentTemp").textContent = `${room.currTemp}°`;
  updateRoomOverlay(room);
  generateRooms();
  
  // Reset preset button states when manually changing temp
  updatePresetButtonStates(room);
};

// Preset functionality
const updatePresetButtonStates = (room) => {
  const coolBtn = document.getElementById("cool");
  const warmBtn = document.getElementById("warm");
  
  coolBtn.style.backgroundColor = room.currTemp === room.coldPreset ? '#a8c7ff' : '#d9d9d9';
  warmBtn.style.backgroundColor = room.currTemp === room.warmPreset ? '#ffa8a8' : '#d9d9d9';
};

const applyPreset = (presetType) => {
  const room = rooms.find((r) => r.name === selectedRoom);
  const targetTemp = presetType === 'cool' ? room.coldPreset : room.warmPreset;
  
  room.setCurrTemp(targetTemp);
  updateRoomUI(room);
  saveRoomsToStorage(); // Add this line
  
  // Highlight the active preset button
  const coolBtn = document.getElementById("cool");
  const warmBtn = document.getElementById("warm");
  
  if (presetType === 'cool') {
    coolBtn.style.backgroundColor = '#a8c7ff';
    warmBtn.style.backgroundColor = '#d9d9d9';
  } else {
    warmBtn.style.backgroundColor = '#ffa8a8';
    coolBtn.style.backgroundColor = '#d9d9d9';
  }
};

// Schedule functionality
const updateSchedule = (roomName, startTime, endTime) => {
  const room = rooms.find((r) => r.name === roomName);
  if (room) {
    room.startTime = startTime;
    room.endTime = endTime;
    generateRooms();
    checkSchedule();
    saveRoomsToStorage(); // Add this line
  }
};
// BUG FIX: Proper time handling
function getCurrentTimes() {
  const now = new Date();
  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  
  const later = new Date(now.getTime() + 30 * 60000);
  const laterHours = later.getHours().toString().padStart(2, '0');
  const laterMinutes = later.getMinutes().toString().padStart(2, '0');
  
  return {
    currentTime: `${currentHours}:${currentMinutes}`,
    laterTime: `${laterHours}:${laterMinutes}`
  };
}
function convertTimeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

// BUG FIX: Proper schedule checking
function checkSchedule() {
  const now = new Date();
  const currentMinutesTotal = now.getHours() * 60 + now.getMinutes();

  rooms.forEach(room => {
    const startMinutes = convertTimeToMinutes(room.startTime);
    const endMinutes = convertTimeToMinutes(room.endTime);
    
    const shouldBeOn = currentMinutesTotal >= startMinutes && 
                      currentMinutesTotal <= endMinutes;
    
    if (shouldBeOn && !room.airConditionerOn) {
      room.airConditionerOn = true;
      if (room.currTemp > 25) {
        room.setCurrTemp(room.coldPreset);
      } else {
        room.setCurrTemp(room.warmPreset);
      }
    } else if (!shouldBeOn && room.airConditionerOn) {
      room.airConditionerOn = false;
    }
  });

  generateRooms();
  
  const currentRoom = rooms.find(r => r.name === selectedRoom);
  if (currentRoom) {
    updateRoomUI(currentRoom);
  }
}

const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";

  rooms.forEach((room) => {
   // In generateRooms() function:
roomsHTML += `
<div class="room-control" id="${room.name}">
  <div class="top">
    <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
    <button class="switch">
      <ion-icon name="power-outline" class="${room.airConditionerOn ? "powerOn" : ""}"></ion-icon>
    </button>
  </div>
  <div class="time-display">
    <input type="time" class="time-input" data-room="${room.name}" data-type="start" 
           value="${room.startTime}" step="3600">
    <div class="bars">
      ${Array(32).fill('<span class="bar"></span>').join('')}
    </div>
    <input type="time" class="time-input" data-room="${room.name}" data-type="end" 
           value="${room.endTime}">
  </div>
  <span class="room-status" style="display: ${room.airConditionerOn ? "block" : "none"}">
    ${room.currTemp > 25 ? "Cooling room to: " : "Warming room to: "}${room.currTemp}°
  </span>
</div>`;
  });

  roomsControlContainer.innerHTML = roomsHTML;
  updateMasterToggle();
};
const setupTimeInputListeners = () => {
  document.querySelectorAll('.time-input').forEach(input => {
    // Force 24-hour format on focus
    input.addEventListener('focus', () => {
      input.type = 'text';
      input.type = 'time'; // This tricks browsers into showing 24-hour format
    });

    input.addEventListener('change', function() {
      const roomName = this.dataset.room;
      const type = this.dataset.type;
      const room = rooms.find(r => r.name === roomName);
      
      if (room) {
        // Ensure proper formatting
        let timeValue = this.value;
        if (!timeValue.includes(':')) {
          timeValue = `${timeValue.padStart(2, '0')}:00`;
        }
        
        if (type === 'start') {
          room.startTime = timeValue;
        } else {
          room.endTime = timeValue;
        }
        checkSchedule();
      }
    });
  });
};

// Format time for display (e.g., "16:30" → "4:30 PM")
// Format time for display
const formatDisplayTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Add this function to handle room creation


// Modified addNewRoom function


// Update your event listener


const isValidTime = (timeStr) => {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
};

const displayTime = (room) => {
  return `
    <div class="time-display">
      <span class="time">${room.startTime}</span>
      <div class="bars">
        ${Array(32).fill('<span class="bar"></span>').join('')}
      </div>
      <span class="time">${room.endTime}</span>
    </div>
  `;
};

// Event Listeners
const setupEventListeners = () => {
  // Room selection
  document.getElementById("rooms").addEventListener("change", function() {
    setSelectedRoom(this.value);
  });

  // Temperature controls
  document.getElementById("increase").addEventListener("click", () => {
    handleTemperatureChange('increase');
  });

  document.getElementById("reduce").addEventListener("click", () => {
    handleTemperatureChange('decrease');
  });

  // Preset buttons
  document.getElementById("cool").addEventListener("click", () => {
    applyPreset('cool');
  });
  // Add to setupEventListeners()


  document.getElementById("warm").addEventListener("click", () => {
    applyPreset('warm');
  });

  // Preset configuration
  document.getElementById("newPreset").addEventListener("click", () => {
    document.querySelector(".inputs").classList.remove("hidden");
  });

  document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".inputs").classList.add("hidden");
    document.querySelector(".error").style.display = "none";
  });

 // BUG FIX: Proper temperature validation
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");
  
  errorSpan.style.display = "none";
  
  if (!coolInput.value || !warmInput.value) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "Please enter both temperatures";
    return;
  }
  
  const coolTemp = parseInt(coolInput.value);
  const warmTemp = parseInt(warmInput.value);
  
  if (coolTemp < 10 || coolTemp > 24) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "Cool preset must be between 10°-24°";
    return;
  }
  
  if (coolTemp >= warmTemp) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "Cool temp must be lower than warm temp";
    return;
  }
  
  const room = rooms.find((r) => r.name === selectedRoom);
  room.setColdPreset(coolTemp);
  room.setWarmPreset(warmTemp);
  
  coolInput.value = "";
  warmInput.value = "";
  document.querySelector(".inputs").classList.add("hidden");
  updatePresetButtonStates(room);
});


  // Room controls delegation
  document.querySelector(".rooms-control").addEventListener("click", (e) => {
    const roomControl = e.target.closest(".room-control");
    if (!roomControl) return;
    
    const roomName = roomControl.id;
    
    // Power button
    if (e.target.closest(".switch")) {
      const room = rooms.find((r) => r.name === roomName);
      room.toggleAircon();
      generateRooms();
    }
    
    // Room name click
    if (e.target.classList.contains("room-name")) {
      setSelectedRoom(roomName);
      document.getElementById("rooms").value = roomName;
    }
  });

  // Time input changes
  document.querySelector(".rooms-control").addEventListener("change", (e) => {
    if (e.target.classList.contains("start-time") || e.target.classList.contains("end-time")) {
      const roomControl = e.target.closest(".room-control");
      if (!roomControl) return;
      
      const roomName = roomControl.id;
      const startTime = roomControl.querySelector(".start-time").value;
      const endTime = roomControl.querySelector(".end-time").value;
      updateSchedule(roomName, startTime, endTime);
    }
  });
};

const acPowerToggle = document.getElementById('ac-power-toggle');
const statusIndicator = document.querySelector('.status-indicator');
    
acPowerToggle.addEventListener('change', function() {
  // Animation
  const slider = this.nextElementSibling;
  slider.classList.add('animate-pulse');
  setTimeout(() => slider.classList.remove('animate-pulse'), 300);
  
  // Status indicator
  if (this.checked) {
    statusIndicator.classList.add('active');
    
    // Turn on all ACs immediately
    rooms.forEach(room => {
      if (!room.airConditionerOn) room.toggleAircon();
    });
    generateRooms();
    
    // Play delayed sounds (simple timeout approach)
    setTimeout(() => {
      // Play AC sound for each room with delays
      rooms.forEach((room, index) => {
        setTimeout(() => {
          if (room.airConditionerOn) {
          }
        }, index * 300); // 300ms between each
      });
      
      // Play completion sound after all rooms
      setTimeout(() => {
      }, rooms.length * 300);
    }, 1000); // Initial 1 second delay
    
  } else {
    statusIndicator.classList.remove('active');
    // Turn off all ACs
    rooms.forEach(room => {
      if (room.airConditionerOn) room.toggleAircon();
    });
    generateRooms();
   ; // Stop any playing sounds
  }
});

// BUG FIX: Proper master toggle state
function updateMasterToggle() {
  const allOn = rooms.every(room => room.airConditionerOn);
  const allOff = rooms.every(room => !room.airConditionerOn);
  
  if (allOn) {
    acPowerToggle.checked = true;
    statusIndicator.classList.add('active');
  } else if (allOff) {
    acPowerToggle.checked = false;
    statusIndicator.classList.remove('active');
  } else {
    acPowerToggle.indeterminate = true;
  }
}
// Add to main.js






// new functionalities and new features added by me;
// FEATURE: Smart Temperature AI



// FEATURE: Text-to-speech
function speak(text, priority = "low") {
  if (window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.volume = priority === "high" ? 1 : 0.7;
    
    const voices = speechSynthesis.getVoices();
    utterance.voice = priority === "high" 
      ? voices.find(v => v.name.includes("Google US English")) 
      : voices.find(v => v.name.includes("Microsoft Hazel"));
    
    speechSynthesis.speak(utterance);
  }
}

// FEATURE: Enhanced AC toggle with audio
// rooms.forEach(room => {
//   // const originalToggle = room.toggleAircon;
//   room.toggleAircon = function() {
//     // originalToggle.apply(this);
//     if (this.airConditionerOn) {
//       speak(`${this.name} air conditioning activated`);
//     } else {
//     }
//   };
// });

// FEATURE: Room creation
function showAddRoomModal() {
  Swal.fire({
    title: 'Add New Room',
    html: `<input type="text" id="swal-room-name" class="swal2-input" placeholder="Room name" autofocus>`,
    showCancelButton: true,
    confirmButtonText: 'Add Room',
    preConfirm: () => {
      const name = document.getElementById('swal-room-name').value.trim();
      if (!name) {
        Swal.showValidationMessage('Please enter a room name');
        return false;
      }
      if (rooms.some(r => r.name === name)) {
        Swal.showValidationMessage('Room already exists');
        return false;
      }
      return name;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      addNewRoom(result.value);
    }
  });
}
document.getElementById('add-room-btn').addEventListener('click', showAddRoomModal);
// FEATURE: New room addition
function addNewRoom(name) {
  const newRoom = {
    name,
    currTemp: 22,
    coldPreset: 20,
    warmPreset: 28,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: '08:00',
    endTime: '22:00',
    setCurrTemp(temp) { this.currTemp = temp; },
    decreaseTemp() { if (this.currTemp > 10) this.currTemp--; },
    increaseTemp() { if (this.currTemp < 32) this.currTemp++; },
  /**
   * Toggles the air conditioner on or off.
   * If turned on, speaks an announcement of the room being cooled or warmed to the current temperature.
   * If turned off, speaks an announcement of the room's air conditioning being turned off.
   * Updates the room UI and saves the rooms to local storage.
   */
    toggleAircon() {
      this.airConditionerOn = !this.airConditionerOn;
      if (this.airConditionerOn) {
        const action = this.currTemp <= 24 ? "Cooling" : "Warming";
        speak(`${action} ${this.name} to ${this.currTemp}°`, "high");
      } else {
        speak(`${this.name} air conditioning turned off`, "low");
      }
      generateRooms();
      saveRoomsToStorage();
    }
  };

  rooms.push(newRoom);
  
  const option = new Option(name, name);
  document.getElementById("rooms").appendChild(option);
  generateRooms();
  saveRoomsToStorage();
  
  Swal.fire({
    icon: 'success',
    title: `${name} added!`,
    showConfirmButton: false,
    timer: 1500
  });
}

// Update toggleAircon in your room initialization






const init = () => {
  setInitialOverlay();
  populateRoomSelect();
  generateRooms();
  setupEventListeners();
  setInterval(checkSchedule, 60000);
};

// Initialize the app
document.addEventListener("DOMContentLoaded", init);
