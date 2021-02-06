import refs from '../refs';
import members from '../../components/members.json';
import teamMember from '../../templates/team-member.hbs';
import { renderMarkup } from '../render/searchResultsMarkup';

renderMarkup(members, teamMember, refs.modalTeamList);

const showMemebers = document.querySelector('.js-open-modal');
showMemebers.addEventListener('click', footerModalHandler);

function footerModalHandler(event) {
  event.preventDefault();

  refs.footerModal.classList.remove('is_hidden');
  refs.body.classList.add('modal-overflow');

  refs.closeMdlBtn.addEventListener('click', closeFooterModal);
  refs.footerBackdrop.addEventListener('click', closeFooterModal);
  window.addEventListener('keydown', pressEscape);
}

function closeFooterModal() {
  refs.footerModal.classList.add('is_hidden');
  refs.body.classList.remove('modal-overflow');
  window.removeEventListener('keydown', pressEscape);
}

function pressEscape(event) {
  if (event.code === 'Escape') {
    closeFooterModal();
  }
}
