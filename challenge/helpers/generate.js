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
\\usepackage{amsmath}
\\begin{document}
  $${latex}$
\\end{document}
        `;
	
	const write18Regex = /\\write\s*{?\s*18\s*}?/i;
	
	if (write18Regex.test(latex)) {
		return await generate('\\text{Illegal commands detected}')
	}
	
        const writeFile = util.promisify(fs.writeFile);
        await writeFile('default.tex', latexDoc);
	
	try {
        	terminal.execSync('pdflatex --enable-write18 default.tex');
        	terminal.execSync('convert -density 300 -units PixelsPerInch default.pdf  -quality 90 default.png');
        } catch (err) {
        	return await generate('\\text{Internal Server Error}');
        }

        return path.resolve('./default.png');
}

module.exports = {
    generate
}
