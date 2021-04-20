export async function downloadFile(data: string, filename: string) {
  const blob = new Blob(['\ufeff' + data], {type: 'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const downloadTag = document.createElement('a');

  const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
    downloadTag.setAttribute('target', '_blank');
  }
  downloadTag.setAttribute('href', url);
  downloadTag.setAttribute('download', filename);
  downloadTag.style.visibility = 'hidden';
  document.body.appendChild(downloadTag);
  downloadTag.click();
  document.body.removeChild(downloadTag);
}
