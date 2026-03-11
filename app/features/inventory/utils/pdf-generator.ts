import jsPDF from "jspdf";

interface SAPItem {
	ItemCode: string;
	ItemName: string;
	U_Sucursal?: string;
	U_Departamento?: string;
	U_Usuario?: string;
	U_Serie?: string;
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
    const qrSize = 80; // Tamaño más grande para etiquetas solitarias
    const marginX = (pageWidth - qrSize) / 2; // Centrado horizontal
    const cardHeight = pageHeight / 2;

    for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        if (!item) continue;
        
        if (i > 0 && i % 2 === 0) {
            doc.addPage();
        }

        const yOffset = (i % 2) * cardHeight + (cardHeight - qrSize) / 2;

        // 1. Generar QR Code (Solo el ItemCode/Serie)
        const qrInstance = new (QRCodeStyling as any)({
            width: 600,
            height: 600,
            type: "canvas",
            data: item.ItemCode, // Solo el valor del lote/serie
            margin: 0,
            dotsOptions: { color: "#c8102e", type: "rounded" }, // Rojo Marathon
            backgroundOptions: { color: "#ffffff" },
            cornersSquareOptions: { color: "#c8102e", type: "extra-rounded" },
            qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "H" },
            imageOptions: { hideBackgroundDots: true, imageSize: 0.4 },
            image: "/images/logo/marathon-group-logo.png",
        });

        const tempDiv = document.createElement("div");
        qrInstance.append(tempDiv);
        
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const canvas = tempDiv.querySelector("canvas") as HTMLCanvasElement;
        const qrImageData = canvas.toDataURL("image/png");

        // 2. Agregar únicamente el QR al PDF
        doc.addImage(qrImageData, "PNG", marginX, yOffset, qrSize, qrSize);

        tempDiv.remove();
    }

    doc.save(`Stickers-QR-${new Date().getTime()}.pdf`);
}
