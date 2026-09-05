// Function to scroll the browser tab title continuously
function scrollTitle(titleText, speed = 500) {
  // Add spacing so the end and start of the text don't stick together
  let text = titleText + "   •   "; 

  setInterval(() => {
    // Move the first character to the end of the string
    text = text.substring(1) + text.substring(0, 1);
    document.title = text;
  }, speed);
}

// Pass your club or hackathon website title here
scrollTitle("OpenLake - An Open Road to OpenSource");
