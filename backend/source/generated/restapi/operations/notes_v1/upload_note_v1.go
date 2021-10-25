// Code generated by go-swagger; DO NOT EDIT.

package notes_v1

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

// UploadNoteV1HandlerFunc turns a function with the right signature into a upload note v1 handler
type UploadNoteV1HandlerFunc func(UploadNoteV1Params) middleware.Responder

// Handle executing the request and returning a response
func (fn UploadNoteV1HandlerFunc) Handle(params UploadNoteV1Params) middleware.Responder {
	return fn(params)
}

// UploadNoteV1Handler interface for that can handle valid upload note v1 params
type UploadNoteV1Handler interface {
	Handle(UploadNoteV1Params) middleware.Responder
}

// NewUploadNoteV1 creates a new http.Handler for the upload note v1 operation
func NewUploadNoteV1(ctx *middleware.Context, handler UploadNoteV1Handler) *UploadNoteV1 {
	return &UploadNoteV1{Context: ctx, Handler: handler}
}

/* UploadNoteV1 swagger:route POST /v1/notes notesV1 uploadNoteV1

add note

add note

*/
type UploadNoteV1 struct {
	Context *middleware.Context
	Handler UploadNoteV1Handler
}

func (o *UploadNoteV1) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		*r = *rCtx
	}
	var Params = NewUploadNoteV1Params()
	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request
	o.Context.Respond(rw, r, route.Produces, route, res)

}
