# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    if user_signed_in?
      if current_user.type == 'Landlord'
        redirect_to properties_path
      else
        redirect_to referral_agency_path(current_user)
      end
    end
  end
end
