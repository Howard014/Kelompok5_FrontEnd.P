var layarUtama = document.getElementById("result");
let result = eval(expression);
function tampilkan(v) {
    layarUtama.value += v;
}

function hitung() {
    if (!layarUtama.value) return;
    try {
        var h = math.evaluate(layarUtama.value);
        layarUtama.value = h;
    } catch(e) {
        layarUtama.value = "Error";
    }
}

function bersihkan() {
    layarUtama.value = "";
}

document.onkeydown = function(e) {

    switch(e.key) {
        case "Enter":
            hitung();
            e.preventDefault();
            break;
        case "Backspace":
            var teks = layarUtama.value;
            layarUtama.value = teks.substring(0, teks.length-1);
            e.preventDefault();
            break;
        case "c":
        case "C":
            bersihkan();
            e.preventDefault();
            break;
        default:
            if (/[0-9+\-*/.]/.test(e.key)) {
                tampilkan(e.key);
                e.preventDefault();
            }
            break;
    }
};
