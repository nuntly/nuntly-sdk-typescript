export async function downloadPdfAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer.toString('base64');
}

export async function downloadSamplePdf() {
  return downloadPdfAsBase64('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
}
