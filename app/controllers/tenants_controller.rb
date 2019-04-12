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
    @categories = get_tenant_category_enums()
  end

  def show
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @status = @tenant.priority
    @properties = []
    @form = []
    @applications = @tenant.applications
    @propertyimages = []
    @propertyForms = []
    @applications.each do |a|
      @properties << a.property
      if a.property.images.attached? == true
        image_list = a.property.images.map { |img| { url: url_for(img) } }
        @propertyimages << { images: image_list }
      else
        @propertyimages << { images: nil }
      end
      if a.property.form.attached? == true
        @propertyForms << { form: url_for(a.property.form) }
      else
        @propertyForms << { form: nil }
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
     @avatar = nil
     if @tenant.avatar.attached? == true
       @avatar = { avatar: @tenant.avatar }
     else
       @avatar = { avatar: nil }
     end
  end
 def get_tenant_category_enums
   @nice_housing_type = []
   @nice_property_type = []
   @nice_location = []
   Tenant.housing_types.keys.each do |i|
     @nice_housing_type << i.titleize
   end
   Tenant.property_types.keys.each do |i|
     @nice_property_type << i.titleize
   end
   Tenant.locations.keys.each do |i|
     @nice_location << i.titleize
   end
   categories = {
     housing_types: Tenant.housing_types.keys,
     property_types: Tenant.property_types.keys,
     locations: Tenant.locations.keys,
     nice_housing_types: @nice_housing_type,
     nice_property_types: @nice_property_type,
     nice_locations: @nice_location
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
      :number_of_bedrooms,
      :location,
      :referral_agency_id,
      :date_needed,
      :avatar,
      :number_of_bathrooms,
      :mobility_aids,
      :accessible_shower,
      :car_parking,
      :lift_access,
    )
  end
end
