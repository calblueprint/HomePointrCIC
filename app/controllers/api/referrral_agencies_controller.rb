# frozen_string_literal: true

class Api::ReferralAgenciesController < ApplicationController
  # def show
  #   if user_signed_in? and current_user.type == 'ReferralAgency'
  #     @referral_agency =ścurrent_user
  #     @tenants = @referral_agency.tenants
  #   else
  #     redirect_to '/users/sign_up'
  #   end
  # end

  def show
    referral_agency = ReferralAgency.find(params[:id])
    render json: referral_agency
  end

  def referral_agency_params
    params.require(:referral_agency).permit(:email, :encrypted_password, :name, :address, :phone)
  end

end
