const triggers = document.getElementsByClassName('toast-button')
const toastLive = document.getElementById('liveToast')

const title = document.getElementById('inputTitle')
const author = document.getElementById('inputAuthor')
const release = document.getElementById('inputRelease')
const cover = document.getElementById('inputCover')


for(let i = 0; i < triggers.length; i++) {
  triggers[i].addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLive)
    let pageNum = getCurrentPage()[30];
    console.log('book num: '+(9*pageNum))

    axios.get('https://wozniacki-booksapp.herokuapp.com/books?items='+(9*pageNum))
      .then(function (response) {
        title.placeholder = response.data[i+(9*(pageNum-1))].name;
        author.placeholder = response.data[i+(9*(pageNum-1))].author;
        release.placeholder = response.data[i+(9*(pageNum-1))].release;
          cover.placeholder = 'Cover';
      })
      .catch(function (error) {
        console.log(error);
      });

    toast.show()
  })
}

function updateBook() {
  let newTitle = title.placeholder;
  if(title.value) {
    newTitle = title.value;
  }

  let newAuthor = author.placeholder;
  if(author.value) {
    newAuthor = author.value;
  }

  let newRelease = release.placeholder;
  if(release.value) {
    newRelease = release.value;
  }

  let newCover = cover.placeholder;
  if(cover.value) {
    newCover = cover.value;
  }

  axios.post('https://wozniacki-booksapp.herokuapp.com/books/editBook', {
    oldName: title.placeholder,
    name: newTitle,
    author: newAuthor,
    release_date: newRelease,
    cover: newCover
  })
  .then(function (response) {
    console.log(response);
    window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  });
}