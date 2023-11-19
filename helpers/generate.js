const fs = require('fs');
const terminal = require('child_process');
const path = require('path');
const util = require('util');

async function generate(latex) {
        var latexDoc = `
\\documentclass[
  11pt,
  border=2,
  convert={
    density=300,
    outext=.png
  },
]{standalone}
\\begin{document}
  $${latex}$
\\end{document}
        `;

        const writeFile = util.promisify(fs.writeFile);
        await writeFile('default.tex', latexDoc);

        terminal.execSync('pdflatex default.tex');

        return path.resolve('../default.png');
}

module.exports = {
    generate
}
