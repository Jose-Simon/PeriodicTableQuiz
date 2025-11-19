let quizOn = "name", clue = "symbol", level = 1;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalPoints = 0, maxPoints = 0, attempts = 0;
let recentQuestions = [];
let timerInterval, timeElapsed = 0, timerStarted = false;
let quizEnded = false;
let totalQuestions = 30;

// Reference elements
const elements = [
    { name: "Hydrogen", symbol: "H", atomicNumber: 1, state: "Gas", family: "Nonmetal" },
    { name: "Helium", symbol: "He", atomicNumber: 2, state: "Gas", family: "Noble Gas" },
    { name: "Lithium", symbol: "Li", atomicNumber: 3, state: "Solid", family: "Alkali Metal" },
    { name: "Beryllium", symbol: "Be", atomicNumber: 4, state: "Solid", family: "Alkaline Earth Metal" },
    { name: "Boron", symbol: "B", atomicNumber: 5, state: "Solid", family: "Metalloid" },
    { name: "Carbon", symbol: "C", atomicNumber: 6, state: "Solid", family: "Nonmetal" },
    { name: "Nitrogen", symbol: "N", atomicNumber: 7, state: "Gas", family: "Nonmetal" },
    { name: "Oxygen", symbol: "O", atomicNumber: 8, state: "Gas", family: "Nonmetal" },
    { name: "Fluorine", symbol: "F", atomicNumber: 9, state: "Gas", family: "Halogen" },
    { name: "Neon", symbol: "Ne", atomicNumber: 10, state: "Gas", family: "Noble Gas" },
    { name: "Sodium", symbol: "Na", atomicNumber: 11, state: "Solid", family: "Alkali Metal" },
    { name: "Magnesium", symbol: "Mg", atomicNumber: 12, state: "Solid", family: "Alkaline Earth Metal" },
    { name: "Aluminium", symbol: "Al", atomicNumber: 13, state: "Solid", family: "Post-Transition Metal" },
    { name: "Silicon", symbol: "Si", atomicNumber: 14, state: "Solid", family: "Metalloid" },
    { name: "Phosphorus", symbol: "P", atomicNumber: 15, state: "Solid", family: "Nonmetal" },
    { name: "Sulfur", symbol: "S", atomicNumber: 16, state: "Solid", family: "Nonmetal" },
    { name: "Chlorine", symbol: "Cl", atomicNumber: 17, state: "Gas", family: "Halogen" },
    { name: "Argon", symbol: "Ar", atomicNumber: 18, state: "Gas", family: "Noble Gas" },
    { name: "Potassium", symbol: "K", atomicNumber: 19, state: "Solid", family: "Alkali Metal" },
    { name: "Calcium", symbol: "Ca", atomicNumber: 20, state: "Solid", family: "Alkaline Earth Metal" },
    { name: "Scandium", symbol: "Sc", atomicNumber: 21, state: "Solid", family: "Transition Metal" },
    { name: "Titanium", symbol: "Ti", atomicNumber: 22, state: "Solid", family: "Transition Metal" },
    { name: "Vanadium", symbol: "V", atomicNumber: 23, state: "Solid", family: "Transition Metal" },
    { name: "Chromium", symbol: "Cr", atomicNumber: 24, state: "Solid", family: "Transition Metal" },
    { name: "Manganese", symbol: "Mn", atomicNumber: 25, state: "Solid", family: "Transition Metal" },
    { name: "Iron", symbol: "Fe", atomicNumber: 26, state: "Solid", family: "Transition Metal" },
    { name: "Cobalt", symbol: "Co", atomicNumber: 27, state: "Solid", family: "Transition Metal" },
    { name: "Nickel", symbol: "Ni", atomicNumber: 28, state: "Solid", family: "Transition Metal" },
    { name: "Copper", symbol: "Cu", atomicNumber: 29, state: "Solid", family: "Transition Metal" },
    { name: "Zinc", symbol: "Zn", atomicNumber: 30, state: "Solid", family: "Transition Metal" },
    { name: "Gallium", symbol: "Ga", atomicNumber: 31, state: "Solid", family: "Post-Transition Metal" },
    { name: "Germanium", symbol: "Ge", atomicNumber: 32, state: "Solid", family: "Metalloid" },
    { name: "Arsenic", symbol: "As", atomicNumber: 33, state: "Solid", family: "Metalloid" },
    { name: "Selenium", symbol: "Se", atomicNumber: 34, state: "Solid", family: "Nonmetal" },
    { name: "Bromine", symbol: "Br", atomicNumber: 35, state: "Liquid", family: "Halogen" },
    { name: "Krypton", symbol: "Kr", atomicNumber: 36, state: "Gas", family: "Noble Gas" },
	{ name: "Rubidium", symbol: "Rb", atomicNumber: 37, state: "Solid", family: "Alkali Metal" },
    { name: "Strontium", symbol: "Sr", atomicNumber: 38, state: "Solid", family: "Alkaline Earth Metal" },
    { name: "Yttrium", symbol: "Y", atomicNumber: 39, state: "Solid", family: "Transition Metal" },
    { name: "Zirconium", symbol: "Zr", atomicNumber: 40, state: "Solid", family: "Transition Metal" },
    { name: "Niobium", symbol: "Nb", atomicNumber: 41, state: "Solid", family: "Transition Metal" },
    { name: "Molybdenum", symbol: "Mo", atomicNumber: 42, state: "Solid", family: "Transition Metal" },
    { name: "Technetium", symbol: "Tc", atomicNumber: 43, state: "Solid", family: "Transition Metal" },
    { name: "Ruthenium", symbol: "Ru", atomicNumber: 44, state: "Solid", family: "Transition Metal" },
    { name: "Rhodium", symbol: "Rh", atomicNumber: 45, state: "Solid", family: "Transition Metal" },
    { name: "Palladium", symbol: "Pd", atomicNumber: 46, state: "Solid", family: "Transition Metal" },
    { name: "Silver", symbol: "Ag", atomicNumber: 47, state: "Solid", family: "Transition Metal" },
    { name: "Cadmium", symbol: "Cd", atomicNumber: 48, state: "Solid", family: "Transition Metal" },
    { name: "Indium", symbol: "In", atomicNumber: 49, state: "Solid", family: "Post-Transition Metal" },
    { name: "Tin", symbol: "Sn", atomicNumber: 50, state: "Solid", family: "Post-Transition Metal" },
    { name: "Antimony", symbol: "Sb", atomicNumber: 51, state: "Solid", family: "Metalloid" },
    { name: "Tellurium", symbol: "Te", atomicNumber: 52, state: "Solid", family: "Metalloid" },
    { name: "Iodine", symbol: "I", atomicNumber: 53, state: "Solid", family: "Halogen" },
    { name: "Xenon", symbol: "Xe", atomicNumber: 54, state: "Gas", family: "Noble Gas" },
    { name: "Cesium", symbol: "Cs", atomicNumber: 55, state: "Solid", family: "Alkali Metal" },
    { name: "Barium", symbol: "Ba", atomicNumber: 56, state: "Solid", family: "Alkaline Earth Metal" },
    { name: "Lanthanum", symbol: "La", atomicNumber: 57, state: "Solid", family: "Lanthanide" },
    { name: "Cerium", symbol: "Ce", atomicNumber: 58, state: "Solid", family: "Lanthanide" },
    { name: "Praseodymium", symbol: "Pr", atomicNumber: 59, state: "Solid", family: "Lanthanide" },
    { name: "Neodymium", symbol: "Nd", atomicNumber: 60, state: "Solid", family: "Lanthanide" },
    { name: "Promethium", symbol: "Pm", atomicNumber: 61, state: "Solid", family: "Lanthanide" },
    { name: "Samarium", symbol: "Sm", atomicNumber: 62, state: "Solid", family: "Lanthanide" },
    { name: "Europium", symbol: "Eu", atomicNumber: 63, state: "Solid", family: "Lanthanide" },
    { name: "Gadolinium", symbol: "Gd", atomicNumber: 64, state: "Solid", family: "Lanthanide" },
    { name: "Terbium", symbol: "Tb", atomicNumber: 65, state: "Solid", family: "Lanthanide" },
    { name: "Dysprosium", symbol: "Dy", atomicNumber: 66, state: "Solid", family: "Lanthanide" },
    { name: "Holmium", symbol: "Ho", atomicNumber: 67, state: "Solid", family: "Lanthanide" },
    { name: "Erbium", symbol: "Er", atomicNumber: 68, state: "Solid", family: "Lanthanide" },
    { name: "Thulium", symbol: "Tm", atomicNumber: 69, state: "Solid", family: "Lanthanide" },
    { name: "Ytterbium", symbol: "Yb", atomicNumber: 70, state: "Solid", family: "Lanthanide" },
    { name: "Lutetium", symbol: "Lu", atomicNumber: 71, state: "Solid", family: "Lanthanide" },
    { name: "Hafnium", symbol: "Hf", atomicNumber: 72, state: "Solid", family: "Transition Metal" },
    { name: "Tantalum", symbol: "Ta", atomicNumber: 73, state: "Solid", family: "Transition Metal" },
    { name: "Tungsten", symbol: "W", atomicNumber: 74, state: "Solid", family: "Transition Metal" },
    { name: "Rhenium", symbol: "Re", atomicNumber: 75, state: "Solid", family: "Transition Metal" },
    { name: "Osmium", symbol: "Os", atomicNumber: 76, state: "Solid", family: "Transition Metal" },
    { name: "Iridium", symbol: "Ir", atomicNumber: 77, state: "Solid", family: "Transition Metal" },
    { name: "Platinum", symbol: "Pt", atomicNumber: 78, state: "Solid", family: "Transition Metal" },
    { name: "Gold", symbol: "Au", atomicNumber: 79, state: "Solid", family: "Transition Metal" },
    { name: "Mercury", symbol: "Hg", atomicNumber: 80, state: "Liquid", family: "Transition Metal" },
    { name: "Thallium", symbol: "Tl", atomicNumber: 81, state: "Solid", family: "Post-Transition Metal" },
    { name: "Lead", symbol: "Pb", atomicNumber: 82, state: "Solid", family: "Post-Transition Metal" },
    { name: "Bismuth", symbol: "Bi", atomicNumber: 83, state: "Solid", family: "Post-Transition Metal" },
    { name: "Polonium", symbol: "Po", atomicNumber: 84, state: "Solid", family: "Metalloid" },
    { name: "Astatine", symbol: "At", atomicNumber: 85, state: "Solid", family: "Halogen" },
    { name: "Radon", symbol: "Rn", atomicNumber: 86, state: "Gas", family: "Noble Gas" },
    { name: "Francium", symbol: "Fr", atomicNumber: 87, state: "Solid", family: "Alkali Metal" },
    { name: "Radium", symbol: "Ra", atomicNumber: 88, state: "Solid", family: "Alkaline Earth Metal" },
    { name: "Actinium", symbol: "Ac", atomicNumber: 89, state: "Solid", family: "Actinide" },
    { name: "Thorium", symbol: "Th", atomicNumber: 90, state: "Solid", family: "Actinide" },
    { name: "Protactinium", symbol: "Pa", atomicNumber: 91, state: "Solid", family: "Actinide" },
    { name: "Uranium", symbol: "U", atomicNumber: 92, state: "Solid", family: "Actinide" },
    { name: "Neptunium", symbol: "Np", atomicNumber: 93, state: "Solid", family: "Actinide" },
    { name: "Plutonium", symbol: "Pu", atomicNumber: 94, state: "Solid", family: "Actinide" },
    { name: "Americium", symbol: "Am", atomicNumber: 95, state: "Solid", family: "Actinide" },
    { name: "Curium", symbol: "Cm", atomicNumber: 96, state: "Solid", family: "Actinide" },
    { name: "Berkelium", symbol: "Bk", atomicNumber: 97, state: "Solid", family: "Actinide" },
    { name: "Californium", symbol: "Cf", atomicNumber: 98, state: "Solid", family: "Actinide" },
    { name: "Einsteinium", symbol: "Es", atomicNumber: 99, state: "Solid", family: "Actinide" },
    { name: "Fermium", symbol: "Fm", atomicNumber: 100, state: "Solid", family: "Actinide" },
    { name: "Mendelevium", symbol: "Md", atomicNumber: 101, state: "Solid", family: "Actinide" },
    { name: "Nobelium", symbol: "No", atomicNumber: 102, state: "Solid", family: "Actinide" },
    { name: "Lawrencium", symbol: "Lr", atomicNumber: 103, state: "Solid", family: "Actinide" },
    { name: "Rutherfordium", symbol: "Rf", atomicNumber: 104, state: "Solid", family: "Transactinide" },
    { name: "Dubnium", symbol: "Db", atomicNumber: 105, state: "Solid", family: "Transactinide" },
    { name: "Seaborgium", symbol: "Sg", atomicNumber: 106, state: "Solid", family: "Transactinide" },
    { name: "Bohrium", symbol: "Bh", atomicNumber: 107, state: "Solid", family: "Transactinide" },
    { name: "Hassium", symbol: "Hs", atomicNumber: 108, state: "Solid", family: "Transactinide" },
    { name: "Meitnerium", symbol: "Mt", atomicNumber: 109, state: "Solid", family: "Transactinide" },
    { name: "Darmstadtium", symbol: "Ds", atomicNumber: 110, state: "Solid", family: "Transactinide" },
    { name: "Roentgenium", symbol: "Rg", atomicNumber: 111, state: "Solid", family: "Transactinide" },
    { name: "Copernicium", symbol: "Cn", atomicNumber: 112, state: "Solid", family: "Transactinide" },
    { name: "Nihonium", symbol: "Nh", atomicNumber: 113, state: "Solid", family: "Transactinide" },
    { name: "Flerovium", symbol: "Fl", atomicNumber: 114, state: "Solid", family: "Transactinide" },
    { name: "Moscovium", symbol: "Mc", atomicNumber: 115, state: "Solid", family: "Transactinide" },
    { name: "Livermorium", symbol: "Lv", atomicNumber: 116, state: "Solid", family: "Transactinide" },
    { name: "Tennessine", symbol: "Ts", atomicNumber: 117, state: "Solid", family: "Transactinide" },
    { name: "Oganesson", symbol: "Og", atomicNumber: 118, state: "Solid", family: "Transactinide" }
];	

const QUESTION_SEQUENCE = [
    { type: 'Level 1', limit: 9, points: 1, questionsAsked: 0 },
    { type: 'Level 2', limit: 9, points: 2, questionsAsked: 0 },
    { type: 'Level 3', limit: 6, points: 3, questionsAsked: 0 },
    { type: 'Level 4', limit: 3, points: 4, questionsAsked: 0 },
    { type: 'Level 5', limit: 3, points: 5, questionsAsked: 0 }
];
let currentCategory = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startQuizButton").addEventListener("click", setQuizOptions);
    document.getElementById("skipButton").addEventListener("click", skipQuestion);
    document.getElementById("endQuizButton").addEventListener("click", endQuiz);
    document.getElementById("userAnswer").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            
            // Stop processing if the quiz has ended
            if (quizEnded) return;

            checkAnswer();
        }
    });
});

function setQuizOptions() {
    quizOn = document.getElementById("quizOn").value;
    clue = document.getElementById("clue").value;
    document.getElementById("quizOptions").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    document.getElementById("clueLabel").textContent = clue.charAt(0).toUpperCase() + clue.slice(1);
    maxPoints = calculateMaxPoints();
    document.getElementById("maxPointsDisplay").textContent = `Maximum possible points: ${maxPoints}`;
    startQuiz();
}

function startQuiz() {
    questions = getQuestionsForLevel(level);
    currentQuestionIndex = 0;
    totalPoints = 0;
	timeElapsed = 0;
	questions = getQuestionsForLevel(1);
    startTimer();
    nextQuestion();
}

function startTimer() {
	if (timerStarted) return;
    timerStarted = true;
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
        console.error("Timer element not found.");
        return;
    }
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        timeElapsed += 0.1;
        timerElement.textContent = formatTime(timeElapsed);
    }, 100);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = (seconds % 1).toFixed(1).substr(2);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}.${millis}`;
}

function getQuestionsForLevel(level) {
    switch (level) {
        case 1: return elements.filter(el => el.atomicNumber >= 1 && el.atomicNumber <= 18);
        case 2: return elements.filter(el => el.atomicNumber >= 19 && el.atomicNumber <= 36);
        case 3: return elements.filter(el => el.atomicNumber >= 37 && el.atomicNumber <= 54);
        case 4: return elements.filter(el => el.atomicNumber >= 55 && el.atomicNumber <= 86);
        case 5: return elements.filter(el => el.atomicNumber >= 87 && el.atomicNumber <= 118);
        default: return [];
    }
}

function calculateMaxPoints() {
    return QUESTION_SEQUENCE.reduce((sum, category) => sum + (category.limit * category.points), 0);
}

function nextQuestion() {
    if (quizEnded || currentQuestionIndex >= totalQuestions) {
        endQuiz();
        return;
    }

    if (QUESTION_SEQUENCE[currentCategory].questionsAsked >= QUESTION_SEQUENCE[currentCategory].limit) {
        currentCategory++;

        if (currentCategory >= QUESTION_SEQUENCE.length) {
            endQuiz();
            return;
        }

        level = currentCategory + 1;
        questions = getQuestionsForLevel(level);
        console.log(`Level changed to ${level}, new questions loaded.`);
    }

    let category = QUESTION_SEQUENCE[currentCategory];
    category.questionsAsked++;

    document.getElementById("categoryDisplay").textContent = `${category.type} (Points: ${category.points})`;

    let question;
    do {
        question = questions[Math.floor(Math.random() * questions.length)];
    } while (recentQuestions.includes(question[quizOn]));

    recentQuestions.push(question[quizOn]);
    if (recentQuestions.length > 5) {
        recentQuestions.shift();
    }

    document.getElementById("clueLabel").textContent = clue.charAt(0).toUpperCase() + clue.slice(1);
    document.getElementById("clueDisplay").textContent = question[clue];
    document.getElementById("userAnswer").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("message").className = "";

    // Update Question Counter
    document.getElementById("questionCounter").textContent = `${currentQuestionIndex + 1} / ${totalQuestions}`;

    // Update Progress Bar
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progress').style.width = `${Math.min(progressPercentage, 100)}%`;

    questions[currentQuestionIndex] = question;  // Store current question for validation
}

function checkAnswer() {

    const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];  
    const correctAnswer = currentQuestion[quizOn].toLowerCase();
    const category = QUESTION_SEQUENCE[currentCategory];

    if (userAnswer === correctAnswer) {
        totalPoints += category.points;
		document.getElementById("totalPoints").textContent = totalPoints;
        document.getElementById("message").textContent = "Correct!";
        document.getElementById("message").className = "correct";
        
        attempts = 0;

        showElementDetails(currentQuestion);
        currentQuestionIndex++; 

        if (currentQuestionIndex >= totalQuestions) {
            endQuiz();
            return;
        }

        setTimeout(nextQuestion, 500);

    } else {
        if (attempts >= 1) {
            document.getElementById("message").textContent = `Incorrect! Correct Answer: ${currentQuestion[quizOn]}`;
            document.getElementById("message").className = "incorrect";
            if (currentQuestionIndex+1 >= totalQuestions) {
                endQuiz();
                return;
            }

            setTimeout(skipQuestion, 1000);

        } else {
            attempts++;
            document.getElementById("message").textContent = "Incorrect! Try Again.";
            document.getElementById("message").className = "incorrect";
        }
    }

	if (currentQuestionIndex >= totalQuestions) {
        endQuiz();
        return;
    }
}

function skipQuestion() {
    attempts = 0;
    maxPoints -= QUESTION_SEQUENCE[currentCategory].points;
	const currentQuestion = questions[currentQuestionIndex];  
	showElementDetails(currentQuestion);
    document.getElementById("maxPointsDisplay").textContent = `Maximum possible points: ${maxPoints}`;
    currentQuestionIndex++;
	if (currentQuestionIndex >= totalQuestions) {
		endQuiz();
		return;
	}
    nextQuestion();
}

function endQuiz() {
    clearInterval(timerInterval);
	quizEnded = true;  // Mark quiz as ended
	
    const messageElement = document.getElementById("completionMessage");
	if (messageElement) {
        messageElement.textContent = "Quiz Ended!";
        messageElement.style.display = "block";
    } else {
        console.error("completionMessage element not found in the DOM.");
    }
}

function showElementDetails(element) {
    document.getElementById("elementDetails").style.display = "block";
    document.getElementById("elementName").textContent = element.name;
    document.getElementById("elementSymbol").textContent = element.symbol;
    document.getElementById("elementNumber").textContent = element.atomicNumber																
    document.getElementById("elementState").textContent = element.state;
    document.getElementById("elementFamily").textContent = element.family;

}
