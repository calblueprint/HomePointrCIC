require "administrate/base_dashboard"

class EmailDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    id: Field::Number,
    email: Field::String,
    primary: Field::Boolean,
    unconfirmed_email: Field::String,
    confirmation_token: Field::String,
    confirmed_at: Field::DateTime,
    confirmation_sent_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :user,
    :id,
    :email,
    :primary,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :user,
    :id,
    :email,
    :primary,
    :unconfirmed_email,
    :confirmation_token,
    :confirmed_at,
    :confirmation_sent_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :user,
    :email,
    :primary,
    :unconfirmed_email,
    :confirmation_token,
    :confirmed_at,
    :confirmation_sent_at,
  ].freeze

  # Overwrite this method to customize how emails are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(email)
  #   "Email ##{email.id}"
  # end
end
