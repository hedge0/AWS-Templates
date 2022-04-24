package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	log.Fatal(http.ListenAndServe(":8000", myRouter))
}

func main() {
	handleRequests()
}
