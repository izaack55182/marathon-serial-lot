import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface ItemQRCodeProps {
    itemId: string;
    itemTitle: string;
}

export default function ItemQRCode({ itemId, itemTitle }: ItemQRCodeProps) {
    const qrRef = React.useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = React.useState<any>(null);

    React.useEffect(() => {
        if (!itemId || !qrRef.current) return;

        let isMounted = true;
        let qrInstance: any = null;

        const initQR = async () => {
            try {
                const Mod = await import("qr-code-styling");
                const QRCodeStyling = Mod.default || (Mod as any).QRCodeStyling || Mod;

                if (!isMounted || !qrRef.current) return;

                qrRef.current.innerHTML = "";

                qrInstance = new (QRCodeStyling as any)({
                    width: 300,
                    height: 300,
                    type: "canvas",
                    data: `LT:${itemId}`, // Formato solicitado: LT:Lote/Serie
                    margin: 8,
                    dotsOptions: {
                        color: "#c8102e",
                        type: "rounded",
                    },
                    backgroundOptions: {
                        color: "#ffffff",
                    },
                    cornersSquareOptions: {
                        color: "#c8102e",
                        type: "extra-rounded",
                    },
                    qrOptions: {
                        typeNumber: 0,
                        mode: "Byte",
                        errorCorrectionLevel: "H",
                    },
                    imageOptions: {
                        hideBackgroundDots: true,
                        imageSize: 0.4,
                    },
                    image: "/images/logo/marathon-group-logo.png",
                });

                qrInstance.append(qrRef.current);

                if (isMounted) {
                    setQrCode(qrInstance);
                }
            } catch (err) {
                // Silently fail
            }
        };

        initQR();

        return () => {
            isMounted = false;
            if (qrRef.current) {
                qrRef.current.innerHTML = "";
            }
        };
    }, [itemId]);

    const download = (ext: "png" | "svg") => {
        if (qrCode) {
            qrCode.download({ name: `QR-${itemTitle.replace(/\s+/g, "-")}`, extension: ext });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center gap-4 p-8 rounded-2xl mt-8 border border-border bg-card shadow-lg transition-all duration-300 relative overflow-hidden group hover:shadow-xl hover:border-primary/20">
            {/* Brand Accent Strip */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

            <div className="space-y-1 pt-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon name="package" className="size-5 text-primary" />
                    <h3 className="font-bold text-xl text-foreground uppercase tracking-tight">
                        Código QR de Activo
                    </h3>
                </div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.1em]">Lote / Serie: {itemId}</p>
            </div>

            <div className="relative p-2 bg-white rounded-xl shadow-inner my-4 border border-border group-hover:scale-[1.02] transition-transform">
                <div
                    ref={qrRef}
                    className="flex items-center justify-center [&>*]:size-full rounded-lg overflow-hidden bg-white"
                    style={{ width: '180px', height: '180px' }}
                />
                {!qrCode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl z-10">
                        <div className="animate-spin size-6 border-2 border-primary/20 border-t-primary rounded-full" />
                    </div>
                )}
            </div>

            <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => download("png")}
                        className="rounded-xl h-11 hover:bg-primary/5 transition-all font-bold text-[11px] uppercase tracking-wider"
                    >
                        <Icon name="image" className="mr-2 size-4 text-muted-foreground" />
                        PNG
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => download("svg")}
                        className="rounded-xl h-11 hover:bg-primary/5 transition-all font-bold text-[11px] uppercase tracking-wider"
                    >
                        <Icon name="file-code" className="mr-2 size-4 text-muted-foreground" />
                        SVG
                    </Button>
                </div>
            </div>
        </div>
    );
}
