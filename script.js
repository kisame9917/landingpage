const heartsContainer = document.querySelector('.floating-hearts');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const revealItems = document.querySelectorAll('.reveal');
const countdownRoot = document.querySelector('.countdown');
const calendarRoot = document.getElementById('calendar');
const modal = document.getElementById('giftModal');
const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const tabButtons = document.querySelectorAll('.gift-tab');
const tabPanels = document.querySelectorAll('.gift-panel');
const copyButtons = document.querySelectorAll('.copy-btn');
const rsvpForm = document.getElementById('rsvpForm');
const toast = document.getElementById('toast');
const thanksModal = document.getElementById('thanksModal');
const thanksCloseButtons = document.querySelectorAll('[data-close-thanks-modal]');
const musicToggle = document.querySelector('.music-toggle');
const joinBtn = document.getElementById('joinBtn');
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
  bgMusic.volume = 0.4;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.innerHTML = Math.random() > 0.5 ? '❤' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${10 + Math.random() * 9}s`;
  heart.style.fontSize = `${10 + Math.random() * 10}px`;
  heart.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
  heartsContainer.appendChild(heart);

  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

for (let i = 0; i < 16; i += 1) {
  setTimeout(spawnHeart, i * 600);
}
setInterval(spawnHeart, 1400);

menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('open');
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('open');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

document.documentElement.style.scrollPaddingTop = '90px';

function updateCountdown() {
  if (!countdownRoot) return;
  const targetDate = new Date(countdownRoot.dataset.target).getTime();
  const now = Date.now();
  const diff = Math.max(targetDate - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownRoot.querySelector('[data-unit="days"]').textContent = String(days).padStart(2, '0');
  countdownRoot.querySelector('[data-unit="hours"]').textContent = String(hours).padStart(2, '0');
  countdownRoot.querySelector('[data-unit="minutes"]').textContent = String(minutes).padStart(2, '0');
  countdownRoot.querySelector('[data-unit="seconds"]').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// function buildCalendar() {
//   if (!calendarRoot) return;

//   const year = 2026;
//   const monthIndex = 5;
//   const highlightDays = {
//     1: 'Nhà trai',
//     2: 'Thành hôn',
//   };

//   const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const firstDay = new Date(year, monthIndex, 1);
//   const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//   const prevMonthDays = new Date(year, monthIndex, 0).getDate();
//   const offset = (firstDay.getDay() + 6) % 7;

//   const header = document.createElement('div');
//   header.className = 'calendar-header';
//   weekdays.forEach((day) => {
//     const cell = document.createElement('div');
//     cell.className = 'calendar-weekday';
//     cell.textContent = day;
//     header.appendChild(cell);
//   });

//   const grid = document.createElement('div');
//   grid.className = 'calendar-grid';

//   for (let i = 0; i < offset; i += 1) {
//     const day = document.createElement('div');
//     day.className = 'calendar-day muted';
//     day.innerHTML = `<strong>${prevMonthDays - offset + i + 1}</strong>`;
//     grid.appendChild(day);
//   }

//   for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
//     const day = document.createElement('div');
//     day.className = 'calendar-day';

//     if (highlightDays[dayNumber]) {
//       day.classList.add('highlight');
//       day.innerHTML = `<strong>${String(dayNumber).padStart(2, '0')}</strong><span class="badge">${highlightDays[dayNumber]}</span>`;
//     } else {
//       day.innerHTML = `<strong>${String(dayNumber).padStart(2, '0')}</strong>`;
//     }

//     grid.appendChild(day);
//   }

//   while (grid.children.length < 35) {
//     const day = document.createElement('div');
//     day.className = 'calendar-day muted';
//     day.innerHTML = `<strong>${grid.children.length - (offset + daysInMonth) + 1}</strong>`;
//     grid.appendChild(day);
//   }

//   calendarRoot.append(header, grid);
// }
function buildCalendar() {
  if (!calendarRoot) return;

  calendarRoot.innerHTML = '';

  const year = 2026;
  const monthIndex = 4; // tháng 5
  const highlightDays = [1, 2];

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(year, monthIndex, 0).getDate();

  // Lịch bắt đầu từ thứ Hai
  const offset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  const header = document.createElement('div');
  header.className = 'calendar-header';

  weekdays.forEach((dayName) => {
    const cell = document.createElement('div');
    cell.className = 'calendar-weekday';
    cell.textContent = dayName;
    header.appendChild(cell);
  });

  const grid = document.createElement('div');
  grid.className = 'calendar-grid';

  for (let i = 0; i < offset; i += 1) {
    const day = document.createElement('div');
    day.className = 'calendar-day muted';
    day.innerHTML = `<strong>${String(prevMonthDays - offset + i + 1).padStart(2, '0')}</strong>`;
    grid.appendChild(day);
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    const day = document.createElement('div');
    day.className = 'calendar-day';

    if (highlightDays.includes(dayNumber)) {
      day.classList.add('highlight', 'heart-day');
      day.innerHTML = `
        <span class="calendar-heart heart-main">❤</span>
        <span class="calendar-heart heart-sub heart-sub-1">❤</span>
        <span class="calendar-heart heart-sub heart-sub-2">❤</span>
        <strong>${String(dayNumber).padStart(2, '0')}</strong>
      `;
    } else {
      day.innerHTML = `<strong>${String(dayNumber).padStart(2, '0')}</strong>`;
    }

    grid.appendChild(day);
  }

  const totalCells = offset + daysInMonth;
  const cellsNeeded = totalCells <= 35 ? 35 : 42;

  while (grid.children.length < cellsNeeded) {
    const nextDayNumber = grid.children.length - totalCells + 1;
    const day = document.createElement('div');
    day.className = 'calendar-day muted';
    day.innerHTML = `<strong>${String(nextDayNumber).padStart(2, '0')}</strong>`;
    grid.appendChild(day);
  }

  calendarRoot.append(header, grid);
}
buildCalendar();

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openModalButtons.forEach((button) => button.addEventListener('click', openModal));
closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));
thanksCloseButtons.forEach((button) =>
  button.addEventListener('click', closeThanksModal)
);
// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Escape' && modal.classList.contains('open')) {
//     closeModal();
//   }
// });
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (modal.classList.contains('open')) {
    closeModal();
  }

  if (thanksModal?.classList.contains('open')) {
    closeThanksModal();
  }
});

function openThanksModal() {
  if (!thanksModal) return;
  thanksModal.classList.add('open');
  thanksModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeThanksModal() {
  if (!thanksModal) return;
  thanksModal.classList.remove('open');
  thanksModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    tabButtons.forEach((item) => item.classList.toggle('active', item === button));
    tabPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === tab);
    });
  });
});

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      showToast('Đã copy vào clipboard');
    } catch (error) {
      showToast('Không thể copy trên trình duyệt này');
    }
  });
});

// rsvpForm?.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const formData = new FormData(rsvpForm);
//   const payload = Object.fromEntries(formData.entries());
//   payload.createdAt = new Date().toISOString();

//   const existing = JSON.parse(localStorage.getItem('wedding-rsvp-sample') || '[]');
//   existing.push(payload);
//   localStorage.setItem('wedding-rsvp-sample', JSON.stringify(existing));

//   rsvpForm.reset();
//   showToast('Đã lưu phản hồi mẫu trong trình duyệt');
// });

rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = rsvpForm.querySelector('input[name="name"]');
  const guestName = nameInput?.value.trim();

  if (!guestName) {
    syncJoinButtonState();
    return;
  }

  const payload = {
    name: guestName,
    createdAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem('wedding-rsvp-sample') || '[]');
  existing.push(payload);
  localStorage.setItem('wedding-rsvp-sample', JSON.stringify(existing));

  rsvpForm.reset();
  syncJoinButtonState();
  openThanksModal();
});

// musicToggle?.addEventListener('click', async () => {
//   if (!bgMusic) return;

//   try {
//     if (bgMusic.paused) {
//       await bgMusic.play();
//       musicToggle.classList.add('playing');
//       showToast('Đã bật nhạc nền');
//     } else {
//       bgMusic.pause();
//       musicToggle.classList.remove('playing');
//       showToast('Đã tắt nhạc nền');
//     }
//   } catch (error) {
//     musicToggle.classList.remove('playing');
//     showToast('Không phát được nhạc. Kiểm tra lại file audio.');
//     console.error(error);
//   }
// });

function syncMusicUI() {
  if (!musicToggle || !bgMusic) return;

  const isPlaying = !bgMusic.paused;
  musicToggle.classList.toggle('playing', isPlaying);
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute(
    'aria-label',
    isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'
  );
}

async function playMusic({ silent = false } = {}) {
  if (!bgMusic) return false;

  try {
    await bgMusic.play();
    syncMusicUI();
    if (!silent) showToast('Đã bật nhạc nền');
    return true;
  } catch (error) {
    syncMusicUI();
    if (!silent) showToast('Trình duyệt đang chặn tự phát nhạc');
    return false;
  }
}

function pauseMusic({ silent = false } = {}) {
  if (!bgMusic) return;

  bgMusic.pause();
  syncMusicUI();

  if (!silent) {
    showToast('Đã tắt nhạc nền');
  }
}

function removeAutoplayFallbackListeners() {
  document.removeEventListener('pointerdown', handleFirstInteraction);
  document.removeEventListener('keydown', handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
}

const DEFAULT_SLIDE_DELAY = 3500;

function initSlideshow(slideshowRoot) {
  if (!slideshowRoot) return;

  const slides = Array.from(slideshowRoot.querySelectorAll('.slide'));
  const dotsContainer = slideshowRoot.querySelector('.slideshow-dots');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let timer = null;
  const delay = Number(slideshowRoot.dataset.delay) || DEFAULT_SLIDE_DELAY;

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slideshow-dot';
    dot.setAttribute('aria-label', `Chuyển tới ảnh ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      restart();
    });
    dotsContainer?.appendChild(dot);
    return dot;
  });

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentIndex);
    });
  }

  function start() {
    stop();
    timer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, delay);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function restart() {
    stop();
    start();
  }

  slideshowRoot.addEventListener('mouseenter', stop);
  slideshowRoot.addEventListener('mouseleave', start);

  goToSlide(0);
  start();
}

document.querySelectorAll('.slideshow').forEach(initSlideshow);

async function handleFirstInteraction(event) {
  if (event?.target?.closest?.('.music-toggle')) return;

  const played = await playMusic({ silent: true });
  if (played) {
    removeAutoplayFallbackListeners();
  }
}

function syncJoinButtonState() {
  if (!rsvpForm || !joinBtn) return;

  const nameInput = rsvpForm.querySelector('input[name="name"]');
  if (!nameInput) return;

  joinBtn.disabled = nameInput.value.trim() === '';
}
const rsvpNameInput = rsvpForm?.querySelector('input[name="name"]');

rsvpNameInput?.addEventListener('input', syncJoinButtonState);
syncJoinButtonState();

musicToggle?.addEventListener('click', async () => {
  if (!bgMusic) return;

  if (bgMusic.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
});

bgMusic?.addEventListener('play', syncMusicUI);
bgMusic?.addEventListener('pause', syncMusicUI);

playMusic({ silent: true });

document.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
document.addEventListener('keydown', handleFirstInteraction);

syncMusicUI();
