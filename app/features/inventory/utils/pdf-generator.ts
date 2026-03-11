import jsPDF from "jspdf";

interface SAPItem {
    LoteSerie: string;
    Type_3: string;
    Sucursal: string;
    Almacén: string;
    Ubicación: string;
}

export async function generateInventoryPDF(selectedItems: SAPItem[]) {
    const Mod = await import("qr-code-styling");
    const QRCodeStyling = Mod.default || (Mod as any).QRCodeStyling || Mod;

    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Configuración para etiquetas tipo sticker (ajustado a 2 por página)
    const qrSize = 80;
    const marginX = (pageWidth - qrSize) / 2; // Centrado horizontal
    const cardHeight = pageHeight / 2;

    for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        if (!item) continue;

        if (i > 0 && i % 2 === 0) {
            doc.addPage();
        }

        // Dimensiones de la "tarjeta" de la etiqueta
        const cardWidth = 160;
        const cardHeightLocal = 120;
        const cardX = (pageWidth - cardWidth) / 2;
        const cardY = (i % 2) * (pageHeight / 2) + (pageHeight / 2 - cardHeightLocal) / 2;

        // 1. Fondo y Borde de la Tarjeta
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.5);
        doc.setFillColor(255, 255, 255);
        // @ts-ignore - roundedRect es parte de jspdf pero a veces no está en tipos
        doc.roundedRect(cardX, cardY, cardWidth, cardHeightLocal, 4, 4, "FD");

        // 2. Acento superior (Marca Marathon)
        doc.setFillColor(200, 16, 46); // Maratón Red
        doc.rect(cardX, cardY, cardWidth, 3, "F");

        // 3. Texto de Identificación (Lote/Serie) arriba
        doc.setFontSize(14);
        doc.setTextColor(200, 16, 46);
        doc.setFont("helvetica", "bold");
        doc.text(`LT: ${item.LoteSerie}`, pageWidth / 2, cardY + 12, { align: "center" });

        // 4. Generar QR Code
        const qrInstance = new (QRCodeStyling as any)({
            width: 600,
            height: 600,
            type: "canvas",
            data: `LT:${item.LoteSerie}`,
            margin: 0,
            dotsOptions: { color: "#c8102e", type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            cornersSquareOptions: { color: "#c8102e", type: "extra-rounded" },
            qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "H" },
            imageOptions: { hideBackgroundDots: true, imageSize: 0.4 },
            image: "/images/logo/marathon-group-logo.png",
        });

        const tempDiv = document.createElement("div");
        qrInstance.append(tempDiv);

        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = tempDiv.querySelector("canvas") as HTMLCanvasElement;
        const qrImageData = canvas.toDataURL("image/png");

        // 5. Agregar el QR centrado
        const qrX = (pageWidth - qrSize) / 2;
        const qrY = cardY + 18;
        doc.addImage(qrImageData, "PNG", qrX, qrY, qrSize, qrSize);

        // 6. Pie de etiqueta con Metadatos estructurados
        const footerY = qrY + qrSize + 8;
        doc.setDrawColor(240, 240, 240);
        doc.line(cardX + 10, footerY - 4, cardX + cardWidth - 10, footerY - 4); // Línea decorativa

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "bold");

        // Tres columnas para los metadatos
        const col1 = cardX + (cardWidth / 6);
        const col2 = cardX + (cardWidth / 2);
        const col3 = cardX + (cardWidth * 5 / 6);

        doc.text("SUCURSAL", col1, footerY, { align: "center" });
        doc.text("ALMACÉN", col2, footerY, { align: "center" });
        doc.text("UBICACIÓN", col3, footerY, { align: "center" });

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(item.Sucursal || "N/A", col1, footerY + 6, { align: "center" });
        doc.text(item.Almacén || "N/A", col2, footerY + 6, { align: "center" });
        doc.text(item.Ubicación || "N/A", col3, footerY + 6, { align: "center" });

        tempDiv.remove();
    }

    doc.save(`Stickers-QR-${new Date().getTime()}.pdf`);
}
