export default function scrollbarWidth(): number {
  const divElement = document.createElement('div');
  divElement.style.position = 'fixed';
  divElement.style.left = '-99999999px';
  divElement.style.height = '100px';
  divElement.style.overflow = 'scroll';
  document.body.appendChild(divElement);
  const width = divElement.offsetWidth - divElement.clientWidth;
  document.body.removeChild(divElement);
  return width;
}
