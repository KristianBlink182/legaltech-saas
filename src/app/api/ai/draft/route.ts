import { NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';

export async function POST(req: Request) {
  try {
    const { expediente, juzgado, demandante, demandado, tipoEscrito, instrucciones } = await req.json();

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `EXPEDIENTE : ${expediente || '00123-2024-0-1801-JR-CI-01'}`, bold: true, size: 22 }),
              new TextRun({ text: `\nESPECIALISTA : Legal`, size: 20 }),
              new TextRun({ text: `\nCUADERNO : Principal`, size: 20 }),
              new TextRun({ text: `\nESCRITO : 01-2024`, size: 20 }),
              new TextRun({ text: `\nSUMILLA : ${tipoEscrito || 'CUMPLE MANDATO JUDICIAL'}`, bold: true, size: 22 }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: `SEÑOR JUEZ DEL ${juzgado ? juzgado.toUpperCase() : 'JUZGADO ESPECIALIZADO CIVIL'}:`, bold: true, size: 24 }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.BOTH,
            children: [
              new TextRun({ 
                text: `[NOMBRE DEL ABOGADO/PARTE], identificado con D.N.I. N° [________], con Registro C.A.L. N° [____], con domicilio procesal en la casilla electrónica SINOE N° [______], en los seguidos por ${demandante || '[DEMANDANTE]'} contra ${demandado || '[DEMANDADO]'}, ante usted respetuosamente me presento y digo:`,
                size: 22
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "I. PETITORIO:", bold: true, size: 22 })],
          }),
          new Paragraph({
            alignment: AlignmentType.BOTH,
            children: [
              new TextRun({ 
                text: `Que, dentro del plazo de ley, acudo a su despacho con la finalidad de dar debido cumplimiento a lo ordenado en la última resolución judicial, manifestando que: ${instrucciones || 'Se adjunta el arancel judicial respectivo por derecho de notificación y se subsana la omisión advertida.'}`,
                size: 22
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "II. FUNDAMENTOS DE DERECHO:", bold: true, size: 22 })],
          }),
          new Paragraph({
            alignment: AlignmentType.BOTH,
            children: [
              new TextRun({ 
                text: "Amparo el presente escrito en lo establecido por el Artículo 139° inciso 3 de la Constitución Política del Perú y los artículos aplicables del Código Procesal Civil.",
                size: 22
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "POR TANTO:", bold: true, size: 22 }),
              new TextRun({ text: "\nA Usted Señor Juez pido tener por cumplido lo ordenado conforme a ley.", size: 22 }),
              new TextRun({ text: "\n\nLima, [FECHA ACTUAL]", size: 20 }),
            ],
          }),
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const uint8Array = new Uint8Array(buffer);

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename=Escrito_${expediente || 'Judicial'}.docx`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}