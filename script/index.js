// console.log("i am Badsa")
// modal ar synonym k funtion ar maddome 
const createElements = (arr) =>{
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join(" ");
}

// spinner function
 const manageSpinner =  (status) =>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")
  }
  else{
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
 }



const loadLesson = () =>{
  fetch("https://openapi.programming-hero.com/api/levels/all") /**promise of response */
  .then((res) => res.json())  /**promise of json data */
  .then((json) => displayLesson(json.data));
}
  

 
// active button ar jonno 
const removeActive = () =>{
  const lessonButtons = document.querySelectorAll(".lesson-btn")
  // console.log(lessonButtons);
  lessonButtons.forEach(btn => btn.classList.remove("active"))
}

 const loadLevelWord = (id)=>{
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
  //  remove button k call 
  removeActive(); /**remove all active class */
    const clickBtn = document.getElementById(`lesson-btn-${id}`);
    // console.log(clickBtn)
    clickBtn.classList.add("active"); /**add active class */
    displayLevelWord(data.data)
  })
 }

 const loadWordDetail = async(id)  =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  // console.log(url)
  const res = await fetch(url);
  const details = await res.json();
 displayWordDetails(details.data)
 }
//  displayWordDetails 
const displayWordDetails = (word)=>{
  console.log(word)
  const detailsBox =  document.getElementById("details-container")
//  {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }
  
  detailsBox.innerHTML = `
   <div class="">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
      </div> 
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold">Synonym</h2>
       <div class = "" > ${createElements(word.synonyms)} </div>
      </div>
      `
   document.getElementById("word_modal").showModal();
}

//   display levelWord
const displayLevelWord = (words) =>{
  const wordContainer = document.getElementById("word-container")
  wordContainer.innerHTML= ""
  if(words.length == 0){
    wordContainer.innerHTML = `
    <div class=" text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-4xl ">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    manageSpinner(false)
    return;
  }
  for(const word of words){
    // console.log(word)
    // { id: 81,
    //   level: 1,
    //   word: 'Ball', 
    //   meaning: 'বল', 
    //   pronunciation: 'বল'}
    const card = document.createElement("div")
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word? word.word: "শব্দ পাওয়া যায় নি"}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="text-2xl font-medium font-bangla">${word.meaning?word.meaning:"অর্থ পাওয়া যায় নি"} / ${word.pronunciation ?word.pronunciation: "pronounciation পাওয়া যায় নি"}</div>
      <div class=" flex justify-between items-center ">
        <button onclick = "loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>

      </div>
    </div>

    `
    wordContainer.append(card);
  }
  manageSpinner(false);
}
// display data

const displayLesson = (lessons)=>{
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-container")
  levelContainer.innerHTML = "";
  // 2. get into every lessons
  for(const lesson of lessons){
    // console.log(lesson)
  // 3.create element
  const btnDiv = document.createElement("div");
  btnDiv.innerHTML =`
  <button id= "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no} </button>
  
  `
  // 4. append into container
  levelContainer.append(btnDiv)
  }
  
}
loadLesson();