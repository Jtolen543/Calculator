let user = ""
let operator = ""
let operand_1 = ""
let operand_2 = ""
let equated = false // Ensures functionality where if user selects a number after pressing "=", then it resets both output and input

const numbers = document.querySelectorAll(".btn-2")
numbers.forEach((number) => {
    number.addEventListener("click",() => {
        if (operator.length === 1 && operand_2.length === 0) { // Checks if operator is assigned and operand_2 is empty
            user = "" // meaning the click indicates a new input and reset user
        }
        if (equated) {
            operand_1 = ""
            user = "0"
            equated = false
        }
        if (user.length < 10 && number.id !== "delete") { 
            if (user[0] === "0") { // If said number is the first input, then it sets user input to that number
                user = number.id
            }
            else if (number.id === ".") { // prevents overflow of floating points
                if (user.split(".").length < 2) {
                    user += number.id
                }
            }
            else { // Adds that number to the user input
                user += number.id
            }
        }
        else if (number.id === "delete" && user.length) { // Adds delete functionality
            user = user.slice(0, user.length - 1)
            if (user.length === 0) {
                user = "0"
            }
        }
        trackInput() 
        updateDisplay()
    });
});

document.addEventListener("keydown", (event) => { // Incorporates keyboard functionality
    console.log(event.key)
    if (operator.length === 1 && operand_2.length === 0 && event.key) { // Checks if operator is assigned and operand_2 is empty
        user = "" // meaning the click indicates a new input and reset user
    }
    if (equated && "0123456789.".includes(event.key)) {
        operand_1 = ""
        user = "0"
        equated = false
    }
    if (user.length < 10 && "0123456789.".includes(event.key)) { 
        if (user[0] === "0") { // If said number is the first input, then it sets user input to that number
            user = event.key
        }
        else if (event.key === ".") { // prevents overflow of floating points
            if (user.split(".").length < 2) {
                user += event.key
            }
        }
        else { // Adds that number to the user input
            user += event.key
        }
    }
    else if (event.key === "Backspace" && user.length) { // Adds delete functionality
        user = user.slice(0, user.length - 1)
        if (user.length === 0) {
            user = "0"
        }
    }
    trackInput() 
    updateDisplay()
});

const operations = document.querySelectorAll(".btn-3")
operations.forEach((operation) => {
    operation.addEventListener("click", () => { // Handles the operation
        if (operation.id === "multiply") {
            operator = "x"
            if (equated) {
                equated = false
            }
        }
        else if (operation.id === "divide") {
            operator = "÷"
            if (equated) {
                equated = false
            }
        }
        else if (operation.id === "add") {
            operator = "+"
            if (equated) {
                equated = false
            }
        }
        else if (operation.id === "subtract") {
            operator = "-" 
            if (equated) {
                equated = false
            }
        }
        else {
            if (operand_1.length > 0 && operand_2.length > 0) {
                user = combineOperation()
                operand_1 = String(user)
                operand_2 = ""
                operator = ""
                equated = true
            }
        }
        updateDisplay()
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "x" || (event.key === "*")) {
        operator = "x"
        if (equated) {
            equated = false
        }
    }
    else if (event.key === "/") {
        operator = "÷"
        if (equated) {
            equated = false
        }
    }
    else if (event.key === "+") {
        operator = "+"
        if (equated) {
            equated = false
        }
    }
    else if (event.key === "_") {
        operator = "-" 
        if (equated) {
            equated = false
        }
    }

    else if (event.key === "Enter" || event.key === "=") {
        operand_1 = operand_1.toString()
        operand_2 = operand_2.toString()
        if (operand_1.length > 0 && operand_2.length > 0) {
            console.log('test2')
            user = combineOperation()
            operand_1 = String(user)
            operand_2 = ""
            operator = ""
            equated = true
        }
    }
    updateDisplay()
})

const specials = document.querySelectorAll(".btn-1")
console.log(specials)
specials.forEach((special) => {
    special.addEventListener("click", () => {
        if (special.id === "clear") {
            user = "0"
            operator = ""
            operand_1 = ""
            operand_2 = ""
            equated = false
        }
        else if (special.id === "percentage") {
            if (user.length !== 0) {
                user = (parseFloat(user) / 100)
                user = user.toString()
                if (user.length > 10) {
                    user = (parseFloat(user).toExponential(4)).toString()
                }
            }
        }
        else if (special.id === "sign") {
            user = (parseFloat(user) * -1).toString()
            if (user.length > 10) {
                user = (parseFloat(user).toExponential(4)).toString()
            }
        }
        trackInput()
        updateDisplay()
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && event.shiftKey) {
        user = "0"
        operator = ""
        operand_1 = ""
        operand_2 = ""
        equated = false
    }
    else if (event.key === "%") {
        if (user.length !== 0) {
            user = (parseFloat(user) / 100)
            user = user.toString()
            if (user.length > 10) {
                user = (parseFloat(user).toExponential(4)).toString()
            }
        }
    }
    else if (event.key === "-") {
        user = (parseFloat(user) * -1).toString()
        if (user.length > 10) {
            user = (parseFloat(user).toExponential(4)).toString()
        }
    }
    // trackInput()
    updateDisplay()
})

function trackInput() {
    if (operand_2 === "" && operator.length === 0) { // If the user hasn't selection an operation yet, then continue editing operand 1
        operand_1 = user
    }
    else if (operand_1.length !== 0 && operator.length === 1) { // If user finishing operand 1 and selects an operator, continue to operand 2
        operand_2 = user
    }
}

function combineOperation() {
    operand_1 = parseFloat(operand_1)
    operand_2 = parseFloat(operand_2)
    if (operator === "+") {
        let answer = operand_1 + operand_2
        return answer.toString().length <= 10 ? answer : answer.toExponential(4)
    }
    else if (operator === "-") {
        let answer = operand_1 - operand_2
        return answer.toString().length <= 10 ? answer : answer.toExponential(4)
    }
    else if (operator === "x") {
        let answer = operand_1 * operand_2
        return answer.toString().length <= 10 ? answer : answer.toExponential(4)
    }
    else {
        if (operand_2 === 0) {
            alert("ERROR: Division by Zero")
            operand_2 = 1
        }
        let answer = operand_1 / operand_2
        return answer.toString().length <= 10 ? answer : answer.toExponential(4)
    }
}

function updateDisplay() {
    const current_display = document.querySelector(".container .output .result")
    const current_operation = document.querySelector(".container .output .operation")
    current_display.textContent = `${user}`
    current_operation.textContent = `${operand_1} ${operator} ${operand_2}`
}

