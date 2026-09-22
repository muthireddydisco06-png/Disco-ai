const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const send = document.getElementById("send");

// Get API key from browser storage
let API_KEY = localStorage.getItem("disco_key");

if (!API_KEY) {
    API_KEY = prompt("Enter your Gemini API Key:");

    if (API_KEY) {
        localStorage.setItem("disco_key", API_KEY);
    }
}

// Gemini mode
const MODEL = "gemini-3.6-flash";

// Ask Gemini
async function askGemini(question) {

    add("D.I.S.C.O: Thinking...", "ai");

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/" +
            MODEL +
            ":generateContent?key=" +
            API_KEY,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text:
                                        "You are D.I.S.C.O, a friendly AI assistant. " +
                                        "Answer clearly and briefly. " +
                                        "Call the user Boss. " +
                                        "Question: " + question
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error?.message || "Gemini API error"
            );
        }

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            throw new Error("No response received from Gemini.");
        }

        chat.lastChild.innerText =
            "D.I.S.C.O: " + reply;

    } catch (error) {

        chat.lastChild.innerText =
            "D.I.S.C.O: ERROR - " + error.message;
    }
}

// Send button
send.onclick = () => {

    const text = input.value.trim();

    if (!text) return;

    add("YOU: " + text, "user");

    input.value = "";

    askGemini(text);
};

// Enter key
input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        send.click();
    }

});

// Add message
function add(text, who) {

    const div = document.createElement("div");

    div.className = "msg " + who;

    div.innerText = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;
}
