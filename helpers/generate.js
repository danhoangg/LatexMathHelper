const mjAPI = require('mathjax-node');
const svg2png = require('svg2png');
const fs = require('fs');
const path = require('path');

mjAPI.config({
    MathJax: {
        jax: ['input/TeX', 'output/SVG'],
    },
});

mjAPI.start();

async function generate(latex) {
    var svg = await mjAPI.typeset({
        math: latex,
        format: 'TeX',
        svg: true,
    })
    .catch(err => console.log(err));
    if (!svg) {
        svg = await mjAPI.typeset({
            math: '\\text{Internal Server Error}',
            format: 'TeX',
            svg: true,
        })
    }

    const pngBuffer = svg2png.sync(svg.svg, {width: 1000, height: 130});
    
    const output = path.resolve('./latex.png');
    await fs.writeFileSync(output, pngBuffer);
    return output;
}

module.exports = {
    generate
}
