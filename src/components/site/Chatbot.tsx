import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };
type Step =
  | "menu"
  | "name"
  | "phone"
  | "age"
  | "gender"
  | "symptoms"
  | "date"
  | "time"
  | "done";

const QUICK = [
  "Clinic timings",
  "Address",
  "Doctors available",
  "Services",
  "Emergency care",
  "Book appointment",
];

const ANSWERS: Record<string, string> = {
  "Clinic timings":
    "We're open daily from 9:00 AM to 10:00 PM. Emergency consultation is available on call.",
  Address:
    "Plot No. 337, Ground Floor, Opposite Hotel ITR, Chanda Nayak Nagar Thanda, Siddi Vinayak Nagar, Ayyappa Society, Madhapur, Hyderabad.",
  "Doctors available":
    "Dr. D. Ravi Kumar (MBBS, DEM, FCCM) — General Physician & Critical Care. Dr. P. Pushpalatha (BAMS) — Female Specialist & Family Physician.",
  Services:
    "General medicine, emergency care, critical care consultation, ECG, lab tests, in-house pharmacy, day care, nebulization and more.",
  "Emergency care":
    "Yes — emergency consultation, suturing, nebulization and stabilization are available during clinic hours.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi 👋 I'm Harsha Clinic Assistant. How can I help you today?" },
  ]);
  const [step, setStep] = useState<Step>("menu");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    symptoms: "",
    date: "",
    time: "",
  });
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const botSay = (text: string, delay = 600) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text }]);
    }, delay);
  };

  const handleQuick = (q: string) => {
    setMessages((m) => [...m, { role: "user", text: q }]);
    if (q === "Book appointment") {
      botSay("Great! Let's book your appointment. What's your full name?");
      setStep("name");
    } else {
      botSay(ANSWERS[q] ?? "Please call us at the clinic for more details.");
    }
  };

  const submitInput = () => {
    const v = input.trim();
    if (!v) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: v }]);

    switch (step) {
      case "name":
        setForm((f) => ({ ...f, name: v }));
        botSay("Thanks! What's your phone number?");
        setStep("phone");
        break;
      case "phone":
        setForm((f) => ({ ...f, phone: v }));
        botSay("And your age?");
        setStep("age");
        break;
      case "age":
        setForm((f) => ({ ...f, age: v }));
        botSay("Your gender? (Male / Female / Other)");
        setStep("gender");
        break;
      case "gender":
        setForm((f) => ({ ...f, gender: v }));
        botSay("Briefly describe your symptoms.");
        setStep("symptoms");
        break;
      case "symptoms":
        setForm((f) => ({ ...f, symptoms: v }));
        botSay("Preferred date? (e.g. 12 Jun 2026)");
        setStep("date");
        break;
      case "date":
        setForm((f) => ({ ...f, date: v }));
        botSay("Preferred time? (e.g. 6:30 PM)");
        setStep("time");
        break;
      case "time":
        setForm((f) => ({ ...f, time: v }));
        botSay(
          "Thank you! Your appointment request has been submitted successfully. Our clinic will contact you shortly.",
          900,
        );
        setStep("done");
        break;
      default:
        botSay("Tap one of the quick options below, or type 'book' to schedule a visit.");
        if (/book|appoint/i.test(v)) {
          setTimeout(() => {
            botSay("Let's book your appointment. What's your full name?", 400);
            setStep("name");
          }, 700);
        }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 grid place-items-center h-14 w-14 rounded-full gradient-orange shadow-glow hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white">
            <span className="absolute inset-0 rounded-full bg-orange-start animate-ping" />
            <span className="absolute inset-0.5 rounded-full bg-orange-end" />
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:w-[380px] z-50 animate-fade-up">
          <div className="glass-strong rounded-3xl overflow-hidden shadow-glow flex flex-col h-[560px] max-h-[80vh]">
            <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-violet/10 to-orange-start/10">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-orange">
                <Bot className="h-5 w-5 text-white" />
              </span>
              <div className="min-w-0">
                <div className="font-display font-bold text-foreground">Harsha Clinic Assistant</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Online now
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed animate-fade-up ${
                      m.role === "user"
                        ? "gradient-orange text-white rounded-br-sm"
                        : "bg-violet/8 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-violet/8 rounded-2xl rounded-bl-sm px-3.5 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-violet"
                        style={{
                          animation: `typing-dot 1.2s ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {step === "menu" && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuick(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white border border-border hover:border-violet hover:text-violet-deep transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-border bg-white/60">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitInput()}
                  placeholder={
                    step === "done"
                      ? "Anything else? Tap an option above."
                      : "Type your message..."
                  }
                  className="flex-1 h-10 px-3 rounded-xl bg-violet/8 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30"
                />
                <button
                  onClick={submitInput}
                  aria-label="Send"
                  className="grid place-items-center h-10 w-10 rounded-xl gradient-orange text-white hover:scale-105 transition-transform"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {form.name && step === "done" && (
                <div className="mt-2 text-[11px] text-muted-foreground text-center">
                  Reference for {form.name} • {form.date} {form.time}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
