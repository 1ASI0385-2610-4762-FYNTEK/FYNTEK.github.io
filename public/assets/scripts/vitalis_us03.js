/* ============================================================
   US-16 | EP-03 | "Técnicas de Respiración"
   Como estudiante, quiero técnicas cortas de respiración,
   para calmar la ansiedad en exámenes.
   ============================================================ */
function breathingTemplate() {
    return `
        <span class="zen-us-tag">US-16 · Técnicas de respiración</span>
        <h3>Ciclo de respiración 4-7-8</h3>
        <div class="zen-timer-phrase" id="zen-breath-instruction">Presiona iniciar para comenzar</div>
        <div class="zen-timer-display" id="zen-breath-display">4</div>
        <button class="btn btn-secondary" id="zen-breath-start">Iniciar ciclo</button>
        <p class="zen-success" id="zen-breath-feedback"></p>
    `;
}

function bindBreathingTechnique() {
    const startBtn = document.getElementById('zen-breath-start');
    const display = document.getElementById('zen-breath-display');
    const instruction = document.getElementById('zen-breath-instruction');
    const feedback = document.getElementById('zen-breath-feedback');

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        const phases = [
            { label: 'Inhala', seconds: 4 },
            { label: 'Sostén', seconds: 7 },
            { label: 'Exhala', seconds: 8 }
        ];
        let phaseIndex = 0;

        function runPhase() {
            if (phaseIndex >= phases.length) {
                // Escenario: Feedback de reducción de ansiedad
                instruction.textContent = 'Ciclo completado';
                display.textContent = '✓';
                feedback.classList.add('show');
                feedback.textContent = '¿Sientes que tu ansiedad disminuyó?';
                feedback.innerHTML += `
                    <br><button class="btn btn-secondary" style="margin-top:8px;" onclick="alert('Gracias por tu respuesta. VITALIS ajustará tus próximas recomendaciones.')">Sí, un poco</button>
                `;
                startBtn.disabled = false;
                return;
            }
            const phase = phases[phaseIndex];
            let remaining = phase.seconds;
            instruction.textContent = phase.label;
            display.textContent = remaining;
            const interval = setInterval(() => {
                remaining--;
                display.textContent = remaining > 0 ? remaining : '0';
                if (remaining <= 0) {
                    clearInterval(interval);
                    phaseIndex++;
                    runPhase();
                }
            }, 1000);
        }
        runPhase();
    });
}


