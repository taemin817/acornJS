var slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides li'),
    currentidx = 0,
    slideCount = slide.length,
    slideWidth = 200,
    slideMargin = 30,
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next');


makeClone();


//무한 슬라이드
function makeClone() {
    for (var i = 0; i < slideCount; i++) {
        //a.cloneNode(), a.cloneNode(true)
        var cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        //a.appendChild(b)
        slides.appendChild(cloneSlide);
    };

    for (var i = slideCount - 1; i >= 0; i--) {
        var cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        //a.appendChild(b)
        slides.prepend(cloneSlide);
    };

    updateWidth();

    setInitialPos();
    setTimeout(function () {
        slides.classList.add('animated');
    }, 100);

};

function updateWidth() {
    var currenSlides = document.querySelectorAll('.slides li')
    var newSlideCount = currenSlides.length;

    var newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
    slides.style.width = newWidth;
}
function setInitialPos() {
    var initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    slides.style.transform = 'translatex(' + initialTranslateValue + 'px)';
}



function moveSlide(num) {
    slides.style.left = -num * (slideWidth + slideMargin) + 'px';
    currentidx = num;
    console.log(currentidx, slideCount);
    if (currentidx == slideCount || currentidx == -slideCount) {
        setTimeout(function () {
            slides.classList.remove('animated');
            slides.style.left = '0px';
            currentidx = 0;
        }, 500);
        setTimeout(function () {
            slides.classList.add('animated');

        }, 700)

    }
};

nextBtn.addEventListener('click', function () {
    moveSlide(currentidx + 1);
});
prevBtn.addEventListener('click', function () {
    moveSlide(currentidx - 1);
});


// 자동 슬라이드
var timer = undefined;

function autoSlide(){
    if(timer == undefined){
        timer = setInterval(function(){
            moveSlide(currentidx + 1);
        }, 1000);
    }
}
autoSlide();
function stopSlide(){
    clearInterval(timer);
    
    timer=undefined;
    console.log(timer);
}
slides.addEventListener('mouseenter', function(){
    stopSlide();
});
slides.addEventListener('mouseleave', function(){
    autoSlide();
});