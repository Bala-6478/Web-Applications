// script.js
// This function runs when the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const htmlElement = document.documentElement;

    // Function to apply the theme and update UI elements
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            themeToggle.checked = true;
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            htmlElement.classList.remove('dark');
            themeToggle.checked = false;
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    // Function to handle theme toggling
    const handleThemeToggle = () => {
        const isDark = htmlElement.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // Initialize the theme on page load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Add event listener for the theme toggle button
    themeToggle.addEventListener('change', handleThemeToggle);
});

// ===== Calculate Interest Function =====
function calculateInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const time = parseFloat(document.getElementById("time").value);
    const type = document.getElementById("type").value;
    const resultBox = document.getElementById("result");

    // Clear previous results and animations
    resultBox.innerHTML = '';
    resultBox.classList.remove('result-animation');

    // Input validation
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
        resultBox.innerHTML = `
            <div class="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-lg result-animation">
                <p class="font-bold">Error</p>
                <p>Please enter valid positive numbers for all fields.</p>
            </div>`;
        // Trigger reflow to restart animation
        void resultBox.offsetWidth;
        resultBox.classList.add('result-animation');
        return;
    }

    let interest = 0;
    let amount = 0;

    // Calculation logic
    if (type === "simple") {
        interest = (principal * rate * time) / 100;
        amount = principal + interest;
    } else { // Compound Interest
        amount = principal * Math.pow((1 + rate / 100), time);
        interest = amount - principal;
    }

    // Display the result with formatting
    resultBox.innerHTML = `
        <div class="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-800 dark:text-green-200 p-4 rounded-lg space-y-2 result-animation">
            <div class="flex justify-between items-center">
                <span class="font-medium">Principal:</span>
                <span class="font-bold text-lg">₹ ${principal.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="font-medium">Total Interest:</span>
                <span class="font-bold text-lg text-green-600 dark:text-green-400">₹ ${interest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <hr class="border-gray-300 dark:border-gray-600 my-2">
            <div class="flex justify-between items-center">
                <span class="font-medium">Total Amount:</span>
                <span class="font-bold text-xl">₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
        </div>
    `;
    
    // Trigger reflow to restart animation
    void resultBox.offsetWidth;
    resultBox.classList.add('result-animation');
}
