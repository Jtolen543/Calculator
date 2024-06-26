let user = ""

const numbers = document.querySelectorAll(".container .input .btn-2")
numbers.forEach((number) => {
    number.addEventListener("click",() => {
        if (user.length < 10 && number.id !== "delete") {
            user += number.id
            console.log(user)
        }
    });
});

const display_1 = document.querySelector(".container .output .result")
console.log(display_1)
display_1.textContent = `${user}`