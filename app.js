/**
 * Text editor which saves the user entered text in the browser localStorage.
 *
 * Check for the onChange event in the editor div and save the changes to the
 * storage object. Uses an event handler for the input event.
 *
 * Local storage is accessed much like an array.
 */

const heading = document.querySelector(".heading");
const content = document.querySelector(".content");
const inputarea = document.querySelector(".input-area");

// Get the values from storage, or set default text if nothing in storage
heading.innerHTML = localStorage["title"] || "Heading...";
content.innerHTML = localStorage["text"] || "Text will be saved automatically.";

// Listen for the input events on the editor and save the text to localStorage
heading.addEventListener("input", () => {
  localStorage["title"] = heading.innerHTML;
});
content.addEventListener("input", () => {
  localStorage["text"] = content.innerHTML;
});

document.execCommand("styleWithCSS");

// List of all styling and alignment button elements
const buttonList = document.querySelectorAll(".styling-area button, .align-area button");

// Add event listener for each button to trigger appropriate command
buttonList.forEach( button => button.addEventListener("click", applyCommand));

/**
 * Execute the appropriate command when a button is clicked.
 *
 * Get the command type from the button @param data attribute. Then
 * call the toggleButton() function to apply correct styling.
 */
function applyCommand() {
  const command = this.dataset.command;
  document.execCommand(command);
  toggleButton(this);
}

/**Apply or remove 'pressed' style to button when clicked.*/
function toggleButton(button) {
  if (button.className === "pressed") {
    button.className = "";
  }
  else {
    button.className = "pressed";
  }
}

/**
 * Get selected font-size and apply to the selected text.
 *
 * Wrap the selected text in <span> tags with a font-size style attribute of the
 * value chosen in the list.
 *
 * Then apply the selected font-style to prevent the <span> insertion
 * from overwriting any previous styling.
 */
const fontSelector = document.getElementById("font");
const sizeSelector = document.getElementById("fontsize");
const toggleFont = () => document.execCommand("fontName", false, fontSelector.value);

fontSelector.onchange = () => toggleFont();
sizeSelector.onchange = () => {
  const selection = window.getSelection();
  const span = (
    `<span style='font-size: ${sizeSelector.value};
    font-family: ${fontSelector.value};'>`
    + selection + `</span>`
  );
  document.execCommand("insertHTML", false, span);
}

/**
 * Clear editor when button pressed.
 *
 * Remove all innerHTML from the editor, clear localStorage
 * and refresh window.
 */
const clear = document.getElementById("new");
clear.onclick = () => {
  content.innerHTML = "";
  heading.innerHTML = "";
  localStorage.clear();
  document.location.reload(false);
}

