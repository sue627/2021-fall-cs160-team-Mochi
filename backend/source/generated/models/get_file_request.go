// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"

	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// GetFileRequest get file request
//
// swagger:model getFileRequest
type GetFileRequest struct {

	// path of file
	Path string `json:"path,omitempty"`
}

// Validate validates this get file request
func (m *GetFileRequest) Validate(formats strfmt.Registry) error {
	return nil
}

// ContextValidate validates this get file request based on context it is used
func (m *GetFileRequest) ContextValidate(ctx context.Context, formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *GetFileRequest) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GetFileRequest) UnmarshalBinary(b []byte) error {
	var res GetFileRequest
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}