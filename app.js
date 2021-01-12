// https://type.fit/api/quotes
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const nextQuoteBtn = document.getElementById('next-quote');
// const loader = document.getElementById('loader');
let apiQuotes = [];

//show quote
function showQuote(){
  //get random quote
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
  //check if there is no author and fill in 'unknown'
  if(!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
  authorText.textContent = quote.author;
  }

  //If quote is long, make font smaller with CSS
  if(quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
}

//Gets quote from API
async function getQuote() {
  const apiUrl = await fetch('https://type.fit/api/quotes')
  try{
    apiQuotes = await apiUrl.json()
    showQuote();
  } catch(error){
    console.error(error)
  }
}

function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');

}

//Event listeners
nextQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote);

//On page load
getQuote();