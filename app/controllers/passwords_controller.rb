# frozen_string_literal: true

class PasswordsController < Devise::PasswordsController
  skip_before_action :require_login
end
