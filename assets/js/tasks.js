const today = dayjs();

$("#current-date").text(today.format("dddd, MMMM DD"));

// document.addEventListener("DOMContentLoaded", () => {
//   function openModal($el) {
//     $el.classList.add("is-active");
//   }
//   function closeModal($el) {
//     $el.classList.remove("is-active");
//   }
// });

// $('.js-modal-trigger')
