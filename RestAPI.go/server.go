package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	RunServer()
}

func RunServer() {
	server := mux.NewRouter().StrictSlash(true)
	server.HandleFunc("/", Root)
	log.Fatal(http.ListenAndServe(":5000", server))
}

func Root(w http.ResponseWriter, r *http.Request) {
	fmt.Print("Root Directory")
}
