import { NextResponse } from 'next/server'
import PDFDocument from "pdfkit"

export async function POST(req: Request) {
  try {
    const { userData, plantData, equipmentData, totalCost } = await req.json()

    // Create a new PDF document
    const doc = new PDFDocument()
    const chunks: Buffer[] = []

    // Collect PDF data
    doc.on('data', (chunk) => chunks.push(Buffer.from(chunk)))

    // Add content to the PDF
    doc.fontSize(18).text("Plant Price Calculator Report", { align: "center" })
    doc.moveDown()
    doc.fontSize(12).text(`User: ${userData.name}`)
    doc.text(`Plant Type: ${plantData.type}`)
    doc.text(`Equipment Count: ${Object.keys(equipmentData).length}`)
    doc.text(`Total Cost: ${totalCost}`)

    // Finalize the PDF
    doc.end()

    // Wait for PDF generation to complete
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=plant_price_calculator_report.pdf'
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
} 