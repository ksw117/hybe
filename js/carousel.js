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
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
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

});