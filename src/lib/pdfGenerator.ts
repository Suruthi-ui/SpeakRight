import jsPDF from "jspdf";
import { CommunicationAnalysis } from "@/types/communication";

export function generateCommunicationPdf(analysis: CommunicationAnalysis) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Background tint / styling header
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("SpeakRight – AI Communication Report", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = new Date(analysis.analyzedAt || Date.now()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`Generated on ${dateStr} • Powered by SpeakRight AI Coach`, margin, 21);

  y = 36;

  // Metadata pill badges
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, "F");

  doc.setTextColor(51, 65, 85);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("RECIPIENT:", margin + 4, y + 9);
  doc.setFont("helvetica", "normal");
  doc.text(analysis.recipient, margin + 24, y + 9);

  doc.setFont("helvetica", "bold");
  doc.text("SITUATION:", margin + 65, y + 9);
  doc.setFont("helvetica", "normal");
  doc.text(
    analysis.situation.length > 25 ? analysis.situation.substring(0, 24) + "..." : analysis.situation,
    margin + 86,
    y + 9
  );

  doc.setFont("helvetica", "bold");
  doc.text("SCORE:", margin + 140, y + 9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129); // emerald
  doc.text(`${analysis.overallScore} / 100`, margin + 155, y + 9);

  y += 22;

  // Score breakdown row
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Communication Performance Breakdown", margin, y);
  y += 6;

  const scoreItems = [
    { label: "Clarity", val: analysis.scoreBreakdown?.clarity || 80 },
    { label: "Confidence", val: analysis.scoreBreakdown?.confidence || 75 },
    { label: "Politeness", val: analysis.scoreBreakdown?.politeness || 85 },
    { label: "Conciseness", val: analysis.scoreBreakdown?.conciseness || 70 },
  ];

  const colWidth = (contentWidth - 9) / 4;
  scoreItems.forEach((item, idx) => {
    const colX = margin + idx * (colWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(colX, y, colWidth, 12, 1.5, 1.5, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, colX + 3, y + 5);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`${item.val}%`, colX + 3, y + 10);
  });

  y += 18;

  // Improved Message Section (Primary Highlight)
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, "FD");

  doc.setTextColor(6, 95, 70); // emerald-800
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("✨ Primary Recommended Rewrite", margin + 4, y + 7);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const splitImproved = doc.splitTextToSize(
    analysis.primaryImprovement?.improvedMessage || "",
    contentWidth - 8
  );
  doc.text(splitImproved, margin + 4, y + 13);

  y += 44;

  // Original Draft
  doc.setFillColor(254, 242, 242); // red-50
  doc.setDrawColor(248, 113, 113); // red-400
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, "FD");

  doc.setTextColor(153, 27, 27);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Original Draft (Before)", margin + 4, y + 6);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  const splitOriginal = doc.splitTextToSize(analysis.originalMessage || "", contentWidth - 8);
  doc.text(splitOriginal, margin + 4, y + 12);

  y += 32;

  // AI Psychological Explanation & Framing
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("AI Linguistic Analysis & Framing Strategy", margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitExplanation = doc.splitTextToSize(
    `${analysis.executiveSummary}\n\nPsychological Impact: ${analysis.aiExplanation?.psychologicalImpact || ""}`,
    contentWidth
  );
  doc.text(splitExplanation, margin, y);
  y += splitExplanation.length * 4.2 + 4;

  // Check if we need page 2
  if (y > pageHeight - 50) {
    doc.addPage();
    y = 20;
  }

  // Alternative Rewrites
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Alternative Styles & Rewrites", margin, y);
  y += 6;

  (analysis.alternativeRewrites || []).forEach((alt) => {
    if (y > pageHeight - 35) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, "F");

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`${alt.title} (${alt.tone})`, margin + 3, y + 5);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const splitAltMsg = doc.splitTextToSize(alt.message, contentWidth - 6);
    doc.text(splitAltMsg, margin + 3, y + 10);

    y += 26;
  });

  // Learning tips
  if (analysis.learningTips && analysis.learningTips.length > 0) {
    if (y > pageHeight - 45) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Actionable Coaching Tips", margin, y);
    y += 6;

    analysis.learningTips.slice(0, 2).forEach((tip) => {
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(79, 70, 229); // indigo
      doc.text(`• ${tip.title}: `, margin, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      const splitTip = doc.splitTextToSize(
        `${tip.tip} Rule of thumb: "${tip.ruleOfThumb}"`,
        contentWidth - 10
      );
      doc.text(splitTip, margin + 4, y + 4);
      y += splitTip.length * 4.2 + 4;
    });
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `SpeakRight – AI Communication Coach | Confidential & Educational • Page ${i} of ${totalPages}`,
      margin,
      pageHeight - 8
    );
  }

  doc.save(`SpeakRight_Analysis_${analysis.recipient}_${Date.now()}.pdf`);
}
