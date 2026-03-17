import jsPDF from "jspdf";

interface SAPItem {
    LoteSerie: string;
    Type_3: string;
    Sucursal: string;
    NodeInventario: string;
    Almacén: string;
    Ubicación: string;
    CantidadaRecibir?: number;
    UM?: string;
}

export async function generateInventoryPDF(selectedItems: SAPItem[]) {
    const Mod = await import("qr-code-styling");
    const QRCodeStyling = Mod.default || (Mod as any).QRCodeStyling || Mod;
    const labelWidth = 101.6;
    const labelHeight = 50.8;

    const doc = new jsPDF({
        orientation: "l",
        unit: "mm",
        format: [labelWidth, labelHeight],
    });

    for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        if (!item) continue;

        if (i > 0) doc.addPage([labelWidth, labelHeight], "l");

        const qrSize = 42;
        const textAreaWidth = 52;
        const gap = 3;
        const totalContentWidth = qrSize + gap + textAreaWidth;
        const contentHeight = 44;

        const startX = (labelWidth - totalContentWidth) / 2;
        const startY = (labelHeight - contentHeight) / 2;

        const qrInstance = new (QRCodeStyling as any)({
            width: 600,
            height: 600,
            type: "canvas",
            data: `LT-${item.LoteSerie}`,
            margin: 0,
            dotsOptions: { color: "#000000", type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            cornersSquareOptions: { color: "#000000", type: "extra-rounded" },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.49,
                margin: 2
            },
            image: "/images/logo/marathon-group-logo.png",
        });

        const tempDiv = document.createElement("div");
        qrInstance.append(tempDiv);

        await new Promise(resolve => setTimeout(resolve, 650));

        const canvas = tempDiv.querySelector("canvas") as HTMLCanvasElement;
        const qrImageData = canvas.toDataURL("image/png");

        // 2. Insertar QR Maximizado
        doc.addImage(qrImageData, "PNG", startX, startY, qrSize, qrSize);

        const textX = startX + qrSize + gap;
        let currentY = startY + 3;

        doc.setFontSize(7.5);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "bold");
        doc.text("LOTE/SERIE: ", textX, currentY);

        const loteText = `LT-${item.LoteSerie}`;
        let loteFontSize = 13;
        if (loteText.length > 15) loteFontSize = 11;
        if (loteText.length > 20) loteFontSize = 9;

        doc.setFontSize(loteFontSize);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(loteText, textX, currentY + 6);

        const drawField = (label: string, value: string, y: number) => {
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.setFont("helvetica", "bold");
            doc.text(label, textX, y);

            doc.setFontSize(10.5);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);

            const wrappedText = doc.splitTextToSize(value || "N/A", textAreaWidth);
            doc.text(wrappedText, textX, y + 4.5);

            // Espaciado generoso
            return y + (wrappedText.length > 1 ? 13 : 11);
        };

        currentY += 14.5;
        // 2. SUCURSAL
        currentY = drawField("SUCURSAL", item.Sucursal, currentY);

        // 3. No. INVENTARIO
        currentY = drawField("No. INVENTARIO", item.NodeInventario, currentY);

        // 4. ALMACÉN / UBICACIÓN
        drawField("ALMACÉN / UBICACIÓN", `${item.Almacén} - ${item.Ubicación}`, currentY);

        tempDiv.remove();
    }

    doc.save(`Etiquetas.pdf`);
}