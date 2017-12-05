// http://stackoverflow.com/a/23749355
export function getAbsoluteHeight(element: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const margin = parseFloat(styles.marginTop || '0') +
                 parseFloat(styles.marginBottom || '0');

  return Math.ceil(element.offsetHeight + margin);
}
