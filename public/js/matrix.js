document.addEventListener('DOMContentLoaded', () => {
    var q = document.getElementById('matrix');
    var c = q.getContext('2d');
    var m = Math;

    function resizeCanvas() {
        q.width = window.innerWidth;
        q.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    var p = Array(256).join(1).split('');
    var matrixDuration = 5000; // Duration for matrix effect (5 seconds)

    function drawMatrix() {
        var w = q.width;
        var h = q.height;
        c.fillStyle = 'rgba(0,0,0,0.05)';
        c.fillRect(0, 0, w, h);
        c.fillStyle = 'rgba(0,255,0,1)';
        p = p.map(function (v, i) {
            var r = m.random();
            var str = String.fromCharCode(m.floor(2720 + r * 33));
            c.fillText(str, i * 10, v);
            v += 10;
            var ret = v > h + r * 1e4 ? 0 : v;
            return ret;
        });

        if (Date.now() < startTime + matrixDuration) {
            requestAnimationFrame(drawMatrix);
        } else {
            c.clearRect(0, 0, w, h);
            showTypingText(); // Show the typing text after the matrix effect ends
        }
    }

    var startTime = Date.now(); // Record the start time
    drawMatrix();

    function showTypingText() {
        // Reference to the main text container
        let textContainer = document.getElementById('carposkaText');
        textContainer.style.display = "block"; // Ensure it's displayed

        const text = "carposka";
        let index = 0;

        function typeCarposka() {
            if (index < text.length) {
                textContainer.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeCarposka, 150); // Adjust typing speed here
            } else {
                showFW2024(); // Show the next line after "carposka" finishes
            }
        }

        typeCarposka();

        function showFW2024() {
            const fwText = document.createElement('div');
            fwText.classList.add('fw-text');
            textContainer.appendChild(fwText); // Append to the existing "carposkaText" container

            const fwTextContent = "Genesis FW24";
            let fwIndex = 0;

            function typeFW() {
                if (fwIndex < fwTextContent.length) {
                    fwText.innerHTML += fwTextContent.charAt(fwIndex);
                    fwIndex++;
                    setTimeout(typeFW, 150); // Adjust typing speed for "fw 2024"
                }
            }

            typeFW();
        }
    }
});
