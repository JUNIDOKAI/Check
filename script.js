const terminal = document.getElementById("terminal");

function printText(text) {
    let p = document.createElement("p");
    p.innerHTML = text;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

async function checkIP() {
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();
        printText(`💻 Địa chỉ IP: ${data.ip}`);

        let response2 = await fetch(`https://ipwhois.app/json/${data.ip}`);
        let info = await response2.json();

        printText(`🏢 Nhà mạng: ${info.isp || "Không rõ"}`);
        printText(`📍 Vị trí: ${info.city}, ${info.region}, ${info.country}`);
        printText(`🕒 Múi giờ: ${info.timezone}`);
        printText(`🛡️ VPN/Proxy: ${info.proxy ? "Có" : "Không"}`);
    } catch (error) {
        printText("❌ Lỗi khi lấy dữ liệu IP!");
    }
}

checkIP();

let ctx = document.getElementById("speedChart").getContext("2d");

let speedChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Mbps",
            data: [],
            borderColor: "lime",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { grid: { color: "#444" }, ticks: { color: "white" } },
            y: { beginAtZero: true, grid: { color: "#444" }, ticks: { color: "white" } }
        }
    }
});

function testSpeed() {
    let labels = [];
    let speedData = [];
    let time = 0;

    function updateSpeed() {
        let speed = Math.random() * 50 + 10;
        labels.push(time + "s");
        speedData.push(speed);

        speedChart.data.labels = labels;
        speedChart.data.datasets[0].data = speedData;
        speedChart.update();

        time++;
        if (time <= 100) {
            setTimeout(updateSpeed, 1000);
        }
    }

    updateSpeed();
}

// Chặn F12, Ctrl+Shift+I, Ctrl+U
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
        alert("🚫 Bạn không thể mở Developer Tools!");
    }
});

// Chặn Click Chuột Phải
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("🚫 Chuột phải đã bị vô hiệu hóa!");
});

// Phát hiện DevTools và khóa trang
(function() {
    var threshold = 160;

    setInterval(function() {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if ((widthThreshold && heightThreshold) || navigator.webdriver) {
            document.body.innerHTML = "<h1>🚫 Bạn không thể truy cập trang này!</h1>";
        }
    }, 500);
})();
