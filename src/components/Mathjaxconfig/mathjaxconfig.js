let isInitMathjaxConfig = false;

const initMathjaxConfig = () => {
    if (!window.MathJax) {
        return;
    }
    window.MathJax.Hub.Config({
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]],
            displayMath: [["$$", "$$"], ["\\[", "\\]"]],
            skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"]
        },
        "HTML-CSS": {
            availableFonts: ["STIX", "TeX"],
        }
    });
    isInitMathjaxConfig = true;
};

const MathJaxHQ = (val) => {
  if (!window.MathJax) {
    console.log('MathJax is loading');
    return;
  }
  window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById(val)], () => console.log('done'));
} 



export default {
    isInitMathjaxConfig,
    initMathjaxConfig,
    MathJaxHQ
}