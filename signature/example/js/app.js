$(function(){
    var wrapper = document.getElementById("signature-pad"),
        clearButton = wrapper.querySelector("[data-action=clear]"),
        savePNGButton = wrapper.querySelector("[data-action=save-png]"),
        saveSVGButton = wrapper.querySelector("[data-action=save-svg]"),
        canvas = wrapper.querySelector("canvas"),
        signaturePad;

    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    function resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }

    window.onresize = resizeCanvas;

    signaturePad = new SignaturePad(canvas);
    signaturePad.minWidth = 2;
    signaturePad.maxWidth = 4;
    signaturePad.penColor = "rgb(123, 0, 174)";

    $('.sign-name').on('tap click', function(){
        $('.mask-box').css('display', 'block');
        resizeCanvas();
    });

    clearButton.addEventListener("click", function (event) {
        signaturePad.clear();
    });

    savePNGButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alert("请先签名");
        } else {
            //取得图像的数据URI
            var imgURL = signaturePad.toDataURL('image/png');
            //显示图像
            var image = document.createElement('img');
            image.src = imgURL;
            image.style.width = '100%';
            $('.sign-name-img').html(' ');
            document.getElementById('sign-name-img').appendChild( image );
        }
        $('.mask-box').css('display', 'none');
    });
});