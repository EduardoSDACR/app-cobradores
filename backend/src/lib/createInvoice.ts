import fs from "fs";
import PDFDocument from "pdfkit";
import ClientDTO from "../core/dtos/client.dto";
import path from "path";

export function createInvoice(client: ClientDTO | null, id: string) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  let invoice = generateDataObject(client);

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  let dir = generateInvoiceDir(id);
  let fileName = formatDate(new Date(), true) + ".pdf";
  doc.pipe(fs.createWriteStream(dir + "/" + fileName));

  return fileName;
}

function generateDataObject(client: ClientDTO | null) {
  const invoice = {
    shipping: {
      name: client!.firstname,
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111,
    },
    items: [
      {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: 2,
        amount: 6000,
      },
      {
        item: "USB_EXT",
        description: "USB Cable Extender",
        quantity: 1,
        amount: 2000,
      },
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234,
  };
  return invoice;
}

function generateHeader(doc: PDFKit.PDFDocument) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(
  doc: PDFKit.PDFDocument,
  invoice: {
    invoice_nr: any;
    subtotal: number;
    paid: number;
    shipping: {
      name: any;
      address: any;
      city: string;
      state: string;
      country: string;
    };
  }
) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(formatCurrency(invoice.subtotal - invoice.paid), 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city + ", " + invoice.shipping.state + ", " + invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(
  doc: PDFKit.PDFDocument,
  invoice: { items: string | any[]; subtotal: number; paid: number }
) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(doc, subtotalPosition, "", "", "Subtotal", "", formatCurrency(invoice.subtotal));

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc: PDFKit.PDFDocument) {
  doc.fontSize(10).text("Payment is due within 15 days. Thank you for your business.", 50, 780, {
    align: "center",
    width: 500,
  });
}

function generateTableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  item: string,
  description: string,
  unitCost: string,
  quantity: string,
  lineTotal: string
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents: number) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date: Date, isDirectory: boolean = false) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (isDirectory) {
    return year + "-" + month + "-" + day;
  }
  return year + "/" + month + "/" + day;
}

function generateInvoiceDir(client_id: string) {
  const dir = path.join(path.resolve("receipts"), client_id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}
