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

    // MEDIDAS REALES PARA ETIQUETA ZEBRA 4x2 PULGADAS
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

        // --- CÁLCULO DE ESPACIOS PARA MAXIMIZAR ALTURA ---
        // QR de 46mm casi llena los 50.8mm de la etiqueta
        const qrSize = 46;
        const textAreaWidth = 48;
        const gap = 3;
        const totalContentWidth = qrSize + gap + textAreaWidth;

        // startX para centrar el bloque horizontalmente en la etiqueta
        const startX = (labelWidth - totalContentWidth) / 2;
        // startY mínimo para cubrir casi toda la altura
        const startY = 2.5;

        // 1. Generar QR Code (Resolución para 203dpi)
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
                imageSize: 0.3,
                margin: 2
            },
            image: "/images/logo/marathon-group-logo.png",
        });

        const tempDiv = document.createElement("div");
        qrInstance.append(tempDiv);

        // Tiempo de espera para renderizado del canvas
        await new Promise(resolve => setTimeout(resolve, 650));

        const canvas = tempDiv.querySelector("canvas") as HTMLCanvasElement;
        const qrImageData = canvas.toDataURL("image/png");

        // 2. Insertar QR Maximizado
        doc.addImage(qrImageData, "PNG", startX, startY, qrSize, qrSize);

        // 3. Columna de Datos a la derecha (Fuentes más grandes)
        const textX = startX + qrSize + gap;
        let currentY = startY + 6;

        // Título Identificador
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "bold");
        doc.text("ID DE INVENTARIO", textX, currentY);

        // Lote Principal (Ajuste de tamaño dinámico para evitar cortes)
        const loteText = `LT-${item.LoteSerie}`;
        let loteFontSize = 14; 
        if (loteText.length > 15) loteFontSize = 11;
        if (loteText.length > 20) loteFontSize = 9;
        if (loteText.length > 25) loteFontSize = 7;

        doc.setFontSize(loteFontSize);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(loteText, textX, currentY + 7);

        // Función auxiliar para dibujar campos
        const drawField = (label: string, value: string, y: number) => {
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.setFont("helvetica", "bold");
            doc.text(label, textX, y);

            doc.setFontSize(11); // Tamaño robusto para visibilidad en almacén
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);

            const wrappedText = doc.splitTextToSize(value || "N/A", textAreaWidth);
            doc.text(wrappedText, textX, y + 4.5);

            // Retorna la posición Y para el siguiente campo dejando padding
            return y + (wrappedText.length > 1 ? 14 : 12);
        };

        currentY += 17;
        currentY = drawField("SUCURSAL", item.Sucursal, currentY);
        currentY = drawField("ALMACÉN / UBICACIÓN", `${item.Almacén} - ${item.Ubicación}`, currentY);

        tempDiv.remove();
    }

    doc.save(`Zebra-Lote-Max-4x2.pdf`);
}