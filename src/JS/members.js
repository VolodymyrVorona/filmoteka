import refs from "./refs"
import members from './members.json';
import teamMember from  '../templates/team-member.hbs';

const memberMarkup = teamMember(members);

const teamMemebers = document.querySelector('.our-team');
teamMemebers.insertAdjacentHTML('beforeend', memberMarkup)

const showMemebers = document.querySelector('.js-open-modal');
showMemebers.addEventListener("click", footerModalHandler);

function footerModalHandler(event) {
    event.preventDefault();

    console.log('open!');

    const footerModal = document.querySelector('.footer-modal');
    footerModal.classList.remove('is_hidden');
    refs.body.classList.add('modal-overflow')
   
    function closeFooterModal() {
            footerModal.classList.add('is_hidden');
            refs.body.classList.remove('modal-overflow');
            window.removeEventListener('keydown', pressEscape);
          }
        
          const closeMdlBtnRef = document.querySelector('.footer-close-button');
          closeMdlBtnRef.addEventListener('click', closeFooterModal);
          const footerBackdrop = document.querySelector('.footer-backdrop');
          footerBackdrop.addEventListener('click', closeFooterModal);
        
          const pressEscape = event => {
            if (event.code === 'Escape') {
              closeFooterModal();
            }
          };
          window.addEventListener('keydown', pressEscape)
}
