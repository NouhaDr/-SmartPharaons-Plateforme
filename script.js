let robotsData = {};
let currentIndex = 0;
let chronoInterval;
let startTime;

function startChrono() {
    if (!chronoInterval) {
        startTime = Date.now();
        chronoInterval = setInterval(() => {
            let elapsedTime = Date.now() - startTime; 
            let seconds = Math.floor(elapsedTime / 1000); 
            let milliseconds = elapsedTime % 1000;

            
            let formattedTime = formatTime(seconds, milliseconds);

            document.getElementById("temps").textContent = formattedTime;
        }, 50);
    }
}


function formatTime(seconds, milliseconds) {
    
    let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    let formattedMilliseconds = Math.floor(milliseconds / 10); 

    return `${formattedSeconds}:${formattedMilliseconds < 10 ? '0' + formattedMilliseconds : formattedMilliseconds}`;
}
function stopChrono() {
    if (chronoInterval) {
        clearInterval(chronoInterval);
        chronoInterval = null;
    }
}


async function fetchChallenges() {
    try {
        const response = await fetch('http://localhost:3001/robot_challenges');
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const challenges = await response.json();

        displayMaquette(challenges);
        
        displayRobot(challenges); 
    } catch (error) {
        console.error('Error fetching challenges:', error);
    }
}



function displayMaquette(challenges) {
    var chall0 = document.getElementById('onDeb');
    var chall1 = document.getElementById('onCu');
    var chall2 = document.getElementById('onAn');
    var chall3 = document.getElementById('onMu');
    var chall4 = document.getElementById('onSo');
    var chall5 = document.getElementById('onKh');
    var chall6 = document.getElementById('onTr');

    
    [chall0, chall1, chall2, chall3, chall4, chall5, chall6].forEach(el => {
        if (el) el.style.display = "none";
    });

   
    
    
    if (challenges.deb === 0 && challenges.challenge1 === 0 && challenges.challenge2 === 0 && 
        challenges.challenge3 === 0 && challenges.challenge4 === 0 && challenges.challenge5 === 0 && 
        challenges.fin === 0) {
        
        document.getElementById('temps').textContent = "00:00";
    } else if (challenges.deb > 0 && challenges.challenge1 === 0 && challenges.challenge2 === 0 && 
               challenges.challenge3 === 0 && challenges.challenge4 === 0 && challenges.challenge5 === 0 && 
               challenges.fin === 0) {
                startChrono();
        chall0.style.display = "block";
    } else if (challenges.deb > 0 && challenges.challenge1 > 0 && challenges.challenge2 === 0 && 
               challenges.challenge3 === 0 && challenges.challenge4 === 0 && challenges.challenge5 === 0 && 
               challenges.fin === 0) {
        chall0.style.display = "block";
        chall1.style.display = "block";
    } else if (challenges.deb > 0 && challenges.challenge1 > 0 && challenges.challenge2 > 0 && 
               challenges.challenge3 === 0 && challenges.challenge4 === 0 && challenges.challenge5 === 0 && 
               challenges.fin === 0) {
        chall0.style.display = "block";
        chall1.style.display = "block";
        chall2.style.display = "block";
    } else if (challenges.deb > 0 && challenges.challenge1 > 0 && challenges.challenge2 > 0 && 
               challenges.challenge3 > 0 && challenges.challenge4 === 0 && challenges.challenge5 === 0 && 
               challenges.fin === 0) {
        chall0.style.display = "block";
        chall1.style.display = "block";
        chall2.style.display = "block";
        chall3.style.display = "block";
    } else if (challenges.deb > 0 && challenges.challenge1 > 0 && challenges.challenge2 > 0 && 
               challenges.challenge3 > 0 && challenges.challenge4 > 0 && challenges.challenge5 === 0 && 
               challenges.fin === 0) {
        chall0.style.display = "block";
        chall1.style.display = "block";
        chall2.style.display = "block";
        chall3.style.display = "block";
        chall4.style.display = "block";
    } else if (challenges.deb > 0 && challenges.challenge1 > 0 && challenges.challenge2 > 0 && 
               challenges.challenge3 > 0 && challenges.challenge4 > 0 && challenges.challenge5 > 0 && 
               challenges.fin === 0) {
        chall0.style.display = "block";
        chall1.style.display = "block";
        chall2.style.display = "block";
        chall3.style.display = "block";
        chall4.style.display = "block";
        chall5.style.display = "block";
    } else if (challenges.deb > 0 && challenges.challenge1 > 0 && challenges.challenge2 > 0 && 
               challenges.challenge3 > 0 && challenges.challenge4 > 0 && challenges.challenge5 > 0 && 
               challenges.fin > 0) {
        chall0.style.display = "block";
        chall1.style.display = "block";
        chall2.style.display = "block";
        chall3.style.display = "block";
        chall4.style.display = "block";
        chall5.style.display = "block";
        chall6.style.display = "block";
        stopChrono(); 
    } 
   
    
    var disqualifiedOverlay = document.getElementById('disqualified-overlay');
   if (challenges.dis >0) {
        disqualifiedOverlay.style.display = "flex";
        stopChrono();
        return; 
    }
    if (disqualifiedOverlay) {
        disqualifiedOverlay.style.display = "none";
    }
    é
    
      
}


async function loadRobots() {
    try {
        const csvData = await readCSV('./homologation.csv');
        robotsData = csvData.reduce((acc, robot) => {
            acc[robot.id_robot] = robot; 
            return acc;
        }, {});
    } catch (error) {
        console.error('Error loading robots:', error);
    }
}


async function readCSV(file) {
    const response = await fetch(file);
    const csvText = await response.text();
    const rows = csvText.trim().split("\n");
    const headers = rows[0].split(",");
    const data = rows.slice(1).map(row => {
        const values = row.split(",");
        return headers.reduce((acc, header, index) => {
            acc[header] = values[index];
            return acc;
        }, {});
    });
    return data;
}

function displayRobot(challenges = {}) {
    const robot = robotsData[Object.keys(robotsData)[currentIndex]];

    if (robot) {
        document.getElementById('nom_robot').textContent = robot.Robot_name || '---';
        document.getElementById('nom_leader').textContent = robot.Leader_name || '---';
    } else {
        document.getElementById('nom_robot').textContent = '---';
        document.getElementById('nom_leader').textContent = '---';
    }

    document.getElementById('score').textContent = challenges.score || '---';
}


async function handleArrowKeys(event) {
    if (Object.keys(robotsData).length === 0) {
        await loadRobots();
    }

    if (event.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % Object.keys(robotsData).length;
        displayRobot();
    } else if (event.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + Object.keys(robotsData).length) % Object.keys(robotsData).length;
        displayRobot();
    }
}


window.addEventListener('keydown', handleArrowKeys);


setInterval(fetchChallenges, 200);