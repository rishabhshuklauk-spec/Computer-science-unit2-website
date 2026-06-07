const btnHome = document.getElementById('btnHome');
const btnAscii = document.getElementById('btnAscii');
const btnConverter = document.getElementById('btnConverter');
const btnQuiz = document.getElementById('btnQuiz');

const viewHome = document.getElementById('viewHome');
const viewAscii = document.getElementById('viewAscii');
const viewConverter = document.getElementById('viewConverter');
const viewQuiz = document.getElementById('viewQuiz');

function switchView(targetView, targetBtn) {
    viewHome.classList.add('hidden-view');
    viewAscii.classList.add('hidden-view');
    viewConverter.classList.add('hidden-view');
    viewQuiz.classList.add('hidden-view');

    btnHome.classList.remove('active');
    btnAscii.classList.remove('active');
    btnConverter.classList.remove('active');
    btnQuiz.classList.remove('active');

    targetView.classList.remove('hidden-view');
    targetBtn.classList.add('active');
}

btnHome.addEventListener('click', () => switchView(viewHome, btnHome));
btnAscii.addEventListener('click', () => switchView(viewAscii, btnAscii));
btnConverter.addEventListener('click', () => switchView(viewConverter, btnConverter));
btnQuiz.addEventListener('click', () => switchView(viewQuiz, btnQuiz));

const bitBtns = document.querySelectorAll('.bit-btn');
const interactiveTotal = document.getElementById('interactiveTotal');

bitBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent === '0') {
            this.textContent = '1';
            this.classList.add('active-bit');
        } else {
            this.textContent = '0';
            this.classList.remove('active-bit');
        }

        let total = 0;
        document.querySelectorAll('#bitContainer .bit-box').forEach(box => {
            const val = parseInt(box.getAttribute('data-value'));
            const bit = parseInt(box.querySelector('.bit-btn').textContent);
            total += (val * bit);
        });
        interactiveTotal.textContent = total;
    });
});

const hexBitBtns = document.querySelectorAll('.hex-bit-btn');
const highHexValue = document.getElementById('highHexValue');
const lowHexValue = document.getElementById('lowHexValue');
const combinedHexValue = document.getElementById('combinedHexValue');
const combinedDenaryValue = document.getElementById('combinedDenaryValue');

hexBitBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent === '0') {
            this.textContent = '1';
            this.classList.add('active-bit');
        } else {
            this.textContent = '0';
            this.classList.remove('active-bit');
        }

        let highTotal = 0;
        document.querySelectorAll('#highNibble .bit-box').forEach(box => {
            const val = parseInt(box.getAttribute('data-value'));
            const bit = parseInt(box.querySelector('.hex-bit-btn').textContent);
            highTotal += (val * bit);
        });

        let lowTotal = 0;
        document.querySelectorAll('#lowNibble .bit-box').forEach(box => {
            const val = parseInt(box.getAttribute('data-value'));
            const bit = parseInt(box.querySelector('.hex-bit-btn').textContent);
            lowTotal += (val * bit);
        });

        const highHex = highTotal.toString(16).toUpperCase();
        const lowHex = lowTotal.toString(16).toUpperCase();
        const combinedDenary = (highTotal * 16) + lowTotal;

        highHexValue.textContent = highHex;
        lowHexValue.textContent = lowHex;
        combinedHexValue.textContent = highHex + lowHex;
        combinedDenaryValue.textContent = combinedDenary;
    });
});

const asciiTextInput = document.getElementById('asciiTextInput');
const asciiDecOutput = document.getElementById('asciiDecOutput');
const asciiBinOutput = document.getElementById('asciiBinOutput');

asciiTextInput.addEventListener('input', (e) => {
    const text = e.target.value;
    let decArr = [];
    let binArr = [];

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        decArr.push(code);
        binArr.push(code.toString(2).padStart(8, '0'));
    }

    asciiDecOutput.value = decArr.join(' ');
    asciiBinOutput.value = binArr.join(' ');
});

const denaryInput = document.getElementById('denaryInput');
const binaryInput = document.getElementById('binaryInput');
const hexInput = document.getElementById('hexInput');
const clearBtn = document.getElementById('clearBtn');

function updateFields(denaryValue, source) {
    if (isNaN(denaryValue)) {
        if (source !== 'denary') denaryInput.value = '';
        if (source !== 'binary') binaryInput.value = '';
        if (source !== 'hex') hexInput.value = '';
        return;
    }
    if (source !== 'denary') denaryInput.value = denaryValue;
    if (source !== 'binary') binaryInput.value = denaryValue.toString(2);
    if (source !== 'hex') hexInput.value = denaryValue.toString(16).toUpperCase();
}

denaryInput.addEventListener('input', (e) => {
    updateFields(parseInt(e.target.value, 10), 'denary');
});

binaryInput.addEventListener('input', (e) => {
    const cleanValue = e.target.value.replace(/[^01]/g, '');
    e.target.value = cleanValue;
    updateFields(parseInt(cleanValue, 2), 'binary');
});

hexInput.addEventListener('input', (e) => {
    const cleanValue = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
    e.target.value = cleanValue.toUpperCase();
    updateFields(parseInt(cleanValue, 16), 'hex');
});

clearBtn.addEventListener('click', () => {
    denaryInput.value = '';
    binaryInput.value = '';
    hexInput.value = '';
});

const modeDynamic = document.getElementById('modeDynamic');
const modeTextbook = document.getElementById('modeTextbook');
const dynamicSettings = document.getElementById('dynamicSettings');

modeDynamic.addEventListener('change', () => {
    dynamicSettings.classList.remove('hidden-view');
});

modeTextbook.addEventListener('change', () => {
    dynamicSettings.classList.add('hidden-view');
});

const textbookQuestions = [
    { question: "Convert the binary value 00011011 into denary.", answer: "27", explanation: "16 + 8 + 2 + 1 = 27", ansType: "den" },
    { question: "Convert the binary value 11100110 into denary.", answer: "230", explanation: "128 + 64 + 32 + 4 + 2 = 230", ansType: "den" },
    { question: "Convert the denary value 87 into binary.", answer: "01010111", explanation: "64 + 16 + 4 + 2 + 1 = 87", ansType: "bin" },
    { question: "Convert the denary value 37 into hexadecimal.", answer: "25", explanation: "37 / 16 = 2 remainder 5.", ansType: "hex" },
    { question: "Convert the denary value 59 into hexadecimal.", answer: "3B", explanation: "59 / 16 = 3 remainder 11 (which is B).", ansType: "hex" },
    { question: "Convert the hex value 11 into denary.", answer: "17", explanation: "(1 x 16) + (1 x 1) = 17", ansType: "den" },
    { question: "Convert the hex value 2F into denary.", answer: "47", explanation: "(2 x 16) + (15 x 1) = 32 + 15 = 47", ansType: "den" },
    { question: "Convert the hex value 1A into binary.", answer: "00011010", explanation: "1 = 0001, A (10) = 1010.", ansType: "bin" },
    { question: "Convert the hex value 16 into binary.", answer: "00010110", explanation: "1 = 0001, 6 = 0110.", ansType: "bin" },
    { question: "Convert the binary value 00110111 into hexadecimal.", answer: "37", explanation: "0011 = 3, 0111 = 7.", ansType: "hex" },
    { question: "Convert the binary value 11011111 into hexadecimal.", answer: "DF", explanation: "1101 = 13 (D), 1111 = 15 (F).", ansType: "hex" },
    { question: "Convert the denary value 19 into hexadecimal.", answer: "13", explanation: "19 / 16 = 1 remainder 3.", ansType: "hex" },
    { question: "Convert the denary value 44 into hexadecimal.", answer: "2C", explanation: "44 / 16 = 2 remainder 12 (C).", ansType: "hex" },
    { question: "Convert the hex value 19 into denary.", answer: "25", explanation: "(1 x 16) + 9 = 25", ansType: "den" },
    { question: "Convert the hex value A3 into denary.", answer: "163", explanation: "(10 x 16) + 3 = 163", ansType: "den" },
    { question: "Convert the binary value 00110101 into hexadecimal.", answer: "35", explanation: "0011 = 3, 0101 = 5.", ansType: "hex" },
    { question: "Convert the binary value 11010111 into hexadecimal.", answer: "D7", explanation: "1101 = 13 (D), 0111 = 7.", ansType: "hex" },
    { question: "Convert the hex value 1E into binary.", answer: "00011110", explanation: "1 = 0001, E (14) = 1110.", ansType: "bin" },
    { question: "Convert the hex value FF into binary.", answer: "11111111", explanation: "F = 1111, F = 1111.", ansType: "bin" },
    { question: "Convert the binary value 00001011 into denary.", answer: "11", explanation: "8 + 2 + 1 = 11", ansType: "den" },
    { question: "Convert the binary value 01110110 into denary.", answer: "118", explanation: "64 + 32 + 16 + 4 + 2 = 118", ansType: "den" },
    { question: "Convert the binary value 10010111 into denary.", answer: "151", explanation: "128 + 16 + 4 + 2 + 1 = 151", ansType: "den" },
    { question: "Convert the binary value 11111111 into denary.", answer: "255", explanation: "128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255", ansType: "den" },
    { question: "Convert the denary value 34 into binary.", answer: "00100010", explanation: "32 + 2 = 34", ansType: "bin" },
    { question: "Convert the denary value 128 into binary.", answer: "10000000", explanation: "128 is the 8th bit.", ansType: "bin" },
    { question: "Convert the denary value 149 into binary.", answer: "10010101", explanation: "128 + 16 + 4 + 1 = 149", ansType: "bin" },
    { question: "Convert the denary value 201 into binary.", answer: "11001001", explanation: "128 + 64 + 8 + 1 = 201", ansType: "bin" },
    { question: "Convert the binary value 1101 into denary.", answer: "13", explanation: "8 + 4 + 1 = 13", ansType: "den" },
    { question: "Convert the binary value 1111 into denary.", answer: "15", explanation: "8 + 4 + 2 + 1 = 15", ansType: "den" },
    { question: "Convert the binary value 00100110 into denary.", answer: "38", explanation: "32 + 4 + 2 = 38", ansType: "den" },
    { question: "Convert the binary value 10110111 into denary.", answer: "183", explanation: "128 + 32 + 16 + 4 + 2 + 1 = 183", ansType: "den" },
    { question: "Convert the denary value 18 into binary.", answer: "00010010", explanation: "16 + 2 = 18", ansType: "bin" },
    { question: "Convert the denary value 57 into binary.", answer: "00111001", explanation: "32 + 16 + 8 + 1 = 57", ansType: "bin" },
    { question: "Convert the denary value 163 into binary.", answer: "10100011", explanation: "128 + 32 + 2 + 1 = 163", ansType: "bin" },
    { question: "Convert the denary value 255 into binary.", answer: "11111111", explanation: "All 8 bits are switched on.", ansType: "bin" }
];

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizSetup = document.getElementById('quizSetup');
const quizContent = document.getElementById('quizContent');
const quizResults = document.getElementById('quizResults');
const startQuizBtn = document.getElementById('startQuizBtn');
const questionText = document.getElementById('questionText');
const quizAnswer = document.getElementById('quizAnswer');
const submitAnswer = document.getElementById('submitAnswer');
const continueBtn = document.getElementById('continueBtn');
const helpBtn = document.getElementById('helpBtn');
const helpPanel = document.getElementById('helpPanel');
const quizFeedback = document.getElementById('quizFeedback');
const quizExplanation = document.getElementById('quizExplanation');
const inputWarning = document.getElementById('inputWarning');

function generateQuestions(types, count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const num = Math.floor(Math.random() * 256);

        let qText, qAns, qExp, aType;
        if (type === 'denToBin') {
            qText = `Convert the denary number ${num} into binary (8 bits).`;
            qAns = num.toString(2).padStart(8, '0');
            qExp = `To convert ${num} to binary, subtract the largest powers of 2 (128, 64, 32, 16, 8, 4, 2, 1) that fit.`;
            aType = 'bin';
        } else if (type === 'binToDen') {
            const binStr = num.toString(2).padStart(8, '0');
            qText = `Convert the binary number ${binStr} into denary.`;
            qAns = num.toString(10);
            qExp = `Add the column values (128, 64, 32, 16, 8, 4, 2, 1) where there is a 1 in ${binStr} to get ${qAns}.`;
            aType = 'den';
        } else if (type === 'denToHex') {
            qText = `Convert the denary number ${num} into hexadecimal.`;
            qAns = num.toString(16).toUpperCase().padStart(2, '0');
            const sixteens = Math.floor(num / 16);
            const units = num % 16;
            qExp = `${num} / 16 = ${sixteens} (Hex: ${sixteens.toString(16).toUpperCase()}) remainder ${units} (Hex: ${units.toString(16).toUpperCase()}). Result: ${qAns}.`;
            aType = 'hex';
        } else if (type === 'hexToDen') {
            const hexStr = num.toString(16).toUpperCase().padStart(2, '0');
            qText = `Convert the hexadecimal number ${hexStr} into denary.`;
            qAns = num.toString(10);
            const left = parseInt(hexStr[0], 16);
            const right = parseInt(hexStr[1], 16);
            qExp = `Multiply the left digit by 16 (${left} x 16) and add the right digit (${right}) to get ${qAns}.`;
            aType = 'den';
        } else if (type === 'binToHex') {
            const binStr = num.toString(2).padStart(8, '0');
            qText = `Convert the binary number ${binStr} into hexadecimal.`;
            qAns = num.toString(16).toUpperCase().padStart(2, '0');
            qExp = `Split ${binStr} into two 4-bit nibbles: ${binStr.substring(0,4)} and ${binStr.substring(4,8)}. Convert each to a single hex digit.`;
            aType = 'hex';
        } else {
            const hexStr = num.toString(16).toUpperCase().padStart(2, '0');
            qText = `Convert the hexadecimal number ${hexStr} into binary (8 bits).`;
            qAns = num.toString(2).padStart(8, '0');
            qExp = `Convert each hex digit (${hexStr[0]} and ${hexStr[1]}) into a 4-bit binary nibble.`;
            aType = 'bin';
        }
        questions.push({ question: qText, answer: qAns, explanation: qExp, ansType: aType });
    }
    return questions;
}

startQuizBtn.addEventListener('click', () => {
    const isDynamic = document.getElementById('modeDynamic').checked;

    if (isDynamic) {
        const d2b = document.getElementById('typeDenToBin').checked;
        const d2h = document.getElementById('typeDenToHex').checked;
        const b2h = document.getElementById('typeBinToHex').checked;
        const count = parseInt(document.getElementById('questionCount').value);

        const types = [];
        if (d2b) { types.push('denToBin', 'binToDen'); }
        if (d2h) { types.push('denToHex', 'hexToDen'); }
        if (b2h) { types.push('binToHex', 'hexToBin'); }

        if (types.length === 0) {
            document.getElementById('setupError').style.display = 'block';
            return;
        }

        document.getElementById('setupError').style.display = 'none';
        quizQuestions = generateQuestions(types, count);
    } else {
        document.getElementById('setupError').style.display = 'none';

        const shuffled = [...textbookQuestions].sort(() => 0.5 - Math.random());
        const count = parseInt(document.getElementById('questionCount').value);
        quizQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
    }

    currentQuestionIndex = 0;
    score = 0;

    quizSetup.classList.add('hidden-view');
    quizContent.classList.remove('hidden-view');
    loadQuestion();
});

function loadQuestion() {
    quizAnswer.value = '';
    quizAnswer.disabled = false;
    quizFeedback.textContent = '';
    quizExplanation.textContent = '';
    inputWarning.textContent = '';
    helpPanel.classList.add('hidden-view');
    submitAnswer.classList.remove('hidden-view');
    continueBtn.classList.add('hidden-view');
    helpBtn.disabled = false;

    questionText.textContent = quizQuestions[currentQuestionIndex].question;
    quizAnswer.focus();
}

quizAnswer.addEventListener('input', (e) => {
    const val = e.target.value;
    const ansType = quizQuestions[currentQuestionIndex].ansType;

    inputWarning.textContent = '';

    if (ansType === 'bin' && /[^01]/.test(val)) {
        inputWarning.textContent = 'Binary numbers only use 0s and 1s!';
        e.target.value = val.replace(/[^01]/g, '');
    } else if (ansType === 'hex' && /[^0-9A-Fa-f]/i.test(val)) {
        inputWarning.textContent = 'Hexadecimal only uses 0-9 and A-F!';
        e.target.value = val.replace(/[^0-9A-Fa-f]/ig, '').toUpperCase();
    } else if (ansType === 'den' && /[^0-9]/.test(val)) {
        inputWarning.textContent = 'Denary numbers only use digits 0-9!';
        e.target.value = val.replace(/[^0-9]/g, '');
    }
});

helpBtn.addEventListener('click', () => {
    helpPanel.classList.remove('hidden-view');
});

function checkAnswer() {
    const userAnswer = quizAnswer.value.trim().toUpperCase();
    const currentQ = quizQuestions[currentQuestionIndex];
    const correctAnswer = currentQ.answer;
    const altAnswer = correctAnswer.replace(/^0+/, '');

    if (userAnswer === correctAnswer || userAnswer === altAnswer || (userAnswer === '0' && correctAnswer === '00000000')) {
        score++;
        quizFeedback.textContent = "Correct!";
        quizFeedback.style.color = "#4caf50";
        quizExplanation.textContent = "";
    } else {
        quizFeedback.textContent = `Incorrect. The answer was ${correctAnswer}`;
        quizFeedback.style.color = "var(--accent)";
        quizExplanation.textContent = currentQ.explanation;
    }

    quizAnswer.disabled = true;
    helpBtn.disabled = true;
    submitAnswer.classList.add('hidden-view');
    continueBtn.classList.remove('hidden-view');
    continueBtn.focus();
}

submitAnswer.addEventListener('click', checkAnswer);

continueBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        quizContent.classList.add('hidden-view');
        quizResults.classList.remove('hidden-view');
        document.getElementById('scoreText').textContent = `You scored ${score} out of ${quizQuestions.length}`;
    }
});

quizAnswer.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!submitAnswer.classList.contains('hidden-view')) {
            checkAnswer();
        }
    }
});

document.getElementById('restartQuiz').addEventListener('click', () => {
    quizResults.classList.add('hidden-view');
    quizSetup.classList.remove('hidden-view');
});