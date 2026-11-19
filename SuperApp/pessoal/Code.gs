/* =========================================================
   NC Tool | Unilever BR x Grasp [Super App] — PESSOAL
   Code.gs
   ========================================================= */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('NC Tool | Super App · Pessoal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}