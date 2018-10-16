class ReferralAgenciesController < ApplicationController
  def create
  	if current_user.type == 'ReferralAgency'
	  	referral_agency = ReferralAgency.new(referral_agency_params)
	  	landlord.save!
	  	redirect_to referral_agencies_show_url
    end
  end

  def show
  	if user_signed_in? and current_user.type == 'ReferralAgency'
  	  @referral_agency = current_user
  	  @tenants = @referral_agency.tenants
  	end
  end

  def update
  	if user_signed_in?
  	  @referral_agency = ReferralAgency.find(params[:id])
  	  @referral_agency.update!
  	  redirect_to referral_agencies_show_url
  	end
  end

  def delete
  	@referral_agency = ReferralAgency.find(params[:id])
  	@referral_agency.find(params[:id]).destroy
  	redirect_to referral_agencies_show_url
  end

  private

  def referral_agency_params
    params.require(:referral_agency).permit(:email, :password, :name, :address, :phone)
  end

end
