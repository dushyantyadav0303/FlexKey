/* --- Video Controller Logic --- */
const video = document.getElementById('flexkeyVideo');
const controlBtn = document.getElementById('videoCtrlBtn');

const stopTimestamp = 2.5; // Changed to 2.5 seconds
let playCount = 0; // Tracks how many full times the video has played
let hasStoppedAtTarget = false;

// Remove native looping so we can control it exactly with JavaScript
video.loop = false; 

// 1. Start autoplay when the page loads
video.addEventListener('loadedmetadata', () => {
    video.play().catch(error => {
        console.log("Autoplay blocked by browser. Awaiting manual trigger.");
    });
});

// 2. Continually check the time during playback
video.addEventListener('timeupdate', () => {
    // Only pause if we are on the SECOND playthrough (playCount === 1), 
    // haven't stopped yet, and hit the 2.5-second mark
    if (playCount === 1 && !hasStoppedAtTarget && video.currentTime >= stopTimestamp) {
        video.pause();
        hasStoppedAtTarget = true;
        controlBtn.innerText = "Continue Video"; 
    }
});

// 3. Handle what happens when the video reaches the very end
video.addEventListener('ended', () => {
    playCount++; // Increase our loop counter
    
    // If it just finished the 1st play, loop it back to the start automatically
    if (playCount === 1) {
        video.currentTime = 0;
        video.play();
    } else {
        // If it finishes the 2nd play (or later), reset the controls
        controlBtn.innerText = "Replay Video";
        hasStoppedAtTarget = false; 
        playCount = 0; // Reset the counter so they can replay the whole experience
    }
});

// 4. Handle manual button clicks
controlBtn.addEventListener('click', () => {
    if (video.paused) {
        // If the video ended and they click replay, start from the beginning
        if (video.ended) {
            video.currentTime = 0;
        }
        
        if (playCount === 1 && video.currentTime >= stopTimestamp) {
            hasStoppedAtTarget = true; 
        }
        
        video.play();
        controlBtn.innerText = "Pause Video";
    } else {
        video.pause();
        controlBtn.innerText = "Play Video";
    }
});

/* --- Smooth Scroll Fade-In Animation Logic --- */
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target); 
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});