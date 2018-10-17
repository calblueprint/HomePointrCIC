class ReferralAgenciesController < ApplicationController
  def create
  	referral_agency = ReferralAgency.new(referral_agency_params)
  	referral_agency.save!
  	redirect_to referral_agencies_show_url
  end

  def show
  	if user_signed_in? and current_user.type == 'ReferralAgency'
  	  @referral_agency = current_user
  	  @tenants = @referral_agency.tenants
  	end
  end

  def update
  	if params[:id] == current_user.id
  	  @referral_agency = ReferralAgency.find(params[:id])
  	  @referral_agency.update!
  	  redirect_to referral_agencies_show_url
  	end
  end

  def delete
    if params[:id] == current_user.id
    	@referral_agency = ReferralAgency.find(params[:id])
    	@referral_agency.find(params[:id]).destroy
    	redirect_to referral_agencies_show_url
    end
  end

  private

  def referral_agency_params
    params.require(:referral_agency).permit(:email, :password, :name, :address, :phone)
  end

end
