var sendLatex = () => {

    fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latex: document.getElementById('latex').value
        })
    }).then((res) => {
            return res.blob();
        }).then(data => {
        const imageUrl = URL.createObjectURL(data);
        document.getElementById('latex-output').src = imageUrl;
    });
}

