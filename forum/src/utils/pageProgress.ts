import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

// Several waiting views can be mounted at once; the bar finishes after the last one.
let activeCount = 0;

export function beginPageProgress() {
  activeCount += 1;
  if (activeCount === 1) NProgress.start();
  return () => {
    activeCount -= 1;
    if (activeCount === 0) NProgress.done();
  };
}
