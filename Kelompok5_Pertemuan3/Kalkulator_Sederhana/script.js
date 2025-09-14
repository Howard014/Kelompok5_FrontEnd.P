let activeCalculator = null; //tampung kalkulator yang aktif

//Biar default langsung theme pertama (container)
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("container"); //pas pertama buka langsung pake tema container
  activeCalculator = document.querySelector(".container .calculator input[name='display']"); 
  //ambil input display dari kalkulator pertama sbg default aktif
});

document.addEventListener("keydown", function(event) {
    if (!activeCalculator) return; //kalau belum pilih kalkulator, abaikan dulu

    const key = event.key;
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/']; 
    //hanya angka dan operator dasar yg diperbolehkan dicetak

    if (allowedKeys.includes(key)) {
        event.preventDefault(); // cegah efek default (scroll/refresh)
        activeCalculator.value += key; //tampilin hasil keypad yg ditekan
    } else if (key === 'Enter' || key === '=') { 
        //kalau yg ditekan enter atau tanda =
        event.preventDefault();
        try {
            activeCalculator.value = eval(activeCalculator.value); //perhitungan matematis
        } catch (e) {
            activeCalculator.value = 'Error'; //kalau error misal "2++3"
        }
    } else if (key === 'Backspace') { 
        //kalau tombol hapus ditekan
        event.preventDefault();
        activeCalculator.value = activeCalculator.value.toString().slice(0, -1); //hapus char terakhir
    } else if (key === 'Escape') { 
        // tombol escape = clear semua
        event.preventDefault();
        activeCalculator.value = '';
    }
});

function playMusic() {
    var audio = document.querySelector('audio'); //ambil audio element pertama
    if (audio.paused) {
        audio.play(); //kalau paused, play
    } else {
        audio.pause(); //kalau lagi play, pause
    }
}

// tombol Choose untuk tentuin kalkulator aktif
document.querySelectorAll('.pilih, .pilih2').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = document.body;
    const audio= document.querySelector('audio');

    //simpan keadaan /state audio sblm diganti
    let putarTadi= !audio.paused;
    let timelineSkrg= audio.currentTime;

    if (btn.classList.contains('pilih')) {
      body.classList.add('container'); //apply theme 1
      body.classList.remove('container2'); 
      activeCalculator = btn.closest('.calculator').querySelector('input[name="display"]'); 
      //ambil display dari kalkulator pertama
      audio.src= "assets/picts,audios/massobeats-sable.mp3"; //play lagu pertama kalau pilih tema pertama
     

    } else if (btn.classList.contains('pilih2')) {
      body.classList.add('container2'); //apply theme 2
      body.classList.remove('container');
      activeCalculator = btn.closest('.calculator2').querySelector('input[name="display"]'); 
      //ambil display dari kalkulator kedua
      audio.src="assets/picts,audios/ins2.mp3"; //lagu buat tema 2
      
    }
    //audio diputar ulang dari durasi yg sama
    audio.load();
    audio.currentTime= timelineSkrg;

    if(putarTadi){
        audio.play();
    }
  });
});

//buat semua tombol di kedua kalkulator bekerja sesuai kalkulator aktif
document.querySelectorAll('.calculator input[type="button"], .calculator2 input[type="button"]').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!activeCalculator) return; //kalau belum pilih, abaikan
        const val = btn.value;

        if (val === 'AC') { 
            activeCalculator.value = ''; // clear semua
        } else if (val === 'DE') { 
            activeCalculator.value = activeCalculator.value.toString().slice(0,-1); // delete satu char
        } else if (val === '=') {
            try {
                activeCalculator.value = eval(activeCalculator.value); // evaluasi ekspresi
            } catch (e) {
                activeCalculator.value = 'Error'; // kalau error tampilkan error
            }
        } else {
            activeCalculator.value += val; // angka/operator normal ditambah ke display
        }
    });
});
