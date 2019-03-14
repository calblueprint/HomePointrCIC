require "administrate/base_dashboard"

class TenantDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    referral_agency: Field::BelongsTo,
    info: Field::HasOne,
    avatar_attachment: Field::HasOne,
    avatar_blob: Field::HasOne,
    id: Field::Number,
    name: Field::String,
    description: Field::Text,
    email: Field::String,
    phone: Field::String,
    rent_min: Field::Number,
    rent_max: Field::Number,
    housing_type: Field::String.with_options(searchable: false),
    property_type: Field::String.with_options(searchable: false),
    num_bedrooms: Field::Number,
    location: Field::String.with_options(searchable: false),
    date_needed: Field::DateTime,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    number_of_bedrooms: Field::Number,
    number_of_bathrooms: Field::Number,
    mobility_aids: Field::Boolean,
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
    :referral_agency,
    :info,
    :avatar_attachment,
    :avatar_blob,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :referral_agency,
    :info,
    :avatar_attachment,
    :avatar_blob,
    :id,
    :name,
    :description,
    :email,
    :phone,
    :rent_min,
    :rent_max,
    :housing_type,
    :property_type,
    :num_bedrooms,
    :location,
    :date_needed,
    :created_at,
    :updated_at,
    :number_of_bedrooms,
    :number_of_bathrooms,
    :mobility_aids,
    :accessible_shower,
    :car_parking,
    :lift_access,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :referral_agency,
    :info,
    :avatar_attachment,
    :avatar_blob,
    :name,
    :description,
    :email,
    :phone,
    :rent_min,
    :rent_max,
    :housing_type,
    :property_type,
    :num_bedrooms,
    :location,
    :date_needed,
    :number_of_bedrooms,
    :number_of_bathrooms,
    :mobility_aids,
    :accessible_shower,
    :car_parking,
    :lift_access,
  ].freeze

  # Overwrite this method to customize how tenants are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(tenant)
  #   "Tenant ##{tenant.id}"
  # end
end
