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
    images: Field::ActiveStorage,
    form: Field::ActiveStorage,
    tenants: Field::HasMany,
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
    number_of_bedrooms: Field::Number,
    number_of_bathrooms: Field::Number,
    floor_number: Field::Number,
    mobility_aids: Field::Boolean,
    furniture: Field::Boolean,
    utilities_included: Field::Boolean,
    accessible_shower: Field::Boolean,
    car_parking: Field::Boolean,
    lift_access: Field::Boolean,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :landlord,
    :images,
    :form,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :landlord,
    :images,
    :form,
    :tenants,
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
    :number_of_bedrooms,
    :number_of_bathrooms,
    :floor_number,
    :mobility_aids,
    :furniture,
    :utilities_included,
    :accessible_shower,
    :car_parking,
    :lift_access,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :landlord,
    :images,
    :form,
    :tenants,
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
    :number_of_bedrooms,
    :number_of_bathrooms,
    :floor_number,
    :mobility_aids,
    :furniture,
    :utilities_included,
    :accessible_shower,
    :car_parking,
    :lift_access,
  ].freeze

  # Overwrite this method to customize how properties are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(property)
  #   "Property ##{property.id}"
  # end
end
