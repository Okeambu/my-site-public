document.addEventListener('DOMContentLoaded', () => {
  // Логика плавного скроллинга
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const startPosition = window.scrollY;
        const elementPosition = targetElement.offsetTop;
        const windowHeight = window.innerHeight;

        const targetPosition =
          elementPosition - (windowHeight / 2) + (targetElement.offsetHeight / 2);

        const distance = Math.abs(targetPosition - startPosition);

        const baseHeight = 700; // Фиксированная базовая высота
        const minDuration = 200; // Минимальная длительность
        const maxDuration = 1000; // Максимальная длительность
        const proportionalDuration = distance / baseHeight * 500; // Пропорциональная длительность
        const duration = Math.min(maxDuration, Math.max(minDuration, proportionalDuration));

        const finalBrakeTime = 300;
        let startTime = null;

        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

        const animation = currentTime => {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const adjustedDuration = duration + finalBrakeTime;
          const progress = Math.min(timeElapsed / adjustedDuration, 1);
          const easedProgress = easeOutCubic(progress);

          window.scrollTo(0, startPosition + (targetPosition - startPosition) * easedProgress);

          if (timeElapsed >= adjustedDuration - 500 && !targetElement.classList.contains('blink')) {
            targetElement.classList.add('blink');
          }

          if (timeElapsed < adjustedDuration) {
            requestAnimationFrame(animation);
          } else {
            window.scrollTo(0, targetPosition);

            setTimeout(() => {
              targetElement.classList.remove('blink');
            }, 1500);
          }
        };

        requestAnimationFrame(animation);
      }
    });
  });

  // Логика для показа/скрытия контейнера #template-container
  const ctaButton = document.getElementById('cta-button');
  const templateContainer = document.getElementById('template-container');

  if (ctaButton && templateContainer) {
    ctaButton.addEventListener('click', (event) => {
      event.preventDefault(); 

const tallyFrame = document.querySelector('iframe[data-tally-src]');
        if (tallyFrame) tallyFrame.src = tallyFrame.dataset.tallySrc + '&_=' + Date.now();

waitForThankYouContainerAndHide("thank-you-container", 2000);

      if (templateContainer.style.display === 'none' || !templateContainer.style.display) {
        templateContainer.style.display = 'block'; // Показываем контейнер
      } else {
        templateContainer.style.display = 'none'; // Скрываем контейнер
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
    var d = document, 
        w = "https://tally.so/widgets/embed.js",
        v = function() {
            if (typeof Tally !== "undefined") {
                Tally.loadEmbeds();
            } else {
                d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
                    e.src = e.dataset.tallySrc;
                });
            }
        };
    if (typeof Tally !== "undefined") {
        v();
    } else if (d.querySelector('script[src="' + w + '"]') == null) {
        var s = d.createElement("script");
        s.src = w;
        s.onload = v;
        s.onerror = v;
        d.body.appendChild(s);
    }
});


const scrollUpButton = document.getElementById('scrollUp');

// Показываем или скрываем кнопку при прокрутке
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUpButton.style.display = 'flex'; // Показываем кнопку
    } else {
        scrollUpButton.style.display = 'none'; // Скрываем кнопку
    }
});

// Функция плавной прокрутки с ускорением и замедлением
function smoothScrollToTop(duration) {
    const start = window.scrollY; // Начальная позиция скролла
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Прогресс от 0 до 1
        const easing = progress < 0.5 
            ? 2 * progress * progress // Ускорение
            : -1 + (4 - 2 * progress) * progress; // Замедление

        window.scrollTo(0, start * (1 - easing)); // Скроллим с учётом easing

        if (elapsed < duration) {
            requestAnimationFrame(step); // Запускаем следующий шаг анимации
        }
    }

    requestAnimationFrame(step); // Инициализируем анимацию
}

// При нажатии на кнопку запускаем кастомный скролл
scrollUpButton.addEventListener('click', () => {
    smoothScrollToTop(800); // Время анимации: 800 миллисекунд
});


// Слушаем события сенсорного касания
document.querySelectorAll('a.service').forEach(link => {
    link.addEventListener('touchstart', function() {
        // Добавляем класс, который активирует изменение цвета
        this.classList.add('touch-active');
    });

    link.addEventListener('click', function(event) {
        event.preventDefault(); // Останавливаем стандартное поведение ссылки

        const targetId = this.getAttribute('href'); // Получаем ID якоря
        const targetElement = document.querySelector(targetId); // Находим элемент по ID

        // После завершения анимации CSS, переходим к якорю
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });

    // Убираем класс, чтобы цвет вернулся к исходному
    link.addEventListener('transitionend', function() {
        this.classList.remove('touch-active');
    });
});


// Проверяем тип устройства и управляем отображением
if (/Mobi|Android/i.test(navigator.userAgent)) {
    const note = document.querySelector('.mobile-note');
    note.style.display = 'block'; // Показываем только на мобильных
}










window.addEventListener("message", function(event) {
    if (event.origin === "https://tally.so") {
        try {
            const data = JSON.parse(event.data);

            // Проверяем событие отправки формы
            if (data && data.event === "Tally.FormSubmitted") {
                // Скрываем контейнер с формой
                document.getElementById("template-container").style.display = "none";

                // Показываем контейнер с благодарностью
                document.getElementById("thank-you-container").style.display = "block";

                // Скрываем кнопку "Fill out the Brief"
                const briefButton = document.getElementById("cta-button");
                if (briefButton) {
                    briefButton.style.display = "none";
                }

                // Перезагружаем iframe с формой
                const tallyFrame = document.getElementById("tally-frame");
                if (tallyFrame) {
                    tallyFrame.src = tallyFrame.src; // Перезагружаем форму через обновление src
                }
            }
        } catch (error) {
            console.error("Ошибка при парсинге JSON:", error);
        }
    }
});

// Слушаем клики на якорях
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function() {
        // Показываем кнопку "Fill out the Brief" снова
        const briefButton = document.getElementById("cta-button");
        if (briefButton) {
            briefButton.style.display = "block";
        }
    });
});








function toggleThankYouContainer() {
    const container = document.getElementById("thank-you-container");

    if (container) {
        // Проверяем горизонтальную ориентацию
        if (window.innerWidth > window.innerHeight && window.innerWidth <= 768) {
            container.style.display = "block"; // Показываем контейнер
            container.style.position = "fixed"; // Фиксируем его на экране
            container.style.top = "0";
            container.style.left = "0";
            container.style.width = "100%";
            container.style.height = "100%";
        } else {
            container.style.display = "none"; // Скрываем контейнер в других условиях
        }
    } else {
        console.error("Элемент с id 'thank-you-container' не найден.");
    }
}

// Запуск функции при загрузке и изменении размеров экрана
window.addEventListener("load", toggleThankYouContainer);
window.addEventListener("resize", toggleThankYouContainer);














// Функция для запуска таймера после появления контейнера
function waitForThankYouContainerAndHide(containerId, delay) {
    const thankYouContainer = document.getElementById(containerId);

    if (thankYouContainer) {
        // Наблюдаем за изменением стиля элемента
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.target.style.display === "block") {
                    console.log(`Контейнер "${containerId}" стал видимым. Таймер запущен.`);
                    // Запускаем таймер на скрытие
                    setTimeout(() => {
                        mutation.target.style.display = "none"; // Скрываем контейнер
                        console.log(`Контейнер "${containerId}" скрыт.`);
                    }, delay);

                    // Останавливаем наблюдение, чтобы не запускать таймер снова
                    
                }
            });
        });

        // Запускаем наблюдатель за стилем элемента
        observer.observe(thankYouContainer, { attributes: true, attributeFilter: ["style"] });
    } else {
        console.error(`Контейнер с id="${containerId}" не найден.`);
    }
}

// Вызов функции для отслеживания появления и скрытия контейнера
waitForThankYouContainerAndHide("thank-you-container", 2000); // Скрытие через 5 секунд после появления










document.addEventListener('contextmenu', event => event.preventDefault()); // Запрет правого клика
document.addEventListener('selectstart', event => event.preventDefault()); // Запрет выделения текста
document.addEventListener('copy', event => event.preventDefault()); // Запрет копирования текста






const btn = document.querySelector('.service');
let vibrationInterval;

btn.addEventListener('mousedown', () => {
    const amplitude = 0.8; // Было 0.4
    let angle = 0;
    
    vibrationInterval = setInterval(() => {
        angle += 30;
        const rad = angle * Math.PI / 180;
        const x = Math.sin(rad) * amplitude;
        const y = Math.cos(rad) * amplitude;
        
        btn.style.transform = `
            translateZ(-4px)
            scale(0.99)
            translate(${x}px, ${y}px)
        `;
    }, 16);
});

btn.addEventListener('mouseup', () => {
    clearInterval(vibrationInterval);
    btn.style.transform = '';
});








































document.addEventListener('DOMContentLoaded', () => {
  // Определяем планшет ТОЛЬКО по userAgent
  const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent);
  
  if (isTablet) {
    document.documentElement.dataset.device = 'tablet';
    console.log('Устройство распознано как планшет');
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const scrollUpBtn = document.getElementById("scrollUp");

  if (!scrollUpBtn) return;

  let isVisible = false;

  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;
    const triggerHeight = scrollHeight * 0.3;

    if (scrollY > triggerHeight && !isVisible) {
      scrollUpBtn.style.transition = "opacity 0.5s ease-in-out, filter 0.5s ease-in-out"; 
      scrollUpBtn.style.opacity = "1";
      scrollUpBtn.style.filter = "brightness(1.2)";
      scrollUpBtn.style.pointerEvents = "auto";
      isVisible = true;
    }

    if (scrollY < triggerHeight && isVisible) {
      setTimeout(() => {
        if (window.scrollY < triggerHeight) {
          scrollUpBtn.style.transition = "opacity 0.5s ease-in-out, filter 0.5s ease-in-out"; 
          scrollUpBtn.style.opacity = "0";
          scrollUpBtn.style.filter = "brightness(1)";
          scrollUpBtn.style.pointerEvents = "none";
          isVisible = false;
        }
      }, 200);
    }
  });

  scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ⚡ **Мгновенное масштабирование при касании**
  scrollUpBtn.addEventListener("mousedown", () => {
    scrollUpBtn.style.transition = "none"; // **Убираем паузу перед изменением**
    scrollUpBtn.style.transform = "scale(1.2)"; // **Мгновенное увеличение**
    scrollUpBtn.style.backgroundColor = "rgba(255, 255, 255, 1)"; // Белая вспышка
    scrollUpBtn.style.opacity = "1";
  });

  scrollUpBtn.addEventListener("mouseup", () => {
    setTimeout(() => {
      scrollUpBtn.style.transition = "transform 0.2s ease-in-out, background-color 0.6s ease-in-out, opacity 0.6s ease-in-out"; 
      scrollUpBtn.style.transform = "scale(1)"; // **Плавное возвращение к нормальному размеру**
      scrollUpBtn.style.backgroundColor = "rgba(111, 0, 255, 0.5)"; // Возвращение цвета
      scrollUpBtn.style.opacity = "1";
    }, 100); // Небольшая задержка для естественного эффекта
  });
});







document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formContainer = document.getElementById("tally-form");

    if (urlParams.get("form") === "show") {
        formContainer.style.display = "block";
    }
});





document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const triggerID = urlParams.get("id");

    if (triggerID === "78901") {  
        // Изменяем текст первой кнопки
        document.querySelector("#animation-card p").textContent = "Claim Your Free Track";
        
        // Изменяем текст второй кнопки
        document.querySelector("#cta-button").textContent = "Fill & Get Track";
        
        // Меняем `iframe` на новую форму
        const iframe = document.querySelector("iframe[data-tally-src]");
if (iframe) {
  iframe.dataset.tallySrc = "https://tally.so/embed/nPg2v5?alignLeft=1&hideTitle=1&dynamicHeight=1";
  iframe.src = iframe.dataset.tallySrc;
  iframe.style.height = "2300px"; // фиксированная высота, чтобы убрать скролл
}
}
  
});







function blinkElementSoft(el, times, interval) {
  let count = 0;
  const maxCount = times * 2;
  let visible = true;

  const blinkInterval = setInterval(() => {
    if (visible) {
      el.style.opacity = '0.3'; // полупрозрачность
    } else {
      el.style.opacity = '1'; // полностью видимый
    }
    visible = !visible;
    count++;

    if (count >= maxCount) {
      clearInterval(blinkInterval);
      el.style.opacity = '1'; // вернуть нормальную непрозрачность
    }
  }, interval);
}

window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id === '78901') {
    const button = document.getElementById('animation-card');
    if (button) {
      const rect = button.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = window.innerHeight / 2 - rect.height / 2;
      window.scrollTo(0, absoluteTop - offset);

      setTimeout(() => {
        blinkElementSoft(button, 6, 150); // 6 миганий с интервалом 150 мс
      }, 100);
    }
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const descriptionBlock = document.getElementById('service-description');
  const services = document.querySelectorAll('.service');

  // Объект с описаниями по ключам data-desc-key
  const descriptions = {

    ephemeris: "RADIO EPHEMERIDES — your personal space-time point where you can intercept our secret message to distant worlds! All music here is our original work. Want a license or an exclusive track? Just email us!",


    giftbox: "Perfect music for yoga and meditation – free!\n" +
               "Immerse yourself in an atmosphere of harmony and relaxation\n" +
               "with a unique audio track, specially created for yoga studios and wellness spaces.\n" +
               "A commercial license allows you to use it in your sessions, videos,\n" +
               "and other projects – absolutely free!\n\n" +
               "Download, dive in, and create the perfect atmosphere for your clients!\n" +
               "Start now!",

    premium: "If your project involves multiple technical stages, this format will provide you with a transparent production architecture, a unified and agreed-upon price, and a clear roadmap — built for you, from within.",
    commercials: "Professional sound design and editing tailored for commercials and corporate videos.",
    podcast: "Complete podcast sound design and post-production for clean, engaging audio.",
    jingles: "Custom jingles and stingers to make your radio spots stand out.",

    forapps: "Custom audio cues, UX tones & branded sound design.",

    backgroundMusic: "Original background music creation to fit the mood of your project.",
    immersiveMusic: "Immersive music soundscapes created in Dolby Atmos for unique audio experiences.",
    vocalProcessing: "Advanced vocal processing and enhancement for clarity and presence.",
    denoise: "Fast and effective noise removal to clean up your audio tracks.",
    broadcastPrep: "Audio preparation and formatting for broadcast standards compliance.",
    audioSync: "Precise audio synchronization with video using timecodes.",
    blitzMixing: "Blitz mixing with virtual monitoring, inspired by top studios.",
    blitzMastering: "Professional mastering to polish your audio to perfection."
  };

  services.forEach(service => {
    service.addEventListener('click', (e) => {
      e.preventDefault(); // Чтобы не прыгать по якорю сразу (если надо, можно убрать)

      const key = service.getAttribute('data-desc-key');
      if (key && descriptions[key]) {
        descriptionBlock.textContent = descriptions[key];
        descriptionBlock.style.display = 'block';
      } else {
        descriptionBlock.style.display = 'none';
      }

      // Прокрутка к кнопке брифа
      const cta = document.getElementById('cta-button');
      cta.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
  });
});







document.addEventListener('DOMContentLoaded', () => {
    const templateContainer = document.getElementById('template-container');
    const giftBoxButton = document.querySelector('.service[data-desc-key="freeMusic"]');

    const originalIframe = templateContainer.innerHTML; // Сохраняем стандартную форму
    const giftBoxIframe = `<iframe data-tally-src="https://tally.so/embed/YOUR_TALLY_FORM" loading="lazy" width="100%" height="600" frameborder="0" title="Gift Box Special Form"></iframe>`;

    function setGiftBoxIframe() {
        templateContainer.innerHTML = giftBoxIframe;
    }

    function restoreOriginalIframe() {
        templateContainer.innerHTML = originalIframe;
    }

    giftBoxButton.addEventListener('click', (event) => {
        event.preventDefault();
        setGiftBoxIframe();
    });

    document.querySelectorAll('.service:not([data-desc-key="freeMusic"])').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            restoreOriginalIframe();
        });
    });

    // Код для загрузки Tally-виджета
    var d = document, w = "https://tally.so/widgets/embed.js";
    var v = function() {
        if (typeof Tally !== "undefined") {
            Tally.loadEmbeds();
        } else {
            d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e) {
                e.src = e.dataset.tallySrc;
            });
        }
    };

    if (typeof Tally !== "undefined") {
        v();
    } else if (d.querySelector('script[src="'+w+'"]') == null) {
        var s = d.createElement("script");
        s.src = w;
        s.onload = v;
        s.onerror = v;
        d.body.appendChild(s);
    }
});
















document.addEventListener('DOMContentLoaded', function () {
    let activeTemplateId = 'template-container'; // по умолчанию — первый
    const ctaButton = document.getElementById('cta-button');







    // Мапа для надписей на кнопке
    const ctaLabels = {

        ephemeris: 'listen now!',

        giftbox: 'Get your free music',

        default: 'Fill out the Brief'
    };

    



document.querySelectorAll('.service').forEach(service => {
        service.addEventListener('click', function () {
            const key = this.dataset.descKey;
            const descContainer = document.getElementById('service-description');
            descContainer.style.display = 'block';

            // Обновляем надпись на кнопке
            ctaButton.textContent = key === 'ephemeris' ? 
ctaLabels.ephemeris : 

            ctaButton.textContent = key === 'giftbox' ? 
ctaLabels.giftbox : 
ctaLabels.default;




            // Устанавливаем нужный контейнер
if (key === 'giftbox') {
    activeTemplateId = 'template-container-2';
} else if (key === 'ephemeris') {
    activeTemplateId = 'template-container-3';
} else {
    activeTemplateId = 'template-container';
}


            // Подгружаем iframe, если еще не загружен
            const activeEl = document.getElementById(activeTemplateId);
            const iframe = activeEl.querySelector('iframe[data-tally-src]');
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.tallySrc;
            }

            // Скрываем оба контейнера, чтобы не показывать форму сразу
            document.querySelectorAll('.template').forEach(el => {
                el.style.display = 'none';
            });
        });
    });

    ctaButton.addEventListener('click', function (e) {
        e.preventDefault();

        // Скрываем все контейнеры
        document.querySelectorAll('.template').forEach(el => {
            el.style.display = 'none';
        });

        // Показываем активный
        const activeEl = document.getElementById(activeTemplateId);
        if (activeEl) {
            activeEl.style.display = 'block';

            // Прокручиваем после небольшой задержки для отрисовки
            setTimeout(() => {
                activeEl.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    });
});







window.addEventListener('message', function(event) {
    // Опционально: проверить origin event.origin для безопасности

    if (event.data && event.data.formSubmitted) {
        // Скрываем контейнер с iframe, например template-container-2
        const container = document.getElementById('template-container-2');
        if (container) {
            container.style.display = 'none';
        }
    }
});





const images = ['images/Atlas.jpeg', 'images/Atlas1.jpeg', 'images/Atlas2.jpeg']; // ваши картинки
let idx = 0;
const img = document.getElementById('slideshow-img');
let opacity = 0.4; // начальная прозрачность (совпадает с CSS)

function fadeToNext() {
  // Плавно уменьшаем прозрачность
  let fadeOut = setInterval(() => {
    opacity -= 0.04;
    if (opacity <= 0) {
      opacity = 0;
      clearInterval(fadeOut);
      // Меняем картинку
      idx = (idx + 1) % images.length;
      img.src = images[idx];
      // Плавно увеличиваем прозрачность
      let fadeIn = setInterval(() => {
        opacity += 0.04;
        img.style.opacity = opacity;
        if (opacity >= 0.4) {
          img.style.opacity = 0.4;
          opacity = 0.4;
          clearInterval(fadeIn);
        }
      }, 30);
    }
    img.style.opacity = opacity;
  }, 30);
}

setInterval(fadeToNext, 3000);
