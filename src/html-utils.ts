// http://stackoverflow.com/a/23749355
export function getAbsoluteHeight(element: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const margin = parseFloat(styles.marginTop || '0') +
                 parseFloat(styles.marginBottom || '0');

  return Math.ceil(element.offsetHeight + margin);
}

// https://stackoverflow.com/a/20478983
export function documentOffset() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
