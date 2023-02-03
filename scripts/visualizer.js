function visualizer() {
    const numOfBars = 55;
    const audio = document.querySelector("audio");
    const context = new AudioContext();
    const audioSource = context.createMediaElementSource(audio);
    const audioAnalyser = context.createAnalyser();
    
    audioSource.connect(audioAnalyser);
    audioSource.connect(context.destination);
    
    const frequencyData = new Uint8Array(audioAnalyser.frequencyBinCount);
    audioAnalyser.getByteFrequencyData(frequencyData);
    console.log("frequencydata", frequencyData);

    const visualizerContainer = document.querySelector(".visualizer-container");

    for (let i=0; i < numOfBars; i++) {
        const bar = document.createElement("div");
        bar.setAttribute("id", "bar" + i)
        bar.setAttribute("class", "visualizer-container-bar");
        visualizerContainer.appendChild(bar)
    }

    function renderFrames() {
        audioAnalyser.getByteFrequencyData(frequencyData);

        for (let i=0; i < numOfBars; i++) {
            const index = (i*2)
            const fd = frequencyData[index];
            const bar = document.querySelector("#bar"+i);

            if(!bar){continue;}

            const barHeight = Math.max(2, fd || 0);
            bar.style.height = barHeight + "px";
        }
        window.requestAnimationFrame(renderFrames);
    }

    renderFrames();

    audio.play()
}