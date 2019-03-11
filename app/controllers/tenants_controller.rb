# frozen_string_literal: true

class TenantsController < ApplicationController
  def index
    if ReferralAgency.exists?(current_user.id)
      user = ReferralAgency.find(current_user.id)
      @tenants = Tenant.where(referral_agency: user)
    else
      user = Landlord.find(current_user.id)
      redirect_to errors_show_path
    end
  end

  def new
    @tenant = Tenant.new
    authorize @tenant
    @current_userID = current_user.id
  end

  def show
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @status = @tenant.priority
    @properties = []
    @form = []
    @applications = @tenant.info.applications
    @propertyimages = []
    @applications.each do |a|
      @properties << a.property
      if a.property.images.attached? == true
        image_list = a.property.images.map { |img| { url: url_for(img) } }
        @propertyimages << { images: image_list }
      else
        @propertyimages << { images: nil }
      end
      @form << { form: url_for(a.form) } if a.form.attached?
    end
    values = @tenant.attributes.values[3..-3]
    @avatarURL = nil
    @avatarURL = url_for(@tenant.avatar) if @tenant.avatar.attached?
  end

  def edit
     @tenant = Tenant.find(params[:id])
     authorize @tenant
     @current_userID = current_user.id
     @categories = get_tenant_category_enums()
   end

   def get_tenant_category_enums
     categories = {
       housing_type: Tenant.housing_types.keys,
       property_type: Tenant.property_types.keys
     }
     # render json: categories
   end

  private

  def tenant_params
    params.require(:tenant).permit(
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
      :referral_agency_id,
      :date_needed
    )
  end
end
