(function () {
  const root = document.getElementById("flower-icon-root");
  const flowers = root ? root.querySelector(".flowers") : null;
  const anchor = document.getElementById("signpost-anchor");
  if (!root || !flowers || !anchor) return;

  function measureNaturalBox() {
    const els = flowers.querySelectorAll("*");
    let minLeft = Infinity;
    let minTop = Infinity;
    let maxRight = -Infinity;
    let maxBottom = -Infinity;

    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.left < minLeft) minLeft = r.left;
      if (r.top < minTop) minTop = r.top;
      if (r.right > maxRight) maxRight = r.right;
      if (r.bottom > maxBottom) maxBottom = r.bottom;
    });

    if (minLeft === Infinity) return null;
    return {
      left: minLeft,
      top: minTop,
      width: maxRight - minLeft,
      height: maxBottom - minTop,
    };
  }

  function place() {
    // Reset to natural (unscaled) layout and freeze animations to their
    // final resting state so we measure the true full-bloom silhouette,
    // not a mid-animation or previously-scaled state.
    flowers.style.transform = "none";
    root.classList.add("measuring");
    void flowers.offsetWidth;

    const natural = measureNaturalBox();
    root.classList.remove("measuring");

    if (!natural) return;

    const target = anchor.getBoundingClientRect();
    if (target.width === 0 || target.height === 0) return;

    // Fit the whole flower composition inside the anchor box, preserving
    // its natural proportions (no stretching/distortion).
    const scale = Math.min(
      target.width / natural.width,
      target.height / natural.height
    );

    const naturalCenterX = natural.left + natural.width / 2;
    const naturalCenterY = natural.top + natural.height / 2;
    const targetCenterX = target.left + target.width / 2;
    const targetCenterY = target.top + target.height / 2;

    const dx = (targetCenterX - naturalCenterX) / scale;
    const dy = (targetCenterY - naturalCenterY) / scale;

    flowers.style.transform =
      "scale(" + scale + ") translate(" + dx + "px, " + dy + "px)";
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(place, 250);
  });

  window.addEventListener("load", () => {
    place();
    setTimeout(() => {
      root.classList.remove("flower-not-loaded");
    }, 300);
  });
})();
