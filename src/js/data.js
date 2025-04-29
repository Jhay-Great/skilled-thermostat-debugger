// Room objects
export const rooms = [
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
      image: "../assets/kitchen.jpg",
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
      image: "../assets/bathroom.jpg",
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
      image: "../assets/bedroom.jpg",
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
        this.airConditionerOn
          ? (this.airConditionerOn = false)
          : (this.airConditionerOn = true);
      },
    },
  ];
  