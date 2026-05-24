import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Code2, Database, Globe, Lock, Terminal, Bug, CheckCircle2, AlertTriangle, Trophy, Play, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const modules = [
  {
    icon: Code2,
    title: "Programowanie aplikacji",
    role: "Technik informatyk",
    text: "Tworzy strony WWW, formularze, aplikacje i skrypty, które przetwarzają dane użytkowników.",
    example: "HTML + CSS + JavaScript + PHP",
  },
  {
    icon: Database,
    title: "Bazy danych",
    role: "Technik informatyk",
    text: "Projektuje tabele, zapisuje dane, tworzy zapytania SQL i łączy aplikację z bazą.",
    example: "SELECT, INSERT, JOIN, MySQL",
  },
  {
    icon: Shield,
    title: "Bezpieczeństwo aplikacji",
    role: "Technik cyberbezpieczeństwa",
    text: "Sprawdza, czy aplikacja jest odporna na błędy, wycieki danych i próby ataku.",
    example: "walidacja, hasła, logi, podatności",
  },
  {
    icon: Terminal,
    title: "Analiza incydentów",
    role: "Technik cyberbezpieczeństwa",
    text: "Analizuje podejrzane logi, wiadomości, adresy URL i zachowanie użytkowników.",
    example: "phishing, malware, ataki na konta",
  },
];

const threats = [
  {
    label: "SMS: Twoja paczka została zatrzymana. Dopłać 2,99 zł: inpost-doplata24.pl",
    danger: true,
    reason: "Podejrzana domena podszywa się pod znaną markę i próbuje wymusić płatność.",
  },
  {
    label: "Logowanie do szkolnej platformy przez oficjalny adres szkoły z HTTPS",
    danger: false,
    reason: "Adres wygląda oficjalnie, połączenie jest szyfrowane, ale i tak warto sprawdzić domenę.",
  },
  {
    label: "E-mail: Wygrałeś telefon. Podaj hasło do konta, aby odebrać nagrodę.",
    danger: true,
    reason: "Żadna legalna usługa nie prosi o hasło w wiadomości e-mail.",
  },
  {
    label: "Formularz kontaktowy sprawdza, czy pole e-mail zawiera znak @",
    danger: false,
    reason: "To przykład podstawowej walidacji danych w aplikacji.",
  },
];

const quiz = [
  {
    question: "Użytkownik wpisuje dane w formularzu kontaktowym. Co powinien zrobić programista przed zapisaniem ich do bazy?",
    answers: ["Sprawdzić poprawność danych i ograniczyć niebezpieczne znaki", "Zapisać wszystko bez sprawdzania, bo formularz jest na stronie", "Ukryć formularz po kliknięciu przycisku", "Zmienić wygląd pola tekstowego, żeby wyglądało bezpiecznie"],
    correct: 0,
  },
  {
    question: "Uczeń otrzymuje link do „darmowej nagrody”, który prowadzi do dziwnej domeny. Co najlepiej pokazuje pracę cyberbezpieczeństwa?",
    answers: ["Sprawdzenie adresu strony, treści wiadomości i ryzyka phishingu", "Ocena, czy grafika w wiadomości jest estetyczna", "Kliknięcie linku, żeby szybciej zobaczyć nagrodę", "Przesłanie linku wszystkim znajomym do testu"],
    correct: 0,
  },
  {
    question: "Aplikacja ma wyświetlić listę uczniów zapisanych w bazie. Która technologia będzie tu najbardziej potrzebna?",
    answers: ["SQL, bo pozwala pobierać i filtrować dane z tabel", "CSS, bo szyfruje dane w bazie", "PNG, bo przechowuje hasła użytkowników", "Bluetooth, bo sortuje rekordy w tabeli"],
    correct: 0,
  },
];

function calculatePasswordScore(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function passwordMessage(score) {
  if (score <= 2) return { label: "Słabe", text: "Takie hasło można łatwo odgadnąć lub złamać.", width: "25%", tone: "text-rose-200", bg: "bg-rose-500" };
  if (score <= 4) return { label: "Średnie", text: "Jest lepiej, ale warto dodać długość i znaki specjalne.", width: "60%", tone: "text-amber-200", bg: "bg-amber-400" };
  return { label: "Mocne", text: "Długie, różnorodne hasło jest dużo trudniejsze do złamania.", width: "95%", tone: "text-emerald-200", bg: "bg-emerald-400" };
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col gap-2 mb-5">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 border border-cyan-300/30 flex items-center justify-center text-cyan-200 shadow-lg shadow-cyan-500/10">
          <Icon size={25} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">{title}</h2>
      </div>
      {subtitle && <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-4xl">{subtitle}</p>}
    </div>
  );
}

export default function CyberInformatykShowcase() {
  const [password, setPassword] = useState("ZSTK2026!");
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);

  const score = calculatePasswordScore(password);
  const passInfo = passwordMessage(score);

  const quizScore = useMemo(() => {
    return quiz.reduce((sum, item, index) => sum + (answers[index] === item.correct ? 1 : 0), 0);
  }, [answers]);

  const terminalLines = [
    "> start: aplikacja pokazowa ZSTK",
    "> technik informatyk: kod + aplikacje + bazy danych",
    "> technik cyberbezpieczeństwa: analiza + ochrona + reagowanie",
    "> status: gotowe do prezentacji",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 overflow-hidden selection:bg-cyan-300 selection:text-slate-950">
      <div className="fixed inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,#0ea5e9,transparent_34%),radial-gradient(circle_at_bottom_right,#22c55e,transparent_28%),linear-gradient(135deg,#020617,#0f172a)]" />
      <div className="fixed inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:38px_38px]" />

      <div className="relative max-w-7xl mx-auto space-y-8">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-[1.35fr_.65fr] gap-6 items-stretch">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-xl p-6 md:p-9 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/15 border border-cyan-300/40 text-cyan-100 text-sm md:text-base font-semibold mb-5 shadow-lg shadow-cyan-500/10">
              <Sparkles size={18} /> ZSTK Lublin — interaktywny pokaz kierunków
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.02] tracking-tight">
              Cyberbezpieczeństwo <span className="text-cyan-300">+</span><br /> Informatyka
            </h1>
            <p className="text-slate-200 text-lg md:text-2xl mt-5 max-w-4xl leading-relaxed">
              Krótka aplikacja pokazująca, jak <b className="text-white">programowanie</b>, <b className="text-white">bazy danych</b> i <b className="text-white">ochrona przed zagrożeniami</b> łączą się w praktyce.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              {['kod', 'baza danych', 'formularze', 'hasła', 'phishing', 'bezpieczeństwo'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-slate-900/70 border border-white/10 text-slate-100 text-sm md:text-base font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <Card className="bg-black/55 border-cyan-300/25 shadow-2xl rounded-[2rem] overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 px-5 py-4 bg-slate-900 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-300" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-slate-400 text-sm font-mono">terminal_zstk.exe</span>
              </div>
              <div className="p-6 font-mono text-base md:text-lg text-green-300 space-y-4 min-h-[260px] flex flex-col justify-center">
                {terminalLines.map((line, index) => (
                  <motion.div key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.35 }} className="leading-relaxed">
                    {line}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.header>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {modules.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                <Card className="h-full bg-white/[0.08] border-white/12 rounded-[1.7rem] hover:bg-white/[0.12] transition shadow-xl backdrop-blur overflow-hidden">
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-300/30 flex items-center justify-center text-cyan-200 shadow-lg shadow-cyan-500/10">
                        <Icon size={30} />
                      </div>
                      <span className="text-[11px] md:text-xs uppercase tracking-wider text-cyan-100 bg-cyan-400/10 border border-cyan-300/20 px-3 py-1.5 rounded-full font-bold text-right">
                        {item.role}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black leading-tight text-white">{item.title}</h2>
                    <p className="text-slate-200 text-base leading-relaxed">{item.text}</p>
                    <div className="text-sm text-cyan-100 bg-slate-950/60 rounded-2xl p-4 border border-cyan-300/20 leading-relaxed">
                      <b>Przykład:</b> {item.example}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-white/[0.08] border-white/12 rounded-[1.7rem] shadow-xl lg:col-span-1 backdrop-blur">
            <CardContent className="p-6 md:p-7 space-y-5">
              <SectionTitle icon={Lock} title="Mini laboratorium hasła" subtitle="Uczeń wpisuje przykładowe hasło i od razu widzi, dlaczego długość oraz różnorodność znaków mają znaczenie." />
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-white/15 outline-none focus:border-cyan-300 text-white text-lg shadow-inner" placeholder="Wpisz przykładowe hasło" />
              <div className="h-5 rounded-full bg-slate-900 overflow-hidden border border-white/10">
                <motion.div className={`h-full ${passInfo.bg}`} animate={{ width: passInfo.width }} />
              </div>
              <div className="bg-slate-950/70 rounded-2xl p-5 border border-white/10 shadow-lg">
                <p className={`font-black text-2xl ${passInfo.tone}`}>Ocena: {passInfo.label}</p>
                <p className="text-slate-200 text-base mt-2 leading-relaxed">{passInfo.text}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.08] border-white/12 rounded-[1.7rem] shadow-xl lg:col-span-2 backdrop-blur">
            <CardContent className="p-6 md:p-7 space-y-5">
              <SectionTitle icon={Bug} title="Analizator zagrożeń" subtitle="Kandydat klika przykład, a aplikacja pokazuje, czy sytuacja wygląda podejrzanie i dlaczego." />
              <div className="grid md:grid-cols-2 gap-4">
                {threats.map((item, index) => (
                  <button key={item.label} onClick={() => setSelectedThreat(index)} className={`text-left rounded-2xl p-5 border transition shadow-lg min-h-[120px] ${selectedThreat === index ? "border-cyan-300 bg-cyan-400/15 ring-2 ring-cyan-300/20" : "border-white/10 bg-slate-950/60 hover:bg-slate-900"}`}>
                    <div className="flex gap-3">
                      <ArrowRight className="text-cyan-300 shrink-0 mt-1" size={20} />
                      <p className="text-base md:text-lg text-slate-100 leading-relaxed font-medium">{item.label}</p>
                    </div>
                  </button>
                ))}
              </div>
              {selectedThreat !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-5 bg-slate-950/80 border border-white/10 shadow-lg">
                  <div className={`flex items-center gap-3 font-black text-xl md:text-2xl ${threats[selectedThreat].danger ? "text-rose-100" : "text-emerald-100"}`}>
                    {threats[selectedThreat].danger ? <AlertTriangle className="text-rose-200" size={30} /> : <CheckCircle2 className="text-emerald-200" size={30} />}
                    <span className={`px-3 py-2 rounded-xl ${threats[selectedThreat].danger ? "bg-rose-500/25 border border-rose-300/30" : "bg-emerald-500/25 border border-emerald-300/30"}`}>
                      {threats[selectedThreat].danger ? "Podejrzane — wymaga ostrożności" : "Wygląda bezpieczniej — ale nadal warto sprawdzić szczegóły"}
                    </span>
                  </div>
                  <p className="text-slate-200 text-base md:text-lg mt-3 leading-relaxed">{threats[selectedThreat].reason}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid lg:grid-cols-[.9fr_1.1fr] gap-6">
          <Card className="bg-white/[0.08] border-white/12 rounded-[1.7rem] shadow-xl backdrop-blur">
            <CardContent className="p-6 md:p-7 space-y-5">
              <SectionTitle icon={Globe} title="Jak działa aplikacja?" subtitle="Prosty schemat pokazuje, że informatyka i cyberbezpieczeństwo spotykają się w każdym prawdziwym projekcie." />
              <div className="space-y-4 text-base md:text-lg text-slate-200">
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 shadow-lg"><b className="text-white">1. Frontend:</b> uczeń widzi formularz, przyciski i wynik działania aplikacji.</div>
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 shadow-lg"><b className="text-white">2. Backend:</b> skrypt przetwarza dane i komunikuje się z bazą.</div>
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 shadow-lg"><b className="text-white">3. Baza danych:</b> przechowuje konta, wyniki, zgłoszenia lub produkty.</div>
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 shadow-lg"><b className="text-white">4. Cyber:</b> zabezpiecza logowanie, hasła, formularze i dane użytkowników.</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.08] border-white/12 rounded-[1.7rem] shadow-xl backdrop-blur">
            <CardContent className="p-6 md:p-7 space-y-5">
              <SectionTitle icon={Trophy} title="Szybki quiz dla kandydata" subtitle="Krótka aktywność, która zatrzymuje ucznia przy stanowisku i daje pretekst do rozmowy o kierunku." />
              <div className="space-y-5">
                {quiz.map((item, qIndex) => (
                  <div key={item.question} className="rounded-2xl bg-slate-950/70 border border-white/10 p-5 shadow-lg">
                    <p className="font-black text-lg md:text-xl mb-4 leading-relaxed text-cyan-100 bg-cyan-400/10 border border-cyan-300/20 rounded-xl px-4 py-3 shadow-sm">
                      {qIndex + 1}. {item.question}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {item.answers.map((answer, aIndex) => {
                        const selected = answers[qIndex] === aIndex;
                        const isCorrect = showScore && aIndex === item.correct;
                        const isWrong = showScore && selected && aIndex !== item.correct;
                        return (
                          <button key={answer} onClick={() => setAnswers({ ...answers, [qIndex]: aIndex })} className={`rounded-xl p-4 text-left text-base border transition font-medium min-h-[72px] ${isCorrect ? "bg-emerald-400/20 border-emerald-300 text-emerald-50" : isWrong ? "bg-rose-400/20 border-rose-300 text-rose-50" : selected ? "bg-cyan-400/20 border-cyan-300 text-cyan-50" : "bg-slate-900 border-white/10 hover:bg-slate-800 text-slate-100"}`}>
                            {answer}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setShowScore(true)} className="rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black px-5 py-6 text-base shadow-lg shadow-cyan-500/20">
                  <Play size={18} className="mr-2" /> Pokaż wynik
                </Button>
                <Button onClick={() => { setAnswers({}); setShowScore(false); }} className="rounded-2xl bg-slate-100 hover:bg-white text-slate-950 border-2 border-cyan-200 font-black px-5 py-6 text-base shadow-lg shadow-white/10">
                  <RefreshCw size={18} className="mr-2 text-slate-950" /> Wyczyść odpowiedzi
                </Button>
              </div>
              {showScore && (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-6 bg-cyan-400/15 border border-cyan-300/30 shadow-lg">
                  <p className="text-3xl font-black text-white">Wynik: {quizScore}/{quiz.length}</p>
                  <p className="text-slate-200 text-base md:text-lg mt-2 leading-relaxed">To dobry moment, żeby zaprosić ucznia do rozmowy o kierunku i pokazać, że technologia to praktyka, nie sama teoria.</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </section>

        <footer className="text-center text-slate-200 text-lg md:text-xl py-6 rounded-[1.7rem] bg-white/[0.06] border border-white/10 shadow-xl">
          <b>Technik informatyk</b> tworzy rozwiązania. <b>Technik cyberbezpieczeństwa</b> pomaga je zabezpieczać. Razem tworzą świat nowoczesnych technologii.
        </footer>
      </div>
    </div>
  );
}
