#!/bin/bash
docker image build --tag=latexhelper .
docker run -p 1337:1337 --name=latexhelper latexhelper