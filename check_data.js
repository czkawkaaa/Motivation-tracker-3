// Symulacja sprawdzenia danych
const fs = require('fs');

// Sprawdźmy strukturę danych
console.log('Checking app.js for data structure...');

// Przykładowe dane które mogą być w localStorage
const exampleData = {
    challenge: {
        currentDay: 2,
        totalDays: 75,
        completedDays: ['2025-10-15', '2025-10-16']
    },
    streak: 2
};

console.log('Example completedDays:', exampleData.challenge.completedDays);

const today = '2025-10-16';
const yesterday = '2025-10-15';

console.log('Today:', today);
console.log('Includes today?', exampleData.challenge.completedDays.includes(today));
console.log('Includes yesterday?', exampleData.challenge.completedDays.includes(yesterday));

// Sprawdź różnicę dat
const todayDate = new Date(today + 'T12:00:00');
const latest = new Date(exampleData.challenge.completedDays[exampleData.challenge.completedDays.length - 1] + 'T12:00:00');
const diff = Math.floor((todayDate - latest) / (1000 * 60 * 60 * 24));
console.log('Days difference:', diff);
