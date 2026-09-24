/***************************************
 * 🎨 CORES (brand colors)
 ***************************************/

function getCorPlataforma(p) {
  const cores = {
    "Amazon":        { bg: "#FF9900", font: "#000000" },
    "Compra Direta": { bg: "#6B7280", font: "#ffffff" },
    "DV360":         { bg: "#1967D2", font: "#ffffff" },
    "Google Ads":    { bg: "#34A853", font: "#ffffff" },
    "Kwai":          { bg: "#F60050", font: "#ffffff" },
    "LinkedIn":      { bg: "#0A66C2", font: "#ffffff" },
    "Meta":          { bg: "#0866FF", font: "#ffffff" },
    "Pinterest":     { bg: "#E60023", font: "#ffffff" },
    "Search":        { bg: "#4285F4", font: "#ffffff" },
    "Snapchat":      { bg: "#FFFC00", font: "#000000" },
    "Spotify":       { bg: "#1DB954", font: "#000000" },
    "TikTok":        { bg: "#FF0050", font: "#ffffff" },
    "Twitter/X":     { bg: "#000000", font: "#ffffff" },
    "YouTube":       { bg: "#FF0000", font: "#ffffff" }
  };
  return cores[p] || null;
}

/***************************************
 * 🧠 NORMALIZAÇÃO DE PLATAFORMA
 ***************************************/

function normalizarPlataforma(texto) {
  if (!texto) return "";
  const t = texto.toString().toLowerCase().trim();

  if (/\bamazon\b|\bamz\b/.test(t))                                  return "Amazon";
  if (/compra\s*direta|direct\s*buy|\bcd\b/.test(t))                 return "Compra Direta";
  if (/dv\s*360|display\s*video\s*360|\bdv360\b/.test(t))            return "DV360";
  if (/google\s*ads|googleads|\bgads\b/.test(t))                     return "Google Ads";
  if (/kwai/.test(t))                                                return "Kwai";
  if (/linkedin|\blin\b|\bli\b/.test(t))                             return "LinkedIn";
  if (/\bmeta\b|facebook|\bfb\b|instagram|\big\b/.test(t))           return "Meta";
  if (/pinterest|\bpin\b/.test(t))                                   return "Pinterest";
  if (/\bsa360\b|search\s*ads\s*360|\bsearch\b|\bsem\b|\bgsearch\b/.test(t)) return "Search";
  if (/snapchat|\bsnap\b/.test(t))                                   return "Snapchat";
  if (/spotify|\bspot\b/.test(t))                                    return "Spotify";
  if (/tiktok|tik\s*tok|\btt\b/.test(t))                             return "TikTok";
  if (/twitter|twitter\/x|\btw\b/.test(t))                           return "Twitter/X";
  if (/youtube|\byt\b/.test(t))                                      return "YouTube";

  return "";
}

/***************************************
 * 💡 SUGESTÃO DE PLATAFORMA
 ***************************************/

function sugerirPlataforma(texto) {
  if (!texto) return "";
  const t = texto.toString().toLowerCase();

  if (t.includes("ama"))                                              return "Amazon";
  if (t.includes("dir") || t.includes("comp"))                       return "Compra Direta";
  if (t.includes("dv"))                                              return "DV360";
  if (t.includes("goo") || t.includes("gad"))                        return "Google Ads";
  if (t.includes("kwa"))                                             return "Kwai";
  if (t.includes("lin"))                                             return "LinkedIn";
  if (t.includes("met") || t.includes("face") || t.includes("inst")) return "Meta";
  if (t.includes("pin"))                                             return "Pinterest";
  if (t.includes("sa3") || t.includes("360") || t.includes("sea") || t.includes("sem")) return "Search";
  if (t.includes("sna"))                                             return "Snapchat";
  if (t.includes("spo"))                                             return "Spotify";
  if (t.includes("tik"))                                             return "TikTok";
  if (t.includes("twi") || t.includes("twx"))                        return "Twitter/X";
  if (t.includes("you"))                                             return "YouTube";

  return "";
}