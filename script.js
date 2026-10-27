"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ELITE KUH WEBSITE 🐄

    const style = document.createElement("style");

    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            transition: background .4s, color .4s;
        }

        body.dark-mode {
            background: #101810;
            color: white;
        }

        .elite-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            padding: 20px;
        }

        .elite-btn {
            background: #a3ff12;
            color: #14210e;
            border: none;
            padding: 14px 20px;
            border-radius: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: .3s;
        }

        .elite-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 0 25px #a3ff1280;
        }

        .elite-card {
            margin: 20px auto;
            padding: 25px;
            max-width: 900px;
            border-radius: 20px;
            background: #e9f8df;
            color: #18251b;
            box-shadow: 0 10px 35px #0002;
        }

        .dark-mode .elite-card {
            background: #1c281d;
            color: white;
        }

        .elite-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 5px;
            background: #a3ff12;
            z-index: 9999;
            width: 0;
        }

        .elite-toast {
            position: fixed;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            background: #142719;
            color: white;
            padding: 15px 22px;
            border-radius: 15px;
            z-index: 10000;
            display: none;
        }

        .elite-toast.show {
            display: block;
        }
    `;

    document.head.appendChild(style);

    // BUTTONS

    const buttons = document.createElement("div");
    buttons.className = "elite-buttons";

    buttons.innerHTML = `
        <button class="elite-btn" id="darkBtn">
            🌙 Dark Mode
        </button>

        <button class="elite-btn" id="factBtn">
            🧠 Kuh-Wissen
        </button>

        <button class="elite-btn" id="mooBtn">
            🐮 MOOO!
        </button>

        <button class="elite-btn" id="quizBtn">
            🏆 Kuh-Quiz
        </button>
    `;

    const header = document.querySelector(".site-header");

    if (header) {
        header.after(buttons);
    } else {
        document.body.prepend(buttons);
    }

    // NOTIFICATIONS

    const toast = document.createElement("div");
    toast.className = "elite-toast";
    document.body.appendChild(toast);

    function notify(message) {
        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    // DARK MODE

    document.querySelector("#darkBtn").onclick = () => {
        document.body.classList.toggle("dark-mode");

        notify(
            document.body.classList.contains("dark-mode")
                ? "🌙 Dark Mode aktiviert!"
                : "☀️ Light Mode aktiviert!"
        );
    };
        // 🧠 KUH-FAKTEN

    const facts = [
        "🐄 Kühe haben vier Magenabschnitte.",
        "🌱 Kühe sind Pflanzenfresser.",
        "🐮 Kühe sind soziale Tiere.",
        "👃 Kühe haben einen ausgeprägten Geruchssinn.",
        "🐄 Ein junges Rind nennt man Kalb.",
        "🌍 Hausrinder stammen vom Auerochsen ab.",
        "🧠 Kühe können lernen und sich Dinge merken."
    ];

    document.querySelector("#factBtn").onclick = () => {
        const fact = facts[
            Math.floor(Math.random() * facts.length)
        ];

        let box = document.querySelector("#factBox");

        if (!box) {
            box = document.createElement("div");
            box.id = "factBox";
            box.className = "elite-card";

            document.querySelector(".site-main")
                ?.prepend(box);
        }

        box.textContent = fact;
        notify("🧠 Neues Kuh-Wissen!");
    };

    // 🐮 MOOO-MODUS

    document.querySelector("#mooBtn").onclick = () => {
        document.body.classList.toggle("moo-mode");

        const active =
            document.body.classList.contains("moo-mode");

        document.body.style.filter =
            active ? "hue-rotate(120deg)" : "";

        notify(active
            ? "🐮 MOOOO-MODUS AKTIV!"
            : "😎 MOOO-MODUS AUS!");
    };

    // 📈 SCROLL-BALKEN

    const progress = document.createElement("div");
    progress.className = "elite-progress";
    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {
        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = total > 0
            ? window.scrollY / total * 100
            : 0;

        progress.style.width = percent + "%";
    }, { passive: true });

    // ✨ ANIMATIONEN

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(25px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 700,
                        fill: "forwards"
                    }
                );

                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll(
        ".section, .hero-card, .card"
    ).forEach(element => observer.observe(element));
        // 🏆 KUH-QUIZ

    document.querySelector("#quizBtn").onclick = () => {

        const questions = [
            {
                q: "Wie viele Magenabschnitte hat eine Kuh?",
                a: ["2", "4", "6"],
                correct: 1
            },
            {
                q: "Was frisst eine Kuh?",
                a: ["Fleisch", "Pflanzen", "Fisch"],
                correct: 1
            },
            {
                q: "Wie nennt man ein junges Rind?",
                a: ["Kalb", "Lamm", "Fohlen"],
                correct: 0
            }
        ];

        let index = 0;
        let score = 0;

        function nextQuestion() {

            if (index >= questions.length) {
                alert(
                    "🏆 Quiz beendet!\nPunkte: " +
                    score + "/" + questions.length
                );

                return;
            }

            const question = questions[index];

            const answer = prompt(
                question.q + "\n\n" +
                question.a.map(
                    (a, i) => (i + 1) + ". " + a
                ).join("\n")
            );

            if (answer === null) return;

            if (
                Number(answer) - 1 === question.correct
            ) {
                score++;
                alert("✅ Richtig!");
            } else {
                alert(
                    "❌ Falsch! Richtig ist: " +
                    question.a[question.correct]
                );
            }

            index++;
            nextQuestion();
        }

        nextQuestion();
    };

    // 🥚 GEHEIMCODE: MOOO

    let secret = "";

    document.addEventListener("keydown", event => {
        secret = (
            secret + event.key.toLowerCase()
        ).slice(-4);

        if (secret === "mooo") {
            document.body.classList.toggle("dark-mode");
            notify("🥚 GEHEIMCODE ENTDECKT!");
            secret = "";
        }
    });

    // 👑 STARTMELDUNG

    console.log("🐄 KUH IDEENWERKSTATT ELITE GELADEN!");

    setTimeout(() => {
        notify("🐄 Willkommen in der Kuh-Elite!");
    }, 700);

});