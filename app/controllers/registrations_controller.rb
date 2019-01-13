# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  skip_before_action :require_login
end
