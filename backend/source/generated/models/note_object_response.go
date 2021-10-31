// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// NoteObjectResponse note obj response
//
// swagger:model noteObjectResponse
type NoteObjectResponse struct {

	// description of the note
	Description string `json:"description,omitempty"`

	// note id
	NoteID string `json:"note_id,omitempty"`

	// owner of the note
	NoteOwner string `json:"note_owner,omitempty"`

	// path of file
	NoteReference string `json:"note_reference,omitempty"`

	// style of the note
	Style string `json:"style,omitempty"`

	// tags of the note
	Tag string `json:"tag,omitempty"`

	// title of the note
	Title string `json:"title,omitempty"`

	// type of the note file, public, shared, private
	Type string `json:"type,omitempty"`
}

// Validate validates this note object response
func (m *NoteObjectResponse) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this note object response based on context it is used
func (m *NoteObjectResponse) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *NoteObjectResponse) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *NoteObjectResponse) UnmarshalBinary(b []byte) error {
	var res NoteObjectResponse
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
