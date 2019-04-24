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
    $activestoragestart = if !ActiveStorage::Blob.last.nil?
                           ActiveStorage::Blob.last.id
                         else
                           0
                         end
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
    @propertyStatuses = []
    @applications.each do |a|
      @properties << a.property
      @propertyStatuses << { status: a.status }
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

    @tenantCounts = []
    @potentialTenantCounts = []

    @properties.each do |p|
      current_count = p.applications.where(status: "housed").size
      @tenantCounts << current_count
      app_count = p.applications.where(status: "received").size + p.applications.where(status: "interview").size
      @potentialTenantCounts << app_count
    end
  end

  def edit
     @tenant = Tenant.find(params[:id])
     authorize @tenant
     @current_userID = current_user.id
     @categories = get_tenant_category_enums()
     @avatar = nil
     @image_object = nil
     if @tenant.avatar.attached? == true
       @avatar = @tenant.avatar.signed_id
       @image_object = {
          id: @tenant.avatar.id,
          name: @tenant.avatar.filename,
          url: rails_blob_path(@tenant.avatar, :host => 'localhost'),
        }
     else
       @avatar = nil
       @image_object = nil
     end

     @client_form = nil
     @form_name = nil
     if @tenant.form.attached? == true
       @client_form = @tenant.form.signed_id
       @form_name = @tenant.form.filename
     else
       @client_form = nil
       @form_name = nil
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
