const bookCover1 = document.getElementById('bookCover1')
const bookName1 = document.getElementById('bookName1')
const bookCover2 = document.getElementById('bookCover2')
const bookName2 = document.getElementById('bookName2')
const bookCover3 = document.getElementById('bookCover3')
const bookName3 = document.getElementById('bookName3')
const bookCover4 = document.getElementById('bookCover4')
const bookName4 = document.getElementById('bookName4')
const bookCover5 = document.getElementById('bookCover5')
const bookName5 = document.getElementById('bookName5')
const bookCover6 = document.getElementById('bookCover6')
const bookName6 = document.getElementById('bookName6')
const bookCover7 = document.getElementById('bookCover7')
const bookName7 = document.getElementById('bookName7')
const bookCover8 = document.getElementById('bookCover8')
const bookName8 = document.getElementById('bookName8')
const bookCover9 = document.getElementById('bookCover9')
const bookName9 = document.getElementById('bookName9')

const names = [bookName1, bookName2, bookName3, bookName4, bookName5, bookName6, bookName7, bookName8, bookName9];
const covers = [bookCover1, bookCover2, bookCover3, bookCover4, bookCover5, bookCover6, bookCover7, bookCover8, bookCover9];

function fetchRatings(pageNum) {
    axios.get('https://wozniacki-booksapp.herokuapp.com/books')
        .then(function( response) {
            for(let i = (pageNum-1)*9; i < 9*pageNum; i++) {
                try {
                if(response.data[i].average != 0) {
                    document.getElementById(`bookRating${i-((pageNum-1)*9-1)}`).innerHTML = `Average: ${response.data[i].average}`
                } else {
                    document.getElementById(`bookRating${i-((pageNum-1)*9-1)}`).innerHTML = `No ratings yet :(`
                }
            } catch(err) {}
            }
        })
}

function fetchCovers(pageNum) {
  axios.get('https://wozniacki-booksapp.herokuapp.com/books?items='+(9*pageNum))
  .then(function (response) {
    console.log(response.data)
    console.log(9-(pageNum*9-response.data.length))
    for(let i = 0; i < 9; i++) {
        if(i < 9-(pageNum*9-response.data.length)) {
            names[i].innerHTML = response.data[i+(pageNum-1)*9].name
            covers[i].src = response.data[i+(pageNum-1)*9].cover
        } else  {
            names[i].innerHTML = "No book"
            covers[i].src = "https://via.placeholder.com/420x500.jpg?text=No+book+yet"
        }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

fetchCovers(1);
fetchRatings(1)