# I made a CTF challenge!
This challenge is centered around the vulnerabilities surrounding latex and poor sanitisation of inputs

## How to run

1. Download the challenge:
`git clone https://github.com/danhoangg/LatexMathHelper`

2. Open Docker

### Linux
Run the build-docker file, `bash build-docker.sh`

### Windows
Run two commands, one after the other\
`docker image build --tag=latexhelper .`\
`docker run -p 1337:1337 --name=latexhelper latexhelper`

The web challenge will now be running on http://localhost:1337
