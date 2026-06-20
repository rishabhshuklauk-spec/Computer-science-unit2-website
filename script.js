// Theme Selector Logic
const themeSelector = document.getElementById('themeSelector');

function loadTheme() {
    const savedTheme = localStorage.getItem('appTheme') || 'classic';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeSelector) {
        themeSelector.value = savedTheme;
    }
}

if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
        const theme = e.target.value;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('appTheme', theme);
    });
}

loadTheme();

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

const bitBtns = document.querySelectorAll('#bitContainer .bit-btn');
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

// Removed Textbook Questions array and mode listeners

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
        } else if (type === 'hexToBin') {
            const hexStr = num.toString(16).toUpperCase().padStart(2, '0');
            qText = `Convert the hexadecimal number ${hexStr} into binary (8 bits).`;
            qAns = num.toString(2).padStart(8, '0');
            qExp = `Convert each hex digit (${hexStr[0]} and ${hexStr[1]}) into a 4-bit binary nibble.`;
            aType = 'bin';
        } else if (type === 'imageSize') {
            const width = Math.floor(Math.random() * 90) + 10;
            const height = Math.floor(Math.random() * 90) + 10;
            const depth = [1, 2, 4, 8, 16, 24][Math.floor(Math.random() * 6)];
            qText = `Calculate the file size in bits of a ${width}x${height} image with a colour depth of ${depth} bits.`;
            qAns = (width * height * depth).toString();
            qExp = `Image Size (bits) = Width x Height x Colour Depth = ${width} x ${height} x ${depth} = ${qAns} bits.`;
            aType = 'den';
        } else if (type === 'soundSize') {
            const rate = [8000, 44100, 48000][Math.floor(Math.random() * 3)];
            const depth = [8, 16, 24][Math.floor(Math.random() * 3)];
            const duration = Math.floor(Math.random() * 10) + 1;
            qText = `Calculate the file size in bits of a sound recorded at ${rate}Hz, with a ${depth}-bit sample resolution, lasting ${duration} seconds.`;
            qAns = (rate * depth * duration).toString();
            qExp = `Sound Size (bits) = Sample Rate x Bit Depth x Duration = ${rate} x ${depth} x ${duration} = ${qAns} bits.`;
            aType = 'den';
        }
        questions.push({ question: qText, answer: qAns, explanation: qExp, ansType: aType });
    }
    return questions;
}

startQuizBtn.addEventListener('click', () => {
    const d2b = document.getElementById('typeDenToBin').checked;
    const d2h = document.getElementById('typeDenToHex').checked;
    const b2h = document.getElementById('typeBinToHex').checked;
    const imgSize = document.getElementById('typeImageSize').checked;
    const sndSize = document.getElementById('typeSoundSize').checked;
    const count = parseInt(document.getElementById('questionCount').value);

    const types = [];
    if (d2b) { types.push('denToBin', 'binToDen'); }
    if (d2h) { types.push('denToHex', 'hexToDen'); }
    if (b2h) { types.push('binToHex', 'hexToBin'); }
    if (imgSize) { types.push('imageSize'); }
    if (sndSize) { types.push('soundSize'); }

    if (types.length === 0) {
        document.getElementById('setupError').style.display = 'block';
        return;
    }

    document.getElementById('setupError').style.display = 'none';
    quizQuestions = generateQuestions(types, count);

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

// Sound Size Calculator
const soundRateInput = document.getElementById('soundRateInput');
const soundDepthInput = document.getElementById('soundDepthInput');
const soundDurationInput = document.getElementById('soundDurationInput');
const soundBitsOut = document.getElementById('soundBitsOut');
const soundBytesOut = document.getElementById('soundBytesOut');
const soundKbOut = document.getElementById('soundKbOut');

function calculateSoundSize() {
    const rate = parseInt(soundRateInput.value) || 0;
    const depth = parseInt(soundDepthInput.value) || 0;
    const duration = parseInt(soundDurationInput.value) || 0;
    
    const bits = rate * depth * duration;
    const bytes = bits / 8;
    const kb = bytes / 1000;

    soundBitsOut.textContent = bits.toLocaleString();
    soundBytesOut.textContent = bytes.toLocaleString();
    soundKbOut.textContent = kb.toLocaleString();
}

[soundRateInput, soundDepthInput, soundDurationInput].forEach(input => {
    input.addEventListener('input', calculateSoundSize);
});

// Image Size Calculator
const imgWidthInput = document.getElementById('imgWidthInput');
const imgHeightInput = document.getElementById('imgHeightInput');
const imgDepthInput = document.getElementById('imgDepthInput');
const imgBitsOut = document.getElementById('imgBitsOut');
const imgBytesOut = document.getElementById('imgBytesOut');
const imgKbOut = document.getElementById('imgKbOut');

function calculateImageSize() {
    const width = parseInt(imgWidthInput.value) || 0;
    const height = parseInt(imgHeightInput.value) || 0;
    const depth = parseInt(imgDepthInput.value) || 0;

    const bits = width * height * depth;
    const bytes = bits / 8;
    const kb = bytes / 1000;

    imgBitsOut.textContent = bits.toLocaleString();
    imgBytesOut.textContent = bytes.toLocaleString();
    imgKbOut.textContent = kb.toLocaleString();
}

[imgWidthInput, imgHeightInput, imgDepthInput].forEach(input => {
    input.addEventListener('input', calculateImageSize);
});

// Populate ASCII Table
const asciiTableBody = document.getElementById('asciiTableBody');
if (asciiTableBody) {
    let rowsHtml = '';
    for (let i = 0; i <= 127; i++) {
        const dec = i;
        const hex = i.toString(16).toUpperCase().padStart(2, '0');
        const bin = i.toString(2).padStart(8, '0');
        let char = String.fromCharCode(i);
        
        if (i < 32 || i === 127) {
            const controlNames = ["NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "HT", "LF", "VT", "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US"];
            char = i === 127 ? "DEL" : controlNames[i];
        } else if (i === 32) {
            char = "Space";
        }
        
        rowsHtml += `<tr><td>${dec}</td><td>${hex}</td><td>${bin}</td><td>${char}</td></tr>`;
    }
    asciiTableBody.innerHTML = rowsHtml;
}

// Binary Shift Visual
const shiftBitBtns = document.querySelectorAll('.shift-bit-btn');
const shiftInput = document.getElementById('shiftInput');
const shiftLeftBtn = document.getElementById('shiftLeftBtn');
const shiftRightBtn = document.getElementById('shiftRightBtn');

function updateShiftFromInput() {
    let val = parseInt(shiftInput.value);
    if (isNaN(val) || shiftInput.value === '') {
        // Allow empty state while typing, but default calculations to 0
        val = 0;
    } else {
        if (val > 255) {
            val = 255;
            shiftInput.value = 255;
        } else if (val < 0) {
            val = 0;
            shiftInput.value = 0;
        }
    }
    
    const binStr = val.toString(2).padStart(8, '0');
    shiftBitBtns.forEach((btn, index) => {
        btn.textContent = binStr[index];
        if (btn.textContent === '1') {
            btn.classList.add('active-bit');
        } else {
            btn.classList.remove('active-bit');
        }
    });
}

function updateShiftDenary() {
    let total = 0;
    const bitValues = [128, 64, 32, 16, 8, 4, 2, 1];
    shiftBitBtns.forEach((btn, index) => {
        if (btn.textContent === '1') {
            total += bitValues[index];
            btn.classList.add('active-bit');
        } else {
            btn.classList.remove('active-bit');
        }
    });
    if (shiftInput) {
        shiftInput.value = total;
    }
}

shiftBitBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.textContent = this.textContent === '0' ? '1' : '0';
        updateShiftDenary();
    });
});

if (shiftLeftBtn) {
    shiftLeftBtn.addEventListener('click', () => {
        for (let i = 0; i < 7; i++) {
            shiftBitBtns[i].textContent = shiftBitBtns[i+1].textContent;
        }
        shiftBitBtns[7].textContent = '0';
        updateShiftDenary();
    });
}

if (shiftRightBtn) {
    shiftRightBtn.addEventListener('click', () => {
        for (let i = 7; i > 0; i--) {
            shiftBitBtns[i].textContent = shiftBitBtns[i-1].textContent;
        }
        shiftBitBtns[0].textContent = '0';
        updateShiftDenary();
    });
}

if (shiftInput) {
    shiftInput.addEventListener('input', updateShiftFromInput);
}

if (shiftBitBtns.length > 0) {
    updateShiftDenary();
}