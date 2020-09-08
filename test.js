// 方式一：这样的话触发更新的方式
useEffect(() => {
  debugger;
  const srollHandle = throttle(setBottomBtn, 100);
  window.addEventListener("scroll", srollHandle);
  return () => {
    debugger;
    window.removeEventListener("scroll", srollHandle);
  };
}, []);
