/* =========================================================
   NC Tool | Unilever BR x Grasp [Super App] — CORP
   Code.gs
   ========================================================= */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('NC Tool | Super App · Corp')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}