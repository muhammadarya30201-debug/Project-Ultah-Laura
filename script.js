document.addEventListener("DOMContentLoaded", () => {
    // 1. Logika untuk Reveal Scroll
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    // 2. Pengatur Waktu Lagu, Lirik Berjalan, & Efek Mengetik Surat
    const audioEl = document.getElementById('laguKita');
    const lyricsEl = document.getElementById('lyrics-content');
    const typewriterEl = document.getElementById('typewriter-text');

    // Teks surat lengkap yang panjang & full
    const fullLetterText = `Selamat ulang tahun yang ke-20 ya, my bini kecil aku ! 💖 Gak nyangka waktu cepet banget berlalu, dan sekarang kamu udah masuk kepala dua yaa babe. Terima kasih banyak ya udah jadi bagian paling indah di hidup aryaaa, selalu nemenin di setiap keadaan, baik senang maupun pas kita harus LDR-an gini. Meskipun kadang kita sering ribut atau ada hal-hal random yang bikin ngakak, kamu tetap jadi rumah ternyaman buat aryaa pulang. Semoga di umur yang ke-20 ini, semua impian dan cita-cita kamu satu persatu bisa tercapai, kuliahnya makin lancar, makin sukses, makin sehat, dan selalu bahagia ke depannya. Aryaaa bakalan selalu ada buat kamu yaa kecil, nemenin kamu tumbuh dewasa, dan ngelewatin semua momen-momen seru kedepannya bareng-bareng. I love u more n moree ya babe ! 🌙✨ Tetap jadi Laura yang aku kenal ya, my forever fav person. 🥰`;

    // Data Lirik Lagu (Olivia Rodrigo - honeybee)
    const lyricsData = [
        { time: 31, text: "🐝 (Intro / Musik mulai)..." },
        { time: 35, text: "You're buzzing 'round my mind..." },
        { time: 42, text: "Like a sweet little honeybee 🍯" },
        { time: 50, text: "Happy 20th Birthday, Bunga Laura Gustina Putri! 💖" },
        { time: 58, text: "Every moment with you is so special ✨" },
        { time: 66, text: "You're my forever favorite person 🤍" },
        { time: 75, text: "I love you to the moon and back 🌙" },
        { time: 90, text: "Forever with you, my bini 🤭💕" }
    ];

    let isTypingStarted = false;
    let typewriterIndex = 0;

    function startTypeWriter() {
        if (typewriterIndex < fullLetterText.length && typewriterEl) {
            typewriterEl.innerHTML += fullLetterText.charAt(typewriterIndex);
            typewriterIndex++;
            setTimeout(startTypeWriter, 35); // Kecepatan mengetik
        }
    }

    if (audioEl) {
        audioEl.addEventListener('loadedmetadata', () => {
            audioEl.currentTime = 31; // Mulai dari detik ke-31
        });

        audioEl.addEventListener('timeupdate', () => {
            const currentTime = audioEl.currentTime;
            
            // Logika Sinkronisasi Lirik Berjalan
            let currentLyric = "✨ Selamat ulang tahun, Cantik! ✨";
            for (let i = 0; i < lyricsData.length; i++) {
                if (currentTime >= lyricsData[i].time) {
                    currentLyric = lyricsData[i].text;
                }
            }
            if (lyricsEl) {
                lyricsEl.innerText = currentLyric;
            }

            // Logika Efek Mengetik Surat Otomatis saat Lagu Diputar
            if (!isTypingStarted && currentTime >= 31.5) {
                isTypingStarted = true;
                startTypeWriter();
            }
        });
    }
});

// 3. Fungsi untuk Tombol Bab (Tabs)
function showChapter(chapterId, evt) {
    const contents = document.querySelectorAll('.chapter-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(chapterId).classList.add('active');
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}