
"use client";


import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "addchain-content-generator-v5";


const categoryOptions = [
  "ERP rådgivning",
  "ERP implementation",
  "Projektledning",
  "Projekt i kris",
  "Business Improvement (AI)",
];

const industryOptions = [
  "Tillverkande industri",
  "Bygg och entreprenad",
  "Retail och e-handel",
  "Livsmedel och produktion",
  "Logistik och distribution",
  "Tjänstebolag",
  "Annat",
];

const systemOptions = [
  "Microsoft Dynamics 365",
  "SAP",
  "IFS",
  "Jeeves",
  "Monitor",
  "Visma",
  "Power Platform och AI",
  "Annat ERP-system",
];

const ctaOptions = {
  "Boka möte": "Vill ni diskutera nästa steg i ert ERP-arbete? Boka ett möte med Addchain så tittar vi på nuläge, risker och rätt väg framåt.",
  "Kontakta oss": "Vill du veta mer om hur Addchain kan stötta er? Kontakta oss så berättar vi hur vi arbetar på kundsidan för att skapa struktur, styrning och affärsnytta.",
  "Läs mer": "Vill ni fördjupa er i hur Addchain arbetar med affärskritiska ERP-initiativ? Hör av er så delar vi gärna fler exempel och perspektiv.",
  "Workshop": "Vill ni få en tydligare bild av nuläge, prioriteringar och nästa steg? Boka en workshop med Addchain och skapa rätt förutsättningar från start.",
};

const titles = {
  "ERP rådgivning": "ERP-rådgivning – rätt beslut från start i affärskritiska initiativ",
  "ERP implementation": "ERP implementation – från strategi till stabil leverans",
  "Projektledning": "Projektledning i ERP-projekt – avgörande för framgång",
  "Projekt i kris": "ERP-projekt i kris – så återtar du kontrollen",
  "Business Improvement (AI)": "Business Improvement med AI – från ERP-data till verklig affärsnytta",
};

const categoryFocus = {
  "ERP rådgivning": "systemval, målbild, upphandling och styrning",
  "ERP implementation": "genomförande, samordning, kvalitetssäkring och affärseffekt",
  "Projektledning": "prioriteringar, riskhantering, beslut och framdrift",
  "Projekt i kris": "återtagande av kontroll, tydlig styrning och stabilisering",
  "Business Improvement (AI)": "automatisering, datadrivna beslut, processförbättring och AI-stödd verksamhetsutveckling",
};

const businessImprovementSubtopics = {
  "AI och automatisering": {
    label: "AI och automatisering",
    titleAddon: "med fokus på AI och automatisering",
    focus: "automatisering, minskad administration och AI-stödda arbetsflöden",
    angle: "identifiera repetitiva moment, frigöra tid och skapa mer skalbara arbetssätt",
    hashtags: "#AI #Automatisering #Digitalisering",
  },
  "Power Platform": {
    label: "Power Platform",
    titleAddon: "med Power Platform som motor",
    focus: "low-code-lösningar, arbetsflöden, appar och effektivisering nära verksamheten",
    angle: "omsätta förbättringsbehov till konkreta lösningar med snabb affärseffekt",
    hashtags: "#PowerPlatform #LowCode #Digitalisering",
  },
  "Processförbättring": {
    label: "Processförbättring",
    titleAddon: "genom processförbättring",
    focus: "smidigare processer, bättre informationsflöden och tydligare ansvar",
    angle: "skapa struktur i vardagen och förbättra hur verksamheten faktiskt arbetar",
    hashtags: "#Processforbattring #Affarsnytta #Digitalisering",
  },
  "Datadrivet beslutsstöd": {
    label: "Datadrivet beslutsstöd",
    titleAddon: "med datadrivet beslutsstöd",
    focus: "insikter, visualisering, uppföljning och bättre beslutsunderlag",
    angle: "göra data mer användbar i vardagen och stödja snabbare, bättre prioriteringar",
    hashtags: "#Datadrivet #Beslutsstod #Affarsnytta",
  },
};

const industryContext = {
  "Tillverkande industri": "spårbarhet, planering, lagerflöden och integrationer mellan verksamhet och system",
  "Bygg och entreprenad": "projektstyrning, inköp, ekonomisk uppföljning och komplexa leveranskedjor",
  "Retail och e-handel": "orderflöden, lagerprecision, kundupplevelse och snabb förändringstakt",
  "Livsmedel och produktion": "kvalitet, spårbarhet, recept- eller artikelstyrning och höga krav på tillgänglighet",
  "Logistik och distribution": "transparens i flöden, effektiv planering och datadrivna beslut i flera led",
  "Tjänstebolag": "styrning, resursplanering, lönsamhetsuppföljning och tydliga processer",
  "Annat": "verksamhetsanpassning, tydlig styrning och rätt beslutsunderlag",
};

const toneMap = {
  insikt: {
    opener: "Allt fler organisationer står inför affärskritiska beslut kopplade till ERP, digitalisering och AI.",
    angle:
      "Det som ofta avgör utfallet är inte bara teknikvalet – utan hur väl verksamheten lyckas skapa struktur, ansvar och riktning genom hela initiativet.",
    linkedinLead:
      "Många organisationer underskattar hur mycket styrning och verksamhetsförankring som krävs för att lyckas i ett ERP-initiativ eller Business Improvement-arbete.",
  },
  sälj: {
    opener:
      "När ett ERP-initiativ eller ett AI-drivet förbättringsarbete ska leverera affärsnytta krävs mer än bra teknik – det krävs rätt styrning från start.",
    angle:
      "Det är här Addchain gör skillnad: på kundsidan, med fokus på struktur, beslutskraft och verklig effekt i verksamheten.",
    linkedinLead:
      "Det räcker inte med nya verktyg eller AI-funktioner – arbetet måste också ge effekt i verksamheten.",
  },
};

const presets = [
  {
    name: "Industri / ERP-projekt i kris",
    category: "Projekt i kris",
    industry: "Tillverkande industri",
    system: "Microsoft Dynamics 365",
    customer: "tillverkande bolag med komplex drift",
    challenge: "försenad implementation, otydlig styrning och ökande projektkostnader",
    tone: "insikt",
    cta: "Workshop",
    mode: "artikel",
    subtopic: "AI och automatisering",
  },
  {
    name: "Bygg / Projektledning",
    category: "Projektledning",
    industry: "Bygg och entreprenad",
    system: "Microsoft Dynamics 365",
    customer: "bygg- och entreprenadbolag med många beroenden mellan ekonomi, inköp och projekt",
    challenge: "svag samordning mellan arbetsflöden, ansvar och beslutsforum",
    tone: "sälj",
    cta: "Boka möte",
    mode: "artikel",
    subtopic: "AI och automatisering",
  },
  {
    name: "Business Improvement / Power Platform",
    category: "Business Improvement (AI)",
    industry: "Tjänstebolag",
    system: "Power Platform och AI",
    customer: "verksamheter som vill skapa mer värde av befintlig ERP-investering",
    challenge: "manuella arbetsflöden, låg automatiseringsgrad och svårigheter att omsätta data till handling",
    tone: "insikt",
    cta: "Kontakta oss",
    mode: "artikel",
    subtopic: "Power Platform",
  },
];



function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}



function TextBlock({
  title,
  text,
  onCopy,
}: {
  title: string;
  text: string;
  onCopy: (text: string) => void;
}) {

  if (!text) return null;


  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button variant="outline" className="rounded-2xl" onClick={() => onCopy(text)}>
            Kopiera
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm leading-7 tex t-slate-800 font-sans">{text}</pre>
      </CardContent>
    </Card>
  );
}


export default function Page() {
  const [category, setCategory] = useState("ERP rådgivning");
  const [subtopic, setSubtopic] = useState("AI och automatisering");
  const [industry, setIndustry] = useState("Tillverkande industri");
  const [system, setSystem] = useState("Microsoft Dynamics 365");
  const [customer, setCustomer] = useState("");
  const [challenge, setChallenge] = useState("");
  const [tone, setTone] = useState("insikt");
  const [cta, setCta] = useState("Kontakta oss");
  const [mode, setMode] = useState("artikel");
  const [result, setResult] = useState("");
  const [shortVersion, setShortVersion] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [keywords, setKeywords] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const selectedTone = toneMap[tone as keyof typeof toneMap];
  const isBusinessImprovement = category === "Business Improvement (AI)";
  const selectedSubtopic = businessImprovementSubtopics[subtopic as keyof typeof businessImprovementSubtopics];


  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) return;


    try {
      const parsed = JSON.parse(stored);
      setCategory(parsed.category || "ERP rådgivning");
      setSubtopic(parsed.subtopic || "AI och automatisering");
      setIndustry(parsed.industry || "Tillverkande industri");
      setSystem(parsed.system || "Microsoft Dynamics 365");
      setCustomer(parsed.customer || "");
      setChallenge(parsed.challenge || "");
      setTone(parsed.tone || "insikt");
      setCta(parsed.cta || "Kontakta oss");
      setMode(parsed.mode || "artikel");
    } catch (_) {
      // ignore invalid localStorage
    }
  }, []);


  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ category, subtopic, industry, system, customer, challenge, tone, cta, mode })
    );
  }, [category, subtopic, industry, system, customer, challenge, tone, cta, mode]);


  useEffect(() => {
    if (!isBusinessImprovement) return;
    if (!businessImprovementSubtopics[subtopic as keyof typeof businessImprovementSubtopics]) {
      setSubtopic("AI och automatisering");
    }
  }, [isBusinessImprovement, subtopic]);


  const title = useMemo(() => {
    if (isBusinessImprovement) {
      return `${titles[category]} ${selectedSubtopic.titleAddon}`;
    }
    return titles[category as keyof typeof titles];
  }, [category, isBusinessImprovement, selectedSubtopic]);


  const generateText = () => {
    const customerText = customer || "verksamheter med höga krav på förändringsledning och styrning";
    const challengeText = challenge || "komplexa beslut, beroenden och höga förväntningar på affärsnytta";
    const industryText = industryContext[industry as keyof typeof industryContext];
const focusText = isBusinessImprovement
  ? selectedSubtopic.focus
  : categoryFocus[category as keyof typeof categoryFocus];
    const ctaText = ctaOptions[cta];
    const extraBusinessText = isBusinessImprovement
      ? ` I detta område handlar det ofta om att ${selectedSubtopic.angle}.`
      : "";
    const businessLabel = isBusinessImprovement ? ` inom ${selectedSubtopic.label.toLowerCase()}` : "";


    const article = `${title}

${selectedTone.opener} För ${customerText} handlar det ofta om ${challengeText}. I ${industry.toLowerCase()} är det vanligt med höga krav på ${industryText}.

Inom ${category.toLowerCase()}${businessLabel} behöver organisationer skapa kontroll över ${focusText}. Med ${system} som plattform eller jämförelsepunkt blir det extra viktigt att arbeta strukturerat med målbild, beslut och ansvar. ${selectedTone.angle}${extraBusinessText}


Addchain arbetar på kundsidan och är oberoende från system och leverantörer. Det innebär att fokus alltid ligger på verksamhetens behov, rätt prioriteringar och långsiktig affärsnytta – inte på att driva ett visst verktyg eller en viss implementationspartner.

När komplexiteten ökar behövs ofta en partner som kan översätta affärsbehov till tydliga beslut, utmana otydligheter och skapa framdrift utan att tappa kontrollen. Det gäller särskilt när organisationen behöver stärka sin interna projektförmåga, få bättre struktur i krav, eller vidareutveckla ERP-investeringen med Power Platform och AI.

${ctaText}`;

    const caseText = `${title}

Case: ${customerText}

Utgångsläge:
${customerText} stod inför ${challengeText}. Samtidigt ställde ${industry.toLowerCase()} höga krav på ${industryText}.

Insats från Addchain:
Addchain gick in på kundsidan med fokus på ${focusText}. Arbetet handlade om att skapa struktur i beslutsfattande, tydliggöra ansvar och säkra att initiativet styrdes utifrån verksamhetens behov snarare än leverantörens perspektiv.${extraBusinessText}


Möjlig effekt:
Med tydligare styrning, bättre prioriteringar och förstärkt projektförmåga skapades bättre förutsättningar för att minska risk, öka kvalitet och driva mot verklig affärsnytta.

${ctaText}`;

    const shortText = `${title}

${customerText} möter ofta ${challengeText}. Addchain hjälper organisationer på kundsidan att skapa struktur, styrning och affärsnytta inom ${category.toLowerCase()}${businessLabel} – särskilt i miljöer där ${industryText}.


${ctaText}`;

    const linkedInHashtags = isBusinessImprovement
      ? `${selectedSubtopic.hashtags} #Addchain`
      : "#ERP #Affarssystem #Projektledning #AI #Digitalisering #Addchain";

    const linkedInText = `🔍 ${title}

${selectedTone.linkedinLead}

För ${customerText} handlar det ofta om ${challengeText}. I praktiken kräver det struktur, tydliga beslut och rätt kompetens på kundsidan – särskilt i ${industry.toLowerCase()} där ${industryText}.

På Addchain hjälper vi organisationer inom ${category.toLowerCase()}${businessLabel} med fokus på affärsnytta, styrning och långsiktig effekt.${extraBusinessText}


${linkedInHashtags}`;


    const metaT = `${title} | Addchain`;
    const metaD = `${customerText} kan hantera ${challengeText} med stöd inom ${category.toLowerCase()}${businessLabel}. Addchain skapar struktur, styrning och affärsnytta på kundsidan.`;
    const urlSlug = slugify(`${category}-${isBusinessImprovement ? subtopic : ""}-${industry}-${customer || "addchain"}`);

    const keywordList = [
      "ERP",
      "ERP projekt",
      category.toLowerCase(),
      isBusinessImprovement ? subtopic.toLowerCase() : "",
      industry.toLowerCase(),
      system.toLowerCase(),
      "affärssystem",
      "digitalisering",
      "AI",
      "projektledning",
      "affärsnytta",
      "Addchain",
    ]
      .filter(Boolean)
      .join(", ");


    setResult(mode === "case" ? caseText : article);
    setShortVersion(shortText);
    setLinkedin(linkedInText);
    setMetaTitle(metaT);
    setMetaDesc(metaD);
    setSlug(urlSlug);
    setKeywords(keywordList);
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopyMessage("Kopierat!");
    setTimeout(() => setCopyMessage(""), 1800);
  };
  const copyEverything = async () => {
    const blob = `META TITLE
${metaTitle}
META DESCRIPTION
${metaDesc}
SLUG
${slug}
KEYWORDS
${keywords}
WEBTEXT
${result}
KORT VERSION
${shortVersion}
LINKEDIN
${linkedin}`;
    await copyToClipboard(blob);
  };
  const resetForm = () => {
    setCategory("ERP rådgivning");
    setSubtopic("AI och automatisering");
    setIndustry("Tillverkande industri");
    setSystem("Microsoft Dynamics 365");
    setCustomer("");
    setChallenge("");
    setTone("insikt");
    setCta("Kontakta oss");
    setMode("artikel");
    setResult("");
    setShortVersion("");
    setLinkedin("");
    setMetaTitle("");
    setMetaDesc("");
    setSlug("");
    setKeywords("");
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };
  const applyPreset = (preset) => {
    setCategory(preset.category);
    setSubtopic(preset.subtopic);
    setIndustry(preset.industry);
    setSystem(preset.system);
    setCustomer(preset.customer);
    setChallenge(preset.challenge);
    setTone(preset.tone);
    setCta(preset.cta);
    setMode(preset.mode);
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid gap-6">
        <section className="rounded-[28px] bg-slate-950 text-white p-6 md:p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs tracking-wide uppercase text-slate-200">
                Addchain • Production version
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Addchain Content Generator</h1>
              <p className="mt-3 text-sm md:text-base text-slate-300 leading-7">
                Generera webtext, kortversion, LinkedIn-inlägg och SEO-fält i Addchains tonalitet – med stöd för ERP, projektledning och Business Improvement med AI.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100" onClick={generateText}>
                Generera allt
              </Button>
              <Button variant="outline" className="rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10" onClick={resetForm}>
                Återställ
              </Button>
            </div>
          </div>
        </section>
        <Card className="rounded-3xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Snabbstart med presets</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-900 hover:text-slate-900 transition"
              >
                {preset.name}
              </button>
            ))}
          </CardContent>
        </Card>
        <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-6 items-start">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Inställningar</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Kategori</label>
                  <select className="p-3 border rounded-2xl bg-white" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categoryOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                {isBusinessImprovement ? (
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Undertema</label>
                    <select className="p-3 border rounded-2xl bg-white" value={subtopic} onChange={(e) => setSubtopic(e.target.value)}>
                      {Object.keys(businessImprovementSubtopics).map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Bransch</label>
                    <select className="p-3 border rounded-2xl bg-white" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                      {industryOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Bransch</label>
                  <select className="p-3 border rounded-2xl bg-white" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    {industryOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">System</label>
                  <select className="p-3 border rounded-2xl bg-white" value={system} onChange={(e) => setSystem(e.target.value)}>
                    {systemOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>


              <div className="grid gap-2">
                <label className="text-sm font-medium">Målgrupp / kund</label>
                <input
                  className="p-3 border rounded-2xl bg-white"
                  placeholder="Ex: tillverkande bolag med komplex drift"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>


              <div className="grid gap-2">
                <label className="text-sm font-medium">Utmaning</label>
                <input
                  className="p-3 border rounded-2xl bg-white"
                  placeholder="Ex: försenad implementation och otydlig styrning"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Ton</label>
                  <select className="p-3 border rounded-2xl bg-white" value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option value="insikt">Insikt</option>
                    <option value="sälj">Sälj</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Läge</label>
                  <select className="p-3 border rounded-2xl bg-white" value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="artikel">Artikel</option>
                    <option value="case">Case</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">CTA</label>
                  <select className="p-3 border rounded-2xl bg-white" value={cta} onChange={(e) => setCta(e.target.value)}>
                    {Object.keys(ctaOptions).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="rounded-2xl" onClick={generateText}>Generera allt</Button>
                <Button variant="outline" className="rounded-2xl" onClick={copyEverything} disabled={!result}>
                  Kopiera allt
                </Button>
                <Button variant="outline" className="rounded-2xl" onClick={resetForm}>
                  Återställ
                </Button>
                {copyMessage && <span className="text-sm text-emerald-600 self-center">{copyMessage}</span>}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-slate-200 shadow-sm sticky top-4">
            <CardHeader>
              <CardTitle>SEO-output</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div>
                <strong>Meta title</strong>
                <div className="mt-1 text-slate-700 leading-6">{metaTitle || "Genereras när du klickar på Generera allt"}</div>
              </div>
              <div>
                <strong>Meta description</strong>
                <div className="mt-1 text-slate-700 leading-6">{metaDesc || "Genereras när du klickar på Generera allt"}</div>
              </div>
              <div>
                <strong>URL slug</strong>
                <div className="mt-1 text-slate-700 break-all leading-6">{slug || "Genereras när du klickar på Generera allt"}</div>
              </div>
              <div>
                <strong>Keywords</strong>
                <div className="mt-1 text-slate-700 leading-6">{keywords || "Genereras när du klickar på Generera allt"}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6">
          <TextBlock title="Webtext" text={result} onCopy={copyToClipboard} />

          <div className="grid lg:grid-cols-2 gap-6">
            <TextBlock title="Kort version" text={shortVersion} onCopy={copyToClipboard} />
            <TextBlock title="LinkedIn-post" text={linkedin} onCopy={copyToClipboard} />
          </div>
        </div>
      </div>
    </main>
  );
}
