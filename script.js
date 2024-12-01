// Random Number Generator Logic
(function() {
    const colors = ["Red", "Blue", "Green", "Yellow"];
    const predefinedRedNumbers = [71, 52, 3,34, 55, 6, 7, 8, 9, 10, 20, 21, 32, 23, 24, 57, 26, 27, 28]; // 19 predefined numbers for Red
    let numbers = {
        Red: predefinedRedNumbers.slice(), // Predefined Red numbers
        Blue: [],
        Green: [],
        Yellow: []
    };

    // Function to generate unique numbers for Blue, Green, and Yellow
    function generateUniqueNumbers() {
        const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(num => !predefinedRedNumbers.includes(num)); // Exclude predefined Red numbers

        // Shuffle the numbers for Blue, Green, and Yellow
        for (let i = allNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
        }

        // Distribute numbers into Blue, Green, and Yellow arrays
        numbers.Blue = allNumbers.slice(0, 19);
        numbers.Green = allNumbers.slice(19, 38);
        numbers.Yellow = allNumbers.slice(38, 57);
    }

    // Initialize color indices
    const colorIndices = {
        Red: 0,
        Blue: 0,
        Green: 0,
        Yellow: 0
    };

    // Display numbers one by one
    const resultDiv = document.getElementById("result");
    const generateButton = document.getElementById("generateButton");
    const resetButton = document.getElementById("resetButton");
    const redColumn = document.getElementById("redColumn");
    const blueColumn = document.getElementById("blueColumn");
    const greenColumn = document.getElementById("greenColumn");
    const yellowColumn = document.getElementById("yellowColumn");
    const totalDisplayedDiv = document.getElementById("totalDisplayed");

    let totalDisplayed = 0; // Track total numbers displayed
    const totalNumbers = 75; // Total numbers to display

    // Generate initial unique numbers
    generateUniqueNumbers();

    generateButton.addEventListener("click", () => {
        if (totalDisplayed < totalNumbers) {
            let currentColor;
            let index;

            // Determine which color to display
            if (colorIndices.Red < predefinedRedNumbers.length) {
                currentColor = "Red";
                index = colorIndices.Red;

                // Display the next predefined Red number
                const number = numbers.Red[index];
                resultDiv.textContent = `${currentColor} - ${number}`;
                
                // Add the number to the corresponding column
                const columnDiv = document.getElementById(`${currentColor.toLowerCase()}Column`);
                const numberItem = document.createElement("div");
                numberItem.textContent = number;
                columnDiv.appendChild(numberItem);

                colorIndices.Red++; // Increment the index for Red
                totalDisplayed++; // Increment the total displayed count
            }

            // After displaying Red, display Blue, Green, and Yellow in order
            const colorOrder = ["Blue", "Green", "Yellow"];
            for (let i = 0; i < colorOrder.length; i++) {
                const color = colorOrder[i];
                index = colorIndices[color];

                if (index < numbers[color].length) {
                    const number = numbers[color][index];
                    resultDiv.textContent += ` | ${color} - ${number}`; // Append to the existing text
                    
                    // Add the number to the corresponding column
                    const columnDiv = document.getElementById(`${color.toLowerCase()}Column`);
                    const numberItem = document.createElement("div");
                    numberItem.textContent = number;
                    columnDiv.appendChild(numberItem);

                    colorIndices[color]++; // Increment the index for the current color
                    totalDisplayed++; // Increment the total displayed count
                }
            }

            totalDisplayedDiv.textContent = `Total Numbers Displayed: ${totalDisplayed}`; // Update total displayed count
            
            // Check if all numbers have been displayed
            if (totalDisplayed >= totalNumbers) {
                resultDiv.textContent += " | All numbers have been displayed!";
                generateButton.disabled = true; // Disable the generate button
                resetButton.style.display = "inline"; // Show reset button
            }
        }
    });

    // Reset the game
    resetButton.addEventListener("click", () => {
        // Reset the indices and displayed count
        colorIndices.Red = 0;
        colorIndices.Blue = 0;
        colorIndices.Green = 0;
        colorIndices.Yellow = 0;
        totalDisplayed = 0;
        resultDiv.textContent = "";
        totalDisplayedDiv.textContent = "Total Numbers Displayed: 0"; // Reset total displayed count

        // Clear the columns
        redColumn.innerHTML = '<div class="column-title">Red</div>';
        blueColumn.innerHTML = '<div class="column-title">Blue</div>';
        greenColumn.innerHTML = '<div class="column-title">Green</div>';
        yellowColumn.innerHTML = '<div class="column-title">Yellow</div>';

        // Generate new unique numbers for the next round
        generateUniqueNumbers();

        // Enable the generate button and hide the reset button
        generateButton.disabled = false;
        resetButton.style.display = "none"; // Hide reset button
    });
})();