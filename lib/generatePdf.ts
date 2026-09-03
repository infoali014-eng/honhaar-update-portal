import { jsPDF } from 'jspdf';
import { MEME_IMAGE_BASE64 } from './memeImage';

export function generateEligibleStudentsPdf(selectedAnswer: string = 'Dahi Khatta hota hai') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Primary Colors
  const primaryGreen = [8, 94, 53]; // #085e35
  const gold = [217, 119, 6]; // #d97706
  const darkSlate = [30, 41, 59];
  const redColor = [220, 38, 38];

  // Header Banner
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(0, 0, pageWidth, 26, 'F');

  // Gold accent bar
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 26, pageWidth, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('HONHAAR SCHOLARSHIP PORTAL', pageWidth / 2, 11, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('HIGHER EDUCATION UNDERGRADUATE MERIT PROGRAM - BATCH 2025-2026', pageWidth / 2, 17, { align: 'center' });
  doc.text('OFFICIAL PROVISIONAL MERIT LIST & ATTENDANCE AUDIT NOTIFICATION', pageWidth / 2, 22, { align: 'center' });

  // Document Metadata Bar
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Document: eligiblestudents.pdf', 14, 35);
  doc.setFont('helvetica', 'normal');
  doc.text('Ref No: HONHAAR/PRANK/2026/SEC-B', 14, 40);

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`Issue Date: ${today}`, pageWidth - 14, 35, { align: 'right' });
  doc.text('Status: CONFIDENTIAL / AUDITED', pageWidth - 14, 40, { align: 'right' });

  doc.setDrawColor(210, 210, 210);
  doc.line(14, 43, pageWidth - 14, 43);

  // Big Humorous Alert Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(redColor[0], redColor[1], redColor[2]);
  doc.rect(14, 47, pageWidth - 28, 26, 'FD');

  doc.setTextColor(redColor[0], redColor[1], redColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL MERIT VERDICT', pageWidth / 2, 54, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(185, 28, 28);
  doc.text('"Janab, application check karne se pehle thori attendance bhi check kar liya karein!"', pageWidth / 2, 61, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('Congratulations! Aap officially class prank ka shikar ho chukay hain. 😂', pageWidth / 2, 68, { align: 'center' });

  // Requested Message Section: 14 september ko university start ho rahi hai...
  doc.setFillColor(255, 251, 235); // amber-50
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.rect(14, 76, pageWidth - 28, 14, 'FD');

  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('14 september ko university start ho rahi hai un sai hi poch lena', pageWidth / 2, 85, { align: 'center' });

  // Embed the Salman Khan "Aapna kya lena dena" Meme Image
  const imgWidth = 120;
  const imgHeight = 52;
  const imgX = (pageWidth - imgWidth) / 2;
  const imgY = 93;

  try {
    doc.addImage(MEME_IMAGE_BASE64, 'JPEG', imgX, imgY, imgWidth, imgHeight);
  } catch {
    // fallback if image fail
  }

  // Student details box
  const auditY = imgY + imgHeight + 6;
  doc.setFillColor(248, 250, 249);
  doc.setDrawColor(220, 220, 220);
  doc.rect(14, auditY, pageWidth - 28, 22, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('Your Linguistic Stance:', 20, auditY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text(`"${selectedAnswer}"`, 75, auditY + 7);

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculated Student Aura:', 20, auditY + 13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(redColor[0], redColor[1], redColor[2]);
  doc.text('-100,000 AURA 📉💀', 75, auditY + 13);

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Recorded Class Attendance:', 20, auditY + 19);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 83, 9);
  doc.text('38.2% (Canteen Chai Quota)', 75, auditY + 19);

  // Merit Table
  const tableY = auditY + 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('Provisional Merit List Extract (Batch 2026):', 14, tableY);

  const startY = tableY + 3;
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(14, startY, pageWidth - 28, 6.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Roll No', 18, startY + 4.5);
  doc.text('Student Name', 42, startY + 4.5);
  doc.text('Degree Program', 80, startY + 4.5);
  doc.text('Attendance', 125, startY + 4.5);
  doc.text('Final Merit Status', 158, startY + 4.5);

  const tableData = [
    {
      roll: '2026-YOU',
      name: 'Aap Khud (Honorable Victim)',
      degree: 'BS Canteen Studies',
      att: '38.2%',
      status: 'PRANKED (No Scholarship)',
      isVictim: true,
    },
    {
      roll: '2026-001',
      name: 'Frontbencher Topper',
      degree: 'BS 100% Attendance',
      att: '99.5%',
      status: 'Selected (Obviously)',
      isVictim: false,
    },
    {
      roll: '2026-420',
      name: 'Backbencher President',
      degree: 'BS 8 AM Sleep Eng.',
      att: '12.0%',
      status: 'Disqualified (Sleeping)',
      isVictim: false,
    },
  ];

  let currentY = startY + 6.5;
  tableData.forEach((row, i) => {
    doc.setFillColor(row.isVictim ? 254 : i % 2 === 0 ? 255 : 248, row.isVictim ? 242 : 250, row.isVictim ? 242 : 249);
    doc.rect(14, currentY, pageWidth - 28, 6.5, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.line(14, currentY + 6.5, pageWidth - 14, currentY + 6.5);

    doc.setFontSize(7);
    doc.setFont('helvetica', row.isVictim ? 'bold' : 'normal');

    if (row.isVictim) {
      doc.setTextColor(redColor[0], redColor[1], redColor[2]);
    } else {
      doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    }

    doc.text(row.roll, 18, currentY + 4.5);
    doc.text(row.name, 42, currentY + 4.5);
    doc.text(row.degree, 80, currentY + 4.5);
    doc.text(row.att, 125, currentY + 4.5);
    doc.text(row.status, 158, currentY + 4.5);

    currentY += 6.5;
  });

  // Footer Disclaimer
  doc.setFontSize(6);
  doc.setTextColor(140, 140, 140);
  doc.text(
    'Disclaimer: This PDF (eligiblestudents.pdf) is a friendly class prank created for entertainment purposes.',
    pageWidth / 2,
    286,
    { align: 'center' }
  );

  // Trigger download
  doc.save('eligiblestudents.pdf');
}
