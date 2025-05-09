// Boolean to track if the DOB input panel is open or closed
let isDobOpen = false;

// Variable to store the user's date of birth
let dateOfBirth = null;

// DOM elements for settings and text display
const settingCog = document.getElementById('setting-icon');            // Cog icon element
const settingContent = document.getElementById('setting-content');    // The panel with DOB input
const initialText = document.getElementById('initialText');           // Text shown before DOB is set
const afterDobBtnText = document.getElementById('afterDobBtnText');   // Text shown after DOB is set
const dobBtn = document.getElementById('dobBtn');                      // Button to submit DOB
const dobInput = document.getElementById('dobInput');                  // Input field for DOB

// DOM elements for displaying age components
const yearEl = document.getElementById('yearEl');       // Years element
const monthEl = document.getElementById('monthEl');     // Months element
const weekEl = document.getElementById('weekEl');       // Weeks element
const dayEl = document.getElementById('dayEl');         // Days element
const hourEl = document.getElementById('hourEl');       // Hours element
const minuteEl = document.getElementById('minuteEl');   // Minutes element
const secondEl = document.getElementById('secondEl');   // Seconds element

// Toggles the visibility of the DOB input section
const toggleDateOfBirthSelector = () => {
  settingContent.classList.toggle("hide");  // Show/hide input section
  isDobOpen = !isDobOpen;                  // Update toggle state
};

// Calculates and updates the age continuously
const updateAge = () => {
  if (!dateOfBirth) return;  // Exit if DOB hasn't been set

  const now = new Date();             // Current date and time
  const diff = now - dateOfBirth;     // Milliseconds between now and DOB

  // Calculate each time unit from the millisecond difference
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));       // Approximate years
  const months = Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)) % 12); // Approx. months (mod 12)
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));            // Total weeks
  const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44);       // Days within current month
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);              // Hours within the day
  const minutes = Math.floor((diff / (1000 * 60)) % 60);                 // Minutes within the hour
  const seconds = Math.floor((diff / 1000) % 60);                        // Seconds within the minute

  // Update DOM with calculated values
  yearEl.textContent = years;
  monthEl.textContent = months;
  weekEl.textContent = weeks;
  dayEl.textContent = days;
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
};

// Handles setting and saving the DOB when the user clicks the button
const setDOBHandler = () => {
  const input = dobInput.value;    // Get the value from the input
  if (input) {
    dateOfBirth = new Date(input);                  // Convert string to Date object
    initialText.classList.add("hide");              // Hide the initial prompt
    afterDobBtnText.classList.remove("hide");       // Show the age output
    settingContent.classList.add("hide");           // Hide DOB input area
    isDobOpen = false;                              // Update toggle state
    updateAge();                                    // Call once to avoid 1-second wait
  } else {
    // If input is empty, revert to initial state
    afterDobBtnText.classList.add("hide");
    initialText.classList.remove("hide");
  }
};

// Event listener for the cog icon click to show/hide DOB input
settingCog.addEventListener("click", toggleDateOfBirthSelector);

// Event listener for DOB button to set DOB and calculate age
dobBtn.addEventListener("click", setDOBHandler);

// Automatically update the age every second
setInterval(updateAge, 1000);
