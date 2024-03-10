// Generic function to show placeholder content for various sections
function showPlaceholder(sectionName) {
    // For simplicity, show an alert or modify a specific element's content
    alert(`Placeholder for ${sectionName}`);
 }
 
 
 document.getElementById('search-btn').addEventListener('click', function () {
    var input = document.getElementById('search-input');
    if (input.style.width === '150px') {
       input.style.width = '0';
       input.style.opacity = '0';
    } else {
       input.style.width = '150px';
       input.style.opacity = '1';
       input.focus(); // Focus on the input when expanded
    }
 })
 
 document.addEventListener('DOMContentLoaded', () => {
    // Select all sub-items
    const subItems = document.querySelectorAll('.nav-button.sub-item');
 
    subItems.forEach(item => {
       item.addEventListener('click', function () {
          const columnId = this.getAttribute('data-column'); // Get the associated column ID
          openColumnById(columnId); // Open the corresponding sidebar2
       });
    });
 });
 
 
 document.addEventListener("DOMContentLoaded", function () {
    // Function to count the number of cities in each region and update the count
    function updateButtonCounts() {
       // Get all region titles
       const regionTitles = document.querySelectorAll('.nav-title2');
 
       // Loop through each region title
       regionTitles.forEach(function (title) {
          // Get the ID of the region's container
          const regionId = title.getAttribute('data-next-column');
 
          // Get all buttons within the region
          const buttons = document.querySelectorAll(`#${regionId} .nav-button`);
 
          // Update the count next to the region title
          const countElement = title.querySelector('.count');
          if (countElement) {
             countElement.textContent = `(${buttons.length})`;
          }
       });
    }
 
    // Call the function to update button counts when the DOM content is loaded
    updateButtonCounts();
 });
 
 document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for menu item clicks
    const menuItems = document.querySelectorAll('.nav-button');
    menuItems.forEach(item => {
       item.addEventListener('click', () => {
          // Hide all submenus
          const submenus = document.querySelectorAll('.submenu');
          submenus.forEach(submenu => {
             submenu.style.display = 'none';
          });
 
          // Show submenu corresponding to the clicked item
          const submenuId = item.getAttribute('data-next-column');
          const submenu = document.getElementById(submenuId);
          if (submenu) {
             submenu.style.display = 'block';
          }
 
          // Check if the clicked item is already active
          const isActive = item.classList.contains('active');
 
          // Remove 'active' class from all items in the same column
          const currentColumn = item.closest('.column');
          currentColumn.querySelectorAll('.nav-button').forEach(otherItem => {
             otherItem.classList.remove('active');
          });
 
          // Hide all subsequent columns after the last active column
          let column = currentColumn.nextElementSibling;
          while (column) {
             column.style.display = 'none';
             column = column.nextElementSibling;
          }
 
          // Show the associated column
          const nextColumn = document.getElementById(submenuId);
          if (nextColumn) {
             // Show the next column
             nextColumn.style.display = 'block';
             // Add 'active' class to clicked item
             item.classList.add('active');
          } else {
             // If there's no next column, remove 'active' class from clicked item
             item.classList.remove('active');
          }
 
          // If the clicked item was already active, hide its subsequent columns
          if (isActive && nextColumn) {
             let subColumn = nextColumn.nextElementSibling;
             while (subColumn) {
                subColumn.style.display = 'none';
                subColumn = subColumn.nextElementSibling;
             }
          }
       });
    });
 });
 
 document.addEventListener("DOMContentLoaded", function () {
    // Select all nav buttons within the sidebars
    const sidebarButtons = document.querySelectorAll('#sidebar .nav-button');
    const sidebar2Buttons = document.querySelectorAll('#sidebar2 .nav-button');
    const column3Buttons = document.querySelectorAll('#column3 .nav-button');
 
    const handleButtonClick = (button, allButtons) => {
       // Find all sibling buttons within the same parent container and remove 'active'
       allButtons.forEach(sibling => {
          if (sibling !== button) {
             sibling.classList.remove('active');
          }
       });
       // Add 'active' class to the clicked button
       button.classList.add('active');
    };
 
    // Attach event listeners to sidebar buttons
    sidebarButtons.forEach(button => {
       button.addEventListener('click', function () {
          handleButtonClick(this, sidebarButtons);
       });
    });
 
    // If there are buttons outside these groups or in dynamically loaded content ('column3', etc.), 
    // you might need to adjust the selector or add more logic to handle those cases.
 });
 document.addEventListener('DOMContentLoaded', function () {
    // Select all dropdown titles
    const dropdownTitles = document.querySelectorAll('.drop-button');
 
    dropdownTitles.forEach(title => {
       title.addEventListener('click', function () {
          // Toggle the 'open' class on the parent '.nav-item' to show/hide the dropdown
          this.closest('.nav-item').classList.toggle('open');
       });
    });

 });
 
 document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.region-title').forEach(title => {
       title.addEventListener('click', function () {
          const region = this.parentNode;
          const isCollapsing = region.classList.contains('expanded');
          region.classList.toggle('expanded'); // Assuming .region-title is a direct child of .region
          region.classList.toggle('collapsed');
 
          if (isCollapsing) {
             // If the region is being collapsed, reset button texts
             resetButtonContents(region);
          } else {
             // If the region is being opened, apply the typewriter effect
             applyTypewriterEffectToRegion(region); // Call the function for the opened region
          }
       });
    });
 
    const config = {
       attributes: true,
       attributeFilter: ['class']
    };
    document.querySelectorAll('.region').forEach(region => {
       observer.observe(region, config);
    });
 });
 
 function resetButtonContents(regionElement) {
    // Select only the buttons within the provided region element
    const buttons = regionElement.querySelectorAll('.nav-button[data-info]');
    buttons.forEach(button => {
       // Reset the text content to empty or initial state here
       // If you stored the original text in a 'data-info' attribute, you could use that
       button.textContent = '';
    });
 }
 
 function applyTypewriterEffectToRegion(regionElement) {
    // Select only the buttons within the provided region element
    const buttons = regionElement.querySelectorAll('.nav-button[data-info]');
    let currentIndex = 0;
 
    function typeNextButton() {
       if (currentIndex < buttons.length) {
          const button = buttons[currentIndex];
          const text = button.getAttribute('data-info');
          button.textContent = '';
          let letterIndex = 0;
 
          function typeLetter() {
             if (letterIndex < text.length) {
                button.textContent += text.charAt(letterIndex);
                letterIndex++;
                // Adjust the typing speed if necessary
                setTimeout(typeLetter, 0.01); // Example: 75 milliseconds between letters
             } else {
                currentIndex++;
                setTimeout(typeNextButton, 0.01); // Example: 150 milliseconds before starting the next button
             }
          }
 
          typeLetter();
       }
    }
 
    typeNextButton();
 }
 
 
 document.addEventListener('DOMContentLoaded', function () {
    // Select all navigation buttons within #column3
    const navButtons = document.querySelectorAll('#column3 .nav-button');
 
    navButtons.forEach(function (button) {
       // Create a wrapper div and symbol span
       let wrapperDiv = document.createElement('div');
       wrapperDiv.classList.add('nav-button-wrapper');
       let symbolSpan = document.createElement('span');
       symbolSpan.classList.add('member-symbol');
       symbolSpan.textContent = '􀉪'; // Placeholder symbol
       symbolSpan.style.color = 'black'; // Placeholder color, adjust as needed
       symbolSpan.style.marginRight = '5px'; // Space between symbol and button
 
       // Insert the wrapper before the button in the DOM
       button.parentNode.insertBefore(wrapperDiv, button);
 
       // Move the button inside the wrapper and prepend the symbol span
       wrapperDiv.appendChild(symbolSpan);
       wrapperDiv.appendChild(button);
    });
 });
 
 document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.region .nav-button');
    const dashboardGrid = document.querySelector('.dashboard-grid');
 
    const infoPlaceholders = {
       'button1': '<p>This is the placeholder content for Dashboard Info 1. It can be replaced with actual dynamic content as needed.</p>',
       'button2': '<p>Placeholder content for Dashboard Info 2 appears here. Similar to Button 1, replace this with real content or fetch data dynamically.</p>',
       // Extend placeholders for additional buttons as needed
    };
 
    buttons.forEach(button => {
       button.addEventListener('click', function () {
          // Retrieve the key from the button's data-info attribute
          const infoKey = button.getAttribute('data-info');
          // Use the key to fetch placeholder content
          const contentToShow = infoPlaceholders[infoKey];
          // Update the dashboard grid with the placeholder content
          dashboardGrid.innerHTML = contentToShow;
       });
    });
 });
 
 
 document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners to city navigation buttons
    document.querySelectorAll('#column3 .nav-button').forEach(button => {
       button.addEventListener('click', function () {
          const cityName = this.innerText; // Assuming the button's text content is the city name
          updateCityNameInDashboard(cityName);
       });
    });
 });
 
 function updateCityNameInDashboard(cityName) {
    // Update the header with the city name
    document.getElementById('city-name-header').textContent = cityName;
 }
 
 document.addEventListener('DOMContentLoaded', function () {
    const cityButtons = document.querySelectorAll('#column3 .nav-button');
 
 });
 // Function to handle clicking on city navigation buttons
 function activateCityButton() {
    const regionContainers = document.querySelectorAll('.region'); // Assuming each region has a .region class
 
    regionContainers.forEach(container => {
       const cityButtons = container.querySelectorAll('.region .nav-button'); // Assuming each city button has a .city-nav-button class
       cityButtons.forEach(button => {
          button.addEventListener('click', function () {
             // Remove active class from all city buttons within the same region
             cityButtons.forEach(btn => btn.classList.remove('active'));
             // Add active class to the clicked city button
             this.classList.add('active');
          });
       });
    });
 }
 
 document.addEventListener('DOMContentLoaded', activateCityButton);
 document.addEventListener('DOMContentLoaded', function () {
   // Select all navigation buttons within #column3 for city selection
   const cityNavButtons = document.querySelectorAll('#column3 .nav-button');

   cityNavButtons.forEach(function (button) {
       button.addEventListener('click', function () {
           // Upon clicking a city button, select the .dashboard-layout element
           const dashboardLayout = document.querySelector('.dashboard-layout');
           const sidebar = document.getElementById('sidebar');
           const column3 = document.getElementById('column3');

           if (dashboardLayout) {
               // Change the display property of .dashboard-layout to 'grid'
               dashboardLayout.style.display = 'grid';

               // Optionally set additional grid properties here if needed
               dashboardLayout.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
               dashboardLayout.style.gridGap = '20px';
               dashboardLayout.style.padding = '20px';
               // More properties can be added as per your layout requirements

               // Update the dashboard with information related to the clicked city
               // This could involve fetching data or updating text/content dynamically
               updateCityNameInDashboard(this.innerText); // Assuming you want to update some header or title with the city name

               // Apply .farshift class to sidebar and column3
               if (sidebar && column3) {
                   sidebar.classList.add('farshift');
                   column3.classList.add('farshift');
               }
           }
       });
   });
});


function updateCityNameInDashboard(cityName) {
    // Assuming there's an element with the id 'city-name-header' that you want to update with the city name
    const headerElement = document.getElementById('city-name-header');
    if (headerElement) {
        headerElement.textContent = cityName;
    }
}



// Make sure to call adjustLayout() in your actual code where the visibility of column3 or the dashboard changes

document.addEventListener('DOMContentLoaded', function () {
   // Select all dropdown nav-buttons within the sidebar
   const dropDownNavButtons = document.querySelectorAll('#sidebar .dropdown-menu .nav-button');

   dropDownNavButtons.forEach(button => {
       button.addEventListener('click', function () {
           // Make column3 visible
           const column3 = document.getElementById('column3');
           if (column3) {
               column3.style.display = 'flex'; // or any other display value that fits your layout
           }

           // Add .shifted class to sidebar
           const sidebar = document.getElementById('sidebar');
           if (sidebar) {
               sidebar.classList.add('shifted');
           }
       });
   });
});

