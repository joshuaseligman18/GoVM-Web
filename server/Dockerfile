FROM golang
WORKDIR /usr/app
COPY go.mod go.sum ./
RUN go mod tidy
COPY . .
EXPOSE 8080
CMD ["go", "run", "cmd/main.go"]