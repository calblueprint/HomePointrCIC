# frozen_string_literal: true

class ReferralAgenciesController < ApplicationController
  def create
    referral_agency = ReferralAgency.new(referral_agency_params)
    if referral_agency.save!
      redirect_to referral_agencies_show_url
    else
      render json: { errors: referral_agency.errors.messages }
    end
  end

  def show
    if user_signed_in?
      @referral_agency = ReferralAgency.find(params[:id])
      @email = @referral_agency.email
      @properties = Property.all
      authorize @referral_agency
      @name = @referral_agency.name
      field_values = [@referral_agency.email, @referral_agency.address, @referral_agency.phone]
      field_names = ['email', 'Address', 'Phone Number']
      @tag_values = []
      field_names.each_with_index do |tag, index|
        @tag_values << tag.to_s + ': ' + field_values[index].to_s
      end
      @tenants = @referral_agency.tenants
      @tenantImages = []
      @tenants.each do |t|
        @tenantImages << if t.avatar.attached?
                           { url: url_for(t.avatar) }
                         else
                           { url: nil }
                         end
      end
      @tenantStatuses = []
      @tenants.each do |t|
        @tenantStatuses << { status: t.priority }
      end
    else
      redirect_to '/users/sign_up'
    end
  end

  def edit
    @referral_agency = ReferralAgency.find(params[:id])
    authorize @referral_agency
    @current_userID = current_user.id
    @user = current_user
    @current_password = @referral_agency.encrypted_password
    @email = @referral_agency.email
  end

  def update
    # if params[:id] == current_user.id
    @referral_agency = ReferralAgency.find(params[:id])
    authorize @referral_agency
    if @referral_agency.update(referral_agency_params)
      flash[:success] = "Account updated successfully!"
    else
      flash[:danger] = "Account failed to update."
    end
    # else
    #   puts('you do not have access to this page')
    # end
  end

  def destroy
    # if params[:id] == current_user.id
    @referral_agency = ReferralAgency.find(params[:id])
    authorize @referral_agency
    @referral_agency.destroy!
    if @referral_agency.destroyed?
      redirect_to new_user_registration_path
    else
      render json: { errors: @referral_agency.errors.messages }
    end
    # else
    # puts('you do not have access to this page')
    # end
  end

  private

  def referral_agency_params
    params.require(:referral_agency).permit(:email, :password, :name, :address, :phone)
  end
end
