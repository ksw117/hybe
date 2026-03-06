document.addEventListener(`DOMContentLoaded`, function () {
    var swiper = new Swiper(".hero_wrap", {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".custom-next.hero",
            prevEl: ".custom-prev.hero",
        },

    });

    const multimediaSwiper = new Swiper('.multimedia_wrap', {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        speed: 800,

        navigation: {
            nextEl: '.custom-next.multi',
            prevEl: '.custom-prev.multi',
        },

        
    });


    const slides = document.querySelectorAll(".multimedia_contents");

    slides.forEach(slide => {

        const playBtn = slide.querySelector(".play_btn");
        const pauseBtn = slide.querySelector(".pause_btn");
        const iframe = slide.querySelector("iframe");
        const thumb = slide.querySelector(".thumbnail");

        // 1️⃣ iframe src에 enablejsapi & controls 제거 (HTML 수정 없이)
        const src = iframe.getAttribute("src");
        if (!src.includes("enablejsapi")) {
            const join = src.includes("?") ? "&" : "?";
            iframe.setAttribute(
                "src",
                src + join + "enablejsapi=1&controls=0&rel=0&modestbranding=1"
            );
        }

        // 초기 상태
        iframe.style.opacity = 0;
        iframe.style.display = "none";
        iframe.style.transition = "opacity 0.4s ease";

        // 2️⃣ play
        playBtn.addEventListener("click", () => {
            iframe.style.display = "block";
            requestAnimationFrame(() => iframe.style.opacity = 1);

            thumb.style.opacity = 0;
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";

            iframe.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
            );

        });

        // 3️⃣ pause
        pauseBtn.addEventListener("click", () => {
            iframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
            );

            iframe.style.opacity = 0;
            setTimeout(() => iframe.style.display = "none", 400);

            thumb.style.opacity = 1;
            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
        });
    });

    // 4️⃣ Swiper 이동 시 모든 영상 정지 (충돌 방지)
    multimediaSwiper.on("slideChange", () => {
        document.querySelectorAll(".multimedia_contents").forEach(slide => {

            const iframe = slide.querySelector("iframe");
            const playBtn = slide.querySelector(".play_btn");
            const pauseBtn = slide.querySelector(".pause_btn");
            const thumb = slide.querySelector(".thumbnail");

            iframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
            );

            iframe.style.opacity = 0;
            iframe.style.display = "none";
            thumb.style.opacity = 1;

            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
        });
    });


    const releaseSwiper = new Swiper('.release_wrap', {
        slidesPerView: '3', 
        centeredSlides: true,
        loop: true,
        speed: 300,
        watchSlidesProgress: true, // 슬라이드 진행 상태 감시

        navigation: {
            nextEl: '.custom-next.album',
            prevEl: '.custom-prev.album',
        },

    });

    function positionSlides(swiper) {
        const slides = swiper.slides;
        const activeIndex = swiper.activeIndex;

        slides.forEach((slide, index) => {
            // 활성 슬라이드 찾기
            if (slide.classList.contains('swiper-slide-active')) {
                slide.style.transform = 'scale(1)';
                slide.style.opacity = '1';
                slide.style.zIndex = '3';
            }
            // 이전 슬라이드 (왼쪽)
            else if (slide.classList.contains('swiper-slide-prev')) {
                slide.style.transform = 'scale(0.5)';
                slide.style.opacity = '0.5';
                slide.style.zIndex = '1';
            }
            // 다음 슬라이드 (오른쪽)
            else if (slide.classList.contains('swiper-slide-next')) {
                slide.style.transform = 'scale(0.5)';
                slide.style.opacity = '0.5';
                slide.style.zIndex = '1';
            }
            // 나머지 슬라이드
            else {
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            }
        });
    }



    const artists = document.querySelectorAll('.artist_name');
    const images = document.querySelectorAll('.artist_img');
    
    artists.forEach((artist, index) => {
      artist.addEventListener('mouseenter', () => {
        artists.forEach(a => a.classList.remove('active'));
        images.forEach(img => img.classList.remove('active'));
    
        artist.classList.add('active');
        images[index].classList.add('active');
      });
    });


    const labelsSwiper = new Swiper('.labels_wrap', {
        slidesPerView: 4.5,
        spaceBetween: 24,
        centeredSlides: false, // centeredSlides를 false로 변경
        slidesOffsetBefore: 160, // 시작 위치 오프셋
        speed: 800,
        loop: true,     
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.custom-next.labels',
            prevEl: '.custom-prev.labels',
        },

        
    });


    // 드롭다운 토글 기능 (모든 dropdown 공통 처리)
const allDropdowns = document.querySelectorAll('.dropdown');

allDropdowns.forEach(dropdown => {
    const dropBtn = dropdown.querySelector('.drop_btn');
    const dropdownListWrap = dropdown.querySelector('.dropdown_list_wrap');

    if (!dropBtn || !dropdownListWrap) return;

    // 초기 상태: 드롭다운 숨김
    dropdownListWrap.style.display = 'none';

    // 버튼 클릭 시 토글
    dropBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 외부 클릭 이벤트와 충돌 방지

        // 다른 드롭다운 모두 닫기
        allDropdowns.forEach(other => {
            if (other !== dropdown) {
                const otherList = other.querySelector('.dropdown_list_wrap');
                if (otherList) otherList.style.display = 'none';
            }
        });

        // 현재 드롭다운 토글
        dropdownListWrap.style.display =
            dropdownListWrap.style.display === 'none' ? 'flex' : 'none';
    });
});

// 드롭다운 외부 클릭 시 모두 닫기
document.addEventListener('click', function() {
    allDropdowns.forEach(dropdown => {
        const dropdownListWrap = dropdown.querySelector('.dropdown_list_wrap');
        if (dropdownListWrap) dropdownListWrap.style.display = 'none';
    });
});

});