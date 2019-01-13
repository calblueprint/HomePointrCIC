# frozen_string_literal: true

class Email < ApplicationRecord
  belongs_to :user, optional: true
  validates :email, format: { with: Devise.email_regexp }, presence: true
end
