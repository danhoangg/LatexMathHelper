FROM ubuntu:bionic

WORKDIR /var/www/latexhelper

## Copy package and flag into dir
COPY challenge/package*.json ./
COPY flag.txt ./

## Install nodejs and npm
RUN apt update
RUN apt install Node.js -y
RUN apt install npm -y

## Install all nodejs libraries
RUN npm install --ignore-scripts

## for apt to be noninteractive
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

## Install convert and pdflatex
RUN apt-get install texlive-latex-base -y
RUN apt-get install texlive-latex-extra -y
RUN apt-get install imagemagick -y
RUN sed -i 's#<policy domain="coder" rights="none" pattern="PDF" />#<policy domain="coder" rights="read|write" pattern="PDF" />#' /etc/ImageMagick-6/policy.xml

## Create ctf user
RUN useradd -ms /bin/bash ctf
RUN chown ctf:ctf /var/www/latexhelper
RUN chmod g+s /var/www/latexhelper
RUN chmod o+rwx /var/www/latexhelper

## Switch to ctf user
USER ctf

## Copy challenge files over
COPY challenge/ .

## Use port 1337
EXPOSE 1337

CMD ["node", "app.js"]

