require "administrate/base_dashboard"

class ApplicationDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    form_attachment: Field::HasOne,
    form_blob: Field::HasOne,
    property: Field::BelongsTo,
    info: Field::BelongsTo,
    id: Field::Number,
    status: Field::String.with_options(searchable: false),
    description: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :form_attachment,
    :form_blob,
    :property,
    :info,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :form_attachment,
    :form_blob,
    :property,
    :info,
    :id,
    :status,
    :description,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :form_attachment,
    :form_blob,
    :property,
    :info,
    :status,
    :description,
  ].freeze

  # Overwrite this method to customize how applications are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(application)
  #   "Application ##{application.id}"
  # end
end
