
// APPEND CORRECT STUDENTS ON THE PAGE
const showPage = (list, page) => {
   // FIRST / LAST STUDENTS TO SHOW
   const start = (page * studentsPerPage) - studentsPerPage;
   const end = (page * studentsPerPage) - 1;
   const studentListUL = document.querySelector('.student-list');
   studentListUL.innerHTML = '';
   let html;

   if (list.length > 0) {
      list.forEach((student, index) => {
         if (index >= start && index <= end) {
            html = `
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src="${student.picture.medium}" alt="Photo of ${student.name.first} ${student.name.last}">
                     <h3>${student.name.first} ${student.name.last}</h3>
                     <span class="email">${student.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${student.registered.date}</span>
                  </div>
               </li>
            `;
            studentListUL.insertAdjacentHTML('beforeend', html);
         };
      });
   } else {
      html = `
         <li>
            <span class="no-results">No Results Found</span>
         </li>
      `;
      studentListUL.insertAdjacentHTML('beforeend', html);
   };

};

// APPEND THE CORRECT PAGE BTNS ON THE PAGE
const addPagination = (list) => {
   const numOfPages = Math.ceil(list.length / studentsPerPage);
   const btnsListUL = document.querySelector('.link-list');
   btnsListUL.innerHTML = '';

   if (list.length > 0) {
      for (let i = 1; i <= numOfPages; i++) {
         const html = `
            <li>
               <button type="button">${i}</button>
            </li>
         `;
         btnsListUL.insertAdjacentHTML('beforeend', html);
      };
   };

   // AUTO ADD ACTIVE TO FIRST BTN
   const firstBtn = document.querySelector('li button');
   firstBtn.classList.add('active');

   // LISTEN ON BTNS
   btnsListUL.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const activeBtn = document.querySelector('.active');
         activeBtn.classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.innerHTML);
      };
   });
};

// STUDENTS PER PAGE SELECT
const header = document.querySelector('header');

const selectHTML = `
   <div class="select-div">
      <select name="perPage" id="perPage">
         <option value="3">3</option>
         <option value="6">6</option>
         <option value="9" selected>9</option>
      </select>
      <label for="perPage">Results Per Page</label>
   </div>
`;

header.insertAdjacentHTML('beforeend', selectHTML);

const perPageSelect = document.querySelector('#perPage');
let studentsPerPage = parseInt(perPageSelect.value);

perPageSelect.addEventListener('change', () => {
   studentsPerPage = parseInt(perPageSelect.value);
   showPage(data, 1);
   addPagination(data);
});

// SEARCH BAR

const searchBarHTML = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;

header.insertAdjacentHTML('beforeend', searchBarHTML);
const searchBar = document.querySelector('#search');

// LISTEN FOR SEARCH
searchBar.addEventListener('input', () => {
   const newData = [];
   const userInput = searchBar.value.toLowerCase();
   data.forEach(student => {
      const name = `${student.name.first} ${student.name.last}`.toLowerCase();
      if (name.includes(userInput)) {
         newData.push(student);
      };
   });
   showPage(newData, 1);
   addPagination(newData);
});

// INITIALIZE ON PAGE LOAD
showPage(data, 1);
addPagination(data);