require "administrate/base_dashboard"

class PropertyDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    landlord: Field::BelongsTo,
    images_attachments: Field::HasMany.with_options(class_name: "ActiveStorage::Attachment"),
    images_blobs: Field::HasMany.with_options(class_name: "ActiveStorage::Blob"),
    form_attachment: Field::HasOne,
    form_blob: Field::HasOne,
    infos: Field::HasMany,
    applications: Field::HasMany,
    id: Field::Number,
    capacity: Field::Number,
    description: Field::Text,
    rent: Field::Number,
    size: Field::Number,
    property_type: Field::String.with_options(searchable: false),
    housing_type: Field::String.with_options(searchable: false),
    date_available: Field::DateTime,
    location: Field::String.with_options(searchable: false),
    address: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :landlord,
    :images_attachments,
    :images_blobs,
    :form_attachment,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :landlord,
    :images_attachments,
    :images_blobs,
    :form_attachment,
    :form_blob,
    :infos,
    :applications,
    :id,
    :capacity,
    :description,
    :rent,
    :size,
    :property_type,
    :housing_type,
    :date_available,
    :location,
    :address,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :landlord,
    :images_attachments,
    :images_blobs,
    :form_attachment,
    :form_blob,
    :infos,
    :applications,
    :capacity,
    :description,
    :rent,
    :size,
    :property_type,
    :housing_type,
    :date_available,
    :location,
    :address,
  ].freeze

  # Overwrite this method to customize how properties are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(property)
  #   "Property ##{property.id}"
  # end
end
