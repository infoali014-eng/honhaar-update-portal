import { jsPDF } from 'jspdf';

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
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold accent bar
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 28, pageWidth, 2.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('HONHAAR SCHOLARSHIP PORTAL', pageWidth / 2, 12, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('HIGHER EDUCATION UNDERGRADUATE MERIT PROGRAM - BATCH 2025-2026', pageWidth / 2, 19, { align: 'center' });
  doc.text('OFFICIAL PROVISIONAL MERIT LIST & ATTENDANCE AUDIT NOTIFICATION', pageWidth / 2, 24, { align: 'center' });

  // Document Metadata Bar
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Document: eligiblestudents.pdf', 14, 38);
  doc.setFont('helvetica', 'normal');
  doc.text('Ref No: HONHAAR/PRANK/2026/SEC-B', 14, 43);

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.text(`Issue Date: ${today}`, pageWidth - 14, 38, { align: 'right' });
  doc.text('Status: CONFIDENTIAL / AUDITED', pageWidth - 14, 43, { align: 'right' });

  doc.setDrawColor(200, 200, 200);
  doc.line(14, 46, pageWidth - 14, 46);

  // Big Humorous Alert Box
  doc.setFillColor(254, 242, 242); // light red
  doc.setDrawColor(redColor[0], redColor[1], redColor[2]);
  doc.rect(14, 50, pageWidth - 28, 30, 'FD');

  doc.setTextColor(redColor[0], redColor[1], redColor[2]);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL VERDICT / MERIT RESULT', pageWidth / 2, 58, { align: 'center' });

  doc.setFontSize(10.5);
  doc.setTextColor(185, 28, 28);
  doc.text('"Janab, application check karne se pehle thori attendance bhi check kar liya karein!"', pageWidth / 2, 66, { align: 'center' });

  doc.setFontSize(9.5);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text('Congratulations! Aap officially class prank ka shikar ho chukay hain. 😂', pageWidth / 2, 74, { align: 'center' });

  // Candidate Audit Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('1. Student Assessment & Linguistic Verification Audit:', 14, 88);

  // Box for student details
  doc.setFillColor(248, 250, 249);
  doc.setDrawColor(220, 220, 220);
  doc.rect(14, 91, pageWidth - 28, 28, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Submitted Linguistic Stance:', 20, 98);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.text(`"${selectedAnswer}"`, 80, 98);

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculated Student Aura:', 20, 105);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(redColor[0], redColor[1], redColor[2]);
  doc.text('-100,000 AURA (Severely Deficit 📉💀)', 80, 105);

  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Recorded Class Attendance:', 20, 112);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 83, 9);
  doc.text('38.2% (Too much time spent at the campus canteen drinking chai)', 80, 112);

  // Merit Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('2. Provisional Merit List Extracts (Batch 2026):', 14, 127);

  // Table Header
  const startY = 131;
  doc.setFillColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.rect(14, startY, pageWidth - 28, 7, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Roll No', 18, startY + 5);
  doc.text('Student Name', 42, startY + 5);
  doc.text('Degree Program', 80, startY + 5);
  doc.text('Attendance', 125, startY + 5);
  doc.text('Final Merit Status', 158, startY + 5);

  // Table Rows
  const tableData = [
    {
      roll: '2026-YOU',
      name: 'Aap Khud (Honorable Victim)',
      degree: 'BS Canteen & Chai Studies',
      att: '38.2%',
      status: 'PRANKED (No Scholarship)',
      isVictim: true,
    },
    {
      roll: '2026-001',
      name: 'Frontbencher Class Topper',
      degree: 'BS 100% Attendance',
      att: '99.5%',
      status: 'Selected (Obviously)',
      isVictim: false,
    },
    {
      roll: '2026-420',
      name: 'Backbencher President',
      degree: 'BS 8 AM Sleep Engineering',
      att: '12.0%',
      status: 'Disqualified (Sleeping)',
      isVictim: false,
    },
    {
      roll: '2026-786',
      name: 'Class Representative (CR)',
      degree: 'BS Assignment Extensions',
      att: '75.1%',
      status: 'Provisionally Pranked',
      isVictim: false,
    },
  ];

  let currentY = startY + 7;
  tableData.forEach((row, i) => {
    doc.setFillColor(row.isVictim ? 254 : i % 2 === 0 ? 255 : 248, row.isVictim ? 242 : 250, row.isVictim ? 242 : 249);
    doc.rect(14, currentY, pageWidth - 28, 7.5, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.line(14, currentY + 7.5, pageWidth - 14, currentY + 7.5);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', row.isVictim ? 'bold' : 'normal');

    if (row.isVictim) {
      doc.setTextColor(redColor[0], redColor[1], redColor[2]);
    } else {
      doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    }

    doc.text(row.roll, 18, currentY + 5);
    doc.text(row.name, 42, currentY + 5);
    doc.text(row.degree, 80, currentY + 5);
    doc.text(row.att, 125, currentY + 5);
    doc.text(row.status, 158, currentY + 5);

    currentY += 7.5;
  });

  // Stamp Section
  const stampY = currentY + 14;

  // Stamp 1
  doc.setDrawColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setLineWidth(0.8);
  doc.rect(20, stampY, 45, 20);
  doc.setTextColor(primaryGreen[0], primaryGreen[1], primaryGreen[2]);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('APPROVED BY', 42.5, stampY + 6, { align: 'center' });
  doc.text('CLASS CR & FRIENDS', 42.5, stampY + 11, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('OFFICIAL PARODY SEAL', 42.5, stampY + 16, { align: 'center' });

  // Stamp 2
  doc.setDrawColor(redColor[0], redColor[1], redColor[2]);
  doc.rect(pageWidth - 65, stampY, 45, 20);
  doc.setTextColor(redColor[0], redColor[1], redColor[2]);
  doc.setFontSize(7.5);
  doc.text('CANTEEN ATTENDANCE', pageWidth - 42.5, stampY + 6, { align: 'center' });
  doc.text('100% PRANK VERIFIED', pageWidth - 42.5, stampY + 11, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('NO FUNDS ALLOCATED', pageWidth - 42.5, stampY + 16, { align: 'center' });

  // Signatures
  doc.setLineWidth(0.2);
  doc.setDrawColor(180, 180, 180);
  doc.line(75, stampY + 13, 125, stampY + 13);
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(7);
  doc.text('Backbencher Examination Board', 100, stampY + 17, { align: 'center' });

  // Footer Disclaimer
  doc.setFontSize(6.5);
  doc.setTextColor(140, 140, 140);
  doc.text(
    'Disclaimer: This PDF (eligiblestudents.pdf) is a friendly classroom prank created for entertainment purposes.',
    pageWidth / 2,
    280,
    { align: 'center' }
  );
  doc.text(
    'No real government authority, scholarship rejection, or personal data was involved. Maintain your 75% attendance!',
    pageWidth / 2,
    284,
    { align: 'center' }
  );

  // Trigger download
  doc.save('eligiblestudents.pdf');
}
