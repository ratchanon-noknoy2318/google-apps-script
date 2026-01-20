// เรียก Script Properties ก่อน
const scriptProperties = PropertiesService.getScriptProperties();

// แทนที่ YOUR_SPREADSHEET_ID และ SHEET_NAME ด้วยข้อมูลของคุณ
var SPREADSHEET_ID = scriptProperties.getProperty('SPERADSHEET_ID');
var SHEET_NAME = scriptProperties.getProperty('SHEET_NAME');; 

function doPost(e) {
  try {
    var doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = doc.getSheetByName(SHEET_NAME);

    var data = JSON.parse(e.postData.contents);

    var newRow = [
      new Date(),
      data.firstName,
      data.lastName,
      "'" + data.phone,
      "'" + data.nationalId,
      data.appointmentDate,
      data.appointmentTime,
      data.service,
      data.notes
    ];

    // เพิ่มแถวใหม่ลงในชีต
    sheet.appendRow(newRow);

    // --- ส่วนที่เพิ่มเข้ามาเพื่อจัดข้อมูลชิดขวา ---
    // 1. เอแถวสุดท้ายที่เพิ่งเพิ่มเข้ามา
    var lastRow = sheet.getLastRow();
    // 2. กำหนดช่วงข้อมูลของแถวนั้นทั้งหมด (ตั้งแต่คอลัมน์แรกถึงคอลัมน์สุดท้าย)
    var range = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn());
    // 3. ตั้งค่าการจัดตำแหน่งข้อมูลให้ชิดขวา
    range.setHorizontalAlignment("right");
    // --- จบส่วนที่เพิ่มเข้ามา ---

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log(error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
