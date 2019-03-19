/******************************************
Treehouse Techdegree: Anjus Kelley
FSJS project 2 - List Filter and Pagination
******************************************/

//these variables grab the details of the students in the listing
const studentDetails = document.getElementsByClassName('student-details');
const studentList = document.getElementsByClassName('student-item cf');

// variable for the class page
const classPage = document.querySelector('.page');

// the second variable defines the total number of pages the 10 items show on
let itemsPerPage = 10;
let numberOfPages = 1;

/* this function sets only 10 students to be seen on the page
  else, displays 'none' */
const showPage = (list, page) => {
  for (let i = 0; i < list.length; i++) {
       const firstItem = ((page * itemsPerPage) - 10);
       const lastItem = ((firstItem + itemsPerPage) - 1);
       const students = list[i];

       if (i >= firstItem && i <= lastItem) {
          students.style.display = 'block';
       } else {
          students.style.display = 'none';
       }
    }
}


const appendPageLinks = (list) => {

   //calculate how many pages are needed for the list
   numberOfPages = Math.ceil(list.length / itemsPerPage);

   const div = document.createElement('div');
   const ul = document.createElement('ul');

   div.className = 'pagination'; // give the div the “pagination” class
   classPage.appendChild(div); // append div to .page
   div.appendChild(ul); //Add a ul to the “pagination” div to store the pagination links

   // this adds li and a tags with the page number text for each page
   for (let i = 0; i < numberOfPages; i++) {
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      if (i === 0) {
          a.setAttribute("class", "active");
}
      a.textContent = 1 + i;
      a.href = '#';
      li.appendChild(a);


      // Loop over pagination links to remove active class from all links
      a.addEventListener('click', (e) => {
         e.preventDefault()
         const links = document.getElementsByTagName('a');
         showPage(list, i + 1);
         for (let i = 0; i < links.length; i++) {
            links[i].classList.remove('active');
         }
         e.target.className = 'active';
      });
   }
}

// create search form to search for students
const searchStudents = () => {
   const pageHeader = document.getElementsByClassName('page-header')[0];
   const ul = document.querySelector('.student-list');
   const li = ul.children;

   // create searchDiv to store input and button
   const searchDiv = document.createElement('div');
   const button = document.createElement('button');
   const input = document.createElement('input');

   searchDiv.className = 'student-search';
   pageHeader.appendChild(searchDiv);

   input.className = 'input';
   input.placeholder = 'Search for a student..';
   searchDiv.appendChild(input);

   button.textContent = 'Search';
   searchDiv.appendChild(button);



   const filter = () => {
      let results = [];
      removeErrorMsg();
      removeLinks();

      // loop over list and cheks if input value matches
      for (let i = 0; i < li.length; i++) {
         const search = input.value.toLowerCase();
         const studentDiv = li[i].children[0];
         const name = studentDiv.children[1].textContent;

         if (name.includes(search)) {
            li[i].style.display = 'block';
            results.push(li[i]);
         } else {
            li[i].style.display = 'none';
         }
      }
      if (results.length <= 0) {
         removeLinks();
         errorMsg();
      } else if (results.length <= 10) {
         showPage(results, 1);
         appendPageLinks(results);
      } else {
         showPage(results, 1);
         appendPageLinks(results);
      }
   }

   //append no result message to the dom
   const errorMsg = () => {
      const msg = document.createElement('h1');
      msg.className = 'error';
      msg.textContent = 'Your search returned no results.';
      classPage.appendChild(msg);
   }

   //remove error message
   const removeErrorMsg = () => {
      const error = document.querySelector('.error');
      if (error) {
         error.parentNode.removeChild(error);
      }
   }

   //remove pagination links
   const removeLinks = () => {
      const links = document.querySelector('.pagination');
      if (links) {
         classPage.removeChild(links);
      }
   }
   //list for keyup event on the input form
   input.addEventListener('keyup', () => {
      filter();
   });

   //list for click event on the button
   button.addEventListener('click', () => {
      filter();
   });
}

// call the functions
showPage(studentList, 1);
appendPageLinks(studentList);
searchStudents();
