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
    @mode = 'create'
    @type = 'tenants'
    enums = []
    # @field_names = Tenant.column_names[1..-3] + ["avatar"]
    @field_names = Tenant.column_names[1..-3]
    @nice_field_names = []
    @field_names.each do |i|
      @nice_field_names << i.titleize
      enums << Tenant.defined_enums[i].keys if Tenant.defined_enums.key?(i)
    end
    num_fields = @field_names.length
    @prev_values = Array.new(num_fields, '')
    # @prev_values << @tenant.avatar
    @field_types = ['textbox', 'textarea', 'textbox', 'textbox', 'textbox', 'slider', '_slider', enums[0], enums[1], 'textbox', enums[2], 'id', 'datepicker', 'attachment']
    # @field_types = ["textbox", "textarea", "textbox", "textbox", "textbox", "slider", "_slider", enums[0], enums[1], "textbox", enums[2], "textbox", "datepicker"]
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

    field_names = Tenant.column_names[3..-3]
    nice_field_names = []
    field_names.each do |field_name|
      nice_field_names << field_name.titleize
    end
    @tag_values = []
    nice_field_names.each_with_index do |tag, index|
      @tag_values << tag.to_s + ': ' + values[index].to_s
    end
  end

  def edit
    @mode = 'edit'
    @type = 'tenants'
    enums = []
    @field_names = Tenant.column_names[1..-3] + ['avatar']
    @nice_field_names = []
    @field_names.each do |i|
      @nice_field_names << i.titleize
      enums << Tenant.defined_enums[i].keys if Tenant.defined_enums.key?(i)
    end
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    @prev_values = @tenant.attributes.values[1..-3]
    @prev_values << if @tenant.avatar.attached? == false
                      @tenant.avatar
                    else
                      [{ id: @tenant.avatar.id, url: url_for(@tenant.avatar) }]
                    end
    @field_types = ['textbox', 'textarea', 'textbox', 'textbox', 'textbox', 'slider', '_slider', enums[0], enums[1], 'textbox', enums[2], 'id', 'datepicker', 'attachment']
    @current_userID = current_user.id
  end

  private

  def tenant_params
    params.require(:tenant).permit(
      :name,
      :description,
      :email,
      :phone,
      :nino,
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
