const title = document.getElementById("inputTitle");
const author = document.getElementById("inputAuthor");
const radio = document.getElementsByName("bookRadio");
const rating = document.getElementById("selectRating");
const checkbox = document.getElementsByClassName("form-check-input");

function handleFormSubmit(event) {
    event.preventDefault();

    let isValid = true;

    if(title.value.length <= 0) {
        title.classList.add("is-invalid");
        title.classList.remove("is-valid");
        isValid = false;
    } else {
        title.classList.remove("is-invalid");
        title.classList.add("is-valid");
    }

    if(author.value.length <= 0) {
        author.classList.add("is-invalid");
        author.classList.remove("is-valid");
        isValid = false;
    } else {
        author.classList.remove("is-invalid");
        author.classList.add("is-valid");
    }

    if(!radio[0].checked && !radio[1].checked) {
        radio[0].classList.add("is-invalid");
        radio[1].classList.add("is-invalid");
        radio[0].classList.remove("is-valid");
        radio[1].classList.remove("is-valid");
        isValid = false;
    } else {
        radio[0].classList.remove("is-invalid");
        radio[1].classList.remove("is-invalid");
        radio[0].classList.add("is-valid");
        radio[1].classList.add("is-valid");
    }

    if(!anyCheckbox()) {
        for(let i = 0; i < checkbox.length; i++) {
            checkbox[i].classList.add("is-invalid");
            checkbox[i].classList.remove("is-valid");
        }
        isValid = false;
    } else {
        for(let i = 0; i < checkbox.length; i++) {
            checkbox[i].classList.remove("is-invalid");
            checkbox[i].classList.add("is-valid");
        }
    }

    if(isValid) {
        let arr = []
        for(let i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                arr.push(checkbox[i].value)
            }
        }
        let data = {
            title: title.value,
            author: author.value,
            genres: arr,
            rating: rating.value,
            isLiked: radio[0].checked
        }
        console.log(data)
        localStorage.setItem("book", JSON.stringify(data));
    }
}

function anyCheckbox()
{
    let inputElements = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < inputElements.length; i++)
        if (inputElements[i].type == "checkbox")
            if (inputElements[i].checked)
                return true;
    return false;
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);