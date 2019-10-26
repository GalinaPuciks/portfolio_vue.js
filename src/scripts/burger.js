const blockS  = document.querySelector ('.block-section');
const hamburger = document.querySelector ('.gamburger-menu-link__bars');
const wrapper = document.querySelector ('.wrapper');
const closeMenu = document.querySelectorAll ('.gamburger-menu-close__bars');
const width = screen.availwidth;


    hamburger.addEventListener('click', function (event) {
        event.preventDefault();
        wrapper.classList.add('hidden');
        blockS.style.display = 'flex';
        });
        
        blockS.addEventListener('click', function (directionSite) {
           directionSite.preventDefault();
           blockS.style.display = 'none';
          });



